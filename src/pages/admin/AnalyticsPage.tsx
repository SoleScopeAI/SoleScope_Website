import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, DollarSign, FolderKanban, FileText, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface MonthlyData { month: string; revenue: number; clients: number; projects: number; invoices: number; }

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [totalClients, setTotalClients] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState<{ status: string; count: number; color: string }[]>([]);
  const [recentLogs, setRecentLogs] = useState<{ id: string; description: string; created_at: string; action_type: string }[]>([]);
  const [topClients, setTopClients] = useState<{ name: string; revenue: number; projects: number }[]>([]);

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async () => {
    const [clientsRes, projectsRes, invoicesRes, logsRes] = await Promise.all([
      supabase.from('clients').select('id, company_name, created_at, status'),
      supabase.from('projects').select('id, status, client_id, created_at, clients(company_name)'),
      supabase.from('invoices').select('id, status, total_amount, client_id, issue_date, paid_date, clients(company_name)'),
      supabase.from('activity_logs').select('id, description, created_at, action_type').order('created_at', { ascending: false }).limit(15),
    ]);

    const clients = clientsRes.data || [];
    const projects = projectsRes.data || [];
    const invoices = invoicesRes.data || [];

    setTotalClients(clients.length);
    setTotalProjects(projects.length);
    setTotalInvoices(invoices.length);
    setTotalRevenue(invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.total_amount, 0));
    setRecentLogs(logsRes.data || []);

    const statusMap: Record<string, number> = {};
    projects.forEach((p) => { statusMap[p.status] = (statusMap[p.status] || 0) + 1; });
    const statusColors: Record<string, string> = { planning: '#06b6d4', in_progress: '#3b82f6', review: '#f59e0b', completed: '#22c55e', on_hold: '#6b7280' };
    setStatusBreakdown(Object.entries(statusMap).map(([status, count]) => ({ status: status.replace('_', ' '), count, color: statusColors[status] || '#6b7280' })));

    const months: MonthlyData[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth();
      const y = d.getFullYear();
      const label = d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
      months.push({
        month: label,
        revenue: invoices.filter((inv) => { const id = new Date(inv.issue_date); return inv.status === 'paid' && id.getMonth() === m && id.getFullYear() === y; }).reduce((s, inv) => s + inv.total_amount, 0),
        clients: clients.filter((c) => { const cd = new Date(c.created_at); return cd.getMonth() === m && cd.getFullYear() === y; }).length,
        projects: projects.filter((p) => { const pd = new Date(p.created_at); return pd.getMonth() === m && pd.getFullYear() === y; }).length,
        invoices: invoices.filter((inv) => { const id = new Date(inv.issue_date); return id.getMonth() === m && id.getFullYear() === y; }).length,
      });
    }
    setMonthlyData(months);

    const clientRevMap: Record<string, { name: string; revenue: number; projects: number }> = {};
    invoices.filter((i) => i.status === 'paid').forEach((inv) => {
      const name = (inv.clients as any)?.company_name || 'Unknown';
      if (!clientRevMap[name]) clientRevMap[name] = { name, revenue: 0, projects: 0 };
      clientRevMap[name].revenue += inv.total_amount;
    });
    projects.forEach((p) => {
      const name = (p.clients as any)?.company_name || 'Unknown';
      if (!clientRevMap[name]) clientRevMap[name] = { name, revenue: 0, projects: 0 };
      clientRevMap[name].projects += 1;
    });
    setTopClients(Object.values(clientRevMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5));
    setLoading(false);
  };

  const maxRevenue = Math.max(...monthlyData.map((m) => m.revenue), 1);
  const totalStatusCount = statusBreakdown.reduce((s, b) => s + b.count, 0);

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="text-center"><div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400">Loading analytics...</p></div></div>;
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-white mb-2">Analytics</h1><p className="text-gray-400">Track business performance and insights</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Clients', value: totalClients, icon: Users, color: 'teal' },
          { title: 'Total Revenue', value: `£${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'green' },
          { title: 'Total Projects', value: totalProjects, icon: FolderKanban, color: 'blue' },
          { title: 'Total Invoices', value: totalInvoices, icon: FileText, color: 'amber' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${card.color}-500/20 rounded-xl`}><Icon className={`w-6 h-6 text-${card.color}-400`} /></div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Revenue (Last 6 Months)</h2>
          <div className="flex items-end justify-between h-48 space-x-2">
            {monthlyData.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-center mb-2">
                  <div className="w-full max-w-[40px] bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-lg transition-all hover:from-teal-400 hover:to-cyan-300" style={{ height: `${Math.max((m.revenue / maxRevenue) * 140, 4)}px` }} title={`£${m.revenue.toLocaleString()}`} />
                </div>
                <span className="text-xs text-gray-400 mt-1">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Project Status</h2>
          {statusBreakdown.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400">No projects yet</div>
          ) : (
            <div className="space-y-4">
              {statusBreakdown.map((s) => (
                <div key={s.status}>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-300 capitalize">{s.status}</span><span className="text-white font-medium">{s.count}</span></div>
                  <div className="w-full bg-white/10 rounded-full h-3"><div className="h-3 rounded-full transition-all" style={{ width: `${(s.count / totalStatusCount) * 100}%`, backgroundColor: s.color }} /></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Top Clients</h2>
          {topClients.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No client data yet</div>
          ) : (
            <div className="space-y-4">
              {topClients.map((client, i) => (
                <div key={client.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 font-bold text-sm">{i + 1}</span>
                    <div><p className="text-white font-medium text-sm">{client.name}</p><p className="text-xs text-gray-400">{client.projects} project{client.projects !== 1 ? 's' : ''}</p></div>
                  </div>
                  <span className="text-white font-semibold">£{client.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          {recentLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No activity yet</div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                  <Activity className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{log.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(log.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
