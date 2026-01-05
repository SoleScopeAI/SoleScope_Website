import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gauge, Database, Briefcase } from 'lucide-react';

const DifferentiationGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Gauge,
      title: 'Bespoke Control Centre',
      description: 'One custom dashboard',
      details: 'Built specifically for each business. No generic templates. Your operations, your way.',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      icon: Database,
      title: 'Unified Data Funnel',
      description: 'Everything in one place',
      details: 'Calls, leads, transcripts, bookings, and follow-ups. All flowing to your central command.',
      gradient: 'from-violet-500 to-slate-400',
    },
    {
      icon: Briefcase,
      title: 'Built for Real Businesses',
      description: 'Real-world solutions',
      details: 'Handles missed calls, after-hours enquiries, and high-volume demand without breaking a sweat.',
      gradient: 'from-slate-400 to-purple-400',
    },
  ];

  return (
    <section ref={ref} className="py-24 relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            What Makes It Different
          </h2>
          <p className="text-xl text-slate-400">
            Not just another voice assistant. A complete business system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 from-purple-500/10 to-violet-500/10 rounded-xl transition-opacity duration-300" />

              <div className="relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-purple-500/50 transition-all duration-300 h-full">
                <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-lg mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-purple-400 font-semibold mb-4">
                  {feature.description}
                </p>

                <p className="text-slate-400 leading-relaxed">
                  {feature.details}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-2xl mx-auto text-center"
        >
          <p className="text-lg text-slate-300 leading-relaxed">
            While others sell voice bots, we build
            <span className="text-purple-400 font-semibold"> complete communication systems </span>
            that become the front door to your entire business.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DifferentiationGrid;
