import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light mb-8 leading-tight tracking-tight">
            <span className="text-white font-extralight">Transform Your</span>
            <br />
            <span className="text-white font-medium">Service Business</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            We blend AI technology with human-first design to create client-winning digital systems—without the confusion or hassle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <Link
            to="/pricing"
            className="group bg-white px-10 py-4 text-lg font-medium text-black hover:bg-gray-100 hover:ring-2 hover:ring-blue-400 transition-all duration-300 flex items-center justify-center"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/services" className="text-white underline">
            View Our Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-400 text-center">Automated systems that work while you focus on your craft</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Human-First</h3>
            <p className="text-gray-400 text-center">Designed for real people, not tech experts</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Results-Driven</h3>
            <p className="text-gray-400 text-center">Built to win clients and grow your business</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;