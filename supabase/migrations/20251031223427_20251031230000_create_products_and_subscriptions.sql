/*
  # Products, Packages, and Client Subscriptions System

  ## Overview
  This migration creates a comprehensive product management system that allows admins to:
  - Define products/services offered (Website Design, AI Automations, etc.)
  - Create package bundles with pricing tiers
  - Assign products/packages to clients
  - Track client subscriptions with billing cycles
  - Enable product-specific dashboard views for clients

  ## New Tables

  ### 1. products
  Core products/services offered by SoleScope
  - `id` (uuid, primary key)
  - `name` (text) - Product name (e.g., "Website Design & Hosting")
  - `slug` (text, unique) - URL-friendly identifier (e.g., "website-design")
  - `description` (text) - Product description
  - `category` (text) - Product category (web, automation, dashboard, branding, custom)
  - `base_price` (decimal) - Starting price
  - `billing_type` (text) - one_time, monthly, annual, custom
  - `features` (jsonb) - Array of features included
  - `dashboard_config` (jsonb) - Configuration for client dashboard view
  - `is_active` (boolean) - Whether product is currently offered
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. packages
  Package bundles combining multiple products with specific pricing
  - `id` (uuid, primary key)
  - `name` (text) - Package name (e.g., "Starter", "Professional", "Enterprise")
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Package description
  - `price` (decimal) - Package price
  - `billing_cycle` (text) - monthly, annual, one_time
  - `features` (jsonb) - Array of features included
  - `product_ids` (uuid[]) - Array of product IDs included
  - `is_popular` (boolean) - Highlight as popular
  - `is_active` (boolean) - Whether package is currently offered
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. client_subscriptions
  Client subscriptions to products/packages
  - `id` (uuid, primary key)
  - `client_id` (uuid) - FK to clients
  - `product_id` (uuid) - FK to products (nullable if package)
  - `package_id` (uuid) - FK to packages (nullable if individual product)
  - `status` (text) - active, paused, cancelled, completed
  - `billing_cycle` (text) - monthly, annual, one_time
  - `amount` (decimal) - Subscription amount
  - `start_date` (date) - Subscription start date
  - `end_date` (date) - Subscription end date (nullable for ongoing)
  - `next_billing_date` (date) - Next billing date
  - `auto_renew` (boolean) - Auto-renew on expiry
  - `custom_config` (jsonb) - Custom configuration/settings
  - `notes` (text) - Internal notes
  - `created_by` (uuid) - Admin who created
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. client_product_metrics
  Product-specific metrics and data for client dashboards
  - `id` (uuid, primary key)
  - `client_id` (uuid) - FK to clients
  - `subscription_id` (uuid) - FK to client_subscriptions
  - `metric_type` (text) - Type of metric (uptime, leads, visitors, etc.)
  - `metric_value` (jsonb) - Metric value (flexible format)
  - `recorded_at` (timestamptz) - When metric was recorded
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Admins: full access to all tables
  - Clients: read-only access to their own subscriptions and metrics

  ## Indexes
  - Add indexes on frequently queried columns
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('web', 'automation', 'dashboard', 'branding', 'custom')),
  base_price decimal(10,2) NOT NULL DEFAULT 0,
  billing_type text NOT NULL DEFAULT 'one_time' CHECK (billing_type IN ('one_time', 'monthly', 'annual', 'custom')),
  features jsonb DEFAULT '[]',
  dashboard_config jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly', 'annual', 'one_time')),
  features jsonb DEFAULT '[]',
  product_ids uuid[] DEFAULT '{}',
  is_popular boolean DEFAULT false,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create client_subscriptions table
CREATE TABLE IF NOT EXISTS client_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  package_id uuid REFERENCES packages(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'completed')),
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly', 'annual', 'one_time')),
  amount decimal(10,2) NOT NULL,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  next_billing_date date,
  auto_renew boolean DEFAULT true,
  custom_config jsonb DEFAULT '{}',
  notes text,
  created_by uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT check_product_or_package CHECK (
    (product_id IS NOT NULL AND package_id IS NULL) OR
    (product_id IS NULL AND package_id IS NOT NULL)
  )
);

-- Create client_product_metrics table
CREATE TABLE IF NOT EXISTS client_product_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  subscription_id uuid NOT NULL REFERENCES client_subscriptions(id) ON DELETE CASCADE,
  metric_type text NOT NULL,
  metric_value jsonb NOT NULL DEFAULT '{}',
  recorded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_packages_slug ON packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_is_active ON packages(is_active);
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_client_id ON client_subscriptions(client_id);
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_status ON client_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_product_id ON client_subscriptions(product_id);
CREATE INDEX IF NOT EXISTS idx_client_subscriptions_package_id ON client_subscriptions(package_id);
CREATE INDEX IF NOT EXISTS idx_client_product_metrics_client_id ON client_product_metrics(client_id);
CREATE INDEX IF NOT EXISTS idx_client_product_metrics_subscription_id ON client_product_metrics(subscription_id);
CREATE INDEX IF NOT EXISTS idx_client_product_metrics_recorded_at ON client_product_metrics(recorded_at DESC);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_product_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for packages (public read, admin write)
CREATE POLICY "Anyone can view active packages"
  ON packages FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can view all packages"
  ON packages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert packages"
  ON packages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update packages"
  ON packages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete packages"
  ON packages FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for client_subscriptions
CREATE POLICY "Admins can view all subscriptions"
  ON client_subscriptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert subscriptions"
  ON client_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update subscriptions"
  ON client_subscriptions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete subscriptions"
  ON client_subscriptions FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for client_product_metrics
CREATE POLICY "Admins can view all metrics"
  ON client_product_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert metrics"
  ON client_product_metrics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update metrics"
  ON client_product_metrics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete metrics"
  ON client_product_metrics FOR DELETE
  TO authenticated
  USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_subscriptions_updated_at
  BEFORE UPDATE ON client_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default products based on SoleScope offerings
INSERT INTO products (name, slug, description, category, base_price, billing_type, features, dashboard_config, sort_order) VALUES
(
  'Website Design & Hosting',
  'website-design',
  'Professional, mobile-responsive websites with fully managed hosting, SEO optimization, and 24/7 support',
  'web',
  1499.00,
  'one_time',
  '["Mobile-First Design", "SEO Optimization", "Managed Hosting", "24/7 Support", "SSL Certificate", "Regular Backups"]',
  '{"dashboardType": "website", "metrics": ["uptime", "visitors", "pageSpeed", "seoScore"], "features": ["analytics", "hosting", "support"]}',
  1
),
(
  'Custom WebApps & Hosting',
  'custom-webapps',
  'Tailored web applications with database integration and enterprise-grade hosting',
  'web',
  2999.00,
  'one_time',
  '["Custom Development", "Database Integration", "Cloud Hosting", "API Integrations", "Full Management"]',
  '{"dashboardType": "webapp", "metrics": ["uptime", "users", "apiCalls", "performance"], "features": ["analytics", "hosting", "management"]}',
  2
),
(
  'AI Dashboards & Analytics',
  'ai-dashboards',
  'Transform business data into clear, actionable insights with AI-powered dashboards',
  'dashboard',
  2499.00,
  'one_time',
  '["Multi-Source Data", "AI Insights", "Real-Time Updates", "Custom Reports", "Data Visualization"]',
  '{"dashboardType": "analytics", "metrics": ["dataSources", "insights", "reports"], "features": ["customDashboard", "aiInsights", "reporting"]}',
  3
),
(
  'Custom AI Automations',
  'ai-automations',
  'Intelligent automation for lead qualification, client onboarding, and business workflows',
  'automation',
  3499.00,
  'monthly',
  '["Lead Qualification", "Workflow Automation", "24/7 Operation", "CRM Integration", "Custom Triggers"]',
  '{"dashboardType": "automation", "metrics": ["automationRuns", "leadsQualified", "timeSaved", "conversionRate"], "features": ["workflows", "leads", "analytics"]}',
  4
),
(
  'Brand Identity & Visuals',
  'brand-identity',
  'Professional logos, color systems, and brand materials that make your business stand out',
  'branding',
  999.00,
  'one_time',
  '["Logo Design", "Color Systems", "Brand Guidelines", "Marketing Materials", "Asset Library"]',
  '{"dashboardType": "branding", "metrics": ["assetsDelivered", "revisions"], "features": ["assets", "guidelines", "downloads"]}',
  5
)
ON CONFLICT (slug) DO NOTHING;

-- Insert default packages based on pricing page
INSERT INTO packages (name, slug, description, price, billing_cycle, features, is_popular, sort_order) VALUES
(
  'Starter Package',
  'starter',
  'Perfect for small businesses getting started online',
  1499.00,
  'one_time',
  '["5-page professional website", "Mobile-responsive design", "Basic SEO optimization", "Contact form integration", "1 month hosting included", "SSL certificate", "Email support", "2 rounds of revisions"]',
  false,
  1
),
(
  'Professional Package',
  'professional',
  'For growing businesses that need advanced features',
  2999.00,
  'one_time',
  '["Up to 15 pages", "Custom design & branding", "Advanced SEO & analytics", "Blog or news section", "E-commerce ready (up to 50 products)", "3 months hosting included", "Priority email & phone support", "CMS training included", "Unlimited revisions", "Social media integration"]',
  true,
  2
),
(
  'Enterprise Package',
  'enterprise',
  'Complete digital solution with AI automation',
  5999.00,
  'one_time',
  '["Unlimited pages", "Custom web application", "AI chatbot integration", "Advanced automation workflows", "Custom dashboard & analytics", "E-commerce (unlimited products)", "6 months premium hosting", "24/7 priority support", "Dedicated project manager", "API integrations", "Performance optimization", "Monthly strategy calls"]',
  false,
  3
)
ON CONFLICT (slug) DO NOTHING;
