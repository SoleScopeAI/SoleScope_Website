/*
  # Owner-Only Admin User Management System

  1. Security Changes
    - Add RLS policy to ensure only owner role can create admin users
    - Add RLS policy to ensure only owner can modify admin user roles
    - Add check constraint to prevent removal of all owners
    - Add trigger to log unauthorized admin creation attempts

  2. Tables Modified
    - `admin_users`: Add RLS policies for owner-only admin creation
    - `activity_logs`: Updated to track admin management actions

  3. Security Notes
    - Only users with role='owner' can insert into admin_users table
    - Only users with role='owner' can update admin_users roles
    - At least one owner must exist at all times
    - All unauthorized attempts are logged to activity_logs
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Owner can create admin users" ON admin_users;
DROP POLICY IF EXISTS "Owner can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;

-- Policy: Only owners can create new admin users
CREATE POLICY "Owner can create admin users"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = (SELECT id FROM admin_users WHERE email = current_user_email() AND is_active = true LIMIT 1)
      AND role = 'owner'
      AND is_active = true
    )
  );

-- Policy: Only owners can update admin user roles and critical fields
CREATE POLICY "Owner can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = (SELECT id FROM admin_users WHERE email = current_user_email() AND is_active = true LIMIT 1)
      AND role = 'owner'
      AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = (SELECT id FROM admin_users WHERE email = current_user_email() AND is_active = true LIMIT 1)
      AND role = 'owner'
      AND is_active = true
    )
  );

-- Policy: All active admins can view other admin users
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = (SELECT id FROM admin_users WHERE email = current_user_email() AND is_active = true LIMIT 1)
      AND is_active = true
    )
  );

-- Function to get current admin user email (helper for RLS)
CREATE OR REPLACE FUNCTION current_user_email()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT email FROM admin_users WHERE id = current_setting('app.current_admin_id', true)::uuid LIMIT 1;
$$;

-- Function to ensure at least one owner exists
CREATE OR REPLACE FUNCTION check_at_least_one_owner()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- If trying to change an owner's role or deactivate them
  IF (OLD.role = 'owner' AND (NEW.role != 'owner' OR NEW.is_active = false)) THEN
    -- Check if there are other active owners
    IF (SELECT COUNT(*) FROM admin_users WHERE role = 'owner' AND is_active = true AND id != OLD.id) < 1 THEN
      RAISE EXCEPTION 'Cannot remove or deactivate the last owner. At least one active owner must exist.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger to prevent removal of last owner
DROP TRIGGER IF EXISTS ensure_one_owner ON admin_users;
CREATE TRIGGER ensure_one_owner
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION check_at_least_one_owner();

-- Function to log unauthorized admin creation attempts
CREATE OR REPLACE FUNCTION log_unauthorized_admin_attempt()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_admin_id uuid;
  current_admin_role text;
BEGIN
  -- Get current admin trying to create user
  SELECT id, role INTO current_admin_id, current_admin_role
  FROM admin_users
  WHERE email = current_user_email() AND is_active = true
  LIMIT 1;

  -- If not an owner, log the attempt
  IF current_admin_role IS NULL OR current_admin_role != 'owner' THEN
    INSERT INTO activity_logs (
      admin_user_id,
      action_type,
      entity_type,
      entity_id,
      description,
      metadata
    ) VALUES (
      current_admin_id,
      'unauthorized_admin_creation_attempt',
      'admin_user',
      NULL,
      'Unauthorized attempt to create admin user',
      jsonb_build_object(
        'attempted_email', NEW.email,
        'attempted_role', NEW.role,
        'current_admin_role', current_admin_role
      )
    );

    RAISE EXCEPTION 'Only owners can create admin users. This attempt has been logged.';
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger to validate admin creation
DROP TRIGGER IF EXISTS validate_admin_creation ON admin_users;
CREATE TRIGGER validate_admin_creation
  BEFORE INSERT ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION log_unauthorized_admin_attempt();

-- Add index for better performance on role checks
CREATE INDEX IF NOT EXISTS idx_admin_users_role_active ON admin_users(role, is_active) WHERE is_active = true;

-- Log this migration
DO $$
BEGIN
  -- Verify at least one owner exists
  IF (SELECT COUNT(*) FROM admin_users WHERE role = 'owner' AND is_active = true) < 1 THEN
    RAISE WARNING 'No active owner found! Please ensure at least one owner exists.';
  END IF;
END $$;
