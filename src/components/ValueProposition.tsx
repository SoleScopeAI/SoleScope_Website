import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Palette, TrendingUp } from 'lucide-react';

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
      className="relative py-20 overflow-hidden"
      aria-labelledby="value-prop-heading"
      role="region"
    >
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        {/* Base galaxy gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05050c] via-[#0c0816] to-[#05050c]"></div>
        
        {/* Animated nebula layers */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(1200px 800px at 18% 22%, rgba(168,85,247,0.16), transparent 62%),
              radial-gradient(1000px 700px at 82% 74%, rgba(217,70,239,0.11), transparent 60%),
              radial-gradient(800px 600px at 45% 45%, rgba(124,58,237,0.09), transparent 55%)
            `,
            animation: 'galaxyTwinkle 12s ease-in-out infinite'
          }}
        ></div>
        
        {/* Floating particles */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(2px 2px at 15% 20%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1.5px 1.5px at 35% 75%, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 75% 40%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 60% 60%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1.5px 1.5px at 90% 20%, rgba(255,255,255,0.4), transparent)
            `,
            backgroundSize: '200px 200px, 150px 150px, 180px 180px, 120px 120px, 160px 160px',
            animation: 'galaxyDrift 80s linear infinite'
          }}
        ></div>
        
        {/* Pulse glows */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
            animation: 'galaxyPulse 8s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.4) 0%, transparent 70%)',
            animation: 'galaxyPulse 8s ease-in-out infinite 2s'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="value-prop-heading" className="sr-only">Our Value Proposition</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30 focus-within:border-purple-400/50 focus-within:shadow-purple-500/30 transition-all duration-500 h-full flex flex-col text-center"
              role="article"
              aria-labelledby={`value-title-${index}`}
              tabIndex={0}
            >
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
              
              {/* Icon */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600/30 to-purple-700/30 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-focus:scale-110 transition-transform duration-300">
                <value.icon className="h-10 w-10 text-white drop-shadow-lg" />
                
                {/* Icon glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(124,58,237,0.3))',
                    filter: 'blur(8px)',
                    transform: 'scale(1.2)'
                  }}
                ></div>
              </div>

              {/* Content */}
              <h3 
                id={`value-title-${index}`}
                className="text-2xl font-bold text-white mb-6 group-hover:text-purple-300 group-focus:text-purple-300 transition-colors duration-300 leading-tight uppercase tracking-wide"
              >
                {value.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 group-focus:text-gray-200 transition-colors duration-300 flex-grow">
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