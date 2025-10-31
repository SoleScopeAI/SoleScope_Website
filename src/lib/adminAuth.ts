import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'owner' | 'admin' | 'manager';
  is_active: boolean;
  last_login: string | null;
}

export interface AdminLoginResponse {
  success: boolean;
  user?: AdminUser;
  error?: string;
}

export const adminAuth = {
  async login(email: string, password: string): Promise<AdminLoginResponse> {
    try {
      const normalizedEmail = email.toLowerCase().trim();

      console.log('=== ADMIN LOGIN DEBUG START ===');
      console.log('Admin login attempt for:', normalizedEmail);
      console.log('Password received (length):', password?.length);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .ilike('email', normalizedEmail)
        .eq('is_active', true)
        .maybeSingle();

      console.log('Query result - error:', error);
      console.log('Query result - data:', adminUser ? 'User found' : 'No user');

      if (error) {
        console.error('Database query error during login:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return { success: false, error: 'Database error occurred. Please try again.' };
      }

      if (!adminUser) {
        console.warn('Login failed: No active admin user found with email:', normalizedEmail);
        return { success: false, error: 'Invalid email or password' };
      }

      console.log('Admin user found:', {
        id: adminUser.id,
        email: adminUser.email,
        full_name: adminUser.full_name,
        role: adminUser.role,
        is_active: adminUser.is_active,
        has_password_hash: !!adminUser.password_hash,
        password_hash_length: adminUser.password_hash?.length
      });
      console.log('Verifying password with bcrypt...');

      const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash);

      console.log('Password validation result:', isPasswordValid);

      if (!isPasswordValid) {
        console.warn('Login failed: Invalid password for email:', normalizedEmail);
        return { success: false, error: 'Invalid email or password' };
      }

      console.log('Password verified successfully, updating last login...');

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminUser.id);

      if (updateError) {
        console.error('Failed to update last_login:', updateError);
      }

      await this.logActivity(
        adminUser.id,
        'login',
        'admin_user',
        adminUser.id,
        'Admin user logged in'
      );

      const user: AdminUser = {
        id: adminUser.id,
        email: adminUser.email,
        full_name: adminUser.full_name,
        role: adminUser.role,
        is_active: adminUser.is_active,
        last_login: adminUser.last_login,
      };

      console.log('Login successful for admin:', user.email);
      return { success: true, user };
    } catch (error) {
      console.error('Unexpected login error:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return { success: false, error: 'An error occurred during login' };
    }
  },

  async logout() {
    try {
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminSession');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    try {
      const userStr = localStorage.getItem('adminUser');
      if (!userStr) return null;

      const user = JSON.parse(userStr) as AdminUser;

      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, full_name, role, is_active, last_login')
        .eq('id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        this.logout();
        return null;
      }

      return data as AdminUser;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  saveUserToStorage(user: AdminUser) {
    localStorage.setItem('adminUser', JSON.stringify(user));
    localStorage.setItem('adminSession', Date.now().toString());
  },

  async setupInitialAdmin() {
    console.log('Admin user is already configured in the database');
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

  isSessionValid(): boolean {
    const sessionTime = localStorage.getItem('adminSession');
    if (!sessionTime) return false;

    const now = Date.now();
    const sessionAge = now - parseInt(sessionTime);
    const maxAge = 24 * 60 * 60 * 1000;

    return sessionAge < maxAge;
  }
};
