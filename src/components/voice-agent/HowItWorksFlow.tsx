import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MessageCircle, FileCheck, Calendar, BarChart3, ArrowDown } from 'lucide-react';

const HowItWorksFlow = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: Phone,
      title: 'Customer Calls Your Business',
      description: 'A potential customer dials your number, any time of day or night.',
      color: 'purple',
    },
    {
      icon: MessageCircle,
      title: 'AI Agent Answers Naturally',
      description: 'Your AI voice agent picks up instantly, speaking naturally and professionally.',
      color: 'violet',
    },
    {
      icon: FileCheck,
      title: 'Gathers Information',
      description: 'Asks the right questions, understands responses, and captures key details.',
      color: 'purple',
    },
    {
      icon: Calendar,
      title: 'Takes Bookings or Captures Leads',
      description: 'Books appointments directly into your calendar or captures full lead details.',
      color: 'purple',
    },
    {
      icon: BarChart3,
      title: 'Syncs to Central Dashboard',
      description: 'Everything flows to your custom control centre for review and action.',
      color: 'violet',
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-400">
            Simple for your customers. Powerful for your business.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-grow pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-purple-400 font-bold text-lg">Step {index + 1}</span>
                    <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex justify-center my-4 origin-top"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-violet-500" />
                    <ArrowDown className="w-6 h-6 text-purple-400 animate-bounce" />
                    <div className="w-px h-8 bg-gradient-to-b from-violet-500 to-transparent" />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 max-w-3xl mx-auto p-8 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-xl text-center"
        >
          <p className="text-lg text-slate-300 leading-relaxed">
            From first ring to final booking —
            <span className="text-purple-400 font-semibold"> fully automated, completely natural, entirely yours.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksFlow;
