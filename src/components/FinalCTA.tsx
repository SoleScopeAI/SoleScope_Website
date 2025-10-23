import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section 
      ref={ref} 
      className="relative py-24 overflow-hidden"
      aria-labelledby="final-cta-heading"
      role="region"
    >
      {/* Most Dramatic Galaxy Background */}
      <div className="absolute inset-0 z-0">
        {/* Base galaxy gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c]"></div>
        
        {/* Intense multi-layer nebulas */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(1500px 1000px at 18% 22%, rgba(168,85,247,0.20), transparent 65%),
              radial-gradient(1300px 900px at 82% 74%, rgba(217,70,239,0.15), transparent 60%),
              radial-gradient(1100px 800px at 10% 88%, rgba(124,58,237,0.12), transparent 55%),
              radial-gradient(900px 700px at 90% 15%, rgba(147,51,234,0.10), transparent 50%),
              radial-gradient(700px 500px at 50% 50%, rgba(139,92,246,0.08), transparent 45%)
            `,
            animation: 'galaxyTwinkle 8s ease-in-out infinite'
          }}
        ></div>
        
        {/* Dense star field */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(2.5px 2.5px at 12% 18%, rgba(255,255,255,0.8), transparent),
              radial-gradient(2px 2px at 28% 76%, rgba(255,255,255,0.6), transparent),
              radial-gradient(2.5px 2.5px at 72% 38%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1.5px 1.5px at 58% 58%, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 86% 14%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1.5px 1.5px at 65% 25%, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 40% 80%, rgba(255,255,255,0.6), transparent)
            `,
            backgroundSize: '300px 300px, 200px 200px, 250px 250px, 150px 150px, 220px 220px, 180px 180px, 240px 240px, 190px 190px',
            animation: 'galaxyDrift 120s linear infinite'
          }}
        ></div>
        
        {/* Multiple dynamic pulse glows */}
        <div 
          className="absolute top-1/5 left-1/6 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)',
            animation: 'galaxyPulse 5s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/5 right-1/6 w-80 h-80 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.6) 0%, transparent 70%)',
            animation: 'galaxyPulse 5s ease-in-out infinite 1s'
          }}
        ></div>
        <div 
          className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)',
            animation: 'galaxyPulse 5s ease-in-out infinite 2.5s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full opacity-18"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.6) 0%, transparent 70%)',
            animation: 'galaxyPulse 5s ease-in-out infinite 4s'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <div className="flex justify-center items-center mb-8" aria-hidden="true">
            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600/30 to-purple-700/30 border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-12 w-12 text-white drop-shadow-lg" />
              
              {/* Icon shimmer effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-70"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}
              ></div>
              
              {/* Icon glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-60"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(124,58,237,0.4))',
                  filter: 'blur(12px)',
                  transform: 'scale(1.4)',
                  animation: 'galaxyPulse 4s ease-in-out infinite'
                }}
              ></div>
            </div>
          </div>

          {/* Headline */}
          <h2 
            id="final-cta-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight text-shadow uppercase tracking-wide"
          >
            Ready to scale your business with{' '}
            <span 
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #B39CFF, #6C3EF0, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 4s ease-in-out infinite'
              }}
            >
              AI-powered design?
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-300 font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of UK businesses transforming their digital presence with our AI-powered solutions. 
            Let's discuss how we can help you win more clients and grow sustainably.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link
              to="/contact"
              aria-label="Book a discovery call to discuss your project"
              className="group relative inline-flex items-center justify-center text-xl px-12 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
            >
              {/* Button shimmer effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  animation: 'shimmer 2s ease-in-out infinite'
                }}
              ></div>
              
              <Calendar className="relative z-10 mr-3 h-6 w-6" />
              <span className="relative z-10">Book a Discovery Call</span>
            </Link>
            
            <Link
              to="/services"
              aria-label="View our portfolio and services"
              className="group relative inline-flex items-center justify-center text-xl px-12 py-5 bg-transparent border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              View Our Work
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400"
            role="list"
            aria-label="Trust indicators"
          >
            <div className="flex items-center justify-center space-x-3" role="listitem">
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                  animation: 'galaxyPulse 2s ease-in-out infinite'
                }}
              ></div>
              <span className="text-base font-medium">Free consultation</span>
            </div>
            <div className="flex items-center justify-center space-x-3" role="listitem">
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                  animation: 'galaxyPulse 2s ease-in-out infinite 0.5s'
                }}
              ></div>
              <span className="text-base font-medium">No obligation</span>
            </div>
            <div className="flex items-center justify-center space-x-3" role="listitem">
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                  animation: 'galaxyPulse 2s ease-in-out infinite 1s'
                }}
              ></div>
              <span className="text-base font-medium">Response within 24 hours</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;