import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Layers, Users, ArrowRight, CheckCircle, Clock, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseSoleScope = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const prefersReducedMotion = useReducedMotion();

  const [proofMetrics, setProofMetrics] = useState({
    nps: 0,
    turnaround: 0,
    retention: 0,
  });

  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      setProofMetrics({ nps: 92, turnaround: 14, retention: 96 });
      return;
    }

    const duration = 1500;
    const steps = 50;
    const interval = duration / steps;

    const targets = { nps: 92, turnaround: 14, retention: 96 };
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setProofMetrics({
        nps: Math.floor(targets.nps * progress),
        turnaround: Math.floor(targets.turnaround * progress),
        retention: Math.floor(targets.retention * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, prefersReducedMotion]);

  const values = [
    {
      icon: Zap,
      title: "AI-Driven Efficiency",
      description: "Streamline operations and client touchpoints with automation that's designed for real-world workflows.",
      bullets: [
        "Faster hand-offs",
        "Fewer manual steps",
        "Always-on capture"
      ],
      color: "from-cyan-400 via-blue-500 to-purple-500"
    },
    {
      icon: Layers,
      title: "Design with Depth",
      description: "Clean aesthetics paired with measurable outcomes — built for conversion, speed, and clarity.",
      bullets: [
        "Conversion-minded UX",
        "Performance-first builds",
        "SEO-ready"
      ],
      color: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      icon: Users,
      title: "Human + AI Partnership",
      description: "Technology that augments your team. You stay in control; the system does the heavy lifting.",
      bullets: [
        "Transparent logic",
        "Simple controls",
        "UK-based support"
      ],
      color: "from-orange-500 via-yellow-500 to-green-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-10"
        >
          <motion.h2
            variants={itemVariants}
            id="why-choose-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide"
          >
            Why Businesses Choose SoleScope
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            We design intelligent websites that do more — automate, engage, and grow your business while you focus on your craft.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              custom={index}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-purple-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(168,85,247,0.1)] overflow-hidden isolation-isolate"
              style={{
                transitionProperty: 'transform, border-color, box-shadow',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-3xl" />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
                  transform: 'translateX(-100%)',
                  animation: prefersReducedMotion ? 'none' : 'sheenSweep 2s ease-in-out infinite',
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden shadow-lg`}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    animate={prefersReducedMotion ? {} : {
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <value.icon className="h-10 w-10 text-white relative z-10 drop-shadow-lg" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-purple-300 transition-colors duration-300">
                  {value.title}
                </h3>

                <p className="text-sm text-slate-300 text-center leading-relaxed mb-4">
                  {value.description}
                </p>

                <ul className="space-y-2">
                  {value.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center justify-center text-xs text-slate-400">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-5xl mx-auto"
        >
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{proofMetrics.nps}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Avg. Project NPS</div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{proofMetrics.turnaround}d</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Avg. Turnaround</div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{proofMetrics.retention}%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Retention Rate</div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">24/7</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">UK-based Support</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.8 }}
          className="flex justify-end mb-6 max-w-5xl mx-auto"
        >
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-lg px-6 py-3 max-w-md">
            <p className="text-sm text-slate-300 italic">
              "We shipped faster and looked sharper on day one."
            </p>
            <p className="text-xs text-slate-500 mt-1 text-right">— Client, UK services</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 1 }}
          className="text-center"
        >
          <Link
            to="/about"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span>See how we work</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes sheenSweep {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSoleScope;
