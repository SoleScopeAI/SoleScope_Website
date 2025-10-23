import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowRight, Filter, CheckCircle } from 'lucide-react';

const PortfolioShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'website', label: 'Website Design' },
    { id: 'webapp', label: 'Web Apps' },
    { id: 'automation', label: 'AI Automation' },
    { id: 'dashboard', label: 'Dashboards' }
  ];

  const projects = [
    {
      id: 1,
      title: "Jodie's Pampered Pooches",
      category: 'website',
      industry: 'Pet Services',
      image: '/assets/carousel/JodiesPamperedPoochesWebsite.png',
      description: 'Complete website redesign with online booking system and customer management',
      results: [
        '300% increase in online bookings',
        '2-hour average response time reduced to 15 minutes',
        '95% customer satisfaction rating'
      ],
      tech: ['React', 'Tailwind CSS', 'Supabase', 'Stripe'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Design K9 Training',
      category: 'webapp',
      industry: 'Training Services',
      image: '/assets/carousel/Design K9 Home Page.png',
      description: 'Custom training management platform with client progress tracking and scheduling',
      results: [
        '250+ active clients managed efficiently',
        '40 hours/month saved on administration',
        '99.9% uptime since launch'
      ],
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'UK Blade Sharpening',
      category: 'automation',
      industry: 'Equipment Services',
      image: '/assets/carousel/UKBladeSharpening.png',
      description: 'AI-powered lead qualification system with automated email sequences and CRM integration',
      results: [
        '60% reduction in response time',
        '180% increase in qualified leads',
        '£25k+ additional revenue per quarter'
      ],
      tech: ['OpenAI', 'Zapier', 'HubSpot', 'Custom APIs'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Local Trades Hub',
      category: 'dashboard',
      industry: 'Marketplace',
      image: '/assets/carousel/JodiesPamperedPoochesWebsite.png',
      description: 'Real-time analytics dashboard for marketplace performance tracking and insights',
      results: [
        'Real-time monitoring of 500+ listings',
        'Predictive analytics for demand forecasting',
        '45% improvement in decision-making speed'
      ],
      tech: ['React', 'D3.js', 'Python', 'TensorFlow'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Elite Fitness Studio',
      category: 'website',
      industry: 'Fitness',
      image: '/assets/carousel/Design K9 Home Page.png',
      description: 'Modern website with membership portal, class booking, and payment processing',
      results: [
        '400+ members signed up in 3 months',
        '85% reduction in admin workload',
        '£120k annual revenue increase'
      ],
      tech: ['React', 'Stripe', 'Supabase', 'Tailwind'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 6,
      title: 'Smart Home Solutions',
      category: 'automation',
      industry: 'Home Services',
      image: '/assets/carousel/UKBladeSharpening.png',
      description: 'Automated quote generation and project management system with AI assistance',
      results: [
        '90% faster quote generation',
        '50+ projects managed simultaneously',
        '98% client satisfaction score'
      ],
      tech: ['Claude AI', 'React', 'Node.js', 'AWS'],
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-black via-black to-purple-950/10"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            id="portfolio-heading"
            className="text-4xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wide"
          >
            Success Stories
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real projects delivering measurable results for businesses across the UK.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Filter className="inline h-4 w-4 mr-2" />
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br opacity-50"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${project.color})`
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white font-medium">
                      {project.industry}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {project.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-xs text-purple-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                    <span>View Case Study</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-purple-950/90 to-black/90 border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {projects
                  .filter(p => p.id === selectedProject)
                  .map(project => (
                    <div key={project.id}>
                      <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-purple-400 mb-4">{project.industry}</p>
                      <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Key Results</h4>
                        <div className="space-y-3">
                          {project.results.map((result, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-sm text-white font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedProject(null)}
                        className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/services"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
          >
            <span>View All Projects</span>
            <ExternalLink className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
