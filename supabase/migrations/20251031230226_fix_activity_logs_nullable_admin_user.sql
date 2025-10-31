/*
  # Fix Activity Logs Foreign Key Constraint

  ## Overview
  This migration makes the admin_user_id field nullable in the activity_logs table
  to prevent foreign key constraint violations when creating portal users for clients.

  ## Changes
  1. Make activity_logs.admin_user_id nullable to allow logging without requiring an admin user
  2. Drop and recreate the foreign key constraint to allow NULL values
  3. This allows operations to complete successfully even if activity logging encounters issues

  ## Affected Tables
  - `activity_logs`
    - Modified `admin_user_id` to allow NULL values
    - Updated foreign key constraint to support NULL values

  ## Security
  - No RLS policy changes required
  - Existing policies remain intact
*/

-- Drop the existing foreign key constraint if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'activity_logs_admin_user_id_fkey' 
    AND table_name = 'activity_logs'
  ) THEN
    ALTER TABLE activity_logs DROP CONSTRAINT activity_logs_admin_user_id_fkey;
  END IF;
END $$;

-- Make admin_user_id nullable
ALTER TABLE activity_logs 
  ALTER COLUMN admin_user_id DROP NOT NULL;

-- Re-add the foreign key constraint with NULL support
ALTER TABLE activity_logs
  ADD CONSTRAINT activity_logs_admin_user_id_fkey 
  FOREIGN KEY (admin_user_id) 
  REFERENCES admin_users(id) 
  ON DELETE SET NULL;