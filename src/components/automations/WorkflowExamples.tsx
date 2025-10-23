import React from 'react';
import { motion } from 'framer-motion';
import { Target, UserPlus, Headphones, BarChart, Star, RefreshCw, ArrowRight } from 'lucide-react';

const WorkflowExamples = () => {
  const workflows = [
    {
      icon: Target,
      title: 'AI Lead Qualification',
      description: 'Intelligent scoring and routing that finds your best prospects automatically.',
      features: [
        'Smart lead scoring',
        'Automatic routing',
        'CRM integration',
        'Follow-up sequences'
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
        'Progress tracking',
        'Portal access'
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
        'Knowledge routing',
        'Multi-channel response'
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
        'Alert automation',
        'Dashboard integration'
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
        'Sentiment analysis',
        'Response automation'
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
        'Multi-touch sequences',
        'Conversion monitoring'
      ],
      flow: ['Identify', 'Personalize', 'Engage', 'Track', 'Convert']
    }
  ];

  return (
    <section className="py-20 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Industry & Workflow Examples
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Real-world AI automations built for modern businesses
          </p>
        </div>

        <div className="space-y-8">
          {workflows.map((workflow, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                      <workflow.icon className="h-7 w-7 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{workflow.title}</h3>
                      <p className="text-slate-300 leading-relaxed">{workflow.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {workflow.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/[0.03] rounded-xl border border-white/10 p-4">
                  <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-4">Workflow</div>
                  <div className="space-y-2">
                    {workflow.flow.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center border border-purple-500/30">
                          <span className="text-xs font-semibold text-purple-300">{stepIdx + 1}</span>
                        </div>
                        <span className="text-sm text-white">{step}</span>
                        {stepIdx < workflow.flow.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-purple-400 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowExamples;
