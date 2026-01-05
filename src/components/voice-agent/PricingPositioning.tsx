import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Shield, Zap } from 'lucide-react';

interface PricingPositioningProps {
  onBookDemo: () => void;
}

const PricingPositioning: React.FC<PricingPositioningProps> = ({ onBookDemo }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const included = [
    'Bespoke AI voice agent trained on your business',
    'Custom SoleScope dashboard application',
    'Full call transcription and analytics',
    'Booking and lead capture integration',
    'Unlimited calls and conversations',
    'UK-based setup and support',
    'Regular updates and improvements',
    'Dedicated account manager',
  ];

  const comparison = [
    {
      feature: 'Setup',
      generic: 'Template-based',
      solescope: 'Fully Bespoke',
    },
    {
      feature: 'Dashboard',
      generic: 'Shared interface',
      solescope: 'Custom-built for you',
    },
    {
      feature: 'Integration',
      generic: 'Limited options',
      solescope: 'Full ecosystem',
    },
    {
      feature: 'Support',
      generic: 'Ticket system',
      solescope: 'Dedicated manager',
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Investment & Value
          </h2>
          <p className="text-xl text-slate-400">
            This is a premium, bespoke system — not an off-the-shelf plugin
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl" />
            <div className="relative p-8 bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-500/50 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">What's Included</h3>
              </div>

              <ul className="space-y-4">
                {included.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Investment Structure</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 border border-cyan-500/30 rounded-lg">
                  <div className="text-sm font-semibold text-cyan-400 mb-1">Initial Setup</div>
                  <div className="text-slate-300">Bespoke development, training, and integration</div>
                </div>

                <div className="p-4 bg-slate-800/50 border border-blue-500/30 rounded-lg">
                  <div className="text-sm font-semibold text-blue-400 mb-1">Monthly Platform</div>
                  <div className="text-slate-300">Hosting, AI processing, and ongoing support</div>
                </div>

                <div className="p-4 bg-slate-800/50 border border-slate-500/30 rounded-lg">
                  <div className="text-sm font-semibold text-slate-400 mb-1">Premium Support</div>
                  <div className="text-slate-300">Dedicated account management included</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <p className="text-slate-300 leading-relaxed">
                  <span className="text-cyan-400 font-semibold">Pricing is custom</span> based on your call volume,
                  integration requirements, and specific business needs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Generic Voice Bot vs SoleScope System
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-4 px-4 text-slate-400 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-slate-400 font-semibold">Generic Tools</th>
                    <th className="text-center py-4 px-4 text-cyan-400 font-semibold">SoleScope</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, index) => (
                    <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-slate-500">{row.generic}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-2 text-cyan-400 font-semibold">
                          <Check className="w-4 h-4" />
                          {row.solescope}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <button
            onClick={onBookDemo}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
          >
            Get Your Custom Quote
          </button>
          <p className="mt-4 text-slate-400">
            We'll discuss your specific needs and provide transparent pricing
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPositioning;
