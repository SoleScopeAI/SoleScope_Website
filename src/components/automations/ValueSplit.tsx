import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';

const ValueSplit = () => {
  return (
    <section className="py-20 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Built For Your Business Stage
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-purple-400/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">For Sole Traders</h3>
                <p className="text-slate-300 leading-relaxed">
                  Automate repetitive tasks—onboarding, invoicing, lead follow-ups, reporting—so you get hours back every week.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-purple-400/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <Briefcase className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">For SMEs</h3>
                <p className="text-slate-300 leading-relaxed">
                  Design and implement integrated systems—dashboards, data pipelines, approvals, forecasting, and process automation—aligned to operations.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueSplit;
