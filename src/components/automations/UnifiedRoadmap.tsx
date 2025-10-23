import React from 'react';
import { motion } from 'framer-motion';
import { Search, Layers, Code2, Rocket } from 'lucide-react';

const UnifiedRoadmap = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      label: 'AI Discovery',
      description: 'Map workflows, identify automation and AI opportunities.'
    },
    {
      number: 2,
      icon: Layers,
      label: 'AI Architecture',
      description: 'Design smart systems and data pipelines.'
    },
    {
      number: 3,
      icon: Code2,
      label: 'AI Development',
      description: 'Build and train custom models, automations, or dashboards.'
    },
    {
      number: 4,
      icon: Rocket,
      label: 'AI Deployment',
      description: 'Launch with ongoing monitoring, iteration, and support.'
    }
  ];

  return (
    <section id="roadmap-section" className="py-20 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Our proven process takes you from concept to deployment in 2-6 weeks
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2">
            <div className="h-full bg-gradient-to-r from-purple-600/20 via-purple-500/50 to-purple-600/20 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="relative w-24 h-24 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl flex flex-col items-center justify-center mb-6 z-10"
                    whileHover={{ scale: 1.1, borderColor: 'rgba(168, 85, 247, 0.6)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-700/20 rounded-2xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: idx * 0.5
                      }}
                    />
                    <step.icon className="h-8 w-8 text-purple-400 mb-1 relative z-10" />
                    <span className="text-xs font-bold text-purple-300 relative z-10">Step {step.number}</span>
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.label}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-xs">{step.description}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500/50 to-purple-500/20 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">From Concept to Deployment</h3>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            Typical timeline: 2-6 weeks, with continuous optimization and support post-launch.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">2-6</div>
              <div className="text-sm text-slate-400">Weeks to Deploy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">99.9%</div>
              <div className="text-sm text-slate-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">&lt;4h</div>
              <div className="text-sm text-slate-400">Critical Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
              <div className="text-sm text-slate-400">Operation</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedRoadmap;
