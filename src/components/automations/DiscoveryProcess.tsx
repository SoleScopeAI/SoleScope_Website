import React from 'react';
import { motion } from 'framer-motion';
import { Search, Pencil, Code, Rocket, HeadphonesIcon } from 'lucide-react';

const DiscoveryProcess = () => {
  const steps = [
    {
      icon: Search,
      label: 'Discovery',
      description: 'Map workflows, quantify pain points, define KPIs'
    },
    {
      icon: Pencil,
      label: 'Design',
      description: 'Blueprint your custom system architecture'
    },
    {
      icon: Code,
      label: 'Build',
      description: 'Develop and integrate automation workflows'
    },
    {
      icon: Rocket,
      label: 'Deploy',
      description: 'Launch with measurable outcomes'
    },
    {
      icon: HeadphonesIcon,
      label: 'Support',
      description: 'Ongoing optimization and monitoring'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discovery & Consultancy
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            We start with Discovery: map workflows, quantify pain points, define KPIs. Then we prototype, iterate, and deploy with measurable outcomes—time saved, error reduction, cycle-time improvements.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="w-16 h-16 bg-white/5 backdrop-blur-sm border-2 border-purple-500/30 rounded-full flex items-center justify-center mb-4 relative z-10"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(168, 85, 247, 0.6)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <step.icon className="h-7 w-7 text-purple-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.label}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoveryProcess;
