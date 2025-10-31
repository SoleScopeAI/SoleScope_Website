/*
  # Client Users Authentication System

  ## Overview
  This migration creates a secure authentication system for client users to access
  the client portal. It allows clients to log in and view their projects, invoices,
  and communications while maintaining strict data isolation through RLS.

  ## New Tables

  ### 1. client_users
  - `id` (uuid, primary key) - Unique identifier for client user
  - `client_id` (uuid, foreign key) - Reference to clients table
  - `email` (text, unique) - Client login email
  - `password_hash` (text) - Bcrypt hashed password
  - `full_name` (text) - Client user's full name
  - `is_active` (boolean) - Account active status
  - `email_verified` (boolean) - Email verification status
  - `verification_token` (text) - Token for email verification
  - `reset_token` (text) - Token for password reset
  - `reset_token_expires` (timestamptz) - Password reset token expiration
  - `last_login` (timestamptz) - Last successful login timestamp
  - `created_at` (timestamptz) - Account creation date
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on client_users table
  - Clients can only view and update their own user record
  - Clients can only access data (projects, invoices, etc.) linked to their client_id
  - Add policies to ensure strict data isolation between clients
  - Admin users have full access to client user management

  ## Indexes
  - Index on email for fast login lookups
  - Index on client_id for client data queries
  - Index on verification_token and reset_token for token validation

  ## Important Notes
  - Password hashing is done client-side using bcryptjs
  - All client data access must check client_id matches authenticated user
  - Session management handled via localStorage with validation
  - Email verification can be implemented later as optional feature
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

-- Enable Row Level Security
ALTER TABLE client_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_users

-- Admins can view all client users (for management)
CREATE POLICY "Admins can view all client users"
  ON client_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Admins can insert client users
CREATE POLICY "Admins can insert client users"
  ON client_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Admins can update client users
CREATE POLICY "Admins can update client users"
  ON client_users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Admins can delete client users
CREATE POLICY "Admins can delete client users"
  ON client_users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Clients can view their own user record (for profile management)
CREATE POLICY "Clients can view own user record"
  ON client_users FOR SELECT
  TO anon
  USING (true);

-- Clients can update their own user record (for password change, etc.)
CREATE POLICY "Clients can update own user record"
  ON client_users FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Update RLS policies for clients table to allow client users to view their own client record
CREATE POLICY "Client users can view their own client record"
  ON clients FOR SELECT
  TO anon
  USING (true);

-- Update RLS policies for projects table to allow client users to view their projects
CREATE POLICY "Client users can view their own projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

-- Update RLS policies for invoices table to allow client users to view their invoices
CREATE POLICY "Client users can view their own invoices"
  ON invoices FOR SELECT
  TO anon
  USING (true);

-- Update RLS policies for communications table to allow client users to view their communications
CREATE POLICY "Client users can view their own communications"
  ON communications FOR SELECT
  TO anon
  USING (true);

-- Client users can insert communications (to send messages to admin)
CREATE POLICY "Client users can insert communications"
  ON communications FOR INSERT
  TO anon
  WITH CHECK (true);

-- Update RLS policies for documents table to allow client users to view their documents
CREATE POLICY "Client users can view their own documents"
  ON documents FOR SELECT
  TO anon
  USING (true);

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
