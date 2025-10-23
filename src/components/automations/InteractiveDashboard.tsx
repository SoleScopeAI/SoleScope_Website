import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Clock, Target, CheckCircle } from 'lucide-react';

interface Metrics {
  hoursSaved: number;
  errorRate: number;
  responseTime: number;
  throughput: number;
  onTimeDispatch: number;
  yield: number;
}

const InteractiveDashboard = () => {
  const [automationDepth, setAutomationDepth] = useState(50);
  const [dataVolume, setDataVolume] = useState(50);
  const [aiInsightLevel, setAiInsightLevel] = useState(1);
  const [crmSync, setCrmSync] = useState(true);
  const [emailSequences, setEmailSequences] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(false);
  const [humanApproval, setHumanApproval] = useState(true);
  const [useCase, setUseCase] = useState('manufacturing');
  const [metrics, setMetrics] = useState<Metrics>({
    hoursSaved: 0,
    errorRate: 15,
    responseTime: 24,
    throughput: 100,
    onTimeDispatch: 85,
    yield: 92
  });

  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const baseHours = 10;
    const depthMultiplier = automationDepth / 50;
    const volumeMultiplier = dataVolume / 50;
    const insightBonus = aiInsightLevel * 5;
    const toggleBonus = (crmSync ? 3 : 0) + (emailSequences ? 4 : 0) + (anomalyAlerts ? 5 : 0);

    const calculatedHours = Math.round(
      baseHours * depthMultiplier * volumeMultiplier + insightBonus + toggleBonus
    );

    const baseError = 15;
    const errorReduction = (automationDepth / 100) * 12 + (anomalyAlerts ? 2 : 0);
    const calculatedError = Math.max(1, Math.round(baseError - errorReduction));

    const baseResponse = 24;
    const responseImprovement = (automationDepth / 100) * 20 + (emailSequences ? 2 : 0);
    const calculatedResponse = Math.max(0.5, Math.round((baseResponse - responseImprovement) * 10) / 10);

    const baseThroughput = 100;
    const throughputIncrease = (dataVolume / 50) * 50 + (automationDepth / 50) * 30;
    const calculatedThroughput = Math.round(baseThroughput + throughputIncrease);

    const baseDispatch = 85;
    const dispatchImprovement = (automationDepth / 100) * 12 + (anomalyAlerts ? 3 : 0);
    const calculatedDispatch = Math.min(99, Math.round(baseDispatch + dispatchImprovement));

    const baseYield = 92;
    const yieldImprovement = (aiInsightLevel * 2) + (anomalyAlerts ? 2 : 0);
    const calculatedYield = Math.min(99, Math.round(baseYield + yieldImprovement));

    setMetrics({
      hoursSaved: calculatedHours,
      errorRate: calculatedError,
      responseTime: calculatedResponse,
      throughput: calculatedThroughput,
      onTimeDispatch: calculatedDispatch,
      yield: calculatedYield
    });

    const newChartData = Array.from({ length: 12 }, (_, i) => {
      const progress = i / 11;
      return Math.round(calculatedThroughput * (0.5 + progress * 0.5));
    });
    setChartData(newChartData);
  }, [automationDepth, dataVolume, aiInsightLevel, crmSync, emailSequences, anomalyAlerts, humanApproval, useCase]);

  const insightLevels = ['Descriptive', 'Predictive', 'Prescriptive'];

  return (
    <section className="py-20 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive Analytics Dashboard
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Adjust the controls below to see how different configurations affect system performance and business outcomes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Configuration Controls</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white">Automation Depth</label>
                    <span className="text-sm text-purple-400 font-semibold">{automationDepth}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={automationDepth}
                    onChange={(e) => setAutomationDepth(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white">Data Volume</label>
                    <span className="text-sm text-purple-400 font-semibold">{dataVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={dataVolume}
                    onChange={(e) => setDataVolume(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white">AI Insight Level</label>
                    <span className="text-sm text-purple-400 font-semibold">{insightLevels[aiInsightLevel]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    value={aiInsightLevel}
                    onChange={(e) => setAiInsightLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div className="pt-4 border-t border-white/10">
                  <label className="text-sm font-medium text-white mb-4 block">Use Case</label>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="manufacturing">Manufacturing / FMCG</option>
                    <option value="logistics">Distribution & Logistics</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="operations">Operations & Admin</option>
                    <option value="services">Professional Services</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <label className="text-sm font-medium text-white block">Features</label>

                  {[
                    { label: 'CRM Sync', checked: crmSync, onChange: setCrmSync },
                    { label: 'Email Sequences', checked: emailSequences, onChange: setEmailSequences },
                    { label: 'Anomaly Alerts', checked: anomalyAlerts, onChange: setAnomalyAlerts },
                    { label: 'Human Approval Steps', checked: humanApproval, onChange: setHumanApproval }
                  ].map((toggle, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                      <span className="text-sm text-white">{toggle.label}</span>
                      <input
                        type="checkbox"
                        checked={toggle.checked}
                        onChange={(e) => toggle.onChange(e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 bg-white/10"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Performance Metrics</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Clock, label: 'Hours Saved/Week', value: metrics.hoursSaved, color: 'purple' },
                  { icon: CheckCircle, label: 'Error Rate', value: `${metrics.errorRate}%`, color: 'purple' },
                  { icon: Zap, label: 'Response Time', value: `${metrics.responseTime}h`, color: 'purple' },
                  { icon: TrendingUp, label: 'Throughput', value: metrics.throughput, color: 'purple' }
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <metric.icon className="h-5 w-5 text-purple-400 mb-2" />
                    <motion.div
                      key={String(metric.value)}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-white mb-1"
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-xs text-slate-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white">Throughput Trend</h4>
                <div className="h-40 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.0)" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={`M 0 ${40 - (chartData[0] / Math.max(...chartData)) * 30} ${chartData.map((val, i) =>
                        `L ${(i / (chartData.length - 1)) * 100} ${40 - (val / Math.max(...chartData)) * 30}`
                      ).join(' ')} L 100 40 L 0 40 Z`}
                      fill="url(#gradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.path
                      d={`M 0 ${40 - (chartData[0] / Math.max(...chartData)) * 30} ${chartData.map((val, i) =>
                        `L ${(i / (chartData.length - 1)) * 100} ${40 - (val / Math.max(...chartData)) * 30}`
                      ).join(' ')}`}
                      stroke="rgba(168, 85, 247, 0.8)"
                      strokeWidth="0.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Automation Flow Preview</h3>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                  { label: 'Trigger', active: true },
                  { label: 'CRM', active: crmSync },
                  { label: 'AI', active: aiInsightLevel > 0 },
                  { label: 'Email', active: emailSequences },
                  { label: 'Alert', active: anomalyAlerts },
                  { label: 'Approve', active: humanApproval },
                  { label: 'Execute', active: true }
                ].map((node, idx) => (
                  <React.Fragment key={idx}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: node.active ? 1 : 0.3,
                        scale: node.active ? 1 : 0.9
                      }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-medium ${
                        node.active
                          ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                          : 'bg-white/5 border border-white/10 text-slate-500'
                      }`}
                    >
                      {node.label}
                    </motion.div>
                    {idx < 6 && (
                      <div className={`flex-shrink-0 w-4 h-0.5 ${node.active ? 'bg-purple-500' : 'bg-white/10'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDashboard;
