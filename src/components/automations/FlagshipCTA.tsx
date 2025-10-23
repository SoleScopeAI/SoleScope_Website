import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FlagshipCTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-12 md:p-16 text-center overflow-hidden"
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Build the AI Systems
              <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent mt-2">
                That Scale Your Business
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start with a discovery session. We'll map your processes, identify quick wins, and design a roadmap to intelligent automation.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
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
