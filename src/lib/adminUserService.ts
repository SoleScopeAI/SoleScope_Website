import bcrypt from 'bcryptjs';
import { supabase } from './supabase';
import { passwordUtils } from './passwordUtils';

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
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', adminUserId)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        console.error('Error checking owner status:', error);
        return false;
      }

      return data.role === 'owner';
    } catch (error) {
      console.error('Unexpected error checking owner status:', error);
      return false;
    }
  },

  async createAdminUser(data: CreateAdminUserData): Promise<AdminUserResult> {
    try {
      const isOwner = await this.checkIsOwner(data.createdBy);
      if (!isOwner) {
        await this.logUnauthorizedAttempt(
          data.createdBy,
          'create_admin_user',
          data.email,
          data.role
        );
        return {
          success: false,
          error: 'Only owners can create admin users. This attempt has been logged.',
        };
      }

      const normalizedEmail = data.email.toLowerCase().trim();

      const { data: existingAdmin, error: checkError } = await supabase
        .from('admin_users')
        .select('id')
        .ilike('email', normalizedEmail)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing admin:', checkError);
        return { success: false, error: 'Failed to check for existing admin user' };
      }

      if (existingAdmin) {
        return { success: false, error: 'An admin user with this email already exists' };
      }

      let password: string;
      if (data.customPassword) {
        const validation = passwordUtils.validatePasswordStrength(data.customPassword);
        if (!validation.valid) {
          return { success: false, error: validation.errors.join(', ') };
        }
        password = data.customPassword;
      } else {
        password = passwordUtils.generateTemporaryPassword(16);
      }

      const passwordHash = await passwordUtils.hashPassword(password);

      const { data: newAdmin, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: normalizedEmail,
          password_hash: passwordHash,
          full_name: data.fullName,
          role: data.role,
          is_active: true,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating admin user:', insertError);
        return {
          success: false,
          error: insertError.message || 'Failed to create admin user',
        };
      }

      try {
        await supabase.from('activity_logs').insert({
          admin_user_id: data.createdBy,
          action_type: 'admin_user_created',
          entity_type: 'admin_user',
          entity_id: newAdmin.id,
          description: `Created admin user: ${data.email} with role: ${data.role}`,
          metadata: {
            email: data.email,
            full_name: data.fullName,
            role: data.role,
          },
        });
      } catch (logError) {
        console.error('Failed to log activity (non-critical):', logError);
      }

      return {
        success: true,
        userId: newAdmin.id,
        temporaryPassword: password,
      };
    } catch (error) {
      console.error('Unexpected error creating admin user:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async getAllAdminUsers(): Promise<AdminUserListItem[]> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, full_name, role, is_active, last_login, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching admin users:', error);
      return [];
    }
  },

  async toggleAdminStatus(
    adminUserId: string,
    targetUserId: string,
    isActive: boolean
  ): Promise<AdminUserResult> {
    try {
      const isOwner = await this.checkIsOwner(adminUserId);
      if (!isOwner) {
        return {
          success: false,
          error: 'Only owners can modify admin user status',
        };
      }

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

          if (count && count <= 1) {
            return {
              success: false,
              error: 'Cannot deactivate the last owner',
            };
          }
        }
      }

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ is_active: isActive })
        .eq('id', targetUserId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      const { data: targetUser } = await supabase
        .from('admin_users')
        .select('email, full_name')
        .eq('id', targetUserId)
        .single();

      if (targetUser) {
        try {
          await supabase.from('activity_logs').insert({
            admin_user_id: adminUserId,
            action_type: isActive ? 'admin_user_activated' : 'admin_user_deactivated',
            entity_type: 'admin_user',
            entity_id: targetUserId,
            description: `${isActive ? 'Activated' : 'Deactivated'} admin user: ${targetUser.email}`,
            metadata: {
              email: targetUser.email,
              full_name: targetUser.full_name,
            },
          });
        } catch (logError) {
          console.error('Failed to log activity (non-critical):', logError);
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error toggling admin status:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async updateAdminRole(
    adminUserId: string,
    targetUserId: string,
    newRole: 'owner' | 'admin' | 'manager'
  ): Promise<AdminUserResult> {
    try {
      const isOwner = await this.checkIsOwner(adminUserId);
      if (!isOwner) {
        return {
          success: false,
          error: 'Only owners can modify admin user roles',
        };
      }

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

        if (count && count <= 1) {
          return {
            success: false,
            error: 'Cannot change the role of the last owner',
          };
        }
      }

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ role: newRole })
        .eq('id', targetUserId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      try {
        await supabase.from('activity_logs').insert({
          admin_user_id: adminUserId,
          action_type: 'admin_role_updated',
          entity_type: 'admin_user',
          entity_id: targetUserId,
          description: `Updated admin role for ${targetUser?.email} from ${targetUser?.role} to ${newRole}`,
          metadata: {
            email: targetUser?.email,
            old_role: targetUser?.role,
            new_role: newRole,
          },
        });
      } catch (logError) {
        console.error('Failed to log activity (non-critical):', logError);
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating admin role:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async logUnauthorizedAttempt(
    adminUserId: string,
    actionType: string,
    targetEmail: string,
    targetRole: string
  ) {
    try {
      await supabase.from('activity_logs').insert({
        admin_user_id: adminUserId,
        action_type: 'unauthorized_admin_action',
        entity_type: 'admin_user',
        entity_id: null,
        description: `Unauthorized attempt to ${actionType}`,
        metadata: {
          action: actionType,
          target_email: targetEmail,
          target_role: targetRole,
        },
      });
    } catch (error) {
      console.error('Failed to log unauthorized attempt:', error);
    }
  },
};
