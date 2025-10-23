import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Activity, TrendingUp } from 'lucide-react';

const AutomationInAction = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [metrics, setMetrics] = useState({
    websitesAutomated: 0,
    tasksSimplified: 0,
    averageROI: 0
  });

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      websitesAutomated: 12348,
      tasksSimplified: 47213,
      averageROI: 326
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setMetrics({
        websitesAutomated: Math.floor(targets.websitesAutomated * progress),
        tasksSimplified: Math.floor(targets.tasksSimplified * progress),
        averageROI: Math.floor(targets.averageROI * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView]);

  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2
  }));

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      aria-labelledby="automation-heading"
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {nodes.map((node, i) => (
            <g key={node.id}>
              {i < nodes.length - 1 && (
                <motion.line
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${nodes[i + 1].x}%`}
                  y2={`${nodes[i + 1].y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{
                    duration: 2,
                    delay: node.delay,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              )}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size}
                fill="#a855f7"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="automation-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide"
          >
            Every click. Every conversion.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Automated intelligently.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered systems work 24/7 to optimize your business operations and maximize growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(168, 85, 247, 0.2)',
                  '0 0 50px rgba(168, 85, 247, 0.4)',
                  '0 0 30px rgba(168, 85, 247, 0.2)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-4"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Zap className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div
                  className="text-5xl md:text-6xl font-bold text-white mb-2"
                  key={metrics.websitesAutomated}
                >
                  {metrics.websitesAutomated.toLocaleString()}
                </motion.div>
                <div className="text-sm text-purple-400 font-semibold uppercase tracking-wide mb-2">
                  Websites Automated
                </div>
                <p className="text-xs text-slate-400">
                  Intelligent systems deployed
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(6, 182, 212, 0.2)',
                  '0 0 50px rgba(6, 182, 212, 0.4)',
                  '0 0 30px rgba(6, 182, 212, 0.2)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl flex items-center justify-center mx-auto mb-4"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Activity className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div
                  className="text-5xl md:text-6xl font-bold text-white mb-2"
                  key={metrics.tasksSimplified}
                >
                  {metrics.tasksSimplified.toLocaleString()}
                </motion.div>
                <div className="text-sm text-cyan-400 font-semibold uppercase tracking-wide mb-2">
                  Tasks Simplified
                </div>
                <p className="text-xs text-slate-400">
                  Automated operations daily
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative group"
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(34, 197, 94, 0.2)',
                  '0 0 50px rgba(34, 197, 94, 0.4)',
                  '0 0 30px rgba(34, 197, 94, 0.2)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4"
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <TrendingUp className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div
                  className="text-5xl md:text-6xl font-bold text-white mb-2"
                  key={metrics.averageROI}
                >
                  {metrics.averageROI}%
                </motion.div>
                <div className="text-sm text-green-400 font-semibold uppercase tracking-wide mb-2">
                  Average ROI
                </div>
                <p className="text-xs text-slate-400">
                  Return on investment
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AutomationInAction;
