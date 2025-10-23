import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FlagshipCTA = () => {
  return (
    <section className="mb-16">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="services-refined-card text-center"
        >
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 rounded-3xl blur-3xl"
            animate={{
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-5 uppercase tracking-wide">
              Let's Build the AI Systems
              <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent mt-2">
                That Scale Your Business
              </span>
            </h2>

            <p className="text-base md:text-lg text-white opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Start with a discovery session. We'll map your processes, identify quick wins, and design a roadmap to intelligent automation.
            </p>

            <Link
              to="/contact"
              className="services-btn-primary"
            >
              Book a Discovery Session
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlagshipCTA;
