import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Sparkles } from 'lucide-react';
import '../styles/homepage-galaxy.css';

const FinalCTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="homepage-section"
      aria-labelledby="final-cta-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="homepage-refined-card homepage-cta-card"
        >
          <div className="homepage-cta-icon">
            <Sparkles className="h-12 w-12 text-white drop-shadow-lg" />
          </div>

          <h2
            id="final-cta-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight uppercase tracking-wide"
          >
            Ready to Transform Your Business?
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's discuss your project and create digital solutions that help you win more clients and grow sustainably.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
            >
              <Calendar className="mr-3 h-5 w-5" />
              <span>Book a Discovery Call</span>
            </Link>

            <a
              href="mailto:contact@solescope.co.uk"
              className="inline-flex items-center px-10 py-4 bg-transparent border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
            >
              <Mail className="mr-3 h-5 w-5" />
              <span>Email Us</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>No obligation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Response within 24 hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
