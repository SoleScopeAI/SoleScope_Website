import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Track business performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-green-400 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              12%
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Clients</p>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              8%
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Revenue</p>
          <p className="text-2xl font-bold text-white">£0</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-green-400 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              5%
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Projects</p>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-green-400 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              15%
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
          <p className="text-2xl font-bold text-white">0%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart will be displayed here
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Project Status Distribution</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart will be displayed here
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Client Growth</h2>
        <div className="h-80 flex items-center justify-center text-gray-400">
          Chart will be displayed here
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
