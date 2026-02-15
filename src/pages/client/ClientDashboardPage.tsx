import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  FileText,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { supabase } from '../../lib/supabase';
import { ChangePasswordModal } from '../../components/client/ChangePasswordModal';

interface Project {
  id: string;
  project_name: string;
  status: string;
  progress_percentage: number;
  due_date: string | null;
}

interface Invoice {
  id: string;
  invoice_number: string;
  status: string;
  total_amount: number;
  due_date: string;
}

const ClientDashboardPage = () => {
  const { clientUser, refreshUser } = useClientAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);

  useEffect(() => {
    if (clientUser?.client_id) {
      loadDashboardData();
      if (clientUser.requires_password_change) {
        setRequiresPasswordChange(true);
        setShowPasswordModal(true);
      }
    }
  }, [clientUser?.client_id, clientUser?.requires_password_change]);

  const handlePasswordChangeSuccess = async () => {
    setShowPasswordModal(false);
    setRequiresPasswordChange(false);
    await refreshUser();
  };

  const loadDashboardData = async () => {
    if (!clientUser?.client_id) return;

    try {
      const [projectsResponse, invoicesResponse] = await Promise.all([
        supabase
          .from('projects')
          .select('id, project_name, status, progress_percentage, due_date')
          .eq('client_id', clientUser.client_id)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('invoices')
          .select('id, invoice_number, status, total_amount, due_date')
          .eq('client_id', clientUser.client_id)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      if (projectsResponse.data) {
        setProjects(projectsResponse.data);
      }

      if (invoicesResponse.data) {
        setInvoices(invoicesResponse.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planning: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      in_progress: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      review: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      completed: 'text-green-400 bg-green-500/10 border-green-500/20',
      on_hold: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      draft: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
      sent: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      paid: 'text-green-400 bg-green-500/10 border-green-500/20',
      overdue: 'text-red-400 bg-red-500/10 border-red-500/20',
    };
    return colors[status] || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const activeProjects = projects.filter((p) => p.status === 'in_progress' || p.status === 'planning');
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const unpaidInvoices = invoices.filter((i) => i.status !== 'paid');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {clientUser?.full_name?.split(' ')[0] || 'Client'}!
        </h1>
        <p className="text-gray-400">Here's an overview of your projects and account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <FolderKanban className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{activeProjects.length}</p>
          <p className="text-gray-400 text-sm">Active Projects</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{completedProjects.length}</p>
          <p className="text-gray-400 text-sm">Completed Projects</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{unpaidInvoices.length}</p>
          <p className="text-gray-400 text-sm">Pending Invoices</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-teal-400" />
            </div>
          </div>
          <p className="text-lg font-bold text-white mb-1 truncate">
            {clientUser?.client_data?.company_name}
          </p>
          <p className="text-gray-400 text-sm capitalize">{clientUser?.client_data?.status || 'Active'}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
            <Link
              to="/client/projects"
              className="text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center space-x-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No projects yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-teal-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold">{project.project_name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-medium">{project.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress_percentage}%` }}
                      />
                    </div>
                    {project.due_date && (
                      <div className="flex items-center text-sm text-gray-400 mt-2">
                        <Clock className="w-4 h-4 mr-1" />
                        Due: {new Date(project.due_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Invoices</h2>
            <Link
              to="/client/invoices"
              className="text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center space-x-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No invoices yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-teal-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-semibold mb-1">#{invoice.invoice_number}</h3>
                      <p className="text-gray-400 text-sm">
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-gray-400 text-sm">Amount</span>
                    <span className="text-white font-bold text-lg">
                      {formatCurrency(invoice.total_amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-teal-900/30 via-teal-800/20 to-transparent border border-teal-500/20 rounded-2xl p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Need Help?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Our team is here to support you. Send us a message or check out our documentation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/client/messages"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-teal-500/50"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Send Message</span>
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-200 border border-white/10"
              >
                <span>View FAQs</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <ChangePasswordModal
        userId={clientUser?.id || ''}
        isOpen={showPasswordModal}
        onClose={() => !requiresPasswordChange && setShowPasswordModal(false)}
        onSuccess={handlePasswordChangeSuccess}
        requiresChange={requiresPasswordChange}
      />
    </div>
  );
};

export default ClientDashboardPage;
