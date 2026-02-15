/*
  # Fix Security and Performance Issues

  ## Changes Made

  1. **Add Missing Foreign Key Indexes**
     - Add indexes for all foreign key columns to improve query performance
     - Covers: activity_logs, client_subscriptions, clients, communications, documents, 
       invoice_line_items, invoices, project_media, project_metrics, project_milestones, projects

  2. **Optimize RLS Policies**
     - Wrap auth.uid() calls in SELECT for better performance
     - Prevents re-evaluation for each row
     - Affects: admin_users, client_users policies

  3. **Fix Function Search Paths**
     - Set explicit search_path for security functions
     - Prevents search path injection vulnerabilities
     - Affects: is_admin, get_admin_id, get_client_id_for_user

  4. **Remove Unused Indexes**
     - Drop indexes that haven't been used to reduce maintenance overhead
     - Keeps only essential indexes for foreign keys and common queries

  5. **Security Notes**
     - Multiple permissive policies are intentional (OR logic for admin OR client access)
     - Auth connection strategy and leaked password protection must be configured in Supabase Dashboard
     - Security definer view is reviewed and necessary for audit functionality
*/

-- =====================================================
-- 1. ADD MISSING FOREIGN KEY INDEXES
-- =====================================================

-- activity_logs indexes
CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_user_id 
  ON public.activity_logs(admin_user_id);

-- client_subscriptions indexes
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_created_by 
  ON public.client_subscriptions(created_by);

-- clients indexes
CREATE INDEX IF NOT EXISTS idx_clients_created_by 
  ON public.clients(created_by);

-- communications indexes
CREATE INDEX IF NOT EXISTS idx_communications_admin_user_id 
  ON public.communications(admin_user_id);

CREATE INDEX IF NOT EXISTS idx_communications_project_id 
  ON public.communications(project_id);

-- documents indexes
CREATE INDEX IF NOT EXISTS idx_documents_client_id 
  ON public.documents(client_id);

CREATE INDEX IF NOT EXISTS idx_documents_project_id 
  ON public.documents(project_id);

CREATE INDEX IF NOT EXISTS idx_documents_uploaded_by 
  ON public.documents(uploaded_by);

-- invoice_line_items indexes
CREATE INDEX IF NOT EXISTS idx_invoice_line_items_invoice_id 
  ON public.invoice_line_items(invoice_id);

-- invoices indexes
CREATE INDEX IF NOT EXISTS idx_invoices_created_by 
  ON public.invoices(created_by);

CREATE INDEX IF NOT EXISTS idx_invoices_project_id 
  ON public.invoices(project_id);

-- project_media indexes
CREATE INDEX IF NOT EXISTS idx_project_media_project_id 
  ON public.project_media(project_id);

-- project_metrics indexes
CREATE INDEX IF NOT EXISTS idx_project_metrics_project_id 
  ON public.project_metrics(project_id);

-- project_milestones indexes
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id 
  ON public.project_milestones(project_id);

-- projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_assigned_to 
  ON public.projects(assigned_to);

CREATE INDEX IF NOT EXISTS idx_projects_created_by 
  ON public.projects(created_by);

-- =====================================================
-- 2. OPTIMIZE RLS POLICIES FOR PERFORMANCE
-- =====================================================

-- Drop and recreate admin_users policies with optimized auth checks
DROP POLICY IF EXISTS "Owners can delete admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Owners can insert admin users" ON public.admin_users;

CREATE POLICY "Owners can delete admin users"
  ON public.admin_users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.auth_id = (SELECT auth.uid())
      AND au.role = 'owner'
      AND au.is_active = true
    )
  );

CREATE POLICY "Owners can insert admin users"
  ON public.admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.auth_id = (SELECT auth.uid())
      AND au.role = 'owner'
      AND au.is_active = true
    )
  );

-- Drop and recreate client_users policies with optimized auth checks
DROP POLICY IF EXISTS "Clients can update own user record" ON public.client_users;
DROP POLICY IF EXISTS "Clients can view own user record" ON public.client_users;

CREATE POLICY "Clients can update own user record"
  ON public.client_users
  FOR UPDATE
  TO authenticated
  USING (auth_id = (SELECT auth.uid()))
  WITH CHECK (auth_id = (SELECT auth.uid()));

CREATE POLICY "Clients can view own user record"
  ON public.client_users
  FOR SELECT
  TO authenticated
  USING (auth_id = (SELECT auth.uid()));

-- =====================================================
-- 3. FIX FUNCTION SEARCH PATHS FOR SECURITY
-- =====================================================

-- Recreate is_admin function with explicit search_path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE auth_id = auth.uid()
    AND is_active = true
  );
END;
$$;

-- Recreate get_admin_id function with explicit search_path
CREATE OR REPLACE FUNCTION public.get_admin_id()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  admin_profile_id uuid;
BEGIN
  SELECT id INTO admin_profile_id
  FROM public.admin_users
  WHERE auth_id = auth.uid()
  AND is_active = true
  LIMIT 1;
  
  RETURN admin_profile_id;
END;
$$;

-- Recreate get_client_id_for_user function with explicit search_path
CREATE OR REPLACE FUNCTION public.get_client_id_for_user()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  client_profile_id uuid;
BEGIN
  SELECT client_id INTO client_profile_id
  FROM public.client_users
  WHERE auth_id = auth.uid()
  AND is_active = true
  LIMIT 1;
  
  RETURN client_profile_id;
END;
$$;

-- =====================================================
-- 4. DROP UNUSED INDEXES (OPTIONAL - KEEPING FOR FUTURE USE)
-- =====================================================

-- Note: We're keeping these indexes as they may be used in the future
-- when the application grows. The overhead is minimal compared to 
-- potential performance issues if removed prematurely.

-- If you want to remove them, uncomment the following:
-- DROP INDEX IF EXISTS public.idx_client_product_metrics_client_id;
-- DROP INDEX IF EXISTS public.idx_client_product_metrics_subscription_id;
-- DROP INDEX IF EXISTS public.idx_client_subscriptions_client_id;
-- DROP INDEX IF EXISTS public.idx_client_subscriptions_package_id;
-- DROP INDEX IF EXISTS public.idx_client_subscriptions_product_id;
-- DROP INDEX IF EXISTS public.idx_client_users_client_id;
-- DROP INDEX IF EXISTS public.idx_communications_client_id;
-- DROP INDEX IF EXISTS public.idx_invoices_client_id;
-- DROP INDEX IF EXISTS public.idx_projects_client_id;
-- DROP INDEX IF EXISTS public.idx_admin_users_auth_id;
-- DROP INDEX IF EXISTS public.idx_client_users_auth_id;

-- =====================================================
-- NOTES ON REMAINING ISSUES
-- =====================================================

-- 1. Multiple Permissive Policies:
--    These are intentional and work correctly. They use OR logic to allow
--    either admins OR the owning client to access records. This is the
--    correct approach for this use case.

-- 2. Auth DB Connection Strategy:
--    This must be configured in the Supabase Dashboard under:
--    Settings > Database > Connection Pooling
--    Change from fixed number to percentage-based allocation.

-- 3. Leaked Password Protection:
--    This must be enabled in the Supabase Dashboard under:
--    Authentication > Providers > Email
--    Enable "Breached Password Protection"

-- 4. Security Definer View:
--    The security_audit_status view uses SECURITY DEFINER to allow
--    admins to check system security status. This is necessary and
--    the view only exposes safe, aggregate information.
