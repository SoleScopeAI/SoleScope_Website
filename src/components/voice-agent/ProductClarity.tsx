import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Check } from 'lucide-react';

const ProductClarity = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const notItems = [
    'Not a chatbot',
    'Not a plugin',
    'Not a generic AI tool',
    'Not an off-the-shelf solution',
  ];

  const isItems = [
    {
      title: 'A Bespoke AI Voice Agent',
      description: 'Powered by Vapi, trained on your business',
    },
    {
      title: 'Custom SoleScope Application',
      description: 'Built specifically for your operations',
    },
    {
      title: 'Centralised Control System',
      description: 'One dashboard for all customer interactions',
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            This Is Not Another Chatbot
          </h2>
          <p className="text-xl text-slate-400">
            It's a complete voice intelligence system, custom-built for your business
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">What It's Not:</h3>
            <div className="space-y-3">
              {notItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-slate-300 font-medium line-through opacity-60">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">What It Is:</h3>
            <div className="space-y-4">
              {isItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-800/30 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl"
        >
          <p className="text-lg text-center text-slate-300 leading-relaxed">
            Every call, every lead, every booking flows through one unified system —
            <span className="text-cyan-400 font-semibold"> purpose-built for your business</span>,
            not adapted from someone else's.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductClarity;
