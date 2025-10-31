import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export interface TemporaryPassword {
  password: string;
  hashedPassword: string;
  expiresAt: string;
}

export const passwordUtils = {
  generateTemporaryPassword(length: number = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    const allChars = uppercase + lowercase + numbers + symbols;

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  },

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  async createTemporaryPassword(expirationDays: number = 7): Promise<TemporaryPassword> {
    const password = this.generateTemporaryPassword();
    const hashedPassword = await this.hashPassword(password);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    return {
      password,
      hashedPassword,
      expiresAt: expiresAt.toISOString(),
    };
  },

  validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },
};

export interface ClientUserData {
  clientId: string;
  email: string;
  fullName: string;
  createdBy: string;
  customTemporaryPassword?: string;
}

export const clientUserService = {
  async createClientUser(data: ClientUserData): Promise<{
    success: boolean;
    userId?: string;
    temporaryPassword?: string;
    error?: string;
  }> {
    try {
      let tempPassword: TemporaryPassword;

      if (data.customTemporaryPassword) {
        const validation = passwordUtils.validatePasswordStrength(data.customTemporaryPassword);
        if (!validation.valid) {
          return { success: false, error: validation.errors.join(', ') };
        }

        const hashedPassword = await passwordUtils.hashPassword(data.customTemporaryPassword);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        tempPassword = {
          password: data.customTemporaryPassword,
          hashedPassword,
          expiresAt: expiresAt.toISOString(),
        };
      } else {
        tempPassword = await passwordUtils.createTemporaryPassword();
      }

      const { data: existingUser, error: checkError } = await supabase
        .from('client_users')
        .select('id')
        .eq('email', data.email.toLowerCase())
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing user:', checkError);
        return { success: false, error: 'Failed to check for existing user' };
      }

      if (existingUser) {
        return { success: false, error: 'A user with this email already exists' };
      }

      const { data: newUser, error: insertError } = await supabase
        .from('client_users')
        .insert({
          client_id: data.clientId,
          email: data.email.toLowerCase(),
          password_hash: tempPassword.hashedPassword,
          full_name: data.fullName,
          is_active: true,
          requires_password_change: true,
          temporary_password_expires: tempPassword.expiresAt,
          email_verified: false,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating client user:', insertError);
        return { success: false, error: insertError.message };
      }

      await supabase.from('activity_logs').insert({
        admin_user_id: data.createdBy,
        action_type: 'client_user_created',
        entity_type: 'client_user',
        entity_id: newUser.id,
        description: `Created client portal user: ${data.email}`,
        metadata: {
          client_id: data.clientId,
          email: data.email,
          full_name: data.fullName,
        },
      });

      return {
        success: true,
        userId: newUser.id,
        temporaryPassword: tempPassword.password,
      };
    } catch (error) {
      console.error('Unexpected error creating client user:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async resetPassword(userId: string, adminUserId: string): Promise<{
    success: boolean;
    temporaryPassword?: string;
    error?: string;
  }> {
    try {
      const tempPassword = await passwordUtils.createTemporaryPassword();

      const { error: updateError } = await supabase
        .from('client_users')
        .update({
          password_hash: tempPassword.hashedPassword,
          requires_password_change: true,
          temporary_password_expires: tempPassword.expiresAt,
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error resetting password:', updateError);
        return { success: false, error: updateError.message };
      }

      const { data: user } = await supabase
        .from('client_users')
        .select('email, client_id')
        .eq('id', userId)
        .single();

      if (user) {
        await supabase.from('activity_logs').insert({
          admin_user_id: adminUserId,
          action_type: 'client_password_reset',
          entity_type: 'client_user',
          entity_id: userId,
          description: `Reset password for client user: ${user.email}`,
          metadata: {
            client_id: user.client_id,
            email: user.email,
          },
        });
      }

      return {
        success: true,
        temporaryPassword: tempPassword.password,
      };
    } catch (error) {
      console.error('Unexpected error resetting password:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const validation = passwordUtils.validatePasswordStrength(newPassword);
      if (!validation.valid) {
        return { success: false, error: validation.errors.join(', ') };
      }

      const { data: user, error: fetchError } = await supabase
        .from('client_users')
        .select('password_hash')
        .eq('id', userId)
        .single();

      if (fetchError || !user) {
        return { success: false, error: 'User not found' };
      }

      const isValid = await passwordUtils.verifyPassword(currentPassword, user.password_hash);
      if (!isValid) {
        return { success: false, error: 'Current password is incorrect' };
      }

      const newHash = await passwordUtils.hashPassword(newPassword);

      const { error: updateError } = await supabase
        .from('client_users')
        .update({
          password_hash: newHash,
          requires_password_change: false,
          temporary_password_expires: null,
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error changing password:', updateError);
        return { success: false, error: updateError.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error changing password:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async toggleUserStatus(userId: string, isActive: boolean, adminUserId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const { error: updateError } = await supabase
        .from('client_users')
        .update({ is_active: isActive })
        .eq('id', userId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      const { data: user } = await supabase
        .from('client_users')
        .select('email')
        .eq('id', userId)
        .single();

      if (user) {
        await supabase.from('activity_logs').insert({
          admin_user_id: adminUserId,
          action_type: isActive ? 'client_user_activated' : 'client_user_deactivated',
          entity_type: 'client_user',
          entity_id: userId,
          description: `${isActive ? 'Activated' : 'Deactivated'} client user: ${user.email}`,
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Error toggling user status:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },
};
