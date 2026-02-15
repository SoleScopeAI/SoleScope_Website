import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, Globe, Code, BarChart3, Palette, ArrowRight } from 'lucide-react';

const MobileServicesPreview = () => {
  const services = [
    {
      icon: Bot,
      label: "AI Automations",
      path: "/services/custom-ai-automations",
      description: "Smart automation for lead qualification, workflows & business intelligence",
      isAI: true
    },
    {
      icon: Globe,
      label: "Website Design",
      path: "/services/website-design",
      description: "Conversion-focused websites with enterprise hosting & SEO",
      isAI: false
    },
    {
      icon: Code,
      label: "Custom WebApps",
      path: "/services/custom-webapps",
      description: "Multi-user web applications with team collaboration",
      isAI: false
    },
    {
      icon: BarChart3,
      label: "AI Dashboards",
      path: "/services/ai-dashboards",
      description: "Real-time business intelligence with custom reporting",
      isAI: false
    },
    {
      icon: Palette,
      label: "Brand Identity",
      path: "/services/brand-identity",
      description: "Complete corporate identity systems for growing businesses",
      isAI: false
    }
  ];

  return (
    <section className="md:hidden relative py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Our Services
          </h2>
          <p className="text-sm text-slate-400">
            End-to-end solutions for your digital growth
          </p>
        </motion.div>

        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={service.path}
                className={`block group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  service.isAI
                    ? 'bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border-cyan-400/30 hover:border-cyan-400/60'
                    : 'bg-slate-800/40 border-white/10 hover:border-purple-500/50'
                } backdrop-blur-sm`}
              >
                <div className="relative z-10 p-4 flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    service.isAI
                      ? 'bg-gradient-to-br from-cyan-400 via-purple-500 to-emerald-400'
                      : 'bg-gradient-to-br from-purple-600 to-purple-700'
                  }`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-semibold text-white">
                        {service.label}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  service.isAI
                    ? 'bg-gradient-to-r from-cyan-500/5 to-purple-500/5'
                    : 'bg-gradient-to-r from-purple-500/5 to-purple-600/5'
                }`}></div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            <span>Explore All Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileServicesPreview;
