import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface AdminUser {
  id: string;
  auth_id: string;
  email: string;
  full_name: string;
  role: 'owner' | 'admin' | 'manager';
  is_active: boolean;
  last_login: string | null;
  notification_preferences: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export interface ClientUser {
  id: string;
  auth_id: string;
  client_id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  client_data?: {
    company_name: string;
    contact_name: string;
    status: string;
  };
}

export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  address: string | null;
  status: 'prospect' | 'lead' | 'onboarding' | 'active' | 'trial' | 'inactive' | 'churned' | 'archived';
  industry: string | null;
  company_size: string | null;
  lifetime_value: number;
  notes: string | null;
  tags: string[];
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  project_name: string;
  project_type: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string | null;
  start_date: string | null;
  due_date: string | null;
  completed_date: string | null;
  budget: number | null;
  actual_cost: number;
  progress_percentage: number;
  assigned_to: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  clients?: { company_name: string };
  admin_users?: { full_name: string };
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  project_id: string | null;
  issue_date: string;
  due_date: string;
  paid_date: string | null;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  notes: string | null;
  payment_method: string | null;
  stripe_invoice_id: string | null;
  stripe_payment_link: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  clients?: { company_name: string; email: string };
  projects?: { project_name: string };
}

export interface InvoiceLineItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  order_index: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: 'web' | 'automation' | 'dashboard' | 'branding' | 'custom';
  base_price: number;
  billing_type: 'one_time' | 'monthly' | 'annual' | 'custom';
  features: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  billing_cycle: 'monthly' | 'annual' | 'one_time';
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Communication {
  id: string;
  client_id: string;
  project_id: string | null;
  communication_type: 'email' | 'phone' | 'meeting' | 'message';
  direction: 'inbound' | 'outbound';
  subject: string | null;
  content: string | null;
  admin_user_id: string | null;
  communication_date: string;
  created_at: string;
  admin_users?: { full_name: string };
}

export interface Document {
  id: string;
  client_id: string;
  project_id: string | null;
  document_name: string;
  document_type: string | null;
  file_url: string;
  file_size: number | null;
  mime_type: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  admin_user_id: string | null;
  action_type: string;
  entity_type: string;
  entity_id: string | null;
  description: string;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
  admin_users?: { full_name: string };
}

export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  completed_date: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ClientSubscription {
  id: string;
  client_id: string;
  product_id: string | null;
  package_id: string | null;
  status: 'active' | 'paused' | 'cancelled' | 'completed';
  billing_cycle: 'monthly' | 'annual' | 'one_time';
  amount: number;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  products?: { name: string; category: string };
  packages?: { name: string };
}
