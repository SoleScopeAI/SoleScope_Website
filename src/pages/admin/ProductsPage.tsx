import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, DollarSign, CheckCircle, X, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product, Package } from '../../lib/supabase';

type ProductForm = { name: string; slug: string; description: string; category: Product['category']; base_price: string; billing_type: Product['billing_type']; features: string; is_active: boolean; sort_order: number };
type PackageForm = { name: string; slug: string; description: string; price: string; billing_cycle: Package['billing_cycle']; features: string; is_popular: boolean; is_active: boolean; sort_order: number };

const emptyProduct: ProductForm = { name: '', slug: '', description: '', category: 'web', base_price: '', billing_type: 'one_time', features: '', is_active: true, sort_order: 0 };
const emptyPackage: PackageForm = { name: '', slug: '', description: '', price: '', billing_cycle: 'monthly', features: '', is_popular: false, is_active: true, sort_order: 0 };

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'packages'>('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>(emptyProduct);
  const [packageForm, setPackageForm] = useState<PackageForm>(emptyPackage);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'product' | 'package'; id: string } | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [pRes, pkRes] = await Promise.all([
      supabase.from('products').select('*').order('sort_order'),
      supabase.from('packages').select('*').order('sort_order'),
    ]);
    setProducts(pRes.data || []);
    setPackages(pkRes.data || []);
    setLoading(false);
  };

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({ name: p.name, slug: p.slug, description: p.description || '', category: p.category, base_price: p.base_price.toString(), billing_type: p.billing_type, features: p.features.join('\n'), is_active: p.is_active, sort_order: p.sort_order });
    setError(''); setShowProductModal(true);
  };

  const openEditPackage = (p: Package) => {
    setEditingPackage(p);
    setPackageForm({ name: p.name, slug: p.slug, description: p.description || '', price: p.price.toString(), billing_cycle: p.billing_cycle, features: p.features.join('\n'), is_popular: p.is_popular, is_active: p.is_active, sort_order: p.sort_order });
    setError(''); setShowPackageModal(true);
  };

  const saveProduct = async () => {
    if (!productForm.name.trim()) { setError('Name is required'); return; }
    setSaving(true); setError('');
    const payload = { ...productForm, slug: productForm.slug || slugify(productForm.name), base_price: parseFloat(productForm.base_price) || 0, features: productForm.features.split('\n').filter(Boolean), description: productForm.description || null };
    const result = editingProduct ? await supabase.from('products').update(payload).eq('id', editingProduct.id) : await supabase.from('products').insert(payload);
    if (result.error) { setError(result.error.message); setSaving(false); return; }
    setShowProductModal(false); setSaving(false); setEditingProduct(null); fetchData();
  };

  const savePackage = async () => {
    if (!packageForm.name.trim()) { setError('Name is required'); return; }
    setSaving(true); setError('');
    const payload = { ...packageForm, slug: packageForm.slug || slugify(packageForm.name), price: parseFloat(packageForm.price) || 0, features: packageForm.features.split('\n').filter(Boolean), description: packageForm.description || null };
    const result = editingPackage ? await supabase.from('packages').update(payload).eq('id', editingPackage.id) : await supabase.from('packages').insert(payload);
    if (result.error) { setError(result.error.message); setSaving(false); return; }
    setShowPackageModal(false); setSaving(false); setEditingPackage(null); fetchData();
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    await supabase.from(deleteConfirm.type === 'product' ? 'products' : 'packages').delete().eq('id', deleteConfirm.id);
    setDeleteConfirm(null); fetchData();
  };

  const getCategoryColor = (c: string) => ({ web: 'bg-blue-500/20 text-blue-400 border-blue-500/30', automation: 'bg-purple-500/20 text-purple-400 border-purple-500/30', dashboard: 'bg-green-500/20 text-green-400 border-green-500/30', branding: 'bg-pink-500/20 text-pink-400 border-pink-500/30', custom: 'bg-orange-500/20 text-orange-400 border-orange-500/30' }[c] || 'bg-gray-500/20 text-gray-400 border-gray-500/30');

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPackages = packages.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="text-3xl font-bold text-white mb-2">Products & Packages</h1><p className="text-gray-400">Manage your service offerings and pricing</p></div>
        <button onClick={() => { activeTab === 'products' ? (setEditingProduct(null), setProductForm(emptyProduct), setError(''), setShowProductModal(true)) : (setEditingPackage(null), setPackageForm(emptyPackage), setError(''), setShowPackageModal(true)); }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all">
          <Plus className="w-5 h-5" /><span>Add {activeTab === 'products' ? 'Product' : 'Package'}</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 border-b border-white/10">
        <button onClick={() => setActiveTab('products')} className={`px-6 py-3 font-semibold transition-all ${activeTab === 'products' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}>Products ({products.length})</button>
        <button onClick={() => setActiveTab('packages')} className={`px-6 py-3 font-semibold transition-all ${activeTab === 'packages' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}>Packages ({packages.length})</button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="mb-6 relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder={`Search ${activeTab}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>

        {loading ? (
          <div className="text-center py-12"><div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400">Loading...</p></div>
        ) : activeTab === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1"><h3 className="text-lg font-bold text-white mb-2">{product.name}</h3><span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(product.category)}`}>{product.category}</span></div>
                  {product.is_active && <CheckCircle className="w-5 h-5 text-green-400" />}
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4"><div className="flex items-center space-x-2"><DollarSign className="w-4 h-4 text-purple-400" /><span className="text-white font-bold">£{product.base_price.toLocaleString()}</span></div><span className="text-xs text-gray-400 uppercase">{product.billing_type.replace('_', ' ')}</span></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 3).map((f, i) => <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-lg">{f}</span>)}
                  {product.features.length > 3 && <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-lg">+{product.features.length - 3} more</span>}
                </div>
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/10">
                  <button onClick={() => openEditProduct(product)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteConfirm({ type: 'product', id: product.id })} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`bg-white/5 border rounded-xl p-6 hover:border-purple-500/30 transition-all ${pkg.is_popular ? 'border-purple-500/50 ring-2 ring-purple-500/20' : 'border-white/10'}`}>
                {pkg.is_popular && <div className="mb-4"><span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-bold rounded-full">Most Popular</span></div>}
                <div className="flex items-start justify-between mb-4"><div className="flex-1"><h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3><p className="text-sm text-gray-400">{pkg.description}</p></div>{pkg.is_active && <CheckCircle className="w-5 h-5 text-green-400" />}</div>
                <div className="mb-4"><div className="flex items-baseline space-x-2"><span className="text-3xl font-bold text-white">£{pkg.price.toLocaleString()}</span><span className="text-sm text-gray-400">/ {pkg.billing_cycle}</span></div></div>
                <div className="space-y-2 mb-4">
                  {pkg.features.slice(0, 4).map((f, i) => <div key={i} className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" /><span className="text-xs text-gray-300">{f}</span></div>)}
                  {pkg.features.length > 4 && <span className="text-xs text-gray-400">+{pkg.features.length - 4} more</span>}
                </div>
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/10">
                  <button onClick={() => openEditPackage(pkg)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteConfirm({ type: 'package', id: pkg.id })} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showProductModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold text-white">{editingProduct ? 'Edit Product' : 'New Product'}</h2><button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><X className="w-5 h-5" /></button></div>
              {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3"><AlertCircle className="w-5 h-5 text-red-400" /><p className="text-red-400 text-sm">{error}</p></div>}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-300 mb-2">Name *</label><input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value, slug: slugify(e.target.value) })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" /></div><div><label className="block text-sm font-medium text-gray-300 mb-2">Category</label><select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value as Product['category'] })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none">{(['web', 'automation', 'dashboard', 'branding', 'custom'] as const).map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}</select></div></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Description</label><textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows={2} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none" /></div>
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-300 mb-2">Price (£)</label><input type="number" value={productForm.base_price} onChange={(e) => setProductForm({ ...productForm, base_price: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" /></div><div><label className="block text-sm font-medium text-gray-300 mb-2">Billing</label><select value={productForm.billing_type} onChange={(e) => setProductForm({ ...productForm, billing_type: e.target.value as Product['billing_type'] })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none">{(['one_time', 'monthly', 'annual', 'custom'] as const).map((b) => <option key={b} value={b} className="bg-gray-900">{b.replace('_', ' ')}</option>)}</select></div></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label><textarea value={productForm.features} onChange={(e) => setProductForm({ ...productForm, features: e.target.value })} rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none" /></div>
                <div className="flex items-center space-x-3"><input type="checkbox" checked={productForm.is_active} onChange={(e) => setProductForm({ ...productForm, is_active: e.target.checked })} className="w-5 h-5 rounded" /><span className="text-gray-300">Active</span></div>
              </div>
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <button onClick={() => setShowProductModal(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl">Cancel</button>
                <button onClick={saveProduct} disabled={saving} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl disabled:opacity-50">{saving ? 'Saving...' : editingProduct ? 'Update' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showPackageModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between mb-6"><h2 className="text-2xl font-bold text-white">{editingPackage ? 'Edit Package' : 'New Package'}</h2><button onClick={() => setShowPackageModal(false)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><X className="w-5 h-5" /></button></div>
              {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3"><AlertCircle className="w-5 h-5 text-red-400" /><p className="text-red-400 text-sm">{error}</p></div>}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-300 mb-2">Name *</label><input value={packageForm.name} onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value, slug: slugify(e.target.value) })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" /></div><div><label className="block text-sm font-medium text-gray-300 mb-2">Billing Cycle</label><select value={packageForm.billing_cycle} onChange={(e) => setPackageForm({ ...packageForm, billing_cycle: e.target.value as Package['billing_cycle'] })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none">{(['monthly', 'annual', 'one_time'] as const).map((b) => <option key={b} value={b} className="bg-gray-900">{b.replace('_', ' ')}</option>)}</select></div></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Description</label><textarea value={packageForm.description} onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })} rows={2} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Price (£)</label><input type="number" value={packageForm.price} onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label><textarea value={packageForm.features} onChange={(e) => setPackageForm({ ...packageForm, features: e.target.value })} rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none" /></div>
                <div className="flex items-center space-x-6"><label className="flex items-center space-x-3"><input type="checkbox" checked={packageForm.is_active} onChange={(e) => setPackageForm({ ...packageForm, is_active: e.target.checked })} className="w-5 h-5 rounded" /><span className="text-gray-300">Active</span></label><label className="flex items-center space-x-3"><input type="checkbox" checked={packageForm.is_popular} onChange={(e) => setPackageForm({ ...packageForm, is_popular: e.target.checked })} className="w-5 h-5 rounded" /><span className="text-gray-300">Popular</span></label></div>
              </div>
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <button onClick={() => setShowPackageModal(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl">Cancel</button>
                <button onClick={savePackage} disabled={saving} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl disabled:opacity-50">{saving ? 'Saving...' : editingPackage ? 'Update' : 'Create'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-3">Delete {deleteConfirm.type}?</h3>
              <p className="text-gray-400 mb-6">This cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setDeleteConfirm(null)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl">Cancel</button>
                <button onClick={handleDelete} className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
