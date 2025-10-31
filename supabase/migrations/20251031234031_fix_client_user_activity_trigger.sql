/*
  # Fix Client User Activity Logging Trigger

  ## Overview
  This migration fixes the foreign key constraint violation that occurs when creating
  client portal users. The issue is caused by the log_client_user_activity() trigger
  function attempting to insert client user IDs into the admin_user_id foreign key field
  of the activity_logs table.

  ## Problem
  - The trigger function tries to use NEW.id (client user ID) as admin_user_id
  - Client user IDs are not valid admin user IDs, causing FK constraint violation
  - This prevents successful creation of client portal users

  ## Solution
  1. Drop the existing problematic trigger and function
  2. Create a new simplified function that uses NULL for admin_user_id
  3. This allows client user activity to be logged without FK violations

  ## Changes
  - Drop trigger: client_user_activity_log
  - Drop function: log_client_user_activity()
  - Create new function: log_client_user_activity() with NULL admin_user_id
  - Recreate trigger with fixed function

  ## Security
  - No RLS policy changes required
  - Activity logs will still be created but with NULL admin_user_id for client user operations
  - Admin-initiated client user operations will still log the correct admin_user_id via application code
*/

-- Drop the existing trigger
DROP TRIGGER IF EXISTS client_user_activity_log ON client_users;

-- Drop the existing function
DROP FUNCTION IF EXISTS log_client_user_activity();

-- Create a new fixed function that uses NULL for admin_user_id
CREATE OR REPLACE FUNCTION log_client_user_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Log client user creation (admin_user_id will be NULL since this is system-generated)
  IF TG_OP = 'INSERT' THEN
    INSERT INTO activity_logs (
      admin_user_id,
      action_type,
      entity_type,
      entity_id,
      description,
      metadata
    ) VALUES (
      NULL,  -- Use NULL instead of client user ID
      'client_user_created',
      'client_user',
      NEW.id,
      'Client user account created: ' || NEW.email,
      jsonb_build_object('email', NEW.email, 'client_id', NEW.client_id)
    );
  -- Log client user login
  ELSIF TG_OP = 'UPDATE' AND NEW.last_login IS DISTINCT FROM OLD.last_login THEN
    INSERT INTO activity_logs (
      admin_user_id,
      action_type,
      entity_type,
      entity_id,
      description,
      metadata
    ) VALUES (
      NULL,  -- Use NULL for client user logins
      'client_user_login',
      'client_user',
      NEW.id,
      'Client user logged in: ' || NEW.email,
      jsonb_build_object('email', NEW.email, 'client_id', NEW.client_id, 'login_time', NEW.last_login)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger with the fixed function
CREATE TRIGGER client_user_activity_log
  AFTER INSERT OR UPDATE ON client_users
  FOR EACH ROW
  EXECUTE FUNCTION log_client_user_activity();