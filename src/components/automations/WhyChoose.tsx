import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wrench, Shield } from 'lucide-react';

const WhyChoose = () => {
  const reasons = [
    {
      icon: Sparkles,
      title: 'AI-First Approach',
      description: 'We redesign processes around intelligent automation, not just digitize existing ones.'
    },
    {
      icon: Wrench,
      title: 'Custom Development',
      description: 'Bespoke AI solutions built for your specific needs, not generic templates.'
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Infrastructure',
      description: 'Secure, scalable, monitored systems that grow with your business.'
    }
  ];

  return (
    <section className="mb-16">
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3 uppercase tracking-wide">
            Why Choose SoleScope
          </h2>
          <p className="text-base text-white opacity-80 max-w-3xl mx-auto">
            We combine technical excellence with business understanding
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="services-refined-card feature-card"
            >
              <div className="feature-icon">
                <reason.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="feature-title">{reason.title}</h3>
              <p className="feature-description">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="services-refined-card"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2-6 Weeks', label: 'From concept to deployment' },
              { value: '99.9% Uptime', label: 'Monitored systems' },
              { value: '<4h Response', label: 'Critical issue SLA' },
              { value: '24/7 Operation', label: 'Continuous automation' }
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
