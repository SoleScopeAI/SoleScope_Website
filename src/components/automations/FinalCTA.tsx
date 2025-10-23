import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12 text-center overflow-hidden"
        >
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 rounded-3xl blur-2xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build Your Next Evolution
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Start with a discovery session to explore how AI automation can transform your business operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg"
              >
                Book a Discovery Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                View Our Process
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
