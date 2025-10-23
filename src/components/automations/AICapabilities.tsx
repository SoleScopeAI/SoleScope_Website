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
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3 uppercase tracking-wide">
          Advanced AI Capabilities
        </h2>
        <p className="text-base text-white opacity-80 max-w-3xl mx-auto">
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
            className="services-refined-card feature-card"
          >
            <div className="feature-icon">
              <capability.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="feature-title">{capability.title}</h3>
            <p className="feature-description">{capability.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AICapabilities;
