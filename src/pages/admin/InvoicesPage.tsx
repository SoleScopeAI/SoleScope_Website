import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Search, X, AlertCircle, Trash2, Edit, ExternalLink, Copy, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import type { Invoice, Client, Project } from '../../lib/supabase';

interface LineItem { description: string; quantity: number; unit_price: number; }

type InvoiceFormData = {
  client_id: string; project_id: string; status: Invoice['status'];
  issue_date: string; due_date: string; notes: string; tax_rate: number;
  stripe_payment_link: string; line_items: LineItem[];
};

const emptyLine: LineItem = { description: '', quantity: 1, unit_price: 0 };
const emptyForm: InvoiceFormData = {
  client_id: '', project_id: '', status: 'draft', issue_date: new Date().toISOString().split('T')[0],
  due_date: '', notes: '', tax_rate: 20, stripe_payment_link: '', line_items: [{ ...emptyLine }],
};

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<(Invoice & { clients?: { company_name: string; email: string }; projects?: { project_name: string } })[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientProjects, setClientProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [form, setForm] = useState<InvoiceFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const { adminUser } = useAdminAuth();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [invRes, clientRes] = await Promise.all([
      supabase.from('invoices').select('*, clients(company_name, email), projects(project_name)').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, company_name').order('company_name'),
    ]);
    setInvoices(invRes.data || []);
    setClients(clientRes.data || []);
    setLoading(false);
  };

  const loadClientProjects = async (clientId: string) => {
    if (!clientId) { setClientProjects([]); return; }
    const { data } = await supabase.from('projects').select('id, project_name').eq('client_id', clientId);
    setClientProjects(data || []);
  };

  const openCreate = () => {
    setEditingInvoice(null); setForm(emptyForm); setClientProjects([]); setError(''); setShowModal(true);
  };

  const openEdit = async (inv: Invoice) => {
    setEditingInvoice(inv);
    const { data: lines } = await supabase.from('invoice_line_items').select('*').eq('invoice_id', inv.id).order('order_index');
    await loadClientProjects(inv.client_id);
    setForm({
      client_id: inv.client_id, project_id: inv.project_id || '', status: inv.status,
      issue_date: inv.issue_date, due_date: inv.due_date, notes: inv.notes || '',
      tax_rate: inv.tax_rate, stripe_payment_link: inv.stripe_payment_link || '',
      line_items: lines?.length ? lines.map((l) => ({ description: l.description, quantity: l.quantity, unit_price: l.unit_price })) : [{ ...emptyLine }],
    });
    setError(''); setShowModal(true);
  };

  const calcSubtotal = () => form.line_items.reduce((sum, l) => sum + l.quantity * l.unit_price, 0);
  const calcTax = () => calcSubtotal() * (form.tax_rate / 100);
  const calcTotal = () => calcSubtotal() + calcTax();

  const updateLine = (idx: number, field: keyof LineItem, value: string | number) => {
    const updated = [...form.line_items];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, line_items: updated });
  };

  const handleSave = async () => {
    if (!form.client_id || form.line_items.every((l) => !l.description.trim())) {
      setError('Client and at least one line item are required'); return;
    }
    setSaving(true); setError('');

    const subtotal = calcSubtotal();
    const taxAmount = calcTax();
    const total = calcTotal();

    let invoiceNumber = editingInvoice?.invoice_number;
    if (!invoiceNumber) {
      const { count } = await supabase.from('invoices').select('id', { count: 'exact', head: true });
      invoiceNumber = `INV-${String((count || 0) + 1).padStart(4, '0')}`;
    }

    const payload = {
      invoice_number: invoiceNumber,
      client_id: form.client_id, project_id: form.project_id || null,
      status: form.status, issue_date: form.issue_date, due_date: form.due_date,
      notes: form.notes.trim() || null, tax_rate: form.tax_rate,
      subtotal, tax_amount: taxAmount, total_amount: total,
      stripe_payment_link: form.stripe_payment_link.trim() || null,
      ...(editingInvoice ? {} : { created_by: adminUser?.id || null }),
    };

    let invoiceId = editingInvoice?.id;
    if (editingInvoice) {
      const { error: err } = await supabase.from('invoices').update(payload).eq('id', editingInvoice.id);
      if (err) { setError(err.message); setSaving(false); return; }
      await supabase.from('invoice_line_items').delete().eq('invoice_id', editingInvoice.id);
    } else {
      const { data, error: err } = await supabase.from('invoices').insert(payload).select('id').maybeSingle();
      if (err || !data) { setError(err?.message || 'Failed to create invoice'); setSaving(false); return; }
      invoiceId = data.id;
    }

    const linePayloads = form.line_items
      .filter((l) => l.description.trim())
      .map((l, idx) => ({
        invoice_id: invoiceId!, description: l.description.trim(),
        quantity: l.quantity, unit_price: l.unit_price, total: l.quantity * l.unit_price, order_index: idx,
      }));
    if (linePayloads.length) await supabase.from('invoice_line_items').insert(linePayloads);

    try { await supabase.from('activity_logs').insert({ admin_user_id: adminUser?.id, action_type: editingInvoice ? 'invoice_updated' : 'invoice_created', entity_type: 'invoice', entity_id: invoiceId, description: `${editingInvoice ? 'Updated' : 'Created'} invoice: ${invoiceNumber}` }); } catch {}

    setShowModal(false); setSaving(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('invoice_line_items').delete().eq('invoice_id', id);
    await supabase.from('invoices').delete().eq('id', id);
    setDeleteConfirm(null); fetchData();
  };

  const copyPaymentLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getStatusColor = (s: string) => ({ paid: 'bg-green-500/20 text-green-400 border-green-500/30', sent: 'bg-blue-500/20 text-blue-400 border-blue-500/30', draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30', overdue: 'bg-red-500/20 text-red-400 border-red-500/30', cancelled: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }[s] || 'bg-gray-500/20 text-gray-400 border-gray-500/30');

  const totalOutstanding = invoices.filter((i) => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.total_amount, 0);
  const paidThisMonth = invoices.filter((i) => { const d = new Date(i.paid_date || ''); const n = new Date(); return i.status === 'paid' && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).reduce((s, i) => s + i.total_amount, 0);
  const overdueCount = invoices.filter((i) => i.status === 'overdue').length;
  const draftCount = invoices.filter((i) => i.status === 'draft').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="text-3xl font-bold text-white mb-2">Invoices</h1><p className="text-gray-400">Manage billing and payments</p></div>
        <button onClick={openCreate} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl transition-all">
          <Plus className="w-5 h-5" /><span>Create Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><p className="text-gray-400 text-sm mb-2">Total Outstanding</p><p className="text-2xl font-bold text-white">£{totalOutstanding.toLocaleString()}</p></div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><p className="text-gray-400 text-sm mb-2">Paid This Month</p><p className="text-2xl font-bold text-green-400">£{paidThisMonth.toLocaleString()}</p></div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><p className="text-gray-400 text-sm mb-2">Overdue</p><p className="text-2xl font-bold text-red-400">{overdueCount}</p></div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6"><p className="text-gray-400 text-sm mb-2">Drafts</p><p className="text-2xl font-bold text-white">{draftCount}</p></div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        {loading ? (
          <div className="text-center py-12"><div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400">Loading...</p></div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-12"><FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" /><p className="text-gray-400 mb-4">No invoices yet</p><button onClick={openCreate} className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl">Create Your First Invoice</button></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Invoice</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Issue Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Due Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{inv.invoice_number}</td>
                    <td className="py-4 px-4 text-gray-300">{(inv.clients as any)?.company_name}</td>
                    <td className="py-4 px-4 text-gray-400">{new Date(inv.issue_date).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-400">{new Date(inv.due_date).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-white font-semibold">£{inv.total_amount.toLocaleString()}</td>
                    <td className="py-4 px-4"><span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(inv.status)}`}>{inv.status}</span></td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-1">
                        {inv.stripe_payment_link && (
                          <button onClick={() => copyPaymentLink(inv.stripe_payment_link!, inv.id)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="Copy payment link">
                            {copiedLink === inv.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        )}
                        <button onClick={() => openEdit(inv)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(inv.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold text-white">{editingInvoice ? 'Edit Invoice' : 'New Invoice'}</h2><button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><X className="w-5 h-5" /></button></div>
              {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3"><AlertCircle className="w-5 h-5 text-red-400" /><p className="text-red-400 text-sm">{error}</p></div>}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Client *</label><select value={form.client_id} onChange={(e) => { setForm({ ...form, client_id: e.target.value, project_id: '' }); loadClientProjects(e.target.value); }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"><option value="" className="bg-gray-900">Select client</option>{clients.map((c) => <option key={c.id} value={c.id} className="bg-gray-900">{c.company_name}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Project</label><select value={form.project_id} onChange={(e) => setForm({ ...form, project_id: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"><option value="" className="bg-gray-900">None</option>{clientProjects.map((p) => <option key={p.id} value={p.id} className="bg-gray-900">{p.project_name}</option>)}</select></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Invoice['status'] })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">{(['draft', 'sent', 'paid', 'overdue', 'cancelled'] as const).map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Issue Date</label><input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label><input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Stripe Payment Link</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="url" value={form.stripe_payment_link} onChange={(e) => setForm({ ...form, stripe_payment_link: e.target.value })} placeholder="https://buy.stripe.com/..." className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3"><label className="text-sm font-medium text-gray-300">Line Items</label><button type="button" onClick={() => setForm({ ...form, line_items: [...form.line_items, { ...emptyLine }] })} className="text-sm text-purple-400 hover:text-purple-300">+ Add Line</button></div>
                  <div className="space-y-3">
                    {form.line_items.map((line, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-3 items-start">
                        <div className="col-span-6"><input type="text" value={line.description} onChange={(e) => updateLine(idx, 'description', e.target.value)} placeholder="Description" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                        <div className="col-span-2"><input type="number" min="1" value={line.quantity} onChange={(e) => updateLine(idx, 'quantity', parseInt(e.target.value) || 1)} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                        <div className="col-span-3"><input type="number" min="0" step="0.01" value={line.unit_price} onChange={(e) => updateLine(idx, 'unit_price', parseFloat(e.target.value) || 0)} placeholder="£0.00" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
                        <div className="col-span-1 flex items-center justify-center pt-1">{form.line_items.length > 1 && <button type="button" onClick={() => setForm({ ...form, line_items: form.line_items.filter((_, i) => i !== idx) })} className="p-1.5 hover:bg-red-500/10 rounded text-gray-400 hover:text-red-400"><X className="w-4 h-4" /></button>}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Notes</label><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" /></div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span className="text-white">£{calcSubtotal().toFixed(2)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-400">VAT</span><div className="flex items-center space-x-2"><input type="number" min="0" max="100" value={form.tax_rate} onChange={(e) => setForm({ ...form, tax_rate: parseFloat(e.target.value) || 0 })} className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm text-center" /><span className="text-gray-400">%</span><span className="text-white">£{calcTax().toFixed(2)}</span></div></div>
                    <div className="flex justify-between pt-3 border-t border-white/10"><span className="text-white font-semibold">Total</span><span className="text-white font-bold text-lg">£{calcTotal().toFixed(2)}</span></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl disabled:opacity-50">{saving ? 'Saving...' : editingInvoice ? 'Update' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-3">Delete Invoice?</h3>
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

export default InvoicesPage;
