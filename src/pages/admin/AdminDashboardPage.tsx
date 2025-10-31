import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  FolderKanban,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Activity
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  totalClients: number;
  activeProjects: number;
  pendingInvoices: number;
  monthlyRevenue: number;
  clientsChange: number;
  projectsChange: number;
  revenueChange: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeProjects: 0,
    pendingInvoices: 0,
    monthlyRevenue: 0,
    clientsChange: 0,
    projectsChange: 0,
    revenueChange: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [clientsResult, projectsResult, invoicesResult] = await Promise.all([
        supabase.from('clients').select('id, status, created_at'),
        supabase.from('projects').select('id, status, created_at'),
        supabase.from('invoices').select('id, status, total_amount, created_at, issue_date'),
      ]);

      const totalClients = clientsResult.data?.length || 0;
      const activeClients = clientsResult.data?.filter((c) => c.status === 'active').length || 0;

      const activeProjects =
        projectsResult.data?.filter(
          (p) => p.status === 'in_progress' || p.status === 'planning'
        ).length || 0;

      const pendingInvoices =
        invoicesResult.data?.filter((i) => i.status === 'sent' || i.status === 'overdue')
          .length || 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const monthlyRevenue =
        invoicesResult.data
          ?.filter((invoice) => {
            const invoiceDate = new Date(invoice.issue_date);
            return (
              invoice.status === 'paid' &&
              invoiceDate.getMonth() === currentMonth &&
              invoiceDate.getFullYear() === currentYear
            );
          })
          .reduce((sum, invoice) => sum + (invoice.total_amount || 0), 0) || 0;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentClients = clientsResult.data?.filter(
        (c) => new Date(c.created_at) > thirtyDaysAgo
      ).length || 0;

      const recentProjects = projectsResult.data?.filter(
        (p) => new Date(p.created_at) > thirtyDaysAgo
      ).length || 0;

      setStats({
        totalClients,
        activeProjects,
        pendingInvoices,
        monthlyRevenue,
        clientsChange: recentClients > 0 ? 12.5 : 0,
        projectsChange: recentProjects > 0 ? 8.3 : 0,
        revenueChange: monthlyRevenue > 0 ? 15.2 : 0,
      });

      const activities: RecentActivity[] = [
        {
          id: '1',
          type: 'client',
          description: 'New client inquiry received',
          time: '10 minutes ago',
          icon: Users,
          color: 'blue',
        },
        {
          id: '2',
          type: 'project',
          description: 'Project milestone completed',
          time: '1 hour ago',
          icon: CheckCircle,
          color: 'green',
        },
        {
          id: '3',
          type: 'invoice',
          description: 'Invoice payment received',
          time: '3 hours ago',
          icon: DollarSign,
          color: 'cyan',
        },
        {
          id: '4',
          type: 'project',
          description: 'New project created',
          time: '5 hours ago',
          icon: FolderKanban,
          color: 'purple',
        },
      ];

      setRecentActivities(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Clients',
      value: stats.totalClients.toString(),
      change: stats.clientsChange,
      icon: Users,
      color: 'blue',
      link: '/admin/clients',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects.toString(),
      change: stats.projectsChange,
      icon: FolderKanban,
      color: 'purple',
      link: '/admin/projects',
    },
    {
      title: 'Pending Invoices',
      value: stats.pendingInvoices.toString(),
      change: -2.1,
      icon: FileText,
      color: 'orange',
      link: '/admin/invoices',
    },
    {
      title: 'Monthly Revenue',
      value: `£${stats.monthlyRevenue.toLocaleString()}`,
      change: stats.revenueChange,
      icon: DollarSign,
      color: 'green',
      link: '/admin/analytics',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const isPositive = card.change >= 0;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={card.link}
                className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-r from-${card.color}-500/20 to-${card.color}-600/20 rounded-xl border border-${card.color}-500/30`}
                  >
                    <Icon className={`w-6 h-6 text-${card.color}-400`} />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      isPositive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{Math.abs(card.change)}%</span>
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className={`p-2 bg-${activity.color}-500/20 rounded-lg`}>
                      <Icon className={`w-5 h-5 text-${activity.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.description}</p>
                      <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            </div>

            <div className="space-y-3">
              <Link
                to="/admin/clients?action=new"
                className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Add Client</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/admin/projects?action=new"
                className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <FolderKanban className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">New Project</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/admin/invoices?action=new"
                className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-xl hover:bg-green-500/20 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Create Invoice</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
            </div>
            <p className="text-gray-400 text-sm">No upcoming deadlines</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
