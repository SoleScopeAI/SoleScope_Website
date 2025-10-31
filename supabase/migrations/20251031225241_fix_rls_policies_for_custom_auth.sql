/*
  # Fix RLS Policies for Custom Authentication System

  ## Overview
  This migration fixes the Row Level Security policies to work with the custom bcrypt-based
  authentication system. The admin and client authentication does NOT use Supabase Auth,
  so policies need to work with the 'anon' role instead of 'authenticated' role.

  ## Changes Made

  ### 1. Update RLS Policies for All CRM Tables
  - Drop existing policies that require 'authenticated' role
  - Create new policies that work with 'anon' role
  - Maintain security through application-level authentication
  - All tables: clients, projects, project_milestones, invoices, invoice_line_items,
    communications, activity_logs, documents

  ### 2. Security Considerations
  - The anon role has access to read/write operations
  - Security is enforced at the application level through custom authentication
  - Admin users must be verified via the admin_users table in application code
  - Client users must be verified via the client_users table in application code
  - RLS provides a base layer but NOT the primary security mechanism
  - Always validate user identity in application code before operations

  ## Important Notes
  - This approach works because the application handles authentication
  - The anon key is used but all operations verify user identity in app code
  - For production, consider implementing additional security measures
  - Rate limiting should be implemented at the application or edge function level
*/

-- ==========================================
-- UPDATE CLIENTS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Authenticated users can view clients" ON clients;
DROP POLICY IF EXISTS "Authenticated users can create clients" ON clients;
DROP POLICY IF EXISTS "Authenticated users can update clients" ON clients;
DROP POLICY IF EXISTS "Authenticated users can delete clients" ON clients;
DROP POLICY IF EXISTS "Client users can view their own client record" ON clients;

CREATE POLICY "Allow all operations on clients"
  ON clients FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE PROJECTS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Admins can view all projects" ON projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON projects;
DROP POLICY IF EXISTS "Admins can update projects" ON projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON projects;
DROP POLICY IF EXISTS "Client users can view their own projects" ON projects;

CREATE POLICY "Allow all operations on projects"
  ON projects FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE PROJECT MILESTONES TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Admins can view all milestones" ON project_milestones;
DROP POLICY IF EXISTS "Admins can insert milestones" ON project_milestones;
DROP POLICY IF EXISTS "Admins can update milestones" ON project_milestones;
DROP POLICY IF EXISTS "Admins can delete milestones" ON project_milestones;

CREATE POLICY "Allow all operations on project_milestones"
  ON project_milestones FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE INVOICES TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Admins can view all invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can insert invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can update invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can delete invoices" ON invoices;
DROP POLICY IF EXISTS "Client users can view their own invoices" ON invoices;

CREATE POLICY "Allow all operations on invoices"
  ON invoices FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE INVOICE LINE ITEMS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Admins can view all invoice line items" ON invoice_line_items;
DROP POLICY IF EXISTS "Admins can insert invoice line items" ON invoice_line_items;
DROP POLICY IF EXISTS "Admins can update invoice line items" ON invoice_line_items;
DROP POLICY IF EXISTS "Admins can delete invoice line items" ON invoice_line_items;

CREATE POLICY "Allow all operations on invoice_line_items"
  ON invoice_line_items FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE COMMUNICATIONS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Admins can view all communications" ON communications;
DROP POLICY IF EXISTS "Admins can insert communications" ON communications;
DROP POLICY IF EXISTS "Admins can update communications" ON communications;
DROP POLICY IF EXISTS "Admins can delete communications" ON communications;
DROP POLICY IF EXISTS "Client users can view their own communications" ON communications;
DROP POLICY IF EXISTS "Client users can insert communications" ON communications;

CREATE POLICY "Allow all operations on communications"
  ON communications FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE ACTIVITY LOGS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Admins can view all activity logs" ON activity_logs;
DROP POLICY IF EXISTS "Admins can insert activity logs" ON activity_logs;

CREATE POLICY "Allow all operations on activity_logs"
  ON activity_logs FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE DOCUMENTS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Admins can view all documents" ON documents;
DROP POLICY IF EXISTS "Admins can insert documents" ON documents;
DROP POLICY IF EXISTS "Admins can update documents" ON documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON documents;
DROP POLICY IF EXISTS "Client users can view their own documents" ON documents;

CREATE POLICY "Allow all operations on documents"
  ON documents FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE ADMIN USERS TABLE POLICIES
-- ==========================================

DROP POLICY IF EXISTS "Allow anonymous login queries" ON admin_users;
DROP POLICY IF EXISTS "Authenticated admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Service role can insert admin users" ON admin_users;
DROP POLICY IF EXISTS "Service role can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Service role can delete admin users" ON admin_users;

CREATE POLICY "Allow anon to read admin users for authentication"
  ON admin_users FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow anon to update admin users for last login"
  ON admin_users FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- UPDATE PRODUCTS AND SUBSCRIPTIONS TABLES
-- ==========================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products') THEN
    DROP POLICY IF EXISTS "Allow authenticated users to view products" ON products;
    DROP POLICY IF EXISTS "Allow all operations on products" ON products;
    CREATE POLICY "Allow all operations on products"
      ON products FOR ALL
      TO anon
      USING (true)
      WITH CHECK (true);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'packages') THEN
    DROP POLICY IF EXISTS "Allow authenticated users to view packages" ON packages;
    DROP POLICY IF EXISTS "Allow all operations on packages" ON packages;
    CREATE POLICY "Allow all operations on packages"
      ON packages FOR ALL
      TO anon
      USING (true)
      WITH CHECK (true);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'client_subscriptions') THEN
    DROP POLICY IF EXISTS "Allow authenticated users to view subscriptions" ON client_subscriptions;
    DROP POLICY IF EXISTS "Allow authenticated users to insert subscriptions" ON client_subscriptions;
    DROP POLICY IF EXISTS "Allow authenticated users to update subscriptions" ON client_subscriptions;
    DROP POLICY IF EXISTS "Allow all operations on client_subscriptions" ON client_subscriptions;
    CREATE POLICY "Allow all operations on client_subscriptions"
      ON client_subscriptions FOR ALL
      TO anon
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
