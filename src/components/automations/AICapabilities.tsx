import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, GitBranch, LineChart } from 'lucide-react';

const AICapabilities = () => {
  const capabilities = [
    {
      icon: Brain,
      title: 'Neural Processing',
      description: 'AI models that understand context and make intelligent decisions based on your business rules and patterns.'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Learning',
      description: 'Systems that adapt automatically to business patterns, continuously improving performance and accuracy.'
    },
    {
      icon: GitBranch,
      title: 'Intelligent Routing',
      description: 'Smart decision trees that direct tasks precisely to the right people, systems, or automated workflows.'
    },
    {
      icon: LineChart,
      title: 'Predictive Analytics',
      description: 'AI that forecasts trends and recommends proactive actions before issues arise or opportunities emerge.'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Advanced AI Capabilities
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Purpose-built intelligence that transforms how your business operates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.10] hover:border-purple-400/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30 group-hover:border-purple-400/50 transition-all">
                <capability.icon className="h-7 w-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">{capability.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICapabilities;
