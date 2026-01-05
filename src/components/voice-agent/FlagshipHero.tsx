import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, ArrowRight, Play } from 'lucide-react';

interface FlagshipHeroProps {
  onBookDemo: () => void;
  onSeeDemo: () => void;
}

const FlagshipHero: React.FC<FlagshipHeroProps> = ({ onBookDemo, onSeeDemo }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-full mb-8">
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Flagship Product</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Business, Answering
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent mt-2">
                Every Call — Instantly.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-slate-300 mb-6 leading-relaxed max-w-3xl mx-auto"
          >
            Never miss another call. Never lose another lead.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-slate-400 mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            A bespoke AI voice agent, powered by Vapi, embedded inside a custom SoleScope application.
            It answers calls naturally, captures leads, takes bookings, and funnels everything into one central dashboard —
            built specifically for your UK service business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onBookDemo}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
            >
              Book a Live Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onSeeDemo}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/50 border-2 border-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700/50 hover:border-cyan-500 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              See How It Works
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-slate-400">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-slate-400">Call Answer Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
              <div className="text-slate-400">Missed Opportunities</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full p-1">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default FlagshipHero;
