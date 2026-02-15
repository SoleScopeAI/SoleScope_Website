import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  FolderKanban,
  FileText,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { ActivityLog } from '../../lib/supabase';

interface DashboardStats {
  totalClients: number;
  activeProjects: number;
  pendingInvoices: number;
  monthlyRevenue: number;
  clientsChange: number;
  projectsChange: number;
  revenueChange: number;
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
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<{ id: string; project_name: string; due_date: string; client_name: string }[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [clientsResult, projectsResult, invoicesResult, activitiesResult] = await Promise.all([
        supabase.from('clients').select('id, status, created_at'),
        supabase.from('projects').select('id, status, created_at, due_date, project_name, client_id, clients(company_name)'),
        supabase.from('invoices').select('id, status, total_amount, created_at, issue_date'),
        supabase.from('activity_logs').select('*, admin_users(full_name)').order('created_at', { ascending: false }).limit(8),
      ]);

      const clients = clientsResult.data || [];
      const projects = projectsResult.data || [];
      const invoices = invoicesResult.data || [];

      const totalClients = clients.length;
      const activeProjects = projects.filter((p) => p.status === 'in_progress' || p.status === 'planning').length;
      const pendingInvoices = invoices.filter((i) => i.status === 'sent' || i.status === 'overdue').length;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthlyRevenue = invoices
        .filter((inv) => {
          const d = new Date(inv.issue_date);
          return inv.status === 'paid' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      const recentClients = clients.filter((c) => new Date(c.created_at) > thirtyDaysAgo).length;
      const prevClients = clients.filter((c) => { const d = new Date(c.created_at); return d > sixtyDaysAgo && d <= thirtyDaysAgo; }).length;
      const clientsChange = prevClients > 0 ? ((recentClients - prevClients) / prevClients) * 100 : recentClients > 0 ? 100 : 0;

      const recentProjects = projects.filter((p) => new Date(p.created_at) > thirtyDaysAgo).length;
      const prevProjects = projects.filter((p) => { const d = new Date(p.created_at); return d > sixtyDaysAgo && d <= thirtyDaysAgo; }).length;
      const projectsChange = prevProjects > 0 ? ((recentProjects - prevProjects) / prevProjects) * 100 : recentProjects > 0 ? 100 : 0;

      const prevMonth = new Date(currentYear, currentMonth - 1, 1);
      const prevMonthEnd = new Date(currentYear, currentMonth, 0);
      const prevMonthRevenue = invoices
        .filter((inv) => {
          const d = new Date(inv.issue_date);
          return inv.status === 'paid' && d >= prevMonth && d <= prevMonthEnd;
        })
        .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
      const revenueChange = prevMonthRevenue > 0 ? ((monthlyRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 : monthlyRevenue > 0 ? 100 : 0;

      setStats({
        totalClients,
        activeProjects,
        pendingInvoices,
        monthlyRevenue,
        clientsChange: Math.round(clientsChange * 10) / 10,
        projectsChange: Math.round(projectsChange * 10) / 10,
        revenueChange: Math.round(revenueChange * 10) / 10,
      });

      setActivities(activitiesResult.data || []);

      const deadlines = projects
        .filter((p) => p.due_date && (p.status === 'in_progress' || p.status === 'planning') && new Date(p.due_date) >= now)
        .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
        .slice(0, 5)
        .map((p) => ({
          id: p.id,
          project_name: p.project_name,
          due_date: p.due_date!,
          client_name: (p.clients as any)?.company_name || 'Unknown',
        }));
      setUpcomingDeadlines(deadlines);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (actionType: string) => {
    if (actionType.includes('client')) return Users;
    if (actionType.includes('project')) return FolderKanban;
    if (actionType.includes('invoice')) return FileText;
    if (actionType.includes('admin')) return Users;
    return Activity;
  };

  const getActivityColor = (actionType: string) => {
    if (actionType.includes('created')) return 'bg-teal-500/20 text-teal-400';
    if (actionType.includes('updated') || actionType.includes('activated')) return 'bg-blue-500/20 text-blue-400';
    if (actionType.includes('deleted') || actionType.includes('deactivated')) return 'bg-red-500/20 text-red-400';
    if (actionType.includes('paid')) return 'bg-green-500/20 text-green-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  const formatTimeAgo = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  const statCards = [
    { title: 'Total Clients', value: stats.totalClients.toString(), change: stats.clientsChange, icon: Users, link: '/admin/clients', color: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400' },
    { title: 'Active Projects', value: stats.activeProjects.toString(), change: stats.projectsChange, icon: FolderKanban, link: '/admin/projects', color: 'from-blue-500/20 to-sky-500/20 border-blue-500/30 text-blue-400' },
    { title: 'Pending Invoices', value: stats.pendingInvoices.toString(), change: -2.1, icon: FileText, link: '/admin/invoices', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400' },
    { title: 'Monthly Revenue', value: `£${stats.monthlyRevenue.toLocaleString()}`, change: stats.revenueChange, icon: DollarSign, link: '/admin/analytics', color: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
          const colorClasses = card.color.split(' ');
          const iconColorClass = colorClasses[colorClasses.length - 1];

          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
              <Link to={card.link} className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${card.color.split(' ').slice(0, 3).join(' ')} rounded-xl border`}>
                    <Icon className={`w-6 h-6 ${iconColorClass}`} />
                  </div>
                  {card.change !== 0 && (
                    <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      <span>{Math.abs(card.change)}%</span>
                    </div>
                  )}
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
              <Link to="/admin/analytics" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                View All
              </Link>
            </div>

            {activities.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No activity yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity.action_type);
                  const colorClass = getActivityColor(activity.action_type);
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className={`p-2 rounded-lg ${colorClass.split(' ')[0]}`}>
                        <Icon className={`w-5 h-5 ${colorClass.split(' ')[1]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{activity.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {activity.admin_users && (
                            <span className="text-xs text-gray-500">{(activity.admin_users as any).full_name}</span>
                          )}
                          <span className="text-xs text-gray-600">{formatTimeAgo(activity.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/admin/clients" className="flex items-center justify-between p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl hover:bg-teal-500/20 transition-colors group">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-teal-400" />
                  <span className="text-white font-medium">Add Client</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/admin/projects" className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition-colors group">
                <div className="flex items-center space-x-3">
                  <FolderKanban className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">New Project</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/admin/invoices" className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 transition-colors group">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-medium">Create Invoice</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-teal-400" />
              <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
            </div>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-gray-400 text-sm">No upcoming deadlines</p>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((dl) => (
                  <div key={dl.id} className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white text-sm font-medium truncate">{dl.project_name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{dl.client_name}</span>
                      <span className="text-xs text-amber-400">{new Date(dl.due_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
