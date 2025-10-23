import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, TrendingUp } from 'lucide-react';

const EnhancedHero = () => {
  const [efficiency, setEfficiency] = useState(50);
  const [insightLevel, setInsightLevel] = useState(50);
  const [dataVolume, setDataVolume] = useState(50);
  const [predictionAccuracy, setPredictionAccuracy] = useState(50);

  const [metrics, setMetrics] = useState({
    hoursSaved: 0,
    costReduction: 0,
    turnaround: 0
  });

  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const avgValue = (efficiency + insightLevel + dataVolume + predictionAccuracy) / 4;

    const hours = Math.round(10 + (avgValue / 100) * 40);
    const cost = Math.round(15 + (avgValue / 100) * 25);
    const speed = Math.round(20 + (avgValue / 100) * 20);

    setMetrics({
      hoursSaved: hours,
      costReduction: cost,
      turnaround: speed
    });

    const newData = Array.from({ length: 10 }, (_, i) => {
      const progress = i / 9;
      const base = 20 + (avgValue / 100) * 60;
      return Math.round(base * (0.5 + progress * 0.5));
    });
    setChartData(newData);
  }, [efficiency, insightLevel, dataVolume, predictionAccuracy]);

  const scrollToRoadmap = () => {
    const element = document.getElementById('roadmap-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <div className="relative z-10 container py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight uppercase tracking-wide">
              Intelligent Automation,
              <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent mt-2">
                Custom-Built for Your Business
              </span>
            </h1>

            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              We design and build AI automations, systems, and software that power SMEs and ambitious small businesses — reducing friction, unlocking insight, and enabling scalable growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg"
              >
                Book a Discovery Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <button
                onClick={scrollToRoadmap}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                See How It Works
                <ArrowDown className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="services-refined-card max-h-[500px]">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 rounded-3xl blur-2xl"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">Analytics Dashboard</h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span className="text-purple-300 text-xs font-semibold">Live</span>
                  </div>
                </div>

                <div className="h-32 mb-4 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.0)" />
                      </linearGradient>
                      <filter id="heroGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <motion.path
                      d={`M 0 ${40 - (chartData[0] || 20) / 2} ${chartData.map((val, i) =>
                        `L ${(i / (chartData.length - 1)) * 100} ${40 - val / 2}`
                      ).join(' ')} L 100 40 L 0 40 Z`}
                      fill="url(#heroGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.path
                      d={`M 0 ${40 - (chartData[0] || 20) / 2} ${chartData.map((val, i) =>
                        `L ${(i / (chartData.length - 1)) * 100} ${40 - val / 2}`
                      ).join(' ')}`}
                      stroke="rgba(168, 85, 247, 1)"
                      strokeWidth="0.8"
                      fill="none"
                      filter="url(#heroGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {[
                    { label: 'Hours Saved', value: `${metrics.hoursSaved}+`, subtext: 'monthly' },
                    { label: 'Cost Saved', value: `${metrics.costReduction}%`, subtext: 'reduction' },
                    { label: 'Faster', value: `${metrics.turnaround}%`, subtext: 'turnaround' }
                  ].map((metric, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/5 rounded-lg p-2.5 border border-white/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        key={String(metric.value)}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-lg font-bold text-white mb-0.5"
                      >
                        {metric.value}
                      </motion.div>
                      <div className="text-[9px] text-slate-400 uppercase tracking-wide">{metric.label}</div>
                      <div className="text-[8px] text-purple-400">{metric.subtext}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Automation Depth', value: efficiency, setter: setEfficiency },
                    { label: 'Insight Level', value: insightLevel, setter: setInsightLevel },
                    { label: 'Data Volume', value: dataVolume, setter: setDataVolume },
                    { label: 'AI Prediction', value: predictionAccuracy, setter: setPredictionAccuracy }
                  ].map((slider, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-medium text-white">{slider.label}</label>
                        <span className="text-[11px] text-purple-400 font-semibold">{slider.value}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={slider.value}
                        onChange={(e) => slider.setter(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  ))}
                </div>

                <motion.div
                  className="mt-4 flex items-center justify-center gap-2 p-2 bg-purple-500/20 rounded-lg border border-purple-500/30"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.2)",
                      "0 0 30px rgba(168, 85, 247, 0.4)",
                      "0 0 20px rgba(168, 85, 247, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-xs font-semibold text-white">Real-time Analytics</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
