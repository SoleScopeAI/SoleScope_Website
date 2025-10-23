import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, BarChart3, Server } from 'lucide-react';

const Overview = () => {
  const pillars = [
    {
      icon: Settings,
      label: "Custom Automations",
      description: "Tailored workflows"
    },
    {
      icon: Database,
      label: "Business Systems",
      description: "Integrated operations"
    },
    {
      icon: BarChart3,
      label: "AI Dashboards",
      description: "Real-time analytics"
    },
    {
      icon: Server,
      label: "Managed Hosting",
      description: "Secure infrastructure"
    }
  ];

  return (
    <section id="overview-section" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What You Get & Why It Matters
            </h2>
            <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
              <p>
                From daily admin to enterprise-grade systems, we build AI solutions that connect your data, reduce manual work, and surface insight that drives growth.
              </p>
              <p>
                We use modern automation frameworks (including n8n) and custom software to fit your workflows—no templates, no black box.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] hover:border-purple-400/30 transition-all duration-300"
              >
                <pillar.icon className="h-8 w-8 text-purple-400 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">{pillar.label}</h3>
                <p className="text-xs text-slate-400">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
