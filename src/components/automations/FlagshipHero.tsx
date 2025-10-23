import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';

const FlagshipHero = () => {
  const scrollToOverview = () => {
    const element = document.getElementById('overview-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center premium-bg overflow-hidden pt-20 md:pt-0">
      <div className="floating-particles"></div>
      <div className="pulse-glow pulse-glow-1"></div>
      <div className="pulse-glow pulse-glow-2"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Intelligent Automation,
              <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent mt-2">
                Built Around Your Business
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              We design custom AI automations, systems, and software for sole traders and SMEs—turning complex workflows into seamless, self-operating processes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg"
              >
                Book a Discovery Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <button
                onClick={scrollToOverview}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                See What's Possible
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
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 rounded-3xl blur-xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Automation Flow</h3>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(168, 85, 247, 0.3)",
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                        "0 0 10px rgba(168, 85, 247, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-purple-400 text-xs font-semibold uppercase">Live</span>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Data Collection", delay: 0 },
                    { label: "AI Processing", delay: 0.5 },
                    { label: "Intelligent Routing", delay: 1 },
                    { label: "Task Execution", delay: 1.5 },
                    { label: "Performance Tracking", delay: 2 }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay, duration: 0.5 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <motion.div
                        className="w-3 h-3 rounded-full bg-purple-400"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: item.delay
                        }}
                      />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium mb-1">{item.label}</div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: item.delay + 0.3, duration: 0.8 }}
                          />
                        </div>
                      </div>
                      <Sparkles className="h-4 w-4 text-purple-400" />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                  className="flex items-center justify-center gap-2 p-4 bg-purple-500/20 rounded-xl border border-purple-500/30 mt-6"
                >
                  <div className="text-center w-full">
                    <div className="text-3xl font-bold text-white mb-1">2,500+</div>
                    <div className="text-purple-300 text-sm">Hours Saved Monthly</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipHero;
