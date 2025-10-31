import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Users,
  TrendingUp,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  BarChart3,
  Bot,
  Palette,
  FileText,
  Download,
} from 'lucide-react';

interface Subscription {
  id: string;
  product_id: string | null;
  package_id: string | null;
  status: string;
  product?: {
    name: string;
    category: string;
    dashboard_config: {
      dashboardType: string;
      metrics: string[];
      features: string[];
    };
  };
  package?: {
    name: string;
  };
}

interface ProductDashboardsProps {
  subscriptions: Subscription[];
}

const ProductDashboards: React.FC<ProductDashboardsProps> = ({ subscriptions }) => {
  const renderWebsiteDashboard = (subscription: Subscription) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
          <Globe className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Website Analytics</h3>
          <p className="text-sm text-gray-400">{subscription.product?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">99.9%</span>
          </div>
          <p className="text-2xl font-bold text-white">Online</p>
          <p className="text-xs text-gray-400">Uptime</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400">+12%</span>
          </div>
          <p className="text-2xl font-bold text-white">3,247</p>
          <p className="text-xs text-gray-400">Monthly Visitors</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-green-400">Fast</span>
          </div>
          <p className="text-2xl font-bold text-white">1.2s</p>
          <p className="text-xs text-gray-400">Page Speed</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">92/100</span>
          </div>
          <p className="text-2xl font-bold text-white">Great</p>
          <p className="text-xs text-gray-400">SEO Score</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Last updated: 5 minutes ago</span>
        <button className="text-purple-400 hover:text-purple-300 font-medium">
          View Details →
        </button>
      </div>
    </motion.div>
  );

  const renderAutomationDashboard = (subscription: Subscription) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
          <Bot className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Automation Performance</h3>
          <p className="text-sm text-gray-400">{subscription.product?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-green-400">+24%</span>
          </div>
          <p className="text-2xl font-bold text-white">847</p>
          <p className="text-xs text-gray-400">Automation Runs</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400">+31%</span>
          </div>
          <p className="text-2xl font-bold text-white">156</p>
          <p className="text-xs text-gray-400">Leads Qualified</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">Saved</span>
          </div>
          <p className="text-2xl font-bold text-white">42h</p>
          <p className="text-xs text-gray-400">Time Saved</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">68%</span>
          </div>
          <p className="text-2xl font-bold text-white">High</p>
          <p className="text-xs text-gray-400">Conversion Rate</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Active workflows: 12</span>
        <button className="text-purple-400 hover:text-purple-300 font-medium">
          View Workflows →
        </button>
      </div>
    </motion.div>
  );

  const renderDashboardDashboard = (subscription: Subscription) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Business Intelligence Dashboard</h3>
          <p className="text-sm text-gray-400">{subscription.product?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400">5</span>
          </div>
          <p className="text-lg font-bold text-white">Data Sources</p>
          <p className="text-xs text-gray-400">Connected</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">23</span>
          </div>
          <p className="text-lg font-bold text-white">AI Insights</p>
          <p className="text-xs text-gray-400">This month</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">Real-time</span>
          </div>
          <p className="text-lg font-bold text-white">Live Updates</p>
          <p className="text-xs text-gray-400">Data sync active</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Last sync: 2 minutes ago</span>
        <button className="text-purple-400 hover:text-purple-300 font-medium">
          Open Dashboard →
        </button>
      </div>
    </motion.div>
  );

  const renderBrandingDashboard = (subscription: Subscription) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center">
          <Palette className="w-6 h-6 text-pink-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Brand Assets</h3>
          <p className="text-sm text-gray-400">{subscription.product?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-green-400">Ready</span>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-xs text-gray-400">Assets Delivered</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Palette className="w-5 h-5 text-pink-400" />
            <span className="text-xs text-pink-400">Complete</span>
          </div>
          <p className="text-2xl font-bold text-white">Logo</p>
          <p className="text-xs text-gray-400">Brand Identity</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400">PDF</span>
          </div>
          <p className="text-2xl font-bold text-white">Guidelines</p>
          <p className="text-xs text-gray-400">Brand Book</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Download className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400">All</span>
          </div>
          <p className="text-2xl font-bold text-white">Download</p>
          <p className="text-xs text-gray-400">Full Package</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Project completed</span>
        <button className="text-purple-400 hover:text-purple-300 font-medium">
          View Assets →
        </button>
      </div>
    </motion.div>
  );

  const renderPackageDashboard = (subscription: Subscription) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{subscription.package?.name}</h3>
          <p className="text-sm text-gray-400">Package Bundle</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-gray-300 mb-2">
          Your comprehensive package includes multiple services and features tailored to your business needs.
        </p>
        <button className="text-purple-400 hover:text-purple-300 font-medium text-sm">
          View Package Details →
        </button>
      </div>
    </motion.div>
  );

  if (subscriptions.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Active Products</h3>
        <p className="text-gray-400">
          Contact your account manager to activate products and services.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {subscriptions.map((subscription) => {
        if (subscription.package_id) {
          return <div key={subscription.id}>{renderPackageDashboard(subscription)}</div>;
        }

        const dashboardType = subscription.product?.dashboard_config?.dashboardType;

        switch (dashboardType) {
          case 'website':
          case 'webapp':
            return <div key={subscription.id}>{renderWebsiteDashboard(subscription)}</div>;
          case 'automation':
            return <div key={subscription.id}>{renderAutomationDashboard(subscription)}</div>;
          case 'analytics':
            return <div key={subscription.id}>{renderDashboardDashboard(subscription)}</div>;
          case 'branding':
            return <div key={subscription.id}>{renderBrandingDashboard(subscription)}</div>;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ProductDashboards;
