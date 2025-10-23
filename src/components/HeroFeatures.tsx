import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Sparkles } from 'lucide-react';

const HeroFeatures = () => {
  return (
    <section className="py-20 bg-rich-black-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-16 max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center text-center">
            <Zap className="h-10 w-10 text-white mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white uppercase tracking-wide">AI-Powered</h3>
            <p className="text-gray-400 text-base leading-relaxed font-normal">
              Automated systems that work while you focus on your craft
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="h-10 w-10 text-white mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white uppercase tracking-wide">Human-First</h3>
            <p className="text-gray-400 text-base leading-relaxed font-normal">
              Designed for real people, not tech experts
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Sparkles className="h-10 w-10 text-white mb-6" />
            <h3 className="text-xl font-semibold mb-4 text-white uppercase tracking-wide">Results-Driven</h3>
            <p className="text-gray-400 text-base leading-relaxed font-normal">
              Built to win clients and grow your business
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFeatures;