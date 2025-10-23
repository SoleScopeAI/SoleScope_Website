import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles, Zap, Brain, Network, TrendingUp, Users, Target, BarChart3, Shield, CheckCircle2, Rocket, Crown } from 'lucide-react';

const Hero = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [metricsCount, setMetricsCount] = useState({ hours: 0, tasks: 0, efficiency: 0 });

  const scrollToForm = () => {
    const formElement = document.getElementById('proposal-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCases = () => {
    const casesElement = document.getElementById('case-studies');
    if (casesElement) {
      casesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const useCases = [
    {
      icon: Target,
      label: "Lead Management",
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(34, 211, 238, 0.3)"
    },
    {
      icon: Users,
      label: "Client Onboarding",
      color: "from-emerald-400 to-teal-500",
      glow: "rgba(16, 185, 129, 0.3)"
    },
    {
      icon: BarChart3,
      label: "Business Intelligence",
      color: "from-purple-400 to-indigo-500",
      glow: "rgba(168, 85, 247, 0.3)"
    }
  ];

  const trustIndicators = [
    { icon: CheckCircle2, text: "50+ UK SMEs Trust Us" },
    { icon: Rocket, text: "10,000+ Tasks Automated Monthly" },
    { icon: Shield, text: "Enterprise-Grade Security" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const useCaseInterval = setInterval(() => {
      setActiveUseCase((prev) => (prev + 1) % useCases.length);
    }, 4000);
    return () => clearInterval(useCaseInterval);
  }, []);

  useEffect(() => {
    const animateMetrics = () => {
      let hoursCount = 0;
      let tasksCount = 0;
      let efficiencyCount = 0;

      const interval = setInterval(() => {
        if (hoursCount < 2500) hoursCount += 50;
        if (tasksCount < 10000) tasksCount += 200;
        if (efficiencyCount < 95) efficiencyCount += 2;

        setMetricsCount({
          hours: Math.min(hoursCount, 2500),
          tasks: Math.min(tasksCount, 10000),
          efficiency: Math.min(efficiencyCount, 95)
        });

        if (hoursCount >= 2500 && tasksCount >= 10000 && efficiencyCount >= 95) {
          clearInterval(interval);
        }
      }, 30);
    };

    animateMetrics();
  }, []);

  return (
    <section className="relative py-32 md:py-40 premium-bg overflow-hidden">
      <div className="floating-particles"></div>
      <div className="pulse-glow pulse-glow-1"></div>
      <div className="pulse-glow pulse-glow-2"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-orange-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-cyan-400/30 backdrop-blur-sm mb-6"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.3)",
                  "0 0 40px rgba(168, 85, 247, 0.4)",
                  "0 0 20px rgba(34, 211, 238, 0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-semibold text-sm uppercase tracking-wider">
                Our Premier Flagship Solution
              </span>
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black dark-text-primary mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Enterprise-Grade
              </span>
              <span className="block text-white mt-2">
                AI Automations
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mt-2">
                That Transform
              </span>
            </h1>

            <p className="text-xl sm:text-2xl dark-text-body mb-8 max-w-2xl leading-relaxed">
              From one-click automations to full-scale AI platforms. Custom-built intelligent systems that eliminate repetitive work, accelerate growth, and deliver measurable ROI.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {trustIndicators.map((indicator, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <indicator.icon className="h-4 w-4 text-cyan-400" />
                  <span className="text-white text-sm font-medium">{indicator.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10 p-6 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-center">
                <motion.div
                  className="text-3xl font-black text-cyan-400 mb-1"
                  key={metricsCount.hours}
                >
                  {metricsCount.hours.toLocaleString()}+
                </motion.div>
                <div className="text-white/70 text-xs uppercase tracking-wider">Hours Saved</div>
              </div>
              <div className="text-center border-x border-white/10">
                <motion.div
                  className="text-3xl font-black text-emerald-400 mb-1"
                  key={metricsCount.tasks}
                >
                  {metricsCount.tasks.toLocaleString()}+
                </motion.div>
                <div className="text-white/70 text-xs uppercase tracking-wider">Tasks Automated</div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-3xl font-black text-purple-400 mb-1"
                  key={metricsCount.efficiency}
                >
                  {metricsCount.efficiency}%
                </motion.div>
                <div className="text-white/70 text-xs uppercase tracking-wider">Efficiency Gain</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
                data-analytics="hero-primary-cta"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ opacity: 0.3 }}
                />
                <span className="relative text-white">Request a Custom Proposal</span>
                <ArrowRight className="relative ml-2 h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={scrollToCases}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all"
                data-analytics="hero-secondary-cta"
              >
                <span className="text-white">See Real-World Results</span>
                <ArrowDown className="ml-2 h-5 w-5 text-white group-hover:translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 rounded-3xl blur-xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">Live AI Workflow</h3>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(34, 197, 94, 0.3)",
                        "0 0 20px rgba(34, 197, 94, 0.5)",
                        "0 0 10px rgba(34, 197, 94, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-green-400 text-xs font-semibold uppercase">Active</span>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeUseCase}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCases[activeUseCase].color} flex items-center justify-center`}>
                        {React.createElement(useCases[activeUseCase].icon, { className: "h-7 w-7 text-white" })}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold mb-1">{useCases[activeUseCase].label}</div>
                        <div className="text-white/60 text-sm">Processing automation workflow...</div>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="h-5 w-5 text-cyan-400" />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Target, label: "Analyze", active: activeDemo === 0, color: "cyan" },
                      { icon: Brain, label: "Process", active: activeDemo === 1, color: "emerald" },
                      { icon: Zap, label: "Execute", active: activeDemo === 2, color: "purple" }
                    ].map((step, index) => (
                      <motion.div
                        key={step.label}
                        className={`relative p-4 rounded-xl border transition-all ${
                          step.active
                            ? 'bg-white/10 border-white/30'
                            : 'bg-white/5 border-white/10'
                        }`}
                        animate={{
                          scale: step.active ? 1.05 : 1,
                          borderColor: step.active
                            ? step.color === 'cyan' ? 'rgba(34, 211, 238, 0.5)'
                            : step.color === 'emerald' ? 'rgba(16, 185, 129, 0.5)'
                            : 'rgba(168, 85, 247, 0.5)'
                            : 'rgba(255, 255, 255, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.active && (
                          <motion.div
                            className="absolute -inset-1 rounded-xl blur-md"
                            style={{
                              background: step.color === 'cyan'
                                ? 'linear-gradient(135deg, #22d3ee, #06b6d4)'
                                : step.color === 'emerald'
                                ? 'linear-gradient(135deg, #10b981, #059669)'
                                : 'linear-gradient(135deg, #a855f7, #7c3aed)'
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity
                            }}
                          />
                        )}
                        <div className="relative flex flex-col items-center">
                          <step.icon className={`h-8 w-8 mb-2 ${
                            step.active ? 'text-white' : 'text-white/40'
                          }`} />
                          <span className={`text-xs font-semibold uppercase tracking-wider ${
                            step.active ? 'text-white' : 'text-white/40'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Data Collection", progress: 100, color: "cyan" },
                      { label: "AI Processing", progress: activeDemo >= 1 ? 100 : 45, color: "emerald" },
                      { label: "Task Execution", progress: activeDemo >= 2 ? 100 : 0, color: "purple" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm font-medium">{item.label}</span>
                          <span className="text-white text-sm font-bold">{item.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${
                              item.color === 'cyan' ? 'from-cyan-400 to-cyan-600' :
                              item.color === 'emerald' ? 'from-emerald-400 to-emerald-600' :
                              'from-purple-400 to-purple-600'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: activeDemo === 2 ? 1 : 0,
                      scale: activeDemo === 2 ? 1 : 0.9
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <span className="text-white font-semibold">Automation Complete!</span>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
