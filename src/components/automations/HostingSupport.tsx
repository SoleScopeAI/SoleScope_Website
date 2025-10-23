import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, GitBranch } from 'lucide-react';

const HostingSupport = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure, monitored, and managed hosting',
      description: 'Enterprise-grade infrastructure with 24/7 monitoring'
    },
    {
      icon: GitBranch,
      title: 'Versioned deployments, backups, and observability',
      description: 'Full audit trails and disaster recovery protocols'
    },
    {
      icon: Activity,
      title: 'Ongoing optimisation with monthly insights',
      description: 'Continuous improvement based on performance data'
    }
  ];

  return (
    <section className="py-20 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hosting, Security & Support
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Your systems run on secure, monitored infrastructure with full support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center hover:bg-white/[0.07] hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <feature.icon className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostingSupport;
