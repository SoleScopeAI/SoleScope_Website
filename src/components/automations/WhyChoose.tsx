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
    <section className="py-16 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Why Choose SoleScope
          </h2>
          <p className="text-base text-slate-300 max-w-3xl mx-auto">
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
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center hover:border-purple-400/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <reason.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6"
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
