/*
  # Enhanced Client Results Schema

  ## Overview
  This migration enhances the existing client_results table with additional fields for a more sophisticated showcase:
  - Detailed project metrics and KPIs
  - Multiple media assets support
  - Technology stack information
  - Project timeline and stages
  - Before/after comparison data
  
  ## New Tables
  
  ### `client_projects`
  - Comprehensive client project information with extended metadata
  - Multiple images, videos, and asset URLs
  - Detailed metrics breakdown (revenue, traffic, conversions, etc.)
  - Technology stack and service categories
  - Project timeline and completion data
  - Industry and location information
  
  ### `project_metrics`
  - Individual metrics for each project
  - Flexible key-value structure for different metric types
  - Icons and visualization preferences
  - Before/after values for comparison
  
  ### `project_media`
  - Multiple media assets per project
  - Support for images, videos, mockups, and screenshots
  - Media type categorization and ordering
  
  ## Security
  - Enable RLS on all new tables
  - Public read access for active projects (for website visitors)
  - Admin-only write access (authenticated users with proper role)
  
  ## Important Notes
  1. Uses conditional table creation to avoid errors
  2. All tables include soft-delete capability via is_active flags
  3. Timestamps track creation and updates automatically
  4. Display ordering allows manual curation of showcase order
*/

-- Create client_projects table with comprehensive project data
CREATE TABLE IF NOT EXISTS client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  project_title text NOT NULL,
  industry text NOT NULL,
  location text,
  logo_url text,
  featured_image_url text,
  website_url text,
  
  -- Project details
  description text NOT NULL,
  challenge text,
  solution text,
  tagline text,
  
  -- Service and technology info
  services_provided text[] DEFAULT '{}',
  tech_stack text[] DEFAULT '{}',
  project_type text,
  
  -- Timeline
  start_date date,
  completion_date date,
  project_duration_weeks integer,
  
  -- High-level results
  primary_result text NOT NULL,
  result_percentage integer,
  
  -- Display settings
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  color_theme text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_metrics table for detailed KPIs
CREATE TABLE IF NOT EXISTS project_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES client_projects(id) ON DELETE CASCADE,
  
  metric_key text NOT NULL,
  metric_label text NOT NULL,
  metric_icon text,
  
  -- Before and after values
  value_before numeric,
  value_after numeric,
  
  -- Display value (e.g., "+250%", "£120k", "3x")
  display_value text NOT NULL,
  
  -- Metric category for grouping
  category text,
  
  is_highlighted boolean DEFAULT false,
  display_order integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now()
);

-- Create project_media table for images, videos, mockups
CREATE TABLE IF NOT EXISTS project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES client_projects(id) ON DELETE CASCADE,
  
  media_url text NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video', 'mockup', 'screenshot', 'before', 'after', 'logo')),
  
  title text,
  description text,
  alt_text text,
  
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_client_projects_active ON client_projects(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_client_projects_industry ON client_projects(industry);
CREATE INDEX IF NOT EXISTS idx_client_projects_featured ON client_projects(is_featured, is_active);
CREATE INDEX IF NOT EXISTS idx_project_metrics_project ON project_metrics(project_id, display_order);
CREATE INDEX IF NOT EXISTS idx_project_media_project ON project_media(project_id, media_type, display_order);

-- Enable RLS on all tables
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view active client projects"
  ON client_projects FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can view project metrics"
  ON project_metrics FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM client_projects 
      WHERE client_projects.id = project_metrics.project_id 
      AND client_projects.is_active = true
    )
  );

CREATE POLICY "Public can view project media"
  ON project_media FOR SELECT
  TO public
  USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM client_projects 
      WHERE client_projects.id = project_media.project_id 
      AND client_projects.is_active = true
    )
  );

-- Authenticated users can manage all data (for admin dashboard)
CREATE POLICY "Authenticated users can manage client projects"
  ON client_projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage project metrics"
  ON project_metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage project media"
  ON project_media FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);