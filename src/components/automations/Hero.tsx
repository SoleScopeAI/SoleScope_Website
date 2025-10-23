import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('proposal-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCases = () => {
    const casesElement = document.getElementById('case-studies');
    if (casesElement) {
      casesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-40 premium-bg overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="floating-particles"></div>
      <div className="pulse-glow pulse-glow-1"></div>
      <div className="pulse-glow pulse-glow-2"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold dark-text-primary mb-6 leading-tight">
            Custom AI Automations,{' '}
            <span className="purple-gradient-text">
              Built Around Your Stack
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl dark-text-body mb-12 max-w-4xl mx-auto leading-relaxed">
            Less admin, more wins. We connect your tools and deploy AI where it actually helps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group dark-btn-primary px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center"
              data-analytics="hero-primary-cta"
            >
              Request a Proposal
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              onClick={scrollToCases}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group dark-btn-secondary px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center"
              data-analytics="hero-secondary-cta"
            >
              See Real Examples
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;