import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Star, Shield, Phone, MessageSquare, Calendar, TrendingUp, Sparkles } from 'lucide-react';

interface PricingPositioningProps {
  onBookDemo: () => void;
}

const PricingPositioning: React.FC<PricingPositioningProps> = ({ onBookDemo }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tiers = [
    {
      name: 'Basic',
      setup: '£199.99',
      monthly: '£99.99',
      bestFor: 'Sole traders & one-person businesses',
      features: [
        'SoleScope bespoke integrated application (client dashboard)',
        'AI Voice Agent for core enquiry handling',
        'Custom conversational scripts (basic)',
        'Call handling & qualification',
        'Email call summaries',
        'Standard usage allowance',
      ],
      excludes: ['Bookings'],
      note: 'Ideal if you want enquiries captured and qualified without managing bookings automatically.',
      icon: Phone,
      gradient: 'from-slate-600 to-slate-700',
      borderColor: 'border-slate-600/50',
      featured: false,
    },
    {
      name: 'Standard',
      setup: '£349.99',
      monthly: '£149.99',
      bestFor: 'Small businesses & light teams',
      features: [
        'Everything in Basic, plus:',
        'Booking system integration (appointments / callbacks)',
        'Automatic transcripts (email or SMS)',
        'Smarter conversational logic (branching flows)',
        'Priority monthly tuning & updates',
        'Higher usage allowance',
      ],
      excludes: [],
      note: 'Ideal for businesses ready to automate bookings and handle higher enquiry volume.',
      icon: Calendar,
      gradient: 'from-purple-600 to-purple-700',
      borderColor: 'border-purple-500/50',
      featured: false,
    },
    {
      name: 'Premium',
      setup: '£499.99',
      setupPrefix: 'from',
      monthly: '£199.99',
      monthlyPrefix: 'from',
      bestFor: 'Growing, high-volume, or complex businesses',
      features: [
        'Everything in Standard, plus:',
        'Multi-flow conversation systems (multiple services, teams, or departments)',
        'Advanced analytics & performance insights',
        'Custom integrations (CRM, workflows, lead pipelines)',
        'Highest usage allowances',
        'Premium support & continuous optimisation',
        'Optional voice cloning (where suitable and legally permitted)',
      ],
      excludes: [],
      note: 'Built as a bespoke solution — pricing scales based on usage, workflows, and complexity.',
      icon: Sparkles,
      gradient: 'from-purple-500 to-violet-600',
      borderColor: 'border-purple-400',
      featured: true,
    },
  ];

  const everyPlanIncludes = [
    'Bespoke client dashboard (your central command centre)',
    'Unified call history & lead capture',
    'Transcripts & summaries (tier-dependent)',
    'Secure access & ongoing improvements',
  ];

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400 mb-2">
            Guideline pricing — final costs depend on usage and configuration
          </p>
          <p className="text-sm text-slate-500">Prices exclude VAT</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {tiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`relative ${tier.featured ? 'lg:scale-105' : ''}`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full shadow-lg">
                      <Star className="w-4 h-4 text-white fill-white" />
                      <span className="text-sm font-bold text-white">Recommended</span>
                    </div>
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-10 rounded-2xl blur-xl ${tier.featured ? 'animate-pulse' : ''}`} />

                <div className={`relative h-full p-8 bg-slate-900/80 backdrop-blur-sm border-2 ${tier.borderColor} rounded-2xl ${tier.featured ? 'shadow-2xl shadow-purple-500/20' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-gradient-to-br ${tier.gradient} rounded-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      {tier.setupPrefix && (
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{tier.setupPrefix}</span>
                      )}
                      <span className="text-3xl font-bold text-white">{tier.setup}</span>
                      <span className="text-slate-400 text-sm">setup</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      {tier.monthlyPrefix && (
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{tier.monthlyPrefix}</span>
                      )}
                      <span className="text-3xl font-bold text-white">{tier.monthly}</span>
                      <span className="text-slate-400 text-sm">/ month</span>
                    </div>
                  </div>

                  <p className="text-purple-300 font-medium mb-6">{tier.bestFor}</p>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className={`text-slate-300 text-sm ${feature.includes('Everything in') ? 'font-semibold text-purple-300' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {tier.excludes.length > 0 && (
                    <div className="mb-6 p-3 bg-slate-800/50 rounded-lg border border-red-500/30">
                      <div className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-300 font-semibold text-sm mb-1">Does NOT include:</p>
                          {tier.excludes.map((exclude, i) => (
                            <p key={i} className="text-red-200 text-sm">{exclude}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-400 leading-relaxed">{tier.note}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="p-8 bg-slate-900/80 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Every plan includes the SoleScope Application</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {everyPlanIncludes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Guideline Pricing & Fair Usage</h3>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>All prices shown are <span className="text-purple-300 font-semibold">guideline starting prices</span>.</p>

              <p>Final pricing may vary depending on call volume, call duration, transcript volume, and integrations.</p>

              <p>If usage exceeds your plan allowance, surcharges apply — these are clearly explained and agreed during your demo or appointment.</p>

              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-purple-200 font-medium">
                  We'll always recommend the most cost-effective setup for your business.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <button
              onClick={onBookDemo}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-lg font-semibold rounded-lg hover:from-purple-400 hover:to-violet-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              Book a Live Demo
            </button>
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-3 px-10 py-5 bg-slate-800 text-white text-lg font-semibold rounded-lg border-2 border-purple-400/50 hover:bg-slate-700 hover:border-purple-400 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Talk Through Pricing
            </button>
          </div>
          <p className="text-sm text-slate-400">
            Not sure which plan fits? We'll walk you through it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPositioning;
