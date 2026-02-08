import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap, Building2, Rocket } from 'lucide-react';

const PackagesTiers = () => {
  const packages = [
    {
      icon: Zap,
      title: 'Automation Essentials',
      subtitle: 'For Sole Traders & Small Teams',
      features: [
        'Targeted workflow automation',
        'Email & CRM synchronization',
        'Automated reporting dashboards',
        'Up to 5 connected services',
        'Monthly performance review'
      ]
    },
    {
      icon: Building2,
      title: 'Business Systems',
      subtitle: 'For SMEs',
      popular: true,
      features: [
        'Multi-system integration',
        'Custom business dashboards',
        'Approval workflows & audits',
        'Real-time alerts & monitoring',
        'Unlimited service connections',
        'Bi-weekly optimization sessions'
      ]
    },
    {
      icon: Rocket,
      title: 'Enterprise AI',
      subtitle: 'For Larger SMEs',
      features: [
        'Custom software development',
        'Advanced data pipelines',
        'ML-powered forecasting',
        'Governance & compliance tools',
        'Dedicated technical support',
        'White-glove service delivery'
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Packages & Tiers
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Discovery first. Built and supported by the same specialists end-to-end.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border p-8 hover:bg-white/[0.07] hover:border-purple-400/30 transition-all duration-300 ${
                pkg.popular ? 'border-purple-400/30 ring-2 ring-purple-400/20' : 'border-white/10'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-semibold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                  <pkg.icon className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
                <p className="text-sm text-slate-400">{pkg.subtitle}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact?service=Custom AI Automations#contact-form"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesTiers;
