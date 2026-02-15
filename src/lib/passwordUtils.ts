import { supabase } from './supabase';

const MANAGE_USERS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

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

  validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Password must be at least 8 characters long');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
    return { valid: errors.length === 0, errors };
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
      const password = data.customTemporaryPassword || passwordUtils.generateTemporaryPassword();

      if (data.customTemporaryPassword) {
        const validation = passwordUtils.validatePasswordStrength(data.customTemporaryPassword);
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
          email: data.email.toLowerCase(),
          password,
          full_name: data.fullName,
          user_type: 'client',
          client_id: data.clientId,
        }),
      });

      const result = await response.json();
      if (!response.ok) return { success: false, error: result.error };

      try {
        await supabase.from('activity_logs').insert({
          admin_user_id: data.createdBy,
          action_type: 'client_user_created',
          entity_type: 'client_user',
          entity_id: result.user_id,
          description: `Created client portal user: ${data.email}`,
          metadata: { client_id: data.clientId, email: data.email, full_name: data.fullName },
        });
      } catch {}

      return { success: true, userId: result.user_id, temporaryPassword: password };
    } catch (error) {
      console.error('Error creating client user:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  async changePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const validation = passwordUtils.validatePasswordStrength(newPassword);
      if (!validation.valid) return { success: false, error: validation.errors.join(', ') };

      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch {
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

      if (updateError) return { success: false, error: updateError.message };

      const { data: user } = await supabase
        .from('client_users')
        .select('email')
        .eq('id', userId)
        .maybeSingle();

      if (user) {
        try {
          await supabase.from('activity_logs').insert({
            admin_user_id: adminUserId,
            action_type: isActive ? 'client_user_activated' : 'client_user_deactivated',
            entity_type: 'client_user',
            entity_id: userId,
            description: `${isActive ? 'Activated' : 'Deactivated'} client user: ${user.email}`,
          });
        } catch {}
      }

      return { success: true };
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },
};
