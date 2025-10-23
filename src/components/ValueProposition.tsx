import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Palette, TrendingUp } from 'lucide-react';
import '../styles/homepage-galaxy.css';

const ValueProposition = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const values = [
    {
      icon: Zap,
      title: "AI-Powered Efficiency",
      description: "Harness cutting-edge AI technology to automate workflows, optimize performance, and deliver results faster than traditional methods."
    },
    {
      icon: Palette,
      title: "Premium Modern Design",
      description: "Stunning, conversion-focused designs that reflect your brand's professionalism and build trust with your ideal customers."
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Future-proof systems that grow with your business, from startup to enterprise, with seamless upgrades and expansions."
    }
  ];

  return (
    <section
      ref={ref}
      className="homepage-section"
      aria-labelledby="value-prop-heading"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="value-prop-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            Why Choose SoleScope
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Complete digital solutions designed specifically for service-based businesses who want to compete and win online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="homepage-refined-card value-card"
              role="article"
              aria-labelledby={`value-title-${index}`}
            >
              <div className="value-icon">
                <value.icon className="h-10 w-10 text-white drop-shadow-lg" />
              </div>

              <h3
                id={`value-title-${index}`}
                className="value-title"
              >
                {value.title}
              </h3>
              <p className="value-description">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;