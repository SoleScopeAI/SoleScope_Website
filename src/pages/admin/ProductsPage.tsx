import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Edit, Trash2, DollarSign, Tag, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  base_price: number;
  billing_type: string;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

interface ProductPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  billing_cycle: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [packages, setPackages] = useState<ProductPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'packages'>('products');
  const { adminUser } = useAdminAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsResponse, packagesResponse] = await Promise.all([
        supabase.from('products').select('*').order('sort_order'),
        supabase.from('packages').select('*').order('sort_order'),
      ]);

      if (productsResponse.data) setProducts(productsResponse.data);
      if (packagesResponse.data) setPackages(packagesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      web: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      automation: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      dashboard: 'bg-green-500/20 text-green-400 border-green-500/30',
      branding: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      custom: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPackages = packages.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products & Packages</h1>
          <p className="text-gray-400">Manage your service offerings and pricing</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'products'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'packages'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Packages ({packages.length})
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading {activeTab}...</p>
          </div>
        ) : activeTab === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(
                        product.category
                      )}`}
                    >
                      {product.category}
                    </span>
                  </div>
                  {product.is_active && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-bold">
                      £{product.base_price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 uppercase">{product.billing_type}</span>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-lg">
                        +{product.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/10">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white/5 border rounded-xl p-6 hover:border-purple-500/30 transition-all ${
                  pkg.is_popular ? 'border-purple-500/50 ring-2 ring-purple-500/20' : 'border-white/10'
                }`}
              >
                {pkg.is_popular && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{pkg.description}</p>
                  </div>
                  {pkg.is_active && <CheckCircle className="w-5 h-5 text-green-400" />}
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-white">
                      £{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400">/ {pkg.billing_cycle}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="space-y-2">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                    {pkg.features.length > 4 && (
                      <span className="text-xs text-gray-400">
                        +{pkg.features.length - 4} more features
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-white/10">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
