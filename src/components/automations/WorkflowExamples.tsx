import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, UserPlus, Headphones, BarChart, Star, RefreshCw, ArrowRight, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

const WorkflowExamples = () => {
  const [expandedWorkflows, setExpandedWorkflows] = useState<{ [key: number]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleWorkflow = (index: number) => {
    setExpandedWorkflows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const workflows = [
    {
      icon: Target,
      title: 'AI Lead Qualification',
      description: 'Intelligent scoring and routing that finds your best prospects automatically.',
      features: [
        'Smart lead scoring',
        'Automatic routing',
        'CRM integration'
      ],
      flow: ['Lead', 'Scoring', 'Route', 'Follow-Up', 'CRM Updated']
    },
    {
      icon: UserPlus,
      title: 'Intelligent Onboarding',
      description: 'Automated welcomes and workflows for seamless client experiences.',
      features: [
        'Document automation',
        'Team notifications',
        'Progress tracking'
      ],
      flow: ['Welcome', 'Documents', 'Access Setup', 'Team Notify', 'Complete']
    },
    {
      icon: Headphones,
      title: 'AI Customer Support',
      description: 'Always-on helpdesk that handles inquiries and escalations.',
      features: [
        '24/7 AI support',
        'Smart escalation',
        'Knowledge routing'
      ],
      flow: ['Inquiry', 'AI Response', 'Resolve/Escalate', 'Team Alert', 'Close']
    },
    {
      icon: BarChart,
      title: 'Predictive Analytics',
      description: 'Forecast trends, identify patterns, and surface actionable insights.',
      features: [
        'Trend forecasting',
        'Pattern detection',
        'Alert automation'
      ],
      flow: ['Data Collect', 'AI Analyze', 'Predict', 'Alert', 'Visualize']
    },
    {
      icon: Star,
      title: 'Smart Review System',
      description: 'Automated review requests that boost reputation and gather feedback.',
      features: [
        'Timing optimization',
        'Multi-platform posting',
        'Sentiment analysis'
      ],
      flow: ['Trigger', 'Request', 'Collect', 'Analyze', 'Respond']
    },
    {
      icon: RefreshCw,
      title: 'AI Reactivation Engine',
      description: 'Re-engage dormant customers with personalized, intelligent campaigns.',
      features: [
        'Behavior tracking',
        'Personalized messaging',
        'Multi-touch sequences'
      ],
      flow: ['Identify', 'Personalize', 'Engage', 'Track', 'Convert']
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3 uppercase tracking-wide">
          Industry & Workflow Examples
        </h2>
        <p className="text-base text-white opacity-80 max-w-3xl mx-auto">
          Real-world AI automations built for modern businesses
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {workflows.map((workflow, idx) => {
          const isExpanded = isMobile ? expandedWorkflows[idx] !== false : true;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 2) * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)" }}
              className="services-refined-card relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.03) 0%, rgba(139, 69, 255, 0.06) 100%)',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-purple-700/5"
                animate={{
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: idx * 0.5
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/40"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <workflow.icon className="h-7 w-7 text-purple-300" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1.5 uppercase tracking-wide">
                      {workflow.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed opacity-90">
                      {workflow.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {workflow.features.map((feature, featureIdx) => (
                    <motion.span
                      key={featureIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + featureIdx * 0.05 }}
                      className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-200 font-medium hover:bg-purple-500/20 hover:border-purple-500/30 transition-all cursor-default"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-4"></div>

                {isMobile && (
                  <button
                    onClick={() => toggleWorkflow(idx)}
                    className="w-full flex items-center justify-between px-3 py-2 mb-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Workflow Timeline
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-purple-400" />
                    )}
                  </button>
                )}

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={isMobile ? { height: 0, opacity: 0 } : { opacity: 1 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={isMobile ? { height: 0, opacity: 0 } : { opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/60 to-purple-500/40"></div>

                      <div className="space-y-3 pl-2">
                        {workflow.flow.map((step, stepIdx) => (
                          <motion.div
                            key={stepIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: stepIdx * 0.08, duration: 0.4 }}
                            className="flex items-center gap-3 relative"
                          >
                            <motion.div
                              className="relative flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600/30 to-purple-700/40 rounded-full flex items-center justify-center border-2 border-purple-500/50 z-10"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: stepIdx * 0.1 + 0.2, duration: 0.4, type: "spring" }}
                            >
                              <span className="text-xs font-bold text-purple-200">{stepIdx + 1}</span>

                              {stepIdx === workflow.flow.length - 1 && (
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-purple-500/30"
                                  animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.6, 0, 0.6]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: stepIdx * 0.1 + 0.5
                                  }}
                                />
                              )}
                            </motion.div>

                            <div className="flex-1">
                              <span className="text-sm text-white font-medium">{step}</span>
                            </div>

                            {stepIdx < workflow.flow.length - 1 ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: stepIdx * 0.1 + 0.3 }}
                              >
                                <ArrowRight className="h-3.5 w-3.5 text-purple-400/60 flex-shrink-0" />
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: stepIdx * 0.1 + 0.3, type: "spring" }}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-400/80 flex-shrink-0" />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkflowExamples;
