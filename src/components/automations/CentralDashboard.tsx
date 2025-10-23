import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Activity, Users } from 'lucide-react';

interface ScenarioMetrics {
  throughput: number;
  efficiency: number;
  errorRate: number;
  responseTime: number;
}

const CentralDashboard = () => {
  const [scenario, setScenario] = useState('marketing');
  const [automationLevel, setAutomationLevel] = useState(70);
  const [aiInsight, setAiInsight] = useState(60);
  const [metrics, setMetrics] = useState<ScenarioMetrics>({
    throughput: 0,
    efficiency: 0,
    errorRate: 0,
    responseTime: 0
  });

  const [lineChartData, setLineChartData] = useState<number[]>([]);
  const [barChartData, setBarChartData] = useState<number[]>([]);

  const scenarios = [
    { value: 'marketing', label: 'Marketing & Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'customer-service', label: 'Customer Service' }
  ];

  useEffect(() => {
    const avgValue = (automationLevel + aiInsight) / 2;

    const scenarioMultipliers = {
      marketing: { throughput: 1.2, efficiency: 1.1, errorRate: 0.9, responseTime: 1.3 },
      operations: { throughput: 1.0, efficiency: 1.2, errorRate: 0.8, responseTime: 1.0 },
      manufacturing: { throughput: 1.3, efficiency: 1.0, errorRate: 1.0, responseTime: 0.9 },
      'customer-service': { throughput: 0.9, efficiency: 1.1, errorRate: 1.1, responseTime: 1.4 }
    };

    const multiplier = scenarioMultipliers[scenario as keyof typeof scenarioMultipliers] || scenarioMultipliers.marketing;

    setMetrics({
      throughput: Math.round(100 + (avgValue / 100) * 150 * multiplier.throughput),
      efficiency: Math.round(60 + (avgValue / 100) * 35 * multiplier.efficiency),
      errorRate: Math.max(1, Math.round(15 - (avgValue / 100) * 12 * multiplier.errorRate)),
      responseTime: Math.max(0.5, Math.round((24 - (avgValue / 100) * 20 * multiplier.responseTime) * 10) / 10)
    });

    const newLineData = Array.from({ length: 12 }, (_, i) => {
      const progress = i / 11;
      const base = 100 + (avgValue / 100) * 150 * multiplier.throughput;
      return Math.round(base * (0.6 + progress * 0.4));
    });
    setLineChartData(newLineData);

    const newBarData = [65, 78, 85, 92].map(base => Math.round(base + (avgValue / 100) * 10));
    setBarChartData(newBarData);
  }, [scenario, automationLevel, aiInsight]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Interactive Performance Analytics
          </h2>
          <p className="text-base text-slate-300 max-w-3xl mx-auto">
            Explore how AI automation transforms performance across different business scenarios
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl max-h-[600px]">
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 rounded-3xl blur-3xl"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="relative z-10 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Scenario</label>
                <select
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                >
                  {scenarios.map(s => (
                    <option key={s.value} value={s.value} className="bg-gray-900">{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white">Automation Level</label>
                  <span className="text-xs font-bold text-purple-400">{automationLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={automationLevel}
                  onChange={(e) => setAutomationLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white">AI Insight</label>
                  <span className="text-xs font-bold text-purple-400">{aiInsight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiInsight}
                  onChange={(e) => setAiInsight(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                {[
                  { icon: TrendingUp, label: 'Throughput', value: metrics.throughput },
                  { icon: Activity, label: 'Efficiency', value: `${metrics.efficiency}%` }
                ].map((kpi, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    <kpi.icon className="h-4 w-4 text-purple-400 mb-2" />
                    <motion.div
                      key={String(kpi.value)}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-base font-bold text-white mb-0.5"
                    >
                      {kpi.value}
                    </motion.div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wide">{kpi.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white/[0.03] rounded-xl border border-white/10 p-5">
                <h3 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Performance Trend</h3>
                <div className="h-40 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="centralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.0)" />
                      </linearGradient>
                      <filter id="centralGlow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    <motion.path
                      d={`M 0 ${40 - (lineChartData[0] || 100) / 6} ${lineChartData.map((val, i) =>
                        `L ${(i / (lineChartData.length - 1)) * 100} ${40 - val / 6}`
                      ).join(' ')} L 100 40 L 0 40 Z`}
                      fill="url(#centralGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    <motion.path
                      d={`M 0 ${40 - (lineChartData[0] || 100) / 6} ${lineChartData.map((val, i) =>
                        `L ${(i / (lineChartData.length - 1)) * 100} ${40 - val / 6}`
                      ).join(' ')}`}
                      stroke="rgba(168, 85, 247, 1)"
                      strokeWidth="0.6"
                      fill="none"
                      filter="url(#centralGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-white/[0.03] rounded-xl border border-white/10 p-5">
                <h3 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Comparative Analysis</h3>
                <div className="grid grid-cols-4 gap-4 h-28">
                  {barChartData.map((height, idx) => (
                    <div key={idx} className="flex flex-col justify-end items-center">
                      <motion.div
                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ y: ['100%', '-100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                      <span className="text-xs text-slate-400 mt-2">Q{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CentralDashboard;
