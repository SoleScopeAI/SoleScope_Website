import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Layers, Code2, Rocket, CheckCircle, Clock, Users, Zap } from 'lucide-react';

const TechnologyRoadmap = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activePhase, setActivePhase] = useState<number | null>(null);

  const phases = [
    {
      number: 1,
      icon: Search,
      title: 'Discovery & Planning',
      duration: '3-5 days',
      description: 'Deep dive into your business needs, workflows, and objectives',
      deliverables: [
        'Business requirements analysis',
        'Technical feasibility assessment',
        'Project scope definition',
        'Timeline and milestone planning',
        'Technology stack recommendation'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: 2,
      icon: Layers,
      title: 'Design & Architecture',
      duration: '5-7 days',
      description: 'Create detailed blueprints for your solution with modern UI/UX',
      deliverables: [
        'Wireframes and mockups',
        'System architecture design',
        'Database schema planning',
        'API endpoint documentation',
        'Brand integration guidelines'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: 3,
      icon: Code2,
      title: 'Development & Integration',
      duration: '1-3 weeks',
      description: 'Build your solution with cutting-edge technologies and best practices',
      deliverables: [
        'Frontend development',
        'Backend API creation',
        'Database implementation',
        'Third-party integrations',
        'Automated testing suite'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      number: 4,
      icon: Rocket,
      title: 'Launch & Support',
      duration: 'Ongoing',
      description: 'Deploy to production with continuous monitoring and optimization',
      deliverables: [
        'Production deployment',
        'Performance monitoring',
        'User training and documentation',
        'Ongoing maintenance',
        '24/7 technical support'
      ],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const techStack = [
    { category: 'Frontend', tools: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', tools: ['Node.js', 'Python', 'Supabase', 'PostgreSQL'] },
    { category: 'AI/ML', tools: ['OpenAI', 'Claude', 'TensorFlow', 'Custom Models'] },
    { category: 'Cloud', tools: ['AWS', 'Vercel', 'Netlify', 'Docker'] },
    { category: 'Analytics', tools: ['Mixpanel', 'Google Analytics', 'Custom Dashboards'] },
    { category: 'Integration', tools: ['REST APIs', 'GraphQL', 'Webhooks', 'Zapier'] }
  ];

  const stats = [
    { icon: Clock, label: 'Average Delivery', value: '2-4 weeks' },
    { icon: Users, label: 'Team Size', value: '3-5 experts' },
    { icon: CheckCircle, label: 'Success Rate', value: '98%' },
    { icon: Zap, label: 'Sprint Cycle', value: '1 week' }
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-purple-950/10 to-black"
      aria-labelledby="roadmap-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            id="roadmap-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            Our Development Process
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we follow a proven methodology that delivers exceptional results on time and on budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <stat.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="relative mb-20">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <div className="h-full bg-gradient-to-r from-purple-600/20 via-purple-500/50 to-purple-600/20 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                onHoverStart={() => setActivePhase(index)}
                onHoverEnd={() => setActivePhase(null)}
                className="relative"
              >
                <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 ${
                  activePhase === index ? 'bg-white/10 border-purple-500/50 scale-105' : ''
                }`}>
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-xl flex items-center justify-center mb-4 mx-auto relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <phase.icon className="h-8 w-8 text-white relative z-10" />
                  </motion.div>

                  <div className="text-center mb-4">
                    <div className="text-xs font-bold text-purple-400 mb-1 uppercase tracking-wide">
                      Phase {phase.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full">
                      <Clock className="h-3 w-3 text-purple-400" />
                      <span className="text-xs text-purple-300 font-medium">{phase.duration}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-4 text-center leading-relaxed">
                    {phase.description}
                  </p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activePhase === index ? 'auto' : 0,
                      opacity: activePhase === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="text-xs font-semibold text-purple-400 mb-3 uppercase tracking-wide">
                        Key Deliverables
                      </div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                            <CheckCircle className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {index < phases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 left-full w-8 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -ml-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Modern Technology Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-purple-400 mb-4">{stack.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs text-white font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyRoadmap;
