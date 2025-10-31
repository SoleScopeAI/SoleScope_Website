/*
  # Client Users Authentication System

  ## Overview
  This migration creates a secure authentication system for client users to access
  the client portal. It allows clients to log in and view their projects, invoices,
  and communications while maintaining strict data isolation.

  ## New Tables

  ### 1. client_users
  - `id` (uuid, primary key) - Unique identifier for client user
  - `client_id` (uuid, foreign key) - Reference to clients table
  - `email` (text, unique) - Client login email
  - `password_hash` (text) - Bcrypt hashed password
  - `full_name` (text) - Client user's full name
  - `is_active` (boolean) - Account active status
  - `email_verified` (boolean) - Email verification status
  - `requires_password_change` (boolean) - Force password change on next login
  - `temporary_password_expires` (timestamptz) - Temporary password expiration
  - `verification_token` (text) - Token for email verification
  - `reset_token` (text) - Token for password reset
  - `reset_token_expires` (timestamptz) - Password reset token expiration
  - `last_login` (timestamptz) - Last successful login timestamp
  - `created_at` (timestamptz) - Account creation date
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on client_users table
  - All operations allowed via anon role (custom auth in app)
  - Application enforces authentication and authorization

  ## Indexes
  - Index on email for fast login lookups
  - Index on client_id for client data queries
  - Index on verification_token and reset_token for token validation
  - Index on requires_password_change for password change checks

  ## Important Notes
  - Password hashing is done client-side using bcryptjs
  - Session management handled via localStorage with validation
  - Temporary passwords force users to change on first login
*/

-- Create client_users table
CREATE TABLE IF NOT EXISTS client_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  requires_password_change boolean DEFAULT true,
  temporary_password_expires timestamptz,
  verification_token text,
  reset_token text,
  reset_token_expires timestamptz,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_client_users_email ON client_users(email);
CREATE INDEX IF NOT EXISTS idx_client_users_client_id ON client_users(client_id);
CREATE INDEX IF NOT EXISTS idx_client_users_verification_token ON client_users(verification_token);
CREATE INDEX IF NOT EXISTS idx_client_users_reset_token ON client_users(reset_token);
CREATE INDEX IF NOT EXISTS idx_client_users_is_active ON client_users(is_active);
CREATE INDEX IF NOT EXISTS idx_client_users_requires_password_change ON client_users(requires_password_change) WHERE requires_password_change = true;

-- Enable Row Level Security
ALTER TABLE client_users ENABLE ROW LEVEL SECURITY;

-- RLS Policy - Allow all operations via anon role (custom auth enforced in app)
CREATE POLICY "Allow all operations on client_users"
  ON client_users FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_client_users_updated_at
  BEFORE UPDATE ON client_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to log client user activity
CREATE OR REPLACE FUNCTION log_client_user_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO activity_logs (
      admin_user_id,
      action_type,
      entity_type,
      entity_id,
      description,
      metadata
    ) VALUES (
      NEW.id::uuid,
      'client_user_created',
      'client_user',
      NEW.id,
      'Client user account created: ' || NEW.email,
      jsonb_build_object('email', NEW.email, 'client_id', NEW.client_id)
    );
  ELSIF TG_OP = 'UPDATE' AND NEW.last_login IS DISTINCT FROM OLD.last_login THEN
    INSERT INTO activity_logs (
      admin_user_id,
      action_type,
      entity_type,
      entity_id,
      description,
      metadata
    ) VALUES (
      NEW.id::uuid,
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

-- Create trigger for client user activity logging
CREATE TRIGGER client_user_activity_log
  AFTER INSERT OR UPDATE ON client_users
  FOR EACH ROW
  EXECUTE FUNCTION log_client_user_activity();

-- Add comments
COMMENT ON TABLE client_users IS 'Client portal user accounts with bcrypt authentication';
COMMENT ON COLUMN client_users.requires_password_change IS 'Forces user to change password on next login. Set to true for temporary passwords.';
COMMENT ON COLUMN client_users.temporary_password_expires IS 'Expiration timestamp for temporary passwords. User cannot login after this time without password reset.';
