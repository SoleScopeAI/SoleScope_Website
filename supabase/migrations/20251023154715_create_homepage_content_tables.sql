/*
  # Homepage Content Management Tables

  ## New Tables
  
  ### `testimonials`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Client name
  - `business` (text) - Business name
  - `service` (text) - Service provided
  - `quote` (text) - Testimonial quote
  - `rating` (integer) - Star rating (1-5)
  - `is_active` (boolean) - Whether testimonial is displayed
  - `display_order` (integer) - Order in which testimonial appears
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `homepage_metrics`
  - `id` (uuid, primary key) - Unique identifier
  - `metric_key` (text, unique) - Metric identifier (e.g., 'websites_automated')
  - `metric_value` (integer) - Current metric value
  - `metric_label` (text) - Display label
  - `metric_description` (text) - Description text
  - `is_active` (boolean) - Whether metric is displayed
  - `display_order` (integer) - Display order
  - `updated_at` (timestamptz) - Last update timestamp

  ### `client_results`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Project title
  - `business_name` (text) - Client business name
  - `industry` (text) - Business industry
  - `image_url` (text) - Screenshot/image URL
  - `result_text` (text) - Short result summary
  - `description` (text) - Detailed description
  - `is_active` (boolean) - Whether result is displayed
  - `display_order` (integer) - Carousel order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access (authenticated users for writes)
*/

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business text NOT NULL,
  service text NOT NULL,
  quote text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create homepage_metrics table
CREATE TABLE IF NOT EXISTS homepage_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key text UNIQUE NOT NULL,
  metric_value integer NOT NULL DEFAULT 0,
  metric_label text NOT NULL,
  metric_description text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create client_results table
CREATE TABLE IF NOT EXISTS client_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  business_name text NOT NULL,
  industry text NOT NULL,
  image_url text NOT NULL,
  result_text text NOT NULL,
  description text NOT NULL,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_results ENABLE ROW LEVEL SECURITY;

-- Policies for testimonials (public read, authenticated write)
CREATE POLICY "Anyone can view active testimonials"
  ON testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for homepage_metrics (public read, authenticated write)
CREATE POLICY "Anyone can view active metrics"
  ON homepage_metrics FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert metrics"
  ON homepage_metrics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update metrics"
  ON homepage_metrics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for client_results (public read, authenticated write)
CREATE POLICY "Anyone can view active client results"
  ON client_results FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert client results"
  ON client_results FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update client results"
  ON client_results FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial testimonials data
INSERT INTO testimonials (name, business, service, quote, rating, display_order) VALUES
  ('Jodie Thompson', 'Jodie''s Pampered Pooches', 'Website Design & Hosting', 'SoleScope transformed our online presence completely. The automated booking system has saved us countless hours and our client bookings have increased by over 130%. Absolutely worth the investment!', 5, 1),
  ('Mark Stevens', 'Design K9 Training', 'Custom WebApp', 'Working with SoleScope was seamless from start to finish. They built us a custom training management platform that our clients love. The team''s expertise in both design and automation is unmatched.', 5, 2),
  ('Sarah Mitchell', 'UK Blade Sharpening', 'AI Automations', 'The AI-powered lead qualification system has been a game-changer. We''re now able to respond to qualified leads instantly, and our conversion rate has nearly doubled. SoleScope delivers real results.', 5, 3)
ON CONFLICT DO NOTHING;

-- Insert initial metrics data
INSERT INTO homepage_metrics (metric_key, metric_value, metric_label, metric_description, display_order) VALUES
  ('websites_automated', 12348, 'Websites Automated', 'Intelligent systems deployed', 1),
  ('tasks_simplified', 47213, 'Tasks Simplified', 'Automated operations daily', 2),
  ('average_roi', 326, 'Average ROI', 'Return on investment percentage', 3)
ON CONFLICT (metric_key) DO NOTHING;

-- Insert initial client results data
INSERT INTO client_results (title, business_name, industry, image_url, result_text, description, display_order) VALUES
  ('Jodie''s Pampered Pooches', 'Jodie''s Pampered Pooches', 'Pet Grooming Services', '/assets/carousel/JodiesPamperedPoochesWebsite.png', '+138% leads after launch', 'Complete website redesign with automated booking system', 1),
  ('Design K9 Training', 'Design K9 Training', 'Dog Training Services', '/assets/carousel/Design K9 Home Page.png', 'Fully automated booking system', 'Custom web app with client progress tracking', 2),
  ('UK Blade Sharpening', 'UK Blade Sharpening', 'Equipment Services', '/assets/carousel/UKBladeSharpening.png', '+180% qualified leads', 'AI-powered lead qualification and CRM integration', 3)
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
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
