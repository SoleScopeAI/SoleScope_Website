import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, Brain, Zap, MessageSquare, BarChart3, GitBranch, Sparkles, ArrowRight } from 'lucide-react';

const AICapabilitiesShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeDemo, setActiveDemo] = useState(0);

  const capabilities = [
    {
      icon: Bot,
      title: 'Intelligent Automation',
      description: 'Automate repetitive tasks with AI that learns and improves over time',
      features: [
        'Lead qualification and routing',
        'Automated email sequences',
        'Data entry and processing',
        'Document generation',
        'Task scheduling optimization'
      ],
      color: 'from-cyan-500 via-blue-500 to-purple-500'
    },
    {
      icon: MessageSquare,
      title: 'AI Chat Assistants',
      description: 'Custom chatbots that handle customer inquiries 24/7 with natural conversation',
      features: [
        'Natural language understanding',
        'Multi-channel support',
        'Context-aware responses',
        'Handoff to human agents',
        'CRM integration'
      ],
      color: 'from-purple-500 via-pink-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'AI-powered insights that forecast trends and optimize business decisions',
      features: [
        'Revenue forecasting',
        'Customer behavior prediction',
        'Inventory optimization',
        'Demand forecasting',
        'Anomaly detection'
      ],
      color: 'from-orange-500 via-yellow-500 to-green-500'
    },
    {
      icon: Brain,
      title: 'Machine Learning Models',
      description: 'Custom AI models trained specifically for your business needs',
      features: [
        'Image recognition',
        'Text classification',
        'Recommendation engines',
        'Sentiment analysis',
        'Custom training data'
      ],
      color: 'from-green-500 via-emerald-500 to-teal-500'
    },
    {
      icon: GitBranch,
      title: 'Workflow Orchestration',
      description: 'Connect multiple AI services into powerful automated workflows',
      features: [
        'Multi-step automation',
        'Conditional logic',
        'API integrations',
        'Error handling',
        'Performance monitoring'
      ],
      color: 'from-blue-500 via-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Process data and respond to events in real-time with AI assistance',
      features: [
        'Stream processing',
        'Event-driven automation',
        'Instant notifications',
        'Live data transformation',
        'WebSocket support'
      ],
      color: 'from-purple-500 via-fuchsia-500 to-pink-500'
    }
  ];

  const useCases = [
    {
      industry: 'Professional Services',
      challenge: 'Manual client onboarding taking 4+ hours per client',
      solution: 'AI-powered onboarding automation with document processing',
      result: '85% time reduction, 300% capacity increase'
    },
    {
      industry: 'E-commerce',
      challenge: 'Low customer engagement and high cart abandonment',
      solution: 'AI chatbot with personalized product recommendations',
      result: '45% increase in conversions, 60% reduction in support tickets'
    },
    {
      industry: 'Manufacturing',
      challenge: 'Inefficient production scheduling causing delays',
      solution: 'Predictive analytics for demand forecasting and optimization',
      result: '30% reduction in downtime, 25% cost savings'
    },
    {
      industry: 'Healthcare',
      challenge: 'Appointment no-shows and scheduling conflicts',
      solution: 'AI appointment optimization with automated reminders',
      result: '70% reduction in no-shows, 40% better resource utilization'
    }
  ];

  const aiPoweredFeatures = [
    {
      feature: 'Smart Lead Scoring',
      description: 'AI analyzes engagement patterns to prioritize high-value leads',
      impact: '+180% conversion rate'
    },
    {
      feature: 'Automated Content Creation',
      description: 'Generate marketing copy, reports, and documentation instantly',
      impact: '90% time savings'
    },
    {
      feature: 'Intelligent Search',
      description: 'Natural language search across all your data and documents',
      impact: '75% faster information retrieval'
    },
    {
      feature: 'Anomaly Detection',
      description: 'Automatically identify issues before they become problems',
      impact: '95% reduction in incidents'
    }
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-purple-950/10 via-black to-black relative overflow-hidden"
      aria-labelledby="ai-capabilities-heading"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/30 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-white font-medium">Powered by Advanced AI</span>
          </motion.div>

          <h2
            id="ai-capabilities-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            AI Innovation Lab
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge artificial intelligence capabilities that transform how your business operates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${capability.color})` }}
              />

              <motion.div
                className={`w-16 h-16 bg-gradient-to-br ${capability.color} rounded-xl flex items-center justify-center mb-4 relative overflow-hidden`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <capability.icon className="h-8 w-8 text-white relative z-10" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {capability.title}
              </h3>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                {capability.description}
              </p>

              <ul className="space-y-2">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-400">
                    <Sparkles className="h-3 w-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Real-World AI Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.industry}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{useCase.industry}</h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-purple-400 font-semibold uppercase tracking-wide">Challenge</span>
                    <p className="text-sm text-slate-300 mt-1">{useCase.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">AI Solution</span>
                    <p className="text-sm text-slate-300 mt-1">{useCase.solution}</p>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-xs text-green-400 font-semibold uppercase tracking-wide">Result</span>
                    <p className="text-sm text-white font-medium mt-1">{useCase.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            AI-Powered Features That Drive Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiPoweredFeatures.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{item.feature}</h4>
                  <p className="text-sm text-slate-300 mb-2">{item.description}</p>
                  <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400 font-medium">
                    {item.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-12"
        >
          <a
            href="/services/custom-ai-automations"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
          >
            <span>Explore AI Solutions</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AICapabilitiesShowcase;
