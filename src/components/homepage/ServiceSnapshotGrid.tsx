import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Globe, Code, BarChart3, Palette, Bot, ArrowRight, CheckCircle } from 'lucide-react';

const ServiceSnapshotGrid = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Bot,
      title: "AI Automations",
      path: "/services/custom-ai-automations",
      highlights: [
        "24/7 intelligent lead qualification",
        "Automated client workflows",
        "Custom AI integrations"
      ],
      color: "from-cyan-400 via-purple-500 to-emerald-400",
      isAI: true
    },
    {
      icon: Globe,
      title: "Website Design",
      path: "/services/website-design",
      highlights: [
        "Mobile-responsive design",
        "Fully managed hosting",
        "SEO optimized"
      ],
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Code,
      title: "Custom WebApps",
      path: "/services/custom-webapps",
      highlights: [
        "Tailored functionality",
        "Enterprise-grade hosting",
        "Scalable architecture"
      ],
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: BarChart3,
      title: "AI Dashboards",
      path: "/services/ai-dashboards",
      highlights: [
        "Real-time analytics",
        "Predictive insights",
        "Custom data visualizations"
      ],
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Palette,
      title: "Brand Identity",
      path: "/services/brand-identity",
      highlights: [
        "Complete brand packages",
        "Logo & visual systems",
        "Marketing materials"
      ],
      color: "from-purple-600 to-purple-700"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      aria-labelledby="services-snapshot-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-950/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-purple-400 font-semibold uppercase tracking-wide mb-3">
            Our Services
          </p>
          <h2
            id="services-snapshot-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide"
          >
            Explore What We Build
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Complete digital solutions designed for service businesses who want to compete and win online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onHoverStart={() => setHoveredService(index)}
              onHoverEnd={() => setHoveredService(null)}
              className="relative h-full"
            >
              <Link
                to={service.path}
                className={`block h-full bg-white/5 backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group ${
                  service.isAI
                    ? 'border-cyan-400/30 hover:border-cyan-400/60 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:via-purple-500/10 hover:to-emerald-500/10'
                    : 'border-white/10 hover:border-purple-500/40 hover:bg-white/10'
                }`}
              >
                {service.isAI && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-emerald-400/5"
                    animate={{
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {service.isAI && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    <service.icon className="h-8 w-8 text-white relative z-10" />
                  </motion.div>

                  <h3 className={`text-xl font-bold mb-3 transition-colors ${
                    service.isAI ? 'text-white' : 'text-white group-hover:text-purple-400'
                  }`}>
                    {service.title}
                  </h3>

                  <ul className="space-y-2 mb-4">
                    {service.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={hoveredService === index ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="flex items-start space-x-2 text-sm text-slate-300"
                      >
                        <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          service.isAI ? 'text-cyan-400' : 'text-purple-400'
                        }`} />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <AnimatePresence>
                    {hoveredService === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center space-x-2 font-semibold text-sm ${
                          service.isAI ? 'text-cyan-400' : 'text-purple-400'
                        }`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${service.color}`}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
          >
            <span>View All Services</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSnapshotGrid;
