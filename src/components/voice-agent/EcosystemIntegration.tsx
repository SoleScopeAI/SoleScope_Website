import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhoneCall, Globe, TrendingUp, Zap, BarChart3, ArrowRight } from 'lucide-react';

const EcosystemIntegration = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const connections = [
    {
      icon: PhoneCall,
      title: 'AI Voice Agent',
      description: 'The front door',
      position: 'center',
      size: 'large',
    },
    {
      icon: BarChart3,
      title: 'Central Dashboard',
      description: 'Command centre',
      position: 'top',
    },
    {
      icon: Globe,
      title: 'Website',
      description: 'Your digital presence',
      position: 'right',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Marketing',
      description: 'Growth engine',
      position: 'bottom-right',
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Business workflows',
      position: 'left',
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The Front Door to Your Entire System
          </h2>
          <p className="text-xl text-slate-400">
            Your AI Voice Agent doesn't work in isolation — it's the entry point to your complete digital ecosystem
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative min-h-[1000px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute hidden md:block"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-violet-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative p-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl shadow-2xl">
                  <PhoneCall className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="text-center mt-6 min-w-[200px]">
                <div className="text-2xl font-bold text-white whitespace-nowrap">AI Voice Agent</div>
                <div className="text-purple-400 font-semibold">The Front Door</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 hidden md:block"
            >
              <div className="flex flex-col items-center">
                <div className="p-6 bg-slate-800 border-2 border-purple-500/50 rounded-xl">
                  <BarChart3 className="w-10 h-10 text-purple-400" />
                </div>
                <div className="text-center mt-3 min-w-[120px]">
                  <div className="text-lg font-bold text-white whitespace-nowrap">Dashboard</div>
                  <div className="text-sm text-slate-400">Command Centre</div>
                </div>
                <ArrowRight className="w-6 h-6 text-purple-400 rotate-90 my-4" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden lg:block"
            >
              <div className="flex items-center">
                <ArrowRight className="w-6 h-6 text-purple-400 mx-4" />
                <div className="p-6 bg-slate-800 border-2 border-violet-500/50 rounded-xl">
                  <Globe className="w-10 h-10 text-violet-400" />
                </div>
              </div>
              <div className="text-center mt-3 min-w-[120px]">
                <div className="text-lg font-bold text-white whitespace-nowrap">Website</div>
                <div className="text-sm text-slate-400">Digital Presence</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 hidden lg:block"
            >
              <div className="flex items-center">
                <div className="p-6 bg-slate-800 border-2 border-slate-500/50 rounded-xl">
                  <Zap className="w-10 h-10 text-slate-400" />
                </div>
                <ArrowRight className="w-6 h-6 text-purple-400 rotate-180 mx-4" />
              </div>
              <div className="text-center mt-3 min-w-[120px]">
                <div className="text-lg font-bold text-white whitespace-nowrap">Automation</div>
                <div className="text-sm text-slate-400">Workflows</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-0 right-1/4 transform translate-x-1/2 hidden md:block"
            >
              <div className="flex flex-col items-center">
                <ArrowRight className="w-6 h-6 text-purple-400 rotate-[135deg] mb-4" />
                <div className="p-6 bg-slate-800 border-2 border-purple-500/50 rounded-xl">
                  <TrendingUp className="w-10 h-10 text-purple-400" />
                </div>
                <div className="text-center mt-3 min-w-[120px]">
                  <div className="text-lg font-bold text-white whitespace-nowrap">Growth</div>
                  <div className="text-sm text-slate-400">SEO & Marketing</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/50 border border-purple-500/30 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-3">Capture</h4>
              <p className="text-slate-400 leading-relaxed">
                AI Voice Agent captures every lead, call, and booking attempt
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 border border-violet-500/30 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-3">Centralize</h4>
              <p className="text-slate-400 leading-relaxed">
                Everything flows to your dashboard for visibility and action
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 border border-slate-500/30 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-3">Automate</h4>
              <p className="text-slate-400 leading-relaxed">
                Workflows trigger automatically based on call outcomes
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 border border-purple-500/30 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-3">Grow</h4>
              <p className="text-slate-400 leading-relaxed">
                Data feeds your marketing and SEO for continuous improvement
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 max-w-3xl mx-auto p-8 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-xl text-center"
        >
          <p className="text-lg text-slate-300 leading-relaxed">
            <span className="text-purple-400 font-semibold">One entry point.</span> Multiple systems.
            <span className="text-purple-400 font-semibold"> Complete integration.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemIntegration;
