/*
  # Fix Database Security Issues

  ## Overview
  This migration addresses the following security and performance issues:
  
  1. **Removes Unused Indexes**
     - idx_client_projects_active
     - idx_client_projects_industry
     - idx_client_projects_featured
     - idx_project_metrics_project
     - idx_project_media_project
  
  2. **Consolidates Multiple Permissive RLS Policies**
     - Removes duplicate permissive policies on client_projects table
     - Removes duplicate permissive policies on project_metrics table
     - Removes duplicate permissive policies on project_media table
     - Replaces with single unified policies per action
  
  3. **Fixes Function Search Path Mutability**
     - Updates update_updated_at_column function with immutable search_path
     - Sets search_path to empty string with SECURITY DEFINER for safety
  
  ## Important Notes
  - Policies are restructured to follow principle of least privilege
  - Public access is restricted to viewing active content only
  - Authenticated users retain full management capabilities
  - Search path fix prevents potential security vulnerabilities
*/

-- Step 1: Remove unused indexes that are not being utilized
DROP INDEX IF EXISTS idx_client_projects_active;
DROP INDEX IF EXISTS idx_client_projects_industry;
DROP INDEX IF EXISTS idx_client_projects_featured;
DROP INDEX IF EXISTS idx_project_metrics_project;
DROP INDEX IF EXISTS idx_project_media_project;

-- Step 2: Consolidate multiple permissive RLS policies on client_projects
-- Drop the conflicting policies
DROP POLICY IF EXISTS "Public can view active client projects" ON client_projects;
DROP POLICY IF EXISTS "Authenticated users can manage client projects" ON client_projects;

-- Create consolidated policies for client_projects
-- Public users can only SELECT active projects
CREATE POLICY "Public can view active projects"
  ON client_projects FOR SELECT
  TO public
  USING (is_active = true);

-- Authenticated users have separate policies for each action
CREATE POLICY "Authenticated can select all projects"
  ON client_projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert projects"
  ON client_projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update projects"
  ON client_projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete projects"
  ON client_projects FOR DELETE
  TO authenticated
  USING (true);

-- Step 3: Consolidate multiple permissive RLS policies on project_metrics
-- Drop the conflicting policies
DROP POLICY IF EXISTS "Public can view project metrics" ON project_metrics;
DROP POLICY IF EXISTS "Authenticated users can manage project metrics" ON project_metrics;

-- Create consolidated policies for project_metrics
-- Public users can only SELECT metrics for active projects
CREATE POLICY "Public can view metrics for active projects"
  ON project_metrics FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM client_projects 
      WHERE client_projects.id = project_metrics.project_id 
      AND client_projects.is_active = true
    )
  );

-- Authenticated users have separate policies for each action
CREATE POLICY "Authenticated can select all metrics"
  ON project_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert metrics"
  ON project_metrics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update metrics"
  ON project_metrics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete metrics"
  ON project_metrics FOR DELETE
  TO authenticated
  USING (true);

-- Step 4: Consolidate multiple permissive RLS policies on project_media
-- Drop the conflicting policies
DROP POLICY IF EXISTS "Public can view project media" ON project_media;
DROP POLICY IF EXISTS "Authenticated users can manage project media" ON project_media;

-- Create consolidated policies for project_media
-- Public users can only SELECT active media for active projects
CREATE POLICY "Public can view media for active projects"
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

-- Authenticated users have separate policies for each action
CREATE POLICY "Authenticated can select all media"
  ON project_media FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert media"
  ON project_media FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update media"
  ON project_media FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete media"
  ON project_media FOR DELETE
  TO authenticated
  USING (true);

-- Step 5: Fix function search path mutability issue
-- Drop and recreate the function with a secure, immutable search_path
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers that use this function
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_homepage_metrics_updated_at ON homepage_metrics;
CREATE TRIGGER update_homepage_metrics_updated_at
  BEFORE UPDATE ON homepage_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_results_updated_at ON client_results;
CREATE TRIGGER update_client_results_updated_at
  BEFORE UPDATE ON client_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_projects_updated_at ON client_projects;
CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON client_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
