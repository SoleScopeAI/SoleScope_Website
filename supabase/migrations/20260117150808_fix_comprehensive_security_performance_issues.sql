/*
  # Fix Comprehensive Security and Performance Issues

  ## Overview
  This migration addresses critical security vulnerabilities and performance issues identified in the database audit.

  ## 1. Performance Improvements - Add Missing Indexes on Foreign Keys
    - `client_product_metrics`: Add indexes on `client_id` and `subscription_id`
    - `client_subscriptions`: Add indexes on `client_id`, `package_id`, and `product_id`
    - `client_users`: Add index on `client_id`
    - `communications`: Add index on `client_id`
    - `invoices`: Add index on `client_id`
    - `projects`: Add index on `client_id`

  ## 2. Performance Improvements - Remove Unused Indexes
    - Drop all unused indexes that are not providing value and slowing down writes

  ## 3. Critical Security Fixes - RLS Policies Always True
    Replace overly permissive policies with proper security checks:
    - Remove anon access from internal tables
    - Add proper admin checks for management operations
    - Keep public read access where appropriate
    - Add validation for public submission endpoints

  ## 4. Consolidate Multiple Permissive Policies
    - Merge duplicate policies into single, well-defined policies
*/

-- ============================================================================
-- SECTION 1: ADD MISSING INDEXES ON FOREIGN KEYS
-- ============================================================================

DO $$
BEGIN
  -- client_product_metrics indexes
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_product_metrics_client_id') THEN
    CREATE INDEX idx_client_product_metrics_client_id ON client_product_metrics(client_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_product_metrics_subscription_id') THEN
    CREATE INDEX idx_client_product_metrics_subscription_id ON client_product_metrics(subscription_id);
  END IF;

  -- client_subscriptions indexes
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_subscriptions_client_id') THEN
    CREATE INDEX idx_client_subscriptions_client_id ON client_subscriptions(client_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_subscriptions_package_id') THEN
    CREATE INDEX idx_client_subscriptions_package_id ON client_subscriptions(package_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_subscriptions_product_id') THEN
    CREATE INDEX idx_client_subscriptions_product_id ON client_subscriptions(product_id);
  END IF;

  -- client_users index
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_client_users_client_id') THEN
    CREATE INDEX idx_client_users_client_id ON client_users(client_id);
  END IF;

  -- communications index
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_communications_client_id') THEN
    CREATE INDEX idx_communications_client_id ON communications(client_id);
  END IF;

  -- invoices index
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_invoices_client_id') THEN
    CREATE INDEX idx_invoices_client_id ON invoices(client_id);
  END IF;

  -- projects index
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_projects_client_id') THEN
    CREATE INDEX idx_projects_client_id ON projects(client_id);
  END IF;
END $$;

-- ============================================================================
-- SECTION 2: DROP UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_activity_logs_admin_user_id;
DROP INDEX IF EXISTS idx_client_subscriptions_created_by;
DROP INDEX IF EXISTS idx_clients_created_by;
DROP INDEX IF EXISTS idx_communications_admin_user_id;
DROP INDEX IF EXISTS idx_communications_project_id;
DROP INDEX IF EXISTS idx_documents_client_id;
DROP INDEX IF EXISTS idx_documents_project_id;
DROP INDEX IF EXISTS idx_documents_uploaded_by;
DROP INDEX IF EXISTS idx_invoice_line_items_invoice_id;
DROP INDEX IF EXISTS idx_invoices_created_by;
DROP INDEX IF EXISTS idx_invoices_project_id;
DROP INDEX IF EXISTS idx_project_media_project_id;
DROP INDEX IF EXISTS idx_project_metrics_project_id;
DROP INDEX IF EXISTS idx_project_milestones_project_id;
DROP INDEX IF EXISTS idx_projects_assigned_to;
DROP INDEX IF EXISTS idx_projects_created_by;

-- ============================================================================
-- SECTION 3: FIX RLS POLICIES THAT ARE ALWAYS TRUE
-- ============================================================================

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = current_setting('app.current_admin_id', true)::uuid
    AND is_active = true
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- activity_logs: Remove unrestricted anon insert
DROP POLICY IF EXISTS "Anon can insert activity logs" ON activity_logs;

-- client_product_metrics: Add proper admin checks
DROP POLICY IF EXISTS "Admins can delete metrics" ON client_product_metrics;
DROP POLICY IF EXISTS "Admins can insert metrics" ON client_product_metrics;
DROP POLICY IF EXISTS "Admins can update metrics" ON client_product_metrics;

CREATE POLICY "Admins can manage metrics"
  ON client_product_metrics
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- client_projects: Remove always true policy and add proper checks
DROP POLICY IF EXISTS "Authenticated users can manage client projects" ON client_projects;

CREATE POLICY "Admins can manage client projects"
  ON client_projects
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- client_results: Add proper admin checks
DROP POLICY IF EXISTS "Authenticated users can insert client results" ON client_results;
DROP POLICY IF EXISTS "Authenticated users can update client results" ON client_results;

CREATE POLICY "Admins can manage client results"
  ON client_results
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- client_subscriptions: Remove anon and always true policies
DROP POLICY IF EXISTS "Allow all operations on client_subscriptions" ON client_subscriptions;
DROP POLICY IF EXISTS "Admins can delete subscriptions" ON client_subscriptions;
DROP POLICY IF EXISTS "Admins can insert subscriptions" ON client_subscriptions;
DROP POLICY IF EXISTS "Admins can update subscriptions" ON client_subscriptions;

CREATE POLICY "Admins can manage subscriptions"
  ON client_subscriptions
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- client_users: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on client_users" ON client_users;

CREATE POLICY "Admins can manage client users"
  ON client_users
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- clients: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on clients" ON clients;

CREATE POLICY "Admins can manage clients"
  ON clients
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- communications: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on communications" ON communications;

CREATE POLICY "Admins can manage communications"
  ON communications
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- documents: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on documents" ON documents;

CREATE POLICY "Admins can manage documents"
  ON documents
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- homepage_metrics: Add proper admin checks
DROP POLICY IF EXISTS "Authenticated users can insert metrics" ON homepage_metrics;
DROP POLICY IF EXISTS "Authenticated users can update metrics" ON homepage_metrics;

CREATE POLICY "Admins can manage homepage metrics"
  ON homepage_metrics
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- invoice_line_items: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on invoice_line_items" ON invoice_line_items;

CREATE POLICY "Admins can manage invoice line items"
  ON invoice_line_items
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- invoices: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on invoices" ON invoices;

CREATE POLICY "Admins can manage invoices"
  ON invoices
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- packages: Remove always true policy, keep public read
DROP POLICY IF EXISTS "Authenticated users can manage packages" ON packages;

CREATE POLICY "Admins can write packages"
  ON packages
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- products: Remove always true policy, keep public read
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;

CREATE POLICY "Admins can write products"
  ON products
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- project_media: Remove always true policy, keep public read
DROP POLICY IF EXISTS "Authenticated users can manage project media" ON project_media;

CREATE POLICY "Admins can write project media"
  ON project_media
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- project_metrics: Remove always true policy, keep public read
DROP POLICY IF EXISTS "Authenticated users can manage project metrics" ON project_metrics;

CREATE POLICY "Admins can write project metrics"
  ON project_metrics
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- project_milestones: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on project_milestones" ON project_milestones;

CREATE POLICY "Admins can manage project milestones"
  ON project_milestones
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- projects: Remove anon access
DROP POLICY IF EXISTS "Allow all operations on projects" ON projects;

CREATE POLICY "Admins can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- testimonials: Add proper admin checks
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;

CREATE POLICY "Admins can write testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- voice_agent_demo_requests: Keep anon access but with basic validation, remove duplicate
DROP POLICY IF EXISTS "Authenticated users can submit demo requests" ON voice_agent_demo_requests;
DROP POLICY IF EXISTS "Anyone can submit demo requests" ON voice_agent_demo_requests;

CREATE POLICY "Public can submit demo requests"
  ON voice_agent_demo_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND 
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
  );
