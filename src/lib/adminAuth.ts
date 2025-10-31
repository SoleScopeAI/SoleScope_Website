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
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Database error:', error);
        return { success: false, error: 'Database error occurred' };
      }

      if (!adminUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash);

      if (!isPasswordValid) {
        return { success: false, error: 'Invalid email or password' };
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

      const user: AdminUser = {
        id: adminUser.id,
        email: adminUser.email,
        full_name: adminUser.full_name,
        role: adminUser.role,
        is_active: adminUser.is_active,
        last_login: adminUser.last_login,
      };

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
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
    try {
      const { data: existingAdmin } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', 'Kevin@solescope.co.uk')
        .maybeSingle();

      if (existingAdmin) {
        const hashedPassword = await bcrypt.hash('RoxyRufus3586!', 10);

        await supabase
          .from('admin_users')
          .update({ password_hash: hashedPassword })
          .eq('email', 'Kevin@solescope.co.uk');
      }
    } catch (error) {
      console.error('Setup initial admin error:', error);
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

  isSessionValid(): boolean {
    const sessionTime = localStorage.getItem('adminSession');
    if (!sessionTime) return false;

    const now = Date.now();
    const sessionAge = now - parseInt(sessionTime);
    const maxAge = 24 * 60 * 60 * 1000;

    return sessionAge < maxAge;
  }
};
