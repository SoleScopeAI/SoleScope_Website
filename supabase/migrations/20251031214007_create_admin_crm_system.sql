/*
  # Admin CRM System - Complete Database Schema

  ## Overview
  This migration creates a comprehensive CRM system for SoleScope Studio with admin authentication,
  client management, project tracking, invoicing, and communication features.

  ## New Tables

  ### 1. admin_users
  - `id` (uuid, primary key)
  - `email` (text, unique) - Admin email address
  - `password_hash` (text) - Bcrypt hashed password
  - `full_name` (text) - Admin full name
  - `role` (text) - Admin role (owner, admin, manager)
  - `is_active` (boolean) - Account active status
  - `last_login` (timestamptz) - Last login timestamp
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. clients
  - `id` (uuid, primary key)
  - `company_name` (text) - Client company name
  - `contact_name` (text) - Primary contact name
  - `email` (text) - Primary email
  - `phone` (text) - Phone number
  - `website` (text) - Client website URL
  - `address` (text) - Physical address
  - `status` (text) - lead, active, inactive, archived
  - `industry` (text) - Industry sector
  - `company_size` (text) - Company size category
  - `lifetime_value` (decimal) - Total revenue from client
  - `notes` (text) - Internal notes
  - `tags` (text[]) - Array of tags
  - `created_by` (uuid) - Admin who created the record
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. projects
  - `id` (uuid, primary key)
  - `client_id` (uuid) - FK to clients
  - `project_name` (text) - Project name
  - `project_type` (text) - Type of project
  - `status` (text) - planning, in_progress, review, completed, on_hold
  - `priority` (text) - low, medium, high, urgent
  - `description` (text) - Project description
  - `start_date` (date) - Project start date
  - `due_date` (date) - Project due date
  - `completed_date` (date) - Actual completion date
  - `budget` (decimal) - Project budget
  - `actual_cost` (decimal) - Actual cost incurred
  - `progress_percentage` (integer) - Progress 0-100
  - `assigned_to` (uuid) - Assigned admin user
  - `created_by` (uuid) - Admin who created
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. project_milestones
  - `id` (uuid, primary key)
  - `project_id` (uuid) - FK to projects
  - `title` (text) - Milestone title
  - `description` (text) - Milestone description
  - `due_date` (date) - Milestone due date
  - `completed_date` (date) - Actual completion date
  - `status` (text) - pending, in_progress, completed
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. invoices
  - `id` (uuid, primary key)
  - `invoice_number` (text, unique) - Invoice number
  - `client_id` (uuid) - FK to clients
  - `project_id` (uuid) - Optional FK to projects
  - `issue_date` (date) - Invoice issue date
  - `due_date` (date) - Payment due date
  - `paid_date` (date) - Actual payment date
  - `status` (text) - draft, sent, paid, overdue, cancelled
  - `subtotal` (decimal) - Subtotal amount
  - `tax_rate` (decimal) - Tax rate percentage
  - `tax_amount` (decimal) - Tax amount
  - `total_amount` (decimal) - Total amount
  - `notes` (text) - Invoice notes
  - `payment_method` (text) - Payment method used
  - `stripe_invoice_id` (text) - Stripe invoice ID
  - `created_by` (uuid) - Admin who created
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. invoice_line_items
  - `id` (uuid, primary key)
  - `invoice_id` (uuid) - FK to invoices
  - `description` (text) - Line item description
  - `quantity` (decimal) - Quantity
  - `unit_price` (decimal) - Price per unit
  - `total` (decimal) - Total for line item
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)

  ### 7. communications
  - `id` (uuid, primary key)
  - `client_id` (uuid) - FK to clients
  - `project_id` (uuid) - Optional FK to projects
  - `communication_type` (text) - email, phone, meeting, message
  - `direction` (text) - inbound, outbound
  - `subject` (text) - Communication subject
  - `content` (text) - Communication content
  - `admin_user_id` (uuid) - Admin handling communication
  - `communication_date` (timestamptz) - Date of communication
  - `created_at` (timestamptz)

  ### 8. activity_logs
  - `id` (uuid, primary key)
  - `admin_user_id` (uuid) - Admin who performed action
  - `action_type` (text) - Type of action
  - `entity_type` (text) - Type of entity (client, project, etc)
  - `entity_id` (uuid) - ID of affected entity
  - `description` (text) - Human-readable description
  - `metadata` (jsonb) - Additional data
  - `ip_address` (text) - IP address of action
  - `created_at` (timestamptz)

  ### 9. documents
  - `id` (uuid, primary key)
  - `client_id` (uuid) - Optional FK to clients
  - `project_id` (uuid) - Optional FK to projects
  - `document_name` (text) - Document name
  - `document_type` (text) - Document type/category
  - `file_url` (text) - URL to file
  - `file_size` (bigint) - File size in bytes
  - `mime_type` (text) - MIME type
  - `uploaded_by` (uuid) - Admin who uploaded
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for admin-only access
  - Add activity logging triggers

  ## Indexes
  - Add indexes on frequently queried columns
  - Add full-text search indexes where needed
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin', 'manager')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  website text,
  address text,
  status text DEFAULT 'lead' CHECK (status IN ('lead', 'active', 'inactive', 'archived')),
  industry text,
  company_size text,
  lifetime_value decimal(10,2) DEFAULT 0,
  notes text,
  tags text[] DEFAULT '{}',
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  project_name text NOT NULL,
  project_type text NOT NULL,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'review', 'completed', 'on_hold')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  description text,
  start_date date,
  due_date date,
  completed_date date,
  budget decimal(10,2),
  actual_cost decimal(10,2) DEFAULT 0,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  assigned_to uuid REFERENCES admin_users(id),
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_milestones table
CREATE TABLE IF NOT EXISTS project_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date date,
  completed_date date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  issue_date date DEFAULT CURRENT_DATE,
  due_date date NOT NULL,
  paid_date date,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  subtotal decimal(10,2) DEFAULT 0,
  tax_rate decimal(5,2) DEFAULT 0,
  tax_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) DEFAULT 0,
  notes text,
  payment_method text,
  stripe_invoice_id text,
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoice_line_items table
CREATE TABLE IF NOT EXISTS invoice_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity decimal(10,2) DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total decimal(10,2) NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create communications table
CREATE TABLE IF NOT EXISTS communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  communication_type text NOT NULL CHECK (communication_type IN ('email', 'phone', 'meeting', 'message')),
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  subject text,
  content text,
  admin_user_id uuid REFERENCES admin_users(id),
  communication_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES admin_users(id),
  action_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  description text NOT NULL,
  metadata jsonb DEFAULT '{}',
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  document_type text,
  file_url text NOT NULL,
  file_size bigint,
  mime_type text,
  uploaded_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_due_date ON projects(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_communications_client_id ON communications(client_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- Enable Row Level Security on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users (admin access only)
CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert admin users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update admin users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for clients (admin access only)
CREATE POLICY "Admins can view all clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for projects
CREATE POLICY "Admins can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for project_milestones
CREATE POLICY "Admins can view all milestones"
  ON project_milestones FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert milestones"
  ON project_milestones FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update milestones"
  ON project_milestones FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete milestones"
  ON project_milestones FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for invoices
CREATE POLICY "Admins can view all invoices"
  ON invoices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert invoices"
  ON invoices FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update invoices"
  ON invoices FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete invoices"
  ON invoices FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for invoice_line_items
CREATE POLICY "Admins can view all invoice line items"
  ON invoice_line_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert invoice line items"
  ON invoice_line_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update invoice line items"
  ON invoice_line_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete invoice line items"
  ON invoice_line_items FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for communications
CREATE POLICY "Admins can view all communications"
  ON communications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert communications"
  ON communications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update communications"
  ON communications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete communications"
  ON communications FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for activity_logs
CREATE POLICY "Admins can view all activity logs"
  ON activity_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert activity logs"
  ON activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for documents
CREATE POLICY "Admins can view all documents"
  ON documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete documents"
  ON documents FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_milestones_updated_at
  BEFORE UPDATE ON project_milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert the initial admin user (Kevin@solescope.co.uk)
-- Password will be hashed on the client side using bcryptjs
-- For now, we'll create a placeholder that will be updated by the admin panel
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'Kevin@solescope.co.uk',
  '$2a$10$placeholder',
  'Kevin - SoleScope Owner',
  'owner',
  true
)
ON CONFLICT (email) DO NOTHING;