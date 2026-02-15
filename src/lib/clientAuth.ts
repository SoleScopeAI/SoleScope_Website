import { supabase, ClientUser } from './supabase';

export type { ClientUser };

export interface ClientLoginResponse {
  success: boolean;
  user?: ClientUser;
  error?: string;
  userType?: 'client' | 'admin';
}

const MANAGE_USERS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

export const clientAuth = {
  async login(email: string, password: string): Promise<ClientLoginResponse> {
    try {
      const normalizedEmail = email.toLowerCase().trim();

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (authError) {
        const migrated = await this.attemptMigration(normalizedEmail, password);
        if (migrated) {
          return this.login(normalizedEmail, password);
        }
        return { success: false, error: 'Invalid email or password' };
      }

      const { data: clientUser, error: profileError } = await supabase
        .from('client_users')
        .select(`
          id, auth_id, client_id, email, full_name, is_active, last_login, created_at, updated_at,
          client_data:clients (company_name, contact_name, status)
        `)
        .eq('auth_id', authData.user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (profileError || !clientUser) {
        return { success: false, error: 'Not authorized as client' };
      }

      await supabase
        .from('client_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', clientUser.id);

      const user: ClientUser = {
        ...clientUser,
        client_data: Array.isArray(clientUser.client_data) && clientUser.client_data.length > 0
          ? clientUser.client_data[0]
          : clientUser.client_data && !Array.isArray(clientUser.client_data)
            ? clientUser.client_data
            : undefined,
      };

      return { success: true, user, userType: 'client' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  },

  async attemptMigration(email: string, password: string): Promise<boolean> {
    try {
      const { data: legacyUser } = await supabase
        .from('client_users')
        .select('id, password_hash, auth_id')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (!legacyUser || legacyUser.auth_id || legacyUser.password_hash === 'SUPABASE_AUTH') {
        return false;
      }

      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.default.compare(password, legacyUser.password_hash);
      if (!isValid) return false;

      const response = await fetch(MANAGE_USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'migrate_user',
          email,
          password,
          user_type: 'client',
          profile_id: legacyUser.id,
        }),
      });

      return response.ok;
    } catch {
      return false;
    }
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async getCurrentUser(): Promise<ClientUser | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('client_users')
        .select(`
          id, auth_id, client_id, email, full_name, is_active, last_login, created_at, updated_at,
          client_data:clients (company_name, contact_name, status)
        `)
        .eq('auth_id', session.user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) return null;

      return {
        ...data,
        client_data: Array.isArray(data.client_data) && data.client_data.length > 0
          ? data.client_data[0]
          : data.client_data && !Array.isArray(data.client_data)
            ? data.client_data
            : undefined,
      } as ClientUser;
    } catch {
      return null;
    }
  },

  async changePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch {
      return { success: false, error: 'An error occurred' };
    }
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch {
      return { success: false, error: 'An error occurred' };
    }
  },
};
