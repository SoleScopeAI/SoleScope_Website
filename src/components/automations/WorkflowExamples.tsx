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

      <div className="space-y-12">
        {workflows.map((workflow, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="services-refined-card">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                  <workflow.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{workflow.title}</h3>
                  <p className="text-base text-slate-300 leading-relaxed">{workflow.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {workflow.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="services-refined-card">
              <div className="mb-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Workflow</h4>
              </div>
              <div className="space-y-3">
                {workflow.flow.map((step, stepIdx) => (
                  <div key={stepIdx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                      <span className="text-sm font-bold text-purple-300">{stepIdx + 1}</span>
                    </div>
                    <span className="text-base text-white flex-1">{step}</span>
                    {stepIdx < workflow.flow.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowExamples;
