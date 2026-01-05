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
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-cyan-500/40',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Workflows',
      gradient: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-orange-500/40',
      iconColor: 'text-orange-400',
    },
    {
      icon: PhoneCall,
      title: 'AI Voice Agent',
      description: 'The Front Door',
      gradient: 'from-emerald-500/30 to-teal-500/30',
      borderColor: 'border-emerald-500/50',
      iconColor: 'text-emerald-400',
      isCentral: true,
    },
    {
      icon: Globe,
      title: 'Website',
      description: 'Digital Presence',
      gradient: 'from-violet-500/20 to-indigo-500/20',
      borderColor: 'border-indigo-500/40',
      iconColor: 'text-indigo-400',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'SEO & Marketing',
      gradient: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'border-pink-500/40',
      iconColor: 'text-pink-400',
    },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Seamless Integration Ecosystem
          </h2>
          <p className="text-xl text-slate-400">
            Your AI Voice Agent connects everything together — creating a unified digital powerhouse
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
                    transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    ${item.isCentral ? 'ring-2 ring-emerald-500/30' : ''}`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-4 bg-slate-900/80 rounded-xl ${item.isCentral ? 'ring-2 ring-emerald-400/50' : ''}`}>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/20 rounded-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Capture</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Voice agent captures every lead and interaction
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-indigo-500/20 rounded-xl backdrop-blur-sm hover:border-indigo-500/40 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Centralize</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                All data flows to your unified dashboard
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-orange-500/20 rounded-xl backdrop-blur-sm hover:border-orange-500/40 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Automate</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Smart workflows trigger automatically
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-pink-500/20 rounded-xl backdrop-blur-sm hover:border-pink-500/40 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">Grow</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Insights fuel continuous improvement
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 max-w-3xl mx-auto p-8 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10
            border border-emerald-500/30 rounded-2xl text-center backdrop-blur-sm"
        >
          <p className="text-lg text-slate-300 leading-relaxed">
            <span className="text-emerald-400 font-semibold">One powerful entry point.</span> Complete ecosystem integration.
            <span className="text-emerald-400 font-semibold"> Unlimited possibilities.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemIntegration;
