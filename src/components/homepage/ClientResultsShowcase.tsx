import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ChevronLeft,
  ChevronRight,
  X,
  TrendingUp,
  Users,
  Target,
  Zap,
  Clock,
  Star,
  Shield,
  Award,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { getLogoForIndustry } from '../logos/ClientLogos';
import {
  BookingDashboardMockup,
  AnalyticsDashboardMockup,
  LeadDashboardMockup,
  ProgressTrackingMockup,
  RevenueTrackingMockup
} from '../mockups/DashboardMockups';

interface ProjectMetric {
  metric_key: string;
  metric_label: string;
  metric_icon: string;
  display_value: string;
  category: string;
  is_highlighted: boolean;
}

interface ClientProject {
  id: string;
  business_name: string;
  project_title: string;
  industry: string;
  location: string;
  featured_image_url: string;
  website_url: string;
  description: string;
  challenge: string;
  solution: string;
  tagline: string;
  services_provided: string[];
  tech_stack: string[];
  primary_result: string;
  result_percentage: number;
  is_featured: boolean;
  color_theme: string;
  completion_date: string;
  project_duration_weeks: number;
  metrics?: ProjectMetric[];
}

const iconMap: { [key: string]: any } = {
  TrendingUp, Users, Target, Zap, Clock, Star, Shield, Award
};

const mockupMap: { [key: string]: React.FC<any> } = {
  'Pet Grooming & Care': BookingDashboardMockup,
  'Dog Training Services': ProgressTrackingMockup,
  'Equipment Services': LeadDashboardMockup,
  'Fitness & Wellness': AnalyticsDashboardMockup,
  'Legal Services': AnalyticsDashboardMockup,
  'Food & Beverage': RevenueTrackingMockup,
  'Cleaning Services': AnalyticsDashboardMockup,
  'Business Consulting': LeadDashboardMockup,
};

const ClientResultsShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ClientProject[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedIndustry]);

  useEffect(() => {
    if (viewMode === 'carousel' && filteredProjects.length > 0) {
      const timer = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [filteredProjects.length, viewMode]);

  const fetchProjects = async () => {
    const mockProjects: ClientProject[] = [
      {
        id: '1',
        business_name: "Jodie's Pampered Pooches",
        project_title: "Complete Digital Transformation",
        industry: "Pet Grooming & Care",
        location: "Manchester, UK",
        featured_image_url: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
        website_url: "https://jodiespamperedpooches.co.uk",
        description: "Full-service digital transformation for a premium pet grooming business, including website design, automated booking system, and customer relationship management.",
        challenge: "Manual booking process causing missed appointments and frustrated customers. No online presence limiting growth potential.",
        solution: "Custom website with integrated booking system, automated SMS reminders, customer portal, and AI chatbot for 24/7 customer support.",
        tagline: "From Fully Booked to Fully Automated",
        services_provided: ['Website Design', 'Booking Automation', 'AI Chatbot', 'CRM Integration'],
        tech_stack: ['React', 'Node.js', 'Supabase', 'Twilio API', 'OpenAI'],
        primary_result: "+138% increase in bookings",
        result_percentage: 138,
        is_featured: true,
        color_theme: "pink-purple",
        completion_date: "2024-06-15",
        project_duration_weeks: 6,
        metrics: [
          { metric_key: 'bookings', metric_label: 'Booking Increase', metric_icon: 'TrendingUp', display_value: '+138%', category: 'conversion', is_highlighted: true },
          { metric_key: 'response_time', metric_label: 'Response Time', metric_icon: 'Clock', display_value: '< 2min', category: 'efficiency', is_highlighted: false },
          { metric_key: 'customer_satisfaction', metric_label: 'Customer Rating', metric_icon: 'Star', display_value: '4.9/5', category: 'satisfaction', is_highlighted: false },
          { metric_key: 'automation_hours', metric_label: 'Hours Saved/Month', metric_icon: 'Zap', display_value: '120hrs', category: 'efficiency', is_highlighted: true },
        ]
      },
      {
        id: '2',
        business_name: "Design K9 Training",
        project_title: "Professional Training Platform",
        industry: "Dog Training Services",
        location: "London, UK",
        featured_image_url: "/assets/carousel/Design K9 Home Page.png",
        website_url: "https://designk9.co.uk",
        description: "Sophisticated web application for professional dog trainers with client progress tracking, training modules, and automated scheduling.",
        challenge: "Paper-based client records and manual scheduling creating inefficiencies. No way to track long-term training progress.",
        solution: "Custom web app with client dashboard, progress tracking system, video training modules, and intelligent scheduling engine.",
        tagline: "Training Excellence, Digitally Delivered",
        services_provided: ['Custom Web App', 'Progress Tracking', 'Video Platform', 'Smart Scheduling'],
        tech_stack: ['React', 'TypeScript', 'Supabase', 'AWS S3', 'Stripe'],
        primary_result: "Fully automated client management",
        result_percentage: 100,
        is_featured: true,
        color_theme: "blue-indigo",
        completion_date: "2024-05-30",
        project_duration_weeks: 10,
        metrics: [
          { metric_key: 'client_management', metric_label: 'Client Management', metric_icon: 'Users', display_value: '100% Automated', category: 'automation', is_highlighted: true },
          { metric_key: 'revenue_increase', metric_label: 'Revenue Growth', metric_icon: 'TrendingUp', display_value: '+95%', category: 'financial', is_highlighted: true },
          { metric_key: 'progress_tracking', metric_label: 'Progress Reports', metric_icon: 'Target', display_value: '500+ Generated', category: 'features', is_highlighted: false },
          { metric_key: 'client_retention', metric_label: 'Client Retention', metric_icon: 'Award', display_value: '98%', category: 'satisfaction', is_highlighted: false },
        ]
      },
      {
        id: '3',
        business_name: "UK Blade Sharpening",
        project_title: "Lead Generation Powerhouse",
        industry: "Equipment Services",
        location: "Birmingham, UK",
        featured_image_url: "/assets/carousel/UKBladeSharpening.png",
        website_url: "https://ukbladesharpening.co.uk",
        description: "AI-powered lead qualification system with automated follow-up, dynamic pricing calculator, and CRM integration.",
        challenge: "Leads coming in but no efficient way to qualify and prioritize them. Lost opportunities due to slow response times.",
        solution: "AI chatbot for instant lead qualification, automated email sequences, custom quote generator, and Zapier CRM integration.",
        tagline: "Sharp Tools, Sharper Results",
        services_provided: ['AI Lead Qualification', 'Website Redesign', 'CRM Integration', 'Quote Calculator'],
        tech_stack: ['React', 'Python', 'OpenAI', 'Zapier', 'SendGrid'],
        primary_result: "+180% qualified leads",
        result_percentage: 180,
        is_featured: true,
        color_theme: "orange-red",
        completion_date: "2024-07-20",
        project_duration_weeks: 7,
        metrics: [
          { metric_key: 'qualified_leads', metric_label: 'Qualified Leads', metric_icon: 'Target', display_value: '+180%', category: 'conversion', is_highlighted: true },
          { metric_key: 'lead_response', metric_label: 'Lead Response', metric_icon: 'Zap', display_value: 'Instant', category: 'efficiency', is_highlighted: true },
          { metric_key: 'conversion_rate', metric_label: 'Conversion Rate', metric_icon: 'TrendingUp', display_value: '+210%', category: 'conversion', is_highlighted: false },
          { metric_key: 'quote_accuracy', metric_label: 'Quote Accuracy', metric_icon: 'Shield', display_value: '99.8%', category: 'quality', is_highlighted: false },
        ]
      },
    ];

    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  };

  const filterProjects = () => {
    let filtered = projects;

    if (selectedIndustry !== 'All') {
      filtered = filtered.filter(p => p.industry === selectedIndustry);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
    setCurrentSlide(0);
  };

  const industries = ['All', ...Array.from(new Set(projects.map(p => p.industry)))];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const goToSlide = (index: number) => {
    if (index > currentSlide) {
      setDirection(1);
    } else if (index < currentSlide) {
      setDirection(-1);
    }
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const getColorClasses = (theme: string) => {
    const themes: { [key: string]: { from: string; to: string; text: string } } = {
      'pink-purple': { from: 'from-pink-500/20', to: 'to-purple-500/20', text: 'text-pink-400' },
      'blue-indigo': { from: 'from-blue-500/20', to: 'to-indigo-500/20', text: 'text-blue-400' },
      'orange-red': { from: 'from-orange-500/20', to: 'to-red-500/20', text: 'text-orange-400' },
      'green-teal': { from: 'from-green-500/20', to: 'to-teal-500/20', text: 'text-green-400' },
      'slate-gray': { from: 'from-slate-500/20', to: 'to-gray-500/20', text: 'text-slate-400' },
    };
    return themes[theme] || themes['pink-purple'];
  };

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      aria-labelledby="client-results-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="px-6 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full">
              <span className="text-purple-300 font-semibold text-sm uppercase tracking-wider">
                Portfolio Showcase
              </span>
            </div>
          </motion.div>

          <h2
            id="client-results-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide"
          >
            Transformative Client Results
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real businesses. Real growth. Real impact. See how we've helped companies across the UK achieve remarkable digital transformation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedIndustry === industry
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'carousel'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Carousel
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </motion.div>

        {viewMode === 'carousel' ? (
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[700px] md:h-[800px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="absolute inset-0"
                >
                  <ProjectCard
                    project={filteredProjects[currentSlide]}
                    onExpand={() => setSelectedProject(filteredProjects[currentSlide])}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-purple-600/30 hover:border-purple-500/50 transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-white group-hover:scale-125 transition-transform" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-purple-600/30 hover:border-purple-500/50 transition-all duration-300 group"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-white group-hover:scale-125 transition-transform" />
            </button>

            <div className="flex justify-center space-x-3 mt-8">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'bg-purple-500 w-12 h-3'
                      : 'bg-white/30 hover:bg-white/50 w-3 h-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onExpand={() => setSelectedProject(project)}
                  compact
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface ProjectCardProps {
  project: ClientProject;
  onExpand: () => void;
  compact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExpand, compact = false }) => {
  const colors = getColorClasses(project.color_theme);
  const LogoComponent = getLogoForIndustry(project.industry);
  const MockupComponent = mockupMap[project.industry] || AnalyticsDashboardMockup;

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl ${
        compact ? 'h-full' : ''
      }`}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)' }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-50`} />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2">
              <LogoComponent className="w-full h-full" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{project.business_name}</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onExpand}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-purple-600/30 hover:border-purple-500/50 transition-all group"
          >
            <ArrowUpRight className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="inline-block px-4 py-2 bg-purple-600/30 backdrop-blur-sm border border-purple-400/30 rounded-full mb-4">
          <span className="text-sm font-semibold text-purple-200">{project.industry}</span>
        </div>

        <p className="text-slate-300 mb-6 leading-relaxed">{project.tagline}</p>

        <div className={`mb-6 ${compact ? 'h-48' : 'h-64'}`}>
          <MockupComponent className="w-full h-full" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {project.metrics?.filter(m => m.is_highlighted).slice(0, 4).map((metric, idx) => {
            const Icon = iconMap[metric.metric_icon] || Target;
            return (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <Icon className={`h-5 w-5 ${colors.text} mb-2`} />
                <div className="text-2xl font-bold text-white mb-1">{metric.display_value}</div>
                <div className="text-xs text-slate-400">{metric.metric_label}</div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.services_provided.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300"
              >
                {service}
              </span>
            ))}
          </div>
          <button
            onClick={onExpand}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 text-sm"
          >
            View Case Study
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectDetailModalProps {
  project: ClientProject;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const colors = getColorClasses(project.color_theme);
  const LogoComponent = getLogoForIndustry(project.industry);
  const MockupComponent = mockupMap[project.industry] || AnalyticsDashboardMockup;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-red-600/30 hover:border-red-500/50 transition-all z-10"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
              <LogoComponent className="w-full h-full" />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-white mb-2">{project.business_name}</h2>
              <p className="text-xl text-purple-300 mb-3">{project.project_title}</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Calendar className="h-4 w-4" />
                  <span>Completed {new Date(project.completion_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Clock className="h-4 w-4" />
                  <span>{project.project_duration_weeks} weeks</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-8 bg-gradient-to-br ${colors.from} ${colors.to} border border-white/10 rounded-2xl mb-8`}>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{project.primary_result}</div>
              <div className="text-xl text-slate-200 mb-4">{project.tagline}</div>
              {project.website_url && (
                <a
                  href={project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">The Challenge</h3>
              <p className="text-slate-300 leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Our Solution</h3>
              <p className="text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Live Dashboard Preview</h3>
            <MockupComponent className="w-full h-96" />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Key Results & Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics?.map((metric, idx) => {
                const Icon = iconMap[metric.metric_icon] || Target;
                return (
                  <div key={idx} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 ${metric.is_highlighted ? 'ring-2 ring-purple-500/50' : ''}`}>
                    <Icon className={`h-6 w-6 ${colors.text} mb-2`} />
                    <div className="text-2xl font-bold text-white mb-1">{metric.display_value}</div>
                    <div className="text-sm text-slate-400">{metric.metric_label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Services Provided</h3>
              <div className="flex flex-wrap gap-2">
                {project.services_provided.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-sm text-purple-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-sm text-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function getColorClasses(theme: string) {
  const themes: { [key: string]: { from: string; to: string; text: string } } = {
    'pink-purple': { from: 'from-pink-500/20', to: 'to-purple-500/20', text: 'text-pink-400' },
    'blue-indigo': { from: 'from-blue-500/20', to: 'to-indigo-500/20', text: 'text-blue-400' },
    'orange-red': { from: 'from-orange-500/20', to: 'to-red-500/20', text: 'text-orange-400' },
    'green-teal': { from: 'from-green-500/20', to: 'to-teal-500/20', text: 'text-green-400' },
    'slate-gray': { from: 'from-slate-500/20', to: 'to-gray-500/20', text: 'text-slate-400' },
  };
  return themes[theme] || themes['pink-purple'];
}

export default ClientResultsShowcase;
