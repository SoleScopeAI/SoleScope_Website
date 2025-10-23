import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, FileText } from 'lucide-react';

const FinalCallToAction = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <MessageSquare className="h-10 w-10 text-white relative z-10" />
            </div>
          </motion.div>

          <h2
            id="final-cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligent Together
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Book your discovery call or get a tailored proposal — in minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
        >
          <Link
            to="/contact"
            onMouseEnter={() => setHoveredButton('primary')}
            onMouseLeave={() => setHoveredButton(null)}
            className="group relative w-full sm:w-auto"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                opacity: hoveredButton === 'primary' ? 1 : 0.75
              }}
            />
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 text-lg font-bold rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-105 shadow-2xl">
              <MessageSquare className="h-6 w-6" />
              <span>Book Discovery Call</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/services"
            onMouseEnter={() => setHoveredButton('secondary')}
            onMouseLeave={() => setHoveredButton(null)}
            className="group relative w-full sm:w-auto"
          >
            <div className="relative bg-white/5 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 text-lg font-bold rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105">
              <FileText className="h-6 w-6" />
              <span>Explore Services</span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span>Typically respond within 1 hour</span>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <span>Free consultation included</span>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <span>No commitment required</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  2-4 Weeks
                </motion.div>
                <div className="text-sm text-slate-400">Average Delivery Time</div>
              </div>
              <div>
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                >
                  24/7
                </motion.div>
                <div className="text-sm text-slate-400">Support Available</div>
              </div>
              <div>
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                >
                  99.9%
                </motion.div>
                <div className="text-sm text-slate-400">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-12"
          onMouseEnter={() => setHoveredButton('chat')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {hoveredButton === 'chat' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <MessageSquare className="h-5 w-5 text-white" />
                  </motion.div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">AI Assistant Ready</div>
                    <div className="text-xs text-slate-400">Get instant answers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCallToAction;
