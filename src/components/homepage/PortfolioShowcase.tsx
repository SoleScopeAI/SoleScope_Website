import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowRight, Filter, CheckCircle } from 'lucide-react';
import BulletproofModal from '../shared/BulletproofModal';

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
      description: 'Professional website with booking automation and customer management system',
      results: [
        'Expected 200-250% increase in online bookings',
        'Automated booking confirmations and reminders',
        'Customer portal for appointment management'
      ],
      tech: ['React', 'Tailwind CSS', 'Supabase', 'Twilio'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Design K9 Training',
      category: 'webapp',
      industry: 'Training Services',
      image: '/assets/carousel/Design K9 Home Page.png',
      description: 'Custom web application for training management with progress tracking and scheduling',
      results: [
        'Automated client progress tracking and reporting',
        'Expected 30-40 hours/month saved on admin tasks',
        'Integrated video training modules and scheduling'
      ],
      tech: ['React', 'TypeScript', 'Supabase', 'AWS S3'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'UK Blade Sharpening',
      category: 'automation',
      industry: 'Equipment Services',
      image: '/assets/carousel/UKBladeSharpening.png',
      description: 'AI-powered lead qualification and automated follow-up system with CRM integration',
      results: [
        'Instant lead response with AI qualification',
        'Expected 150-200% increase in qualified leads',
        'Automated quote generation and email sequences'
      ],
      tech: ['OpenAI', 'Python', 'Zapier', 'SendGrid'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Local Trades Hub',
      category: 'dashboard',
      industry: 'Healthcare Analytics',
      image: '/assets/carousel/JodiesPamperedPoochesWebsite.png',
      description: 'AI-powered analytics dashboard consolidating multiple data sources with real-time insights',
      results: [
        'Multi-source data integration and visualization',
        'AI-powered trend detection and forecasting',
        'Expected 12-16 hours/week saved on reporting'
      ],
      tech: ['React', 'Chart.js', 'Python', 'TensorFlow'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Elite Fitness Studio',
      category: 'website',
      industry: 'Legal Services',
      image: '/assets/carousel/Design K9 Home Page.png',
      description: 'Professional website with SEO optimization and integrated consultation booking',
      results: [
        'Modern, mobile-responsive design',
        'SEO optimization for local search visibility',
        'Integrated booking system for consultations'
      ],
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Calendly API'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 6,
      title: 'Smart Home Solutions',
      category: 'automation',
      industry: 'Cleaning Services',
      image: '/assets/carousel/UKBladeSharpening.png',
      description: 'Complete automation suite with instant quotes, booking, and customer support chatbot',
      results: [
        'Instant quote generation with AI pricing',
        '24/7 AI chatbot for customer inquiries',
        'Automated booking confirmations and reminders'
      ],
      tech: ['OpenAI', 'React', 'Node.js', 'Twilio'],
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

                  <div className="relative" style={{ zIndex: 10 }}>
                    <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium relative" style={{ zIndex: 10 }}>
                      <span>View Case Study</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <BulletproofModal
              isOpen={true}
              onClose={() => setSelectedProject(null)}
              title={projects.find(p => p.id === selectedProject)?.title || ''}
              subtitle={projects.find(p => p.id === selectedProject)?.industry || ''}
              maxWidth="4xl"
              ariaLabel={`${projects.find(p => p.id === selectedProject)?.title} case study details`}
            >
              {projects
                .filter(p => p.id === selectedProject)
                .map(project => (
                  <div key={project.id}>
                    <div className="mb-6 p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded">
                      <p className="text-sm text-yellow-200">
                        <span className="font-semibold">Demo Case Study:</span> This example uses modelled data for demonstration purposes.
                      </p>
                    </div>

                    <div className="relative h-64 rounded-xl overflow-hidden mb-6 bg-white/5 border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-purple-400 mb-4 font-semibold">{project.category.charAt(0).toUpperCase() + project.category.slice(1)} Project</p>
                    <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Key Results</h4>
                      <div className="space-y-3">
                        {project.results.map((result, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                            <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Technology Stack</h4>
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

                    <div className="pt-6 border-t border-white/10">
                      <p className="text-xs text-center text-slate-400">
                        Figures shown are modelled examples. Actual performance varies by business and implementation.
                      </p>
                    </div>
                  </div>
                ))}
            </BulletproofModal>
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
