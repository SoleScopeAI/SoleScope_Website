import { supabase } from './supabase';
import { passwordUtils } from './passwordUtils';

const MANAGE_USERS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

export interface CreateAdminUserData {
  email: string;
  fullName: string;
  role: 'owner' | 'admin' | 'manager';
  createdBy: string;
  customPassword?: string;
}

export interface AdminUserResult {
  success: boolean;
  userId?: string;
  temporaryPassword?: string;
  error?: string;
}

export interface AdminUserListItem {
  id: string;
  email: string;
  full_name: string;
  role: 'owner' | 'admin' | 'manager';
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

export const adminUserService = {
  async checkIsOwner(adminUserId: string): Promise<boolean> {
    try {
      const { data } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', adminUserId)
        .eq('is_active', true)
        .maybeSingle();

      return data?.role === 'owner';
    } catch {
      return false;
    }
  },

  async createAdminUser(data: CreateAdminUserData): Promise<AdminUserResult> {
    try {
      const isOwner = await this.checkIsOwner(data.createdBy);
      if (!isOwner) {
        return { success: false, error: 'Only owners can create admin users. This attempt has been logged.' };
      }

      const password = data.customPassword || passwordUtils.generateTemporaryPassword(16);

      if (data.customPassword) {
        const validation = passwordUtils.validatePasswordStrength(data.customPassword);
        if (!validation.valid) return { success: false, error: validation.errors.join(', ') };
      }

      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;

      const response = await fetch(MANAGE_USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'create_user',
          email: data.email.toLowerCase().trim(),
          password,
          full_name: data.fullName,
          user_type: 'admin',
          role: data.role,
        }),
      });

      const result = await response.json();
      if (!response.ok) return { success: false, error: result.error };

      try {
        await supabase.from('activity_logs').insert({
          admin_user_id: data.createdBy,
          action_type: 'admin_user_created',
          entity_type: 'admin_user',
          entity_id: result.user_id,
          description: `Created admin user: ${data.email} with role: ${data.role}`,
          metadata: { email: data.email, full_name: data.fullName, role: data.role },
        });
      } catch {}

      return { success: true, userId: result.user_id, temporaryPassword: password };
    } catch (error) {
      console.error('Error creating admin user:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async getAllAdminUsers(): Promise<AdminUserListItem[]> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, full_name, role, is_active, last_login, created_at')
        .order('created_at', { ascending: false });

      if (error) return [];
      return data || [];
    } catch {
      return [];
    }
  },

  async toggleAdminStatus(adminUserId: string, targetUserId: string, isActive: boolean): Promise<AdminUserResult> {
    try {
      const isOwner = await this.checkIsOwner(adminUserId);
      if (!isOwner) return { success: false, error: 'Only owners can modify admin user status' };

      if (!isActive) {
        const { data: targetUser } = await supabase
          .from('admin_users')
          .select('role')
          .eq('id', targetUserId)
          .maybeSingle();

        if (targetUser?.role === 'owner') {
          const { count } = await supabase
            .from('admin_users')
            .select('id', { count: 'exact', head: true })
            .eq('role', 'owner')
            .eq('is_active', true);

          if (count && count <= 1) return { success: false, error: 'Cannot deactivate the last owner' };
        }
      }

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ is_active: isActive })
        .eq('id', targetUserId);

      if (updateError) return { success: false, error: updateError.message };

      const { data: targetUser } = await supabase
        .from('admin_users')
        .select('email, full_name')
        .eq('id', targetUserId)
        .maybeSingle();

      if (targetUser) {
        try {
          await supabase.from('activity_logs').insert({
            admin_user_id: adminUserId,
            action_type: isActive ? 'admin_user_activated' : 'admin_user_deactivated',
            entity_type: 'admin_user',
            entity_id: targetUserId,
            description: `${isActive ? 'Activated' : 'Deactivated'} admin user: ${targetUser.email}`,
          });
        } catch {}
      }

      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async updateAdminRole(adminUserId: string, targetUserId: string, newRole: 'owner' | 'admin' | 'manager'): Promise<AdminUserResult> {
    try {
      const isOwner = await this.checkIsOwner(adminUserId);
      if (!isOwner) return { success: false, error: 'Only owners can modify admin user roles' };

      const { data: targetUser } = await supabase
        .from('admin_users')
        .select('role, email')
        .eq('id', targetUserId)
        .maybeSingle();

      if (targetUser?.role === 'owner' && newRole !== 'owner') {
        const { count } = await supabase
          .from('admin_users')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'owner')
          .eq('is_active', true);

        if (count && count <= 1) return { success: false, error: 'Cannot change the role of the last owner' };
      }

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ role: newRole })
        .eq('id', targetUserId);

      if (updateError) return { success: false, error: updateError.message };

      try {
        await supabase.from('activity_logs').insert({
          admin_user_id: adminUserId,
          action_type: 'admin_role_updated',
          entity_type: 'admin_user',
          entity_id: targetUserId,
          description: `Updated admin role for ${targetUser?.email} from ${targetUser?.role} to ${newRole}`,
        });
      } catch {}

      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },
};
