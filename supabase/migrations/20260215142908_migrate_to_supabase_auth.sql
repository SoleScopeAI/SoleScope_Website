/*
  # Migrate to Supabase Auth

  1. Schema Changes
    - Add `auth_id` (uuid, nullable, references auth.users) to `admin_users`
    - Add `auth_id` (uuid, nullable, references auth.users) to `client_users`
    - Add `stripe_payment_link` (text, nullable) to `invoices`
    - Add `notification_preferences` (jsonb, default '{}') to `admin_users`
    - Add unique indexes on auth_id columns

  2. Security Overhaul
    - Drop ALL existing RLS policies (39 policies)
    - Drop old `is_admin_user()` function
    - Create new `is_admin()` helper using `auth.uid()`
    - Create new `get_client_id_for_user()` helper using `auth.uid()`
    - Create proper RLS policies for every table using Supabase Auth

  3. Policy Strategy
    - Public tables: anon can read active rows, admins can manage
    - Admin tables: only authenticated admins can access
    - Client tables: admins have full access, clients can read their own data
    - All policies check authentication and ownership/membership
*/

-- ============================================================
-- STEP 1: ADD NEW COLUMNS
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'admin_users' AND column_name = 'auth_id'
  ) THEN
    ALTER TABLE public.admin_users ADD COLUMN auth_id uuid UNIQUE REFERENCES auth.users(id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'client_users' AND column_name = 'auth_id'
  ) THEN
    ALTER TABLE public.client_users ADD COLUMN auth_id uuid UNIQUE REFERENCES auth.users(id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'invoices' AND column_name = 'stripe_payment_link'
  ) THEN
    ALTER TABLE public.invoices ADD COLUMN stripe_payment_link text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'admin_users' AND column_name = 'notification_preferences'
  ) THEN
    ALTER TABLE public.admin_users ADD COLUMN notification_preferences jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- ============================================================
-- STEP 2: DROP ALL EXISTING RLS POLICIES
-- ============================================================

DROP POLICY IF EXISTS "Anon can select activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow anon to read admin users for authentication" ON public.admin_users;
DROP POLICY IF EXISTS "Anon can update admin last_login" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage metrics" ON public.client_product_metrics;
DROP POLICY IF EXISTS "Admins can view all metrics" ON public.client_product_metrics;
DROP POLICY IF EXISTS "Admins can manage client projects" ON public.client_projects;
DROP POLICY IF EXISTS "Users can view active client projects" ON public.client_projects;
DROP POLICY IF EXISTS "Admins can manage client results" ON public.client_results;
DROP POLICY IF EXISTS "Anyone can view active client results" ON public.client_results;
DROP POLICY IF EXISTS "Admins can manage subscriptions" ON public.client_subscriptions;
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.client_subscriptions;
DROP POLICY IF EXISTS "Admins can manage client users" ON public.client_users;
DROP POLICY IF EXISTS "Admins can manage clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can manage communications" ON public.communications;
DROP POLICY IF EXISTS "Admins can manage documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can manage homepage metrics" ON public.homepage_metrics;
DROP POLICY IF EXISTS "Anyone can view active metrics" ON public.homepage_metrics;
DROP POLICY IF EXISTS "Admins can manage invoice line items" ON public.invoice_line_items;
DROP POLICY IF EXISTS "Admins can manage invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can write packages" ON public.packages;
DROP POLICY IF EXISTS "Public can view active packages" ON public.packages;
DROP POLICY IF EXISTS "Admins can write products" ON public.products;
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can write project media" ON public.project_media;
DROP POLICY IF EXISTS "Public can view active project media" ON public.project_media;
DROP POLICY IF EXISTS "Admins can write project metrics" ON public.project_metrics;
DROP POLICY IF EXISTS "Public can view active project metrics" ON public.project_metrics;
DROP POLICY IF EXISTS "Admins can manage project milestones" ON public.project_milestones;
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can write testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin users can delete demo requests" ON public.voice_agent_demo_requests;
DROP POLICY IF EXISTS "Admin users can update demo requests" ON public.voice_agent_demo_requests;
DROP POLICY IF EXISTS "Admin users can view all demo requests" ON public.voice_agent_demo_requests;
DROP POLICY IF EXISTS "Public can submit demo requests" ON public.voice_agent_demo_requests;
DROP POLICY IF EXISTS "Admin users can delete leads" ON public.voice_agent_leads;
DROP POLICY IF EXISTS "Admin users can insert leads" ON public.voice_agent_leads;
DROP POLICY IF EXISTS "Admin users can update leads" ON public.voice_agent_leads;
DROP POLICY IF EXISTS "Admin users can view all leads" ON public.voice_agent_leads;

-- Drop any remaining old policies that may exist from earlier migrations
DROP POLICY IF EXISTS "allow all operations" ON public.admin_users;
DROP POLICY IF EXISTS "allow all operations" ON public.clients;
DROP POLICY IF EXISTS "allow all operations" ON public.projects;
DROP POLICY IF EXISTS "allow all operations" ON public.invoices;
DROP POLICY IF EXISTS "allow all operations" ON public.client_users;
DROP POLICY IF EXISTS "allow all operations" ON public.activity_logs;
DROP POLICY IF EXISTS "allow all operations" ON public.communications;
DROP POLICY IF EXISTS "allow all operations" ON public.documents;
DROP POLICY IF EXISTS "allow all operations" ON public.project_milestones;
DROP POLICY IF EXISTS "allow all operations" ON public.invoice_line_items;
DROP POLICY IF EXISTS "allow all operations" ON public.client_subscriptions;
DROP POLICY IF EXISTS "allow all operations" ON public.client_product_metrics;

-- ============================================================
-- STEP 3: DROP OLD HELPER FUNCTIONS
-- ============================================================

DROP FUNCTION IF EXISTS public.is_admin_user();

-- ============================================================
-- STEP 4: CREATE NEW HELPER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE auth_id = auth.uid()
    AND is_active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.get_admin_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT id FROM public.admin_users
  WHERE auth_id = auth.uid()
  AND is_active = true
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_client_id_for_user()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT client_id FROM public.client_users
  WHERE auth_id = auth.uid()
  AND is_active = true
  LIMIT 1;
$$;

-- ============================================================
-- STEP 5: CREATE NEW RLS POLICIES
-- ============================================================

-- ---- admin_users ----
CREATE POLICY "Admins can view all admin users"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Owners can insert admin users"
  ON public.admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE auth_id = auth.uid() AND role = 'owner' AND is_active = true
    )
  );

CREATE POLICY "Owners can update admin users"
  ON public.admin_users FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Owners can delete admin users"
  ON public.admin_users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE auth_id = auth.uid() AND role = 'owner' AND is_active = true
    )
  );

-- ---- clients ----
CREATE POLICY "Admins can view clients"
  ON public.clients FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert clients"
  ON public.clients FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update clients"
  ON public.clients FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete clients"
  ON public.clients FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- projects ----
CREATE POLICY "Admins can view all projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (client_id = get_client_id_for_user());

CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- project_milestones ----
CREATE POLICY "Admins can view milestones"
  ON public.project_milestones FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own milestones"
  ON public.project_milestones FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_milestones.project_id
      AND projects.client_id = get_client_id_for_user()
    )
  );

CREATE POLICY "Admins can insert milestones"
  ON public.project_milestones FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update milestones"
  ON public.project_milestones FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete milestones"
  ON public.project_milestones FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- invoices ----
CREATE POLICY "Admins can view all invoices"
  ON public.invoices FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own invoices"
  ON public.invoices FOR SELECT
  TO authenticated
  USING (client_id = get_client_id_for_user());

CREATE POLICY "Admins can insert invoices"
  ON public.invoices FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update invoices"
  ON public.invoices FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete invoices"
  ON public.invoices FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- invoice_line_items ----
CREATE POLICY "Admins can view line items"
  ON public.invoice_line_items FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own line items"
  ON public.invoice_line_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.invoices
      WHERE invoices.id = invoice_line_items.invoice_id
      AND invoices.client_id = get_client_id_for_user()
    )
  );

CREATE POLICY "Admins can insert line items"
  ON public.invoice_line_items FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update line items"
  ON public.invoice_line_items FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete line items"
  ON public.invoice_line_items FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- communications ----
CREATE POLICY "Admins can view all communications"
  ON public.communications FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own communications"
  ON public.communications FOR SELECT
  TO authenticated
  USING (client_id = get_client_id_for_user());

CREATE POLICY "Admins can insert communications"
  ON public.communications FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Clients can insert own communications"
  ON public.communications FOR INSERT
  TO authenticated
  WITH CHECK (client_id = get_client_id_for_user());

CREATE POLICY "Admins can update communications"
  ON public.communications FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete communications"
  ON public.communications FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- activity_logs ----
CREATE POLICY "Admins can view activity logs"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert activity logs"
  ON public.activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- ---- documents ----
CREATE POLICY "Admins can view all documents"
  ON public.documents FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own documents"
  ON public.documents FOR SELECT
  TO authenticated
  USING (client_id = get_client_id_for_user());

CREATE POLICY "Admins can insert documents"
  ON public.documents FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update documents"
  ON public.documents FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete documents"
  ON public.documents FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- client_users ----
CREATE POLICY "Admins can view all client users"
  ON public.client_users FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own user record"
  ON public.client_users FOR SELECT
  TO authenticated
  USING (auth_id = auth.uid());

CREATE POLICY "Admins can insert client users"
  ON public.client_users FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update client users"
  ON public.client_users FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Clients can update own user record"
  ON public.client_users FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

CREATE POLICY "Admins can delete client users"
  ON public.client_users FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- client_subscriptions ----
CREATE POLICY "Admins can view all subscriptions"
  ON public.client_subscriptions FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own subscriptions"
  ON public.client_subscriptions FOR SELECT
  TO authenticated
  USING (client_id = get_client_id_for_user());

CREATE POLICY "Admins can insert subscriptions"
  ON public.client_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update subscriptions"
  ON public.client_subscriptions FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete subscriptions"
  ON public.client_subscriptions FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- client_product_metrics ----
CREATE POLICY "Admins can view all product metrics"
  ON public.client_product_metrics FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Clients can view own product metrics"
  ON public.client_product_metrics FOR SELECT
  TO authenticated
  USING (client_id = get_client_id_for_user());

CREATE POLICY "Admins can insert product metrics"
  ON public.client_product_metrics FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update product metrics"
  ON public.client_product_metrics FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete product metrics"
  ON public.client_product_metrics FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- products ----
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- packages ----
CREATE POLICY "Anyone can view active packages"
  ON public.packages FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage packages"
  ON public.packages FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update packages"
  ON public.packages FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete packages"
  ON public.packages FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- testimonials ----
CREATE POLICY "Anyone can view active testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- homepage_metrics ----
CREATE POLICY "Anyone can view active homepage metrics"
  ON public.homepage_metrics FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can insert homepage metrics"
  ON public.homepage_metrics FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update homepage metrics"
  ON public.homepage_metrics FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete homepage metrics"
  ON public.homepage_metrics FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- client_results ----
CREATE POLICY "Anyone can view active client results"
  ON public.client_results FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can insert client results"
  ON public.client_results FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update client results"
  ON public.client_results FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete client results"
  ON public.client_results FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- client_projects (portfolio showcase) ----
CREATE POLICY "Anyone can view active portfolio projects"
  ON public.client_projects FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can insert portfolio projects"
  ON public.client_projects FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update portfolio projects"
  ON public.client_projects FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete portfolio projects"
  ON public.client_projects FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- project_metrics (portfolio metrics) ----
CREATE POLICY "Anyone can view portfolio metrics"
  ON public.project_metrics FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.client_projects cp
      WHERE cp.id = project_metrics.project_id AND cp.is_active = true
    )
  );

CREATE POLICY "Admins can insert portfolio metrics"
  ON public.project_metrics FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update portfolio metrics"
  ON public.project_metrics FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete portfolio metrics"
  ON public.project_metrics FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- project_media ----
CREATE POLICY "Anyone can view active portfolio media"
  ON public.project_media FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.client_projects cp
      WHERE cp.id = project_media.project_id AND cp.is_active = true
    )
  );

CREATE POLICY "Admins can insert portfolio media"
  ON public.project_media FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update portfolio media"
  ON public.project_media FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete portfolio media"
  ON public.project_media FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- voice_agent_demo_requests ----
CREATE POLICY "Anyone can submit demo requests"
  ON public.voice_agent_demo_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
  );

CREATE POLICY "Admins can view demo requests"
  ON public.voice_agent_demo_requests FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update demo requests"
  ON public.voice_agent_demo_requests FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete demo requests"
  ON public.voice_agent_demo_requests FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---- voice_agent_leads ----
CREATE POLICY "Admins can view leads"
  ON public.voice_agent_leads FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert leads"
  ON public.voice_agent_leads FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update leads"
  ON public.voice_agent_leads FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete leads"
  ON public.voice_agent_leads FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================
-- STEP 6: ADD INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_admin_users_auth_id ON public.admin_users(auth_id);
CREATE INDEX IF NOT EXISTS idx_client_users_auth_id ON public.client_users(auth_id);
