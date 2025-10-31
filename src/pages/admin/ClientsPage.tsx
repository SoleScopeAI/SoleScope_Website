import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Filter, Mail, Phone, Building, MoreVertical, Edit, Trash2, Eye, Package, X, Copy, Check, UserPlus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { clientUserService } from '../../lib/passwordUtils';

interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  status: string;
  industry: string | null;
  lifetime_value: number;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  base_price: number;
  billing_type: string;
}

interface ProductPackage {
  id: string;
  name: string;
  price: number;
  billing_cycle: string;
}

interface Subscription {
  id: string;
  product_id: string | null;
  package_id: string | null;
  status: string;
  amount: number;
  billing_cycle: string;
  start_date: string;
  product?: Product;
  package?: ProductPackage;
}

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSubscriptions, setClientSubscriptions] = useState<Subscription[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [packages, setPackages] = useState<ProductPackage[]>([]);
  const { adminUser } = useAdminAuth();

  const [newClient, setNewClient] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    industry: '',
    company_size: '',
    notes: '',
    status: 'prospect',
  });

  const [createPortalUser, setCreatePortalUser] = useState(false);
  const [portalUserEmail, setPortalUserEmail] = useState('');
  const [portalUserName, setPortalUserName] = useState('');
  const [customTempPassword, setCustomTempPassword] = useState('');
  const [useCustomPassword, setUseCustomPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [clientCreatedSuccess, setClientCreatedSuccess] = useState(false);
  const [createdClientName, setCreatedClientName] = useState('');

  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchProductsAndPackages();
  }, []);

  useEffect(() => {
    filterClients();
  }, [searchTerm, statusFilter, clients]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsAndPackages = async () => {
    try {
      const [productsRes, packagesRes] = await Promise.all([
        supabase.from('products').select('id, name, slug, category, base_price, billing_type').eq('is_active', true),
        supabase.from('packages').select('id, name, price, billing_cycle').eq('is_active', true),
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      if (packagesRes.data) setPackages(packagesRes.data);
    } catch (error) {
      console.error('Error fetching products/packages:', error);
    }
  };

  const fetchClientSubscriptions = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('client_subscriptions')
        .select(`
          *,
          product:products(id, name, slug, category, base_price, billing_type),
          package:packages(id, name, price, billing_cycle)
        `)
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleManageSubscriptions = async (client: Client) => {
    setSelectedClient(client);
    await fetchClientSubscriptions(client.id);
    setShowSubscriptionModal(true);
  };

  const handleAddSubscription = async (type: 'product' | 'package', id: string) => {
    if (!selectedClient) return;

    try {
      const item = type === 'product'
        ? products.find(p => p.id === id)
        : packages.find(p => p.id === id);

      if (!item) return;

      const amount = 'base_price' in item ? item.base_price : item.price;
      const billing_cycle = 'billing_type' in item ? item.billing_type : item.billing_cycle;

      const { error } = await supabase.from('client_subscriptions').insert({
        client_id: selectedClient.id,
        [type === 'product' ? 'product_id' : 'package_id']: id,
        status: 'active',
        billing_cycle,
        amount,
        created_by: adminUser?.id,
      });

      if (error) throw error;
      await fetchClientSubscriptions(selectedClient.id);
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };

  const filterClients = () => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((client) => client.status === statusFilter);
    }

    setFilteredClients(filtered);
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!adminUser?.id) {
        setError('You must be logged in to add a client');
        return;
      }

      const clientData = {
        company_name: newClient.company_name.trim(),
        contact_name: newClient.contact_name.trim(),
        email: newClient.email.trim().toLowerCase(),
        phone: newClient.phone.trim() || null,
        website: newClient.website.trim() || null,
        address: newClient.address.trim() || null,
        industry: newClient.industry.trim() || null,
        company_size: newClient.company_size.trim() || null,
        notes: newClient.notes.trim() || null,
        status: newClient.status,
        created_by: adminUser.id,
        lifetime_value: 0,
        tags: [],
      };

      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message || 'Failed to add client. Please try again.');
        return;
      }

      setClientCreatedSuccess(true);
      setCreatedClientName(data[0].company_name);

      if (createPortalUser && data && data[0]) {
        const clientId = data[0].id;
        const userEmail = portalUserEmail || newClient.email;
        const userName = portalUserName || newClient.contact_name;

        const userResult = await clientUserService.createClientUser({
          clientId,
          email: userEmail,
          fullName: userName,
          createdBy: adminUser.id,
          customTemporaryPassword: useCustomPassword ? customTempPassword : undefined,
        });

        if (userResult.success && userResult.temporaryPassword) {
          setGeneratedPassword(userResult.temporaryPassword);
        } else {
          setError(`Client created successfully, but portal user failed: ${userResult.error}`);
        }
      } else {
        setTimeout(() => {
          setShowAddModal(false);
          resetForm();
        }, 2000);
      }

      await fetchClients();
    } catch (error) {
      console.error('Error adding client:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewClient({
      company_name: '',
      contact_name: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      industry: '',
      company_size: '',
      notes: '',
      status: 'prospect',
    });
    setCreatePortalUser(false);
    setPortalUserEmail('');
    setPortalUserName('');
    setCustomTempPassword('');
    setUseCustomPassword(false);
    setGeneratedPassword(null);
    setPasswordCopied(false);
    setClientCreatedSuccess(false);
    setCreatedClientName('');
    setError('');
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'lead':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'onboarding':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'trial':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'churned':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'archived':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-gray-400">Manage your client relationships</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="prospect">Prospects</option>
            <option value="lead">Leads</option>
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="inactive">Inactive</option>
            <option value="churned">Churned</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No clients found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Company</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">LTV</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{client.company_name}</p>
                          <p className="text-sm text-gray-400">{client.industry || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white">{client.contact_name}</td>
                    <td className="py-4 px-4 text-gray-400">{client.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white font-medium">£{client.lifetime_value.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleManageSubscriptions(client)}
                          className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors text-gray-400 hover:text-purple-400"
                          title="Manage Products"
                        >
                          <Package className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/90 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Add New Client</h2>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newClient.company_name}
                    onChange={(e) => setNewClient({ ...newClient, company_name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={newClient.contact_name}
                    onChange={(e) => setNewClient({ ...newClient, contact_name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                  <input
                    type="text"
                    value={newClient.industry}
                    onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:bg-gray-900 [&>option]:text-white"
                  >
                    <option value="prospect" className="bg-gray-900 text-white">Prospect</option>
                    <option value="lead" className="bg-gray-900 text-white">Lead</option>
                    <option value="onboarding" className="bg-gray-900 text-white">Onboarding</option>
                    <option value="active" className="bg-gray-900 text-white">Active</option>
                    <option value="trial" className="bg-gray-900 text-white">Trial</option>
                    <option value="inactive" className="bg-gray-900 text-white">Inactive</option>
                    <option value="churned" className="bg-gray-900 text-white">Churned</option>
                    <option value="archived" className="bg-gray-900 text-white">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {clientCreatedSuccess && !generatedPassword && !error && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <p className="text-green-400 font-medium">
                      Client "{createdClientName}" created successfully!
                    </p>
                  </div>
                  {!createPortalUser && (
                    <p className="text-gray-300 text-sm mt-2">
                      Closing modal in a moment...
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <UserPlus className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="text-white font-semibold">Create Portal Access</h3>
                      <p className="text-sm text-gray-400">Allow client to access their portal</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCreatePortalUser(!createPortalUser);
                      if (!createPortalUser) {
                        setPortalUserEmail(newClient.email);
                        setPortalUserName(newClient.contact_name);
                      }
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      createPortalUser ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        createPortalUser ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {createPortalUser && (
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Portal User Email</label>
                        <input
                          type="email"
                          value={portalUserEmail}
                          onChange={(e) => setPortalUserEmail(e.target.value)}
                          placeholder={newClient.email || 'Enter email'}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Portal User Name</label>
                        <input
                          type="text"
                          value={portalUserName}
                          onChange={(e) => setPortalUserName(e.target.value)}
                          placeholder={newClient.contact_name || 'Enter name'}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-300">Set Custom Temporary Password</label>
                        <button
                          type="button"
                          onClick={() => {
                            setUseCustomPassword(!useCustomPassword);
                            if (useCustomPassword) setCustomTempPassword('');
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            useCustomPassword ? 'bg-purple-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              useCustomPassword ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      {useCustomPassword ? (
                        <div>
                          <input
                            type="text"
                            value={customTempPassword}
                            onChange={(e) => setCustomTempPassword(e.target.value)}
                            placeholder="Enter temporary password (min 8 chars)"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                          />
                          <p className="text-xs text-gray-400 mt-2">
                            Password must be at least 8 characters with uppercase, lowercase, number, and symbol
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <p className="text-sm text-blue-300">
                            A secure temporary password will be auto-generated and shown after client creation
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {generatedPassword && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mt-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-green-400 font-semibold text-lg mb-1">Client Created Successfully!</h3>
                      <p className="text-gray-300 text-sm">Portal access has been created with a temporary password.</p>
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-2">Temporary Password (copy and share with client):</p>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-lg">
                        {generatedPassword}
                      </code>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(generatedPassword)}
                        className="p-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        {passwordCopied ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Copy className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-yellow-400 mt-3">
                      ⚠️ This password will only be shown once. The client will be required to change it on first login.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              )}

              {!generatedPassword && (
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Adding Client...' : 'Add Client'}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}

      {showSubscriptionModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/90 border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Manage Products & Subscriptions</h2>
                <p className="text-gray-400">{selectedClient.company_name}</p>
              </div>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Active Subscriptions</h3>
              {clientSubscriptions.length === 0 ? (
                <div className="text-center py-8 bg-white/5 rounded-xl border border-white/10">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400">No active subscriptions</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {clientSubscriptions.map((sub) => (
                    <div key={sub.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">
                          {sub.product?.name || sub.package?.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {sub.product?.category} • £{sub.amount.toLocaleString()} / {sub.billing_cycle}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${sub.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                        {sub.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Add Product</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleAddSubscription('product', product.id)}
                    className="text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-xl transition-all"
                  >
                    <h4 className="text-white font-semibold mb-1">{product.name}</h4>
                    <p className="text-sm text-gray-400">
                      £{product.base_price.toLocaleString()} / {product.billing_type}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Add Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => handleAddSubscription('package', pkg.id)}
                    className="text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-xl transition-all"
                  >
                    <h4 className="text-white font-semibold mb-1">{pkg.name}</h4>
                    <p className="text-sm text-gray-400">
                      £{pkg.price.toLocaleString()} / {pkg.billing_cycle}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
