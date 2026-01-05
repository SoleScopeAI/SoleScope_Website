import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PhoneCall, Globe, TrendingUp, Zap, BarChart3, ArrowRight } from 'lucide-react';

const EcosystemIntegration = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const ecosystemItems = [
    {
      icon: BarChart3,
      title: 'Dashboard',
      description: 'Command Centre',
      gradient: 'from-purple-500/15 to-violet-500/15',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Workflows',
      gradient: 'from-violet-500/15 to-purple-500/15',
      borderColor: 'border-violet-500/30',
      iconColor: 'text-violet-400',
    },
    {
      icon: PhoneCall,
      title: 'AI Voice Agent',
      description: 'The Front Door',
      gradient: 'from-purple-500/25 to-violet-600/25',
      borderColor: 'border-purple-500/50',
      iconColor: 'text-purple-300',
      isCentral: true,
    },
    {
      icon: Globe,
      title: 'Website',
      description: 'Digital Presence',
      gradient: 'from-violet-600/15 to-purple-600/15',
      borderColor: 'border-violet-500/30',
      iconColor: 'text-violet-400',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'SEO & Marketing',
      gradient: 'from-purple-600/15 to-violet-500/15',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ecosystemItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group ${
                  item.isCentral
                    ? 'col-span-2 md:col-span-1'
                    : 'col-span-1'
                }`}
              >
                <div
                  className={`relative h-full p-6 bg-gradient-to-br ${item.gradient} backdrop-blur-sm
                    border-2 ${item.borderColor} rounded-2xl
                    transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-500/50
                    ${item.isCentral ? 'ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20' : ''}`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-4 bg-slate-900/80 rounded-xl ${item.isCentral ? 'ring-2 ring-purple-400/50' : ''}`}>
                      <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>

                  {!item.isCentral && index < ecosystemItems.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-5 h-5 text-slate-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-slate-800/50 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Capture</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                AI Voice Agent captures every lead, call, and booking attempt
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 border border-violet-500/30 rounded-xl hover:border-violet-500/50 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Centralize</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Everything flows to your dashboard for visibility and action
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Automate</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Workflows trigger automatically based on call outcomes
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 border border-violet-500/30 rounded-xl hover:border-violet-500/50 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Grow</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Data feeds your marketing and SEO for continuous improvement
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 max-w-3xl mx-auto p-8 bg-gradient-to-r from-purple-500/10 to-violet-500/10
            border border-purple-500/30 rounded-xl text-center"
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
