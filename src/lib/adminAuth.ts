import { supabase, AdminUser } from './supabase';

export type { AdminUser };

export interface AdminLoginResponse {
  success: boolean;
  user?: AdminUser;
  error?: string;
}

const MANAGE_USERS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

export const adminAuth = {
  async login(email: string, password: string): Promise<AdminLoginResponse> {
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

      const { data: adminUser, error: profileError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('auth_id', authData.user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (profileError || !adminUser) {
        return { success: false, error: 'Not authorized as admin' };
      }

      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminUser.id);

      await this.logActivity(
        adminUser.id,
        'login',
        'admin_user',
        adminUser.id,
        'Admin user logged in'
      );

      return { success: true, user: adminUser as AdminUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  },

  async attemptMigration(email: string, password: string): Promise<boolean> {
    try {
      const { data: legacyAdmin } = await supabase
        .from('admin_users')
        .select('id, password_hash, auth_id')
        .ilike('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (!legacyAdmin || legacyAdmin.auth_id || legacyAdmin.password_hash === 'SUPABASE_AUTH') {
        return false;
      }

      const bcrypt = await import('bcryptjs');
      const isValid = await bcrypt.default.compare(password, legacyAdmin.password_hash);
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
          user_type: 'admin',
          profile_id: legacyAdmin.id,
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

  async getCurrentUser(): Promise<AdminUser | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('auth_id', session.user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) return null;
      return data as AdminUser;
    } catch {
      return null;
    }
  },

  async logActivity(
    adminUserId: string,
    actionType: string,
    entityType: string,
    entityId: string,
    description: string,
    metadata: Record<string, unknown> = {}
  ) {
    try {
      await supabase.from('activity_logs').insert({
        admin_user_id: adminUserId,
        action_type: actionType,
        entity_type: entityType,
        entity_id: entityId,
        description,
        metadata,
        ip_address: null,
      });
    } catch (error) {
      console.error('Log activity error:', error);
    }
  },
};
