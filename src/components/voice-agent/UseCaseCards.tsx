import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Scissors, Wrench, Heart, Zap } from 'lucide-react';

const UseCaseCards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const useCases = [
    {
      icon: Scissors,
      industry: 'Dog Groomers',
      problem: 'Calls come in while you\'re mid-groom, unable to answer. Lost bookings pile up.',
      solution: 'AI agent answers every call, checks availability, and books appointments directly into your calendar.',
      outcome: 'Zero missed bookings. Full calendar. Happier customers.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Wrench,
      industry: 'Trades & Contractors',
      problem: 'On-site all day. Phone constantly ringing. Can\'t quote while on a ladder.',
      solution: 'AI agent handles initial enquiries, captures job details, and schedules site visits.',
      outcome: 'More jobs booked. Less phone juggling. Professional image maintained.',
      gradient: 'from-blue-500 to-slate-500',
    },
    {
      icon: Heart,
      industry: 'Clinics & Practices',
      problem: 'Reception overwhelmed. Patients on hold. After-hours calls going to voicemail.',
      solution: 'AI agent handles routine bookings, prescription requests, and emergency triage.',
      outcome: 'Reduced wait times. Better patient experience. Staff focused on care.',
      gradient: 'from-slate-500 to-cyan-500',
    },
    {
      icon: Zap,
      industry: 'High-Enquiry Services',
      problem: 'Volume of calls exceeds capacity. Good leads lost in the noise.',
      solution: 'AI agent qualifies every enquiry, prioritizes hot leads, and captures all details.',
      outcome: 'Higher conversion. Better lead quality. Nothing falls through cracks.',
      gradient: 'from-cyan-400 to-blue-400',
    },
  ];

  return (
    <section ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-slate-800" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Who It's For
          </h2>
          <p className="text-xl text-slate-400">
            Built for UK service businesses that value every customer interaction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-cyan-500/50 transition-all duration-300 h-full">
                <div className={`inline-flex p-4 bg-gradient-to-br ${useCase.gradient} rounded-lg mb-6`}>
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {useCase.industry}
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-red-400 mb-2">The Problem</div>
                    <p className="text-slate-400 leading-relaxed">{useCase.problem}</p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-cyan-400 mb-2">The Solution</div>
                    <p className="text-slate-400 leading-relaxed">{useCase.solution}</p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-green-400 mb-2">The Outcome</div>
                    <p className="text-slate-300 font-medium leading-relaxed">{useCase.outcome}</p>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto text-center p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl"
        >
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            If you're busy serving customers and calls keep interrupting —
            <span className="text-cyan-400 font-semibold"> this is for you.</span>
          </p>
          <p className="text-slate-400">
            Your business keeps running. Your customers stay happy. You stay focused.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCaseCards;
