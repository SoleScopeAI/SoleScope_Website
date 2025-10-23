import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Truck, TrendingUp, Clipboard, Briefcase } from 'lucide-react';

const SectorUseCases = () => {
  const sectors = [
    {
      icon: Factory,
      title: 'FMCG / Manufacturing',
      description: 'Production dashboards, predictive maintenance, quality analytics'
    },
    {
      icon: Truck,
      title: 'Distribution & Logistics',
      description: 'Route optimisation, inventory sync, automated dispatch reporting'
    },
    {
      icon: TrendingUp,
      title: 'Marketing & Sales',
      description: 'Lead scoring, campaign performance, CRM enrichment & follow-ups'
    },
    {
      icon: Clipboard,
      title: 'Operations & Admin',
      description: 'Approvals, scheduling, document & task automation'
    },
    {
      icon: Briefcase,
      title: 'Professional Services',
      description: 'Client onboarding, SLAs, timesheets/invoices automation'
    }
  ];

  return (
    <section className="py-20 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sector Use-Cases
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Purpose-built solutions for the unique workflows of your industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30">
                <sector.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{sector.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{sector.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorUseCases;
