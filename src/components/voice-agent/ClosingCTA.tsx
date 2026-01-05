import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

interface ClosingCTAProps {
  onBookDemo: () => void;
}

const ClosingCTA: React.FC<ClosingCTAProps> = ({ onBookDemo }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Professional',
      description: 'Every call answered with consistency and expertise',
    },
    {
      icon: CheckCircle,
      title: 'Proven ROI',
      description: 'Capture more leads, book more jobs, grow revenue',
    },
    {
      icon: CheckCircle,
      title: 'Reliable',
      description: 'Built for UK businesses, backed by UK support',
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stop Missing Calls.
              <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300 bg-clip-text text-transparent mt-2">
                Start Growing Your Business.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Every missed call is a missed opportunity. Every lost lead is lost revenue.
              Let's change that.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full mb-4">
                  <benefit.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <button
              onClick={onBookDemo}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-lg font-semibold rounded-lg hover:from-purple-400 hover:to-violet-500 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              Book a Live Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-slate-800 border-2 border-slate-600 text-white text-lg font-semibold rounded-lg hover:bg-slate-700 hover:border-purple-500 transition-all duration-300"
            >
              <Calendar className="w-6 h-6" />
              Talk to a Specialist
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-2xl text-center"
          >
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              <span className="text-purple-400 font-semibold">Trusted by UK service businesses</span> who demand
              professionalism, reliability, and real results.
            </p>
            <p className="text-slate-400">
              Purpose-built for your industry. Custom-developed for your business. Ready when you are.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-400">
                Available now for UK-based service businesses
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;
