/*
  # AI Voice Agent Platform - Demo Request & Lead Management System

  ## Overview
  This migration creates the database infrastructure for the flagship AI Voice Agent Platform product page,
  enabling demo request tracking, lead capture, and customer inquiry management.

  ## New Tables

  ### `voice_agent_demo_requests`
  Stores demo booking requests from potential clients on the flagship product page.
  - `id` (uuid, primary key) - Unique identifier
  - `created_at` (timestamptz) - Request timestamp
  - `name` (text) - Contact name
  - `business_name` (text) - Business/company name
  - `email` (text) - Contact email address
  - `phone` (text) - Contact phone number
  - `industry` (text) - Business industry/sector
  - `best_time` (text) - Preferred contact time
  - `message` (text, optional) - Additional notes/requirements
  - `status` (text) - Request status (new, contacted, scheduled, completed, cancelled)
  - `source_page` (text) - Which page the request came from
  - `updated_at` (timestamptz) - Last update timestamp

  ### `voice_agent_leads`
  Stores general leads and inquiries related to the AI Voice Agent product.
  - `id` (uuid, primary key) - Unique identifier
  - `created_at` (timestamptz) - Lead creation timestamp
  - `source` (text) - Lead source (form, email, phone, etc.)
  - `contact_data` (jsonb) - Flexible storage for contact information
  - `status` (text) - Lead status (new, qualified, converted, lost)
  - `notes` (text, optional) - Internal notes
  - `assigned_to` (uuid, optional) - Admin user assigned to this lead
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Admin users can read all demo requests and leads
  - Public can insert demo requests (form submission)
  - Only authenticated admin users can update/delete

  ## Indexes
  - Index on email for quick lookup
  - Index on status for filtering
  - Index on created_at for sorting
*/

-- Create voice_agent_demo_requests table
CREATE TABLE IF NOT EXISTS voice_agent_demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL,
  business_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  industry text NOT NULL,
  best_time text DEFAULT '' NOT NULL,
  message text DEFAULT '' NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  source_page text DEFAULT 'ai-voice-agent' NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create voice_agent_leads table
CREATE TABLE IF NOT EXISTS voice_agent_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  source text DEFAULT 'website' NOT NULL,
  contact_data jsonb DEFAULT '{}'::jsonb NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  notes text DEFAULT '' NOT NULL,
  assigned_to uuid,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON voice_agent_demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON voice_agent_demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created ON voice_agent_demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_voice_leads_status ON voice_agent_leads(status);
CREATE INDEX IF NOT EXISTS idx_voice_leads_created ON voice_agent_leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE voice_agent_demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_agent_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for voice_agent_demo_requests

-- Allow public to insert demo requests (form submissions)
CREATE POLICY "Anyone can submit demo requests"
  ON voice_agent_demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to insert demo requests
CREATE POLICY "Authenticated users can submit demo requests"
  ON voice_agent_demo_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin users can view all demo requests
CREATE POLICY "Admin users can view all demo requests"
  ON voice_agent_demo_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Admin users can update demo requests
CREATE POLICY "Admin users can update demo requests"
  ON voice_agent_demo_requests
  FOR UPDATE
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

-- Admin users can delete demo requests
CREATE POLICY "Admin users can delete demo requests"
  ON voice_agent_demo_requests
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- RLS Policies for voice_agent_leads

-- Admin users can view all leads
CREATE POLICY "Admin users can view all leads"
  ON voice_agent_leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Admin users can insert leads
CREATE POLICY "Admin users can insert leads"
  ON voice_agent_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Admin users can update leads
CREATE POLICY "Admin users can update leads"
  ON voice_agent_leads
  FOR UPDATE
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

-- Admin users can delete leads
CREATE POLICY "Admin users can delete leads"
  ON voice_agent_leads
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS update_demo_requests_updated_at ON voice_agent_demo_requests;
CREATE TRIGGER update_demo_requests_updated_at
  BEFORE UPDATE ON voice_agent_demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_voice_leads_updated_at ON voice_agent_leads;
CREATE TRIGGER update_voice_leads_updated_at
  BEFORE UPDATE ON voice_agent_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();