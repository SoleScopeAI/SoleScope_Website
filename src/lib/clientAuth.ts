import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export interface ClientUser {
  id: string;
  client_id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  email_verified: boolean;
  last_login: string | null;
  client_data?: {
    company_name: string;
    contact_name: string;
    status: string;
  };
}

export interface ClientLoginResponse {
  success: boolean;
  user?: ClientUser;
  error?: string;
  userType?: 'client' | 'admin';
}

export const clientAuth = {
  async login(email: string, password: string): Promise<ClientLoginResponse> {
    try {
      const { data: clientUser, error } = await supabase
        .from('client_users')
        .select(`
          *,
          client_data:clients (
            company_name,
            contact_name,
            status
          )
        `)
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Database error:', error);
        return { success: false, error: 'Database error occurred' };
      }

      if (!clientUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      const isPasswordValid = await bcrypt.compare(password, clientUser.password_hash);

      if (!isPasswordValid) {
        return { success: false, error: 'Invalid email or password' };
      }

      await supabase
        .from('client_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', clientUser.id);

      const user: ClientUser = {
        id: clientUser.id,
        client_id: clientUser.client_id,
        email: clientUser.email,
        full_name: clientUser.full_name,
        is_active: clientUser.is_active,
        email_verified: clientUser.email_verified,
        last_login: clientUser.last_login,
        client_data: Array.isArray(clientUser.client_data) && clientUser.client_data.length > 0
          ? clientUser.client_data[0]
          : undefined,
      };

      return { success: true, user, userType: 'client' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  },

  async logout() {
    try {
      localStorage.removeItem('clientUser');
      localStorage.removeItem('clientSession');
      localStorage.removeItem('userType');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getCurrentUser(): Promise<ClientUser | null> {
    try {
      const userStr = localStorage.getItem('clientUser');
      if (!userStr) return null;

      const user = JSON.parse(userStr) as ClientUser;

      const { data, error } = await supabase
        .from('client_users')
        .select(`
          id,
          client_id,
          email,
          full_name,
          is_active,
          email_verified,
          last_login,
          client_data:clients (
            company_name,
            contact_name,
            status
          )
        `)
        .eq('id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        this.logout();
        return null;
      }

      return {
        ...data,
        client_data: Array.isArray(data.client_data) && data.client_data.length > 0
          ? data.client_data[0]
          : undefined,
      } as ClientUser;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  saveUserToStorage(user: ClientUser) {
    localStorage.setItem('clientUser', JSON.stringify(user));
    localStorage.setItem('clientSession', Date.now().toString());
    localStorage.setItem('userType', 'client');
  },

  isSessionValid(): boolean {
    const sessionTime = localStorage.getItem('clientSession');
    if (!sessionTime) return false;

    const now = Date.now();
    const sessionAge = now - parseInt(sessionTime);
    const maxAge = 24 * 60 * 60 * 1000;

    return sessionAge < maxAge;
  },

  getUserType(): 'client' | 'admin' | null {
    const userType = localStorage.getItem('userType');
    if (userType === 'client' || userType === 'admin') {
      return userType;
    }
    return null;
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const resetToken = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      const { error } = await supabase
        .from('client_users')
        .update({
          reset_token: resetToken,
          reset_token_expires: expiresAt.toISOString(),
        })
        .eq('email', email)
        .eq('is_active', true);

      if (error) {
        console.error('Password reset error:', error);
        return { success: false, error: 'Unable to process password reset request' };
      }

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'An error occurred' };
    }
  },

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: user, error: fetchError } = await supabase
        .from('client_users')
        .select('id, reset_token_expires')
        .eq('reset_token', token)
        .eq('is_active', true)
        .maybeSingle();

      if (fetchError || !user) {
        return { success: false, error: 'Invalid or expired reset token' };
      }

      if (user.reset_token_expires && new Date(user.reset_token_expires) < new Date()) {
        return { success: false, error: 'Reset token has expired' };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const { error: updateError } = await supabase
        .from('client_users')
        .update({
          password_hash: hashedPassword,
          reset_token: null,
          reset_token_expires: null,
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Password update error:', updateError);
        return { success: false, error: 'Unable to update password' };
      }

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'An error occurred' };
    }
  },

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: user, error } = await supabase
        .from('client_users')
        .select('password_hash')
        .eq('id', userId)
        .maybeSingle();

      if (error || !user) {
        return { success: false, error: 'User not found' };
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);

      if (!isPasswordValid) {
        return { success: false, error: 'Current password is incorrect' };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const { error: updateError } = await supabase
        .from('client_users')
        .update({ password_hash: hashedPassword })
        .eq('id', userId);

      if (updateError) {
        console.error('Password change error:', updateError);
        return { success: false, error: 'Unable to change password' };
      }

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'An error occurred' };
    }
  },
};
