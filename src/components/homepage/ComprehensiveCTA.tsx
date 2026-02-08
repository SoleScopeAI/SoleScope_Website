import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MessageSquare, ArrowRight, CheckCircle, Sparkles, Clock } from 'lucide-react';

const ComprehensiveCTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const contactMethods = [
    {
      icon: Calendar,
      title: 'Book Discovery Call',
      description: 'Schedule a free 30-minute consultation to discuss your project',
      action: 'Schedule Now',
      link: '/contact',
      color: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us your project details and we\'ll respond within 24 hours',
      action: 'Send Email',
      link: 'mailto:contact@solescope.co.uk',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team about your requirements',
      action: 'Call Now',
      link: 'tel:+442033756616',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant answers to your questions from our support team',
      action: 'Start Chat',
      link: '/contact',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const guarantees = [
    { icon: CheckCircle, text: 'Free initial consultation' },
    { icon: CheckCircle, text: 'No obligation quote' },
    { icon: Clock, text: 'Response within 24 hours' },
    { icon: CheckCircle, text: '14-day money-back guarantee' },
    { icon: CheckCircle, text: 'Transparent pricing' },
    { icon: Clock, text: '2-4 week delivery' }
  ];

  const nextSteps = [
    {
      number: 1,
      title: 'Book Your Call',
      description: 'Choose a time that works for you and tell us about your project'
    },
    {
      number: 2,
      title: 'Get Custom Proposal',
      description: 'Receive a detailed plan with timeline, pricing, and deliverables'
    },
    {
      number: 3,
      title: 'Start Building',
      description: 'We begin development while keeping you updated every step'
    },
    {
      number: 4,
      title: 'Launch & Grow',
      description: 'Go live with ongoing support and optimization'
    }
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-white font-medium">Let's Build Something Amazing</span>
          </motion.div>

          <h2
            id="cta-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight uppercase tracking-wide"
          >
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join 350+ businesses that have already transformed their digital presence.
            Let's discuss how we can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {method.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 ${
                method.popular ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-white/10'
              }`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{method.title}</h3>
                <p className="text-sm text-slate-300 mb-6 text-center leading-relaxed">
                  {method.description}
                </p>
                {method.link.startsWith('http') || method.link.startsWith('mailto') || method.link.startsWith('tel') ? (
                  <a
                    href={method.link}
                    className="block w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                  >
                    {method.action}
                  </a>
                ) : (
                  <Link
                    to={method.link}
                    className="block w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                  >
                    {method.action}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            What Happens Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-lg shadow-purple-500/30">
                    {step.number}
                  </div>
                  {index < nextSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -ml-8"></div>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Our Commitment to You
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.05 }}
                className="flex flex-col items-center space-y-2"
              >
                <guarantee.icon className="h-8 w-8 text-purple-400" />
                <span className="text-xs text-slate-300 text-center leading-tight">
                  {guarantee.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110 uppercase tracking-wide"
          >
            <span>Start Your Project Today</span>
            <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
          <p className="mt-6 text-sm text-slate-400">
            Join 350+ satisfied clients who transformed their business with us
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComprehensiveCTA;
