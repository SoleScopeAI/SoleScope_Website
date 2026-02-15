import { supabase } from '../lib/supabase';

export async function createOwnerAdmin() {
  const email = 'Kevin@solescope.co.uk';
  const password = 'RoxyRufus3586!';

  const MANAGE_USERS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

  try {
    const response = await fetch(MANAGE_USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        action: 'migrate_user',
        email: email.toLowerCase(),
        password,
        user_type: 'admin',
        profile_id: 'f66b8946-5cce-4909-9495-ca115d1c6259',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create admin user');
    }

    const data = await response.json();
    console.log('✅ Owner admin created successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error creating owner admin:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
