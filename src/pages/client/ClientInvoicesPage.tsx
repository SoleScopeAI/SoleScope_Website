import React, { useEffect, useState } from 'react';
import { FileText, ExternalLink, Clock, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import { supabase } from '../../lib/supabase';

interface Invoice {
  id: string;
  invoice_number: string;
  status: string;
  total_amount: number;
  subtotal: number | null;
  vat_amount: number | null;
  due_date: string;
  issue_date: string;
  stripe_payment_link: string | null;
  notes: string | null;
}

interface LineItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

const ClientInvoicesPage = () => {
  const { clientUser } = useClientAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (clientUser?.client_id) loadInvoices();
  }, [clientUser?.client_id]);

  const loadInvoices = async () => {
    const [invoicesRes, itemsRes] = await Promise.all([
      supabase
        .from('invoices')
        .select('*')
        .eq('client_id', clientUser!.client_id)
        .order('issue_date', { ascending: false }),
      supabase
        .from('invoice_line_items')
        .select('*'),
    ]);

    setInvoices(invoicesRes.data || []);
    setLineItems(itemsRes.data || []);
    setLoading(false);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
      draft: { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: FileText },
      sent: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Clock },
      paid: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: CheckCircle2 },
      overdue: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: AlertCircle },
    };
    return configs[status] || configs.draft;
  };

  const totalOutstanding = invoices
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((s, i) => s + i.total_amount, 0);

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((s, i) => s + i.total_amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Invoices</h1>
        <p className="text-gray-400">View and pay your invoices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Outstanding</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalOutstanding)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(totalPaid)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Invoices</p>
          <p className="text-2xl font-bold text-white">{invoices.length}</p>
        </motion.div>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Invoices Yet</h3>
          <p className="text-gray-400">Your invoices will appear here once they are issued.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice, i) => {
            const status = getStatusConfig(invoice.status);
            const StatusIcon = status.icon;
            const items = lineItems.filter((li) => li.invoice_id === invoice.id);
            const isExpanded = expandedId === invoice.id;

            return (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-white/[0.03] transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : invoice.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bg}`}>
                        <StatusIcon className={`w-5 h-5 ${status.color}`} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">#{invoice.invoice_number}</h3>
                        <p className="text-sm text-gray-400">
                          Issued: {new Date(invoice.issue_date).toLocaleDateString()} | Due: {new Date(invoice.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color} ${status.bg} ${status.border}`}>
                        {invoice.status}
                      </span>
                      <span className="text-white font-bold text-lg">{formatCurrency(invoice.total_amount)}</span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-white/10 p-6 bg-white/[0.02]">
                    {items.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-400 mb-3">Line Items</h4>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-sm">
                              <span className="text-white">{item.description}</span>
                              <div className="flex items-center space-x-6">
                                <span className="text-gray-400">{item.quantity} x {formatCurrency(item.unit_price)}</span>
                                <span className="text-white font-medium">{formatCurrency(item.total)}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-sm">
                          {invoice.subtotal !== null && (
                            <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span className="text-white">{formatCurrency(invoice.subtotal)}</span></div>
                          )}
                          {invoice.vat_amount !== null && invoice.vat_amount > 0 && (
                            <div className="flex justify-between"><span className="text-gray-400">VAT</span><span className="text-white">{formatCurrency(invoice.vat_amount)}</span></div>
                          )}
                          <div className="flex justify-between text-base font-bold"><span className="text-white">Total</span><span className="text-white">{formatCurrency(invoice.total_amount)}</span></div>
                        </div>
                      </div>
                    )}

                    {invoice.notes && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Notes</h4>
                        <p className="text-sm text-gray-300">{invoice.notes}</p>
                      </div>
                    )}

                    {invoice.stripe_payment_link && invoice.status !== 'paid' && (
                      <a
                        href={invoice.stripe_payment_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Pay Now</span>
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientInvoicesPage;
