import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderKanban, Plus, Search, Calendar, X, AlertCircle, Trash2, Edit } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import type { Project, Client } from '../../lib/supabase';

type ProjectFormData = {
  project_name: string;
  project_type: string;
  client_id: string;
  status: Project['status'];
  priority: Project['priority'];
  description: string;
  start_date: string;
  due_date: string;
  budget: string;
  progress_percentage: number;
};

const emptyForm: ProjectFormData = {
  project_name: '', project_type: 'website', client_id: '', status: 'planning',
  priority: 'medium', description: '', start_date: '', due_date: '', budget: '', progress_percentage: 0,
};

const projectTypes = ['website', 'web_app', 'ai_automation', 'voice_agent', 'dashboard', 'branding', 'custom'];
const statusList: Project['status'][] = ['planning', 'in_progress', 'review', 'completed', 'on_hold'];
const priorityList: Project['priority'][] = ['low', 'medium', 'high', 'urgent'];

const ProjectsPage = () => {
  const [projects, setProjects] = useState<(Project & { clients?: { company_name: string } })[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { adminUser } = useAdminAuth();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [pRes, cRes] = await Promise.all([
      supabase.from('projects').select('*, clients(company_name)').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, company_name, status').order('company_name'),
    ]);
    setProjects(pRes.data || []);
    setClients(cRes.data || []);
    setLoading(false);
  };

  const openCreate = () => { setEditingProject(null); setForm(emptyForm); setError(''); setShowModal(true); };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm({
      project_name: p.project_name, project_type: p.project_type, client_id: p.client_id,
      status: p.status, priority: p.priority, description: p.description || '',
      start_date: p.start_date || '', due_date: p.due_date || '',
      budget: p.budget?.toString() || '', progress_percentage: p.progress_percentage,
    });
    setError(''); setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.project_name.trim() || !form.client_id) { setError('Project name and client are required'); return; }
    setSaving(true); setError('');
    const payload = {
      project_name: form.project_name.trim(), project_type: form.project_type, client_id: form.client_id,
      status: form.status, priority: form.priority, description: form.description.trim() || null,
      start_date: form.start_date || null, due_date: form.due_date || null,
      budget: form.budget ? parseFloat(form.budget) : null, progress_percentage: form.progress_percentage,
      ...(editingProject ? {} : { created_by: adminUser?.id || null }),
    };
    const result = editingProject
      ? await supabase.from('projects').update(payload).eq('id', editingProject.id)
      : await supabase.from('projects').insert(payload);
    if (result.error) { setError(result.error.message); setSaving(false); return; }
    try { await supabase.from('activity_logs').insert({ admin_user_id: adminUser?.id, action_type: editingProject ? 'project_updated' : 'project_created', entity_type: 'project', description: `${editingProject ? 'Updated' : 'Created'} project: ${form.project_name}` }); } catch {}
    setShowModal(false); setSaving(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    setDeleteConfirm(null); fetchData();
  };

  const filtered = projects.filter((p) => {
    const s = searchTerm.toLowerCase();
    const matchSearch = p.project_name.toLowerCase().includes(s) || (p.clients as any)?.company_name?.toLowerCase().includes(s);
    return matchSearch && (statusFilter === 'all' || p.status === statusFilter);
  });

  const getStatusColor = (s: string) => ({ completed: 'bg-green-500/20 text-green-400 border-green-500/30', in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30', planning: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', review: 'bg-amber-500/20 text-amber-400 border-amber-500/30', on_hold: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }[s] || 'bg-gray-500/20 text-gray-400 border-gray-500/30');
  const getPriorityColor = (p: string) => ({ urgent: 'bg-red-500/20 text-red-400', high: 'bg-orange-500/20 text-orange-400', medium: 'bg-yellow-500/20 text-yellow-400', low: 'bg-green-500/20 text-green-400' }[p] || 'bg-gray-500/20 text-gray-400');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage and track client projects</p>
        </div>
        <button onClick={openCreate} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all">
          <Plus className="w-5 h-5" /><span>New Project</span>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none">
            <option value="all" className="bg-gray-900">All Status</option>
            {statusList.map((s) => <option key={s} value={s} className="bg-gray-900">{s.replace('_', ' ')}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12"><div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400">Loading...</p></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">{searchTerm || statusFilter !== 'all' ? 'No matching projects' : 'No projects yet'}</p>
            {!searchTerm && statusFilter === 'all' && <button onClick={openCreate} className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl transition-all">Create Your First Project</button>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">{project.project_name}</h3>
                    <p className="text-sm text-gray-400">{(project.clients as any)?.company_name}</p>
                    <p className="text-xs text-gray-500 mt-1">{project.project_type.replace('_', ' ')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(project.priority)}`}>{project.priority}</span>
                </div>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Progress</span><span className="text-white font-medium">{project.progress_percentage}%</span></div>
                    <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full" style={{ width: `${project.progress_percentage}%` }} /></div>
                  </div>
                  {project.due_date && <div className="flex items-center space-x-2 text-sm text-gray-400"><Calendar className="w-4 h-4" /><span>Due: {new Date(project.due_date).toLocaleDateString()}</span></div>}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(project.status)}`}>{project.status.replace('_', ' ')}</span>
                  <div className="flex items-center space-x-1">
                    {project.budget != null && <span className="text-white font-semibold text-sm mr-2">£{project.budget.toLocaleString()}</span>}
                    <button onClick={() => openEdit(project)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteConfirm(project.id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold text-white">{editingProject ? 'Edit Project' : 'New Project'}</h2><button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><X className="w-5 h-5" /></button></div>
              {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3"><AlertCircle className="w-5 h-5 text-red-400" /><p className="text-red-400 text-sm">{error}</p></div>}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label><input type="text" value={form.project_name} onChange={(e) => setForm({ ...form, project_name: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Project name" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Client *</label><select value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"><option value="" className="bg-gray-900">Select client</option>{clients.map((c) => <option key={c.id} value={c.id} className="bg-gray-900">{c.company_name}</option>)}</select></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Type</label><select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none">{projectTypes.map((t) => <option key={t} value={t} className="bg-gray-900">{t.replace('_', ' ')}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Project['status'] })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none">{statusList.map((s) => <option key={s} value={s} className="bg-gray-900">{s.replace('_', ' ')}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Priority</label><select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Project['priority'] })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none">{priorityList.map((p) => <option key={p} value={p} className="bg-gray-900">{p}</option>)}</select></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label><input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label><input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Budget (£)</label><input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="0" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Progress: {form.progress_percentage}%</label><input type="range" min="0" max="100" step="5" value={form.progress_percentage} onChange={(e) => setForm({ ...form, progress_percentage: parseInt(e.target.value) })} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500" /></div>
              </div>
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl disabled:opacity-50">{saving ? 'Saving...' : editingProject ? 'Update' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-3">Delete Project?</h3>
              <p className="text-gray-400 mb-6">This cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setDeleteConfirm(null)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
