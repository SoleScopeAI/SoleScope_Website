import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Layers, Users } from 'lucide-react';

const WhyChooseSoleScope = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const values = [
    {
      icon: Zap,
      title: "AI-Driven Efficiency",
      description: "Streamline operations and customer capture through automation.",
      color: "from-cyan-400 via-blue-500 to-purple-500"
    },
    {
      icon: Layers,
      title: "Design with Depth",
      description: "We blend modern aesthetics with measurable business outcomes.",
      color: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      icon: Users,
      title: "Human + AI Partnership",
      description: "Technology that enhances, not replaces, your expertise.",
      color: "from-orange-500 via-yellow-500 to-green-500"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            id="why-choose-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide"
          >
            Why Businesses Choose SoleScope
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We design intelligent websites that do more — automate, engage, and grow your business while you focus on your craft.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${value.color})` }}
              />

              <motion.div
                className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 30px rgba(168, 85, 247, 0.5)',
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                  ]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                />
                <value.icon className="h-10 w-10 text-white relative z-10 drop-shadow-lg" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-purple-400 transition-colors">
                {value.title}
              </h3>
              <p className="text-base text-slate-300 text-center leading-relaxed">
                {value.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to right, ${value.color})` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSoleScope;
