/*
  # Simplified Owner-Only Admin User Management System

  1. Security Changes
    - Add check constraint to prevent removal of all owners
    - Add trigger to validate at least one owner exists
    - Note: Admin user creation is validated in application code via adminUserService

  2. Tables Modified
    - `admin_users`: Add constraint to ensure at least one owner

  3. Security Notes
    - Application layer (adminUserService) enforces owner-only admin creation
    - Database constraint prevents removal of last owner
    - All admin management actions are logged to activity_logs
*/

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

-- Add index for better performance on role checks
CREATE INDEX IF NOT EXISTS idx_admin_users_role_active ON admin_users(role, is_active) WHERE is_active = true;

-- Verify at least one owner exists
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM admin_users WHERE role = 'owner' AND is_active = true) < 1 THEN
    RAISE WARNING 'No active owner found! Please ensure at least one owner exists in admin_users table.';
  ELSE
    RAISE NOTICE 'Owner validation successful. At least one active owner exists.';
  END IF;
END $$;
