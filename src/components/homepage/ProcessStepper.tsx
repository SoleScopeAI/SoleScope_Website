import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Palette, Bot, Rocket } from 'lucide-react';

const ProcessStepper = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Discover",
      description: "We learn your business and goals.",
      details: "Deep dive into your operations, target audience, pain points, and objectives to create a tailored strategy.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      icon: Palette,
      title: "Design",
      description: "We craft an intelligent, branded website.",
      details: "Custom design that reflects your brand identity while optimizing for conversions and user experience.",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 3,
      icon: Bot,
      title: "Automate",
      description: "We integrate AI tools that work for you.",
      details: "Implement smart automation for lead qualification, client workflows, and business operations that run 24/7.",
      color: "from-orange-500 to-red-500"
    },
    {
      number: 4,
      icon: Rocket,
      title: "Launch & Grow",
      description: "You go live and scale with data-driven insights.",
      details: "Deploy your solution with ongoing support, monitoring, and optimization to ensure continuous growth.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      aria-labelledby="process-heading"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 uppercase tracking-wide"
          >
            Our Process — Simplicity with Intelligence
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From discovery to launch, we follow a proven methodology that delivers exceptional results.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                onHoverStart={() => setActiveStep(index)}
                onHoverEnd={() => setActiveStep(null)}
                className="relative"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30"
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden`}
                    animate={activeStep === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{
                        x: activeStep === index ? ['-100%', '100%'] : '-100%'
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="absolute -inset-1 bg-gradient-to-br opacity-75 blur-xl"
                      style={{ backgroundImage: `linear-gradient(to bottom right, ${step.color})` }}
                    />
                    <step.icon className="h-10 w-10 text-white relative z-10" />
                  </motion.div>

                  <div className="text-center mb-3">
                    <motion.div
                      className={`inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br ${step.color} rounded-full mb-2`}
                      animate={activeStep === index ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm font-bold text-white">{step.number}</span>
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-base text-slate-300 text-center mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeStep === index ? 'auto' : 0,
                      opacity: activeStep === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-sm text-slate-400 text-center leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/3 left-full w-8 -ml-4 z-0"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  >
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-3xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-base text-slate-300 mb-6 leading-relaxed">
              Most projects are completed in 2-4 weeks. Let's discuss your specific needs and create a custom timeline.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Free consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>No hidden costs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Transparent process</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessStepper;
