import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Sparkles, Zap, Rocket, Crown, ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPackages = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const packages = [
    {
      name: 'Starter',
      icon: Sparkles,
      description: 'Perfect for small businesses getting started online',
      monthlyPrice: 1499,
      annualPrice: 14990,
      color: 'from-blue-500 to-cyan-500',
      features: [
        '5-page professional website',
        'Mobile-responsive design',
        'Basic SEO optimization',
        'Contact form integration',
        '1 month hosting included',
        'SSL certificate',
        'Email support',
        '2 rounds of revisions'
      ],
      popular: false
    },
    {
      name: 'Professional',
      icon: Zap,
      description: 'For growing businesses that need advanced features',
      monthlyPrice: 2999,
      annualPrice: 29990,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Up to 15 pages',
        'Custom design & branding',
        'Advanced SEO & analytics',
        'Blog or news section',
        'E-commerce ready (up to 50 products)',
        '3 months hosting included',
        'Priority email & phone support',
        'CMS training included',
        'Unlimited revisions',
        'Social media integration'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      description: 'Complete digital solution with AI automation',
      monthlyPrice: 5999,
      annualPrice: 59990,
      color: 'from-orange-500 to-red-500',
      features: [
        'Unlimited pages',
        'Custom web application',
        'AI chatbot integration',
        'Advanced automation workflows',
        'Custom dashboard & analytics',
        'E-commerce (unlimited products)',
        '6 months premium hosting',
        '24/7 priority support',
        'Dedicated project manager',
        'API integrations',
        'Performance optimization',
        'Monthly strategy calls'
      ],
      popular: false
    },
    {
      name: 'Custom',
      icon: Crown,
      description: 'Tailored solutions for unique business needs',
      monthlyPrice: null,
      annualPrice: null,
      color: 'from-purple-500 via-fuchsia-500 to-pink-500',
      features: [
        'Everything in Enterprise',
        'Custom AI model training',
        'Multi-platform development',
        'White-label solutions',
        'Dedicated development team',
        'SLA guarantees',
        'Custom integrations',
        'Advanced security features',
        'Scalability planning',
        'Ongoing optimization'
      ],
      popular: false
    }
  ];

  const addons = [
    { name: 'AI Chatbot', price: 299, description: '24/7 customer support automation' },
    { name: 'E-commerce', price: 499, description: 'Full online store with payment processing' },
    { name: 'SEO Package', price: 399, description: 'Advanced SEO optimization and content' },
    { name: 'Analytics Dashboard', price: 599, description: 'Custom business intelligence dashboard' },
    { name: 'Email Marketing', price: 199, description: 'Automated email campaigns and sequences' },
    { name: 'Booking System', price: 349, description: 'Appointment scheduling and management' }
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - annual;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const calculateTotal = () => {
    return selectedFeatures.reduce((total, feature) => {
      const addon = addons.find(a => a.name === feature);
      return total + (addon?.price || 0);
    }, 0);
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-purple-950/10 to-black"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            id="pricing-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            Transparent Pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the perfect package for your business. All packages include ongoing support and maintenance.
          </p>

          <div className="inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === 'annual'
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                Save 15%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {packages.map((pkg, index) => {
            const savings = pkg.monthlyPrice && pkg.annualPrice
              ? calculateSavings(pkg.monthlyPrice, pkg.annualPrice)
              : null;

            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 ${
                  pkg.popular
                    ? 'border-purple-500 lg:scale-105 shadow-lg shadow-purple-500/20'
                    : 'border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <pkg.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 text-center">{pkg.name}</h3>
                <p className="text-sm text-slate-300 mb-6 text-center">{pkg.description}</p>

                <div className="mb-6 text-center">
                  {pkg.monthlyPrice ? (
                    <>
                      <div className="text-4xl font-bold text-white mb-2">
                        £{billingCycle === 'monthly' ? pkg.monthlyPrice.toLocaleString() : pkg.annualPrice?.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-400">
                        {billingCycle === 'monthly' ? 'one-time payment' : 'annual package'}
                      </div>
                      {billingCycle === 'annual' && savings && (
                        <div className="mt-2 text-xs text-green-400">
                          Save £{savings.savings.toLocaleString()} ({savings.percentage}%)
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-white mb-2">Custom Quote</div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-2 text-sm text-slate-300">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {pkg.monthlyPrice ? 'Get Started' : 'Contact Sales'}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Calculator className="h-8 w-8 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Customize Your Package</h3>
          </div>
          <p className="text-center text-slate-300 mb-8">
            Add extra features to any package to create your perfect solution
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {addons.map((addon) => (
              <motion.button
                key={addon.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleFeature(addon.name)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedFeatures.includes(addon.name)
                    ? 'bg-purple-600/20 border-purple-500'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{addon.name}</h4>
                  <span className="text-sm font-bold text-purple-400">+£{addon.price}</span>
                </div>
                <p className="text-xs text-slate-300">{addon.description}</p>
                {selectedFeatures.includes(addon.name) && (
                  <div className="mt-2 flex items-center space-x-1 text-xs text-purple-400">
                    <Check className="h-3 w-3" />
                    <span>Selected</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {selectedFeatures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center"
            >
              <div className="text-sm text-slate-300 mb-2">Selected Add-ons Total</div>
              <div className="text-3xl font-bold text-white mb-4">+£{calculateTotal().toLocaleString()}</div>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-purple-400" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-purple-400" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-purple-400" />
              <span>14-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-purple-400" />
              <span>Free consultation included</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPackages;
