import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Heart,
  Users,
  Zap,
  Target,
  Award,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
  Mail,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Lightbulb,
  Handshake,
  Settings,
  Rocket
} from 'lucide-react';
import CollapsibleSection from '../components/CollapsibleSection';
import '../styles/about-galaxy.css';

const AboutPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const quickFacts = [
    {
      icon: Target,
      title: "What we do",
      description: "Practical AI + scalable web solutions for businesses of all sizes."
    },
    {
      icon: Users,
      title: "Our focus",
      description: "UK sole traders, small businesses & SMEs across service sectors."
    },
    {
      icon: Clock,
      title: "Typical engagement",
      description: "From focused sites to complex multi-user platforms."
    },
    {
      icon: Rocket,
      title: "Onboarding",
      description: "Structured discovery → detailed roadmap → phased delivery."
    }
  ];

  const metrics = [
    {
      value: "2–8 weeks",
      label: "Avg. Delivery Time",
      description: "from kickoff to live deployment"
    },
    {
      value: "99.9%",
      label: "System Uptime",
      description: "enterprise-grade reliability"
    },
    {
      value: "+40–150%",
      label: "Lead Growth",
      description: "optimized funnels + automation"
    },
    {
      value: "–50%",
      label: "Process Efficiency",
      description: "automated workflows + integrations"
    },
    {
      value: "<4h",
      label: "Response SLA",
      description: "business-critical support"
    },
    {
      value: "–60%",
      label: "Admin Reduction",
      description: "team automation + smart CRM"
    }
  ];

  const services = [
    {
      title: "AI Application & Automation",
      description: "Enterprise lead qualification · Team workflow automation · Advanced CRM & scheduling · Custom AI assistants · Multi-channel integrations · Business intelligence & reporting",
      action: "See AI capabilities →",
      path: "/services/custom-ai-automations"
    },
    {
      title: "Scalable Web Solutions",
      description: "Multi-user web platforms · Team collaboration tools · Custom business applications · Advanced integrations · Enterprise hosting & security · Ongoing optimization",
      action: "See web design work →",
      path: "/services/website-design"
    }
  ];

  const differentiators = [
    {
      icon: Target,
      title: "Business-Scale Specialist",
      description: "Solutions for sole traders through to mid-sized enterprises across all sectors."
    },
    {
      icon: Zap,
      title: "Scalable Architecture",
      description: "Future-proof platforms that grow with your team and business needs."
    },
    {
      icon: Shield,
      title: "Enterprise Discipline",
      description: "Structured delivery, comprehensive handovers, and transparent communication."
    },
    {
      icon: CheckCircle,
      title: "ROI-Focused Delivery",
      description: "Clear timelines, phased milestones, and measurable business impact."
    },
    {
      icon: Settings,
      title: "Integration-Ready",
      description: "Connect with your existing CRM, accounting, and business tools seamlessly."
    },
    {
      icon: Award,
      title: "Full Ownership",
      description: "Complete control of your platforms, data, and all source code."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Discover",
      description: "Strategic alignment, stakeholder mapping, and opportunity assessment."
    },
    {
      number: "2",
      title: "Design",
      description: "Architecture planning, UX design, integration mapping, and tech stack selection."
    },
    {
      number: "3",
      title: "Deploy",
      description: "Phased rollout with team training, testing, and comprehensive documentation."
    },
    {
      number: "4",
      title: "Optimize",
      description: "Performance monitoring, user feedback integration, and continuous improvement."
    }
  ];

  const outcomes = [
    {
      title: "Lead conversion increased 150% with automated qualification and multi-channel CRM integration.",
      caseTitle: "Regional Service Provider",
      caseSummary: "Implemented enterprise-grade automation connecting web forms, email sequences, and team workflows for a 12-person operation.",
      action: "Read more →"
    },
    {
      title: "Team productivity improved 60% through custom workflow platform and process automation.",
      caseTitle: "Growing SME",
      caseSummary: "Built multi-user platform with role-based access, automated reporting, and integrated business intelligence for scaling operations.",
      action: "Read more →"
    }
  ];

  const faqs = [
    {
      question: "Do you work with SMEs and larger businesses?",
      answer: "Absolutely. We serve everyone from sole traders to mid-sized enterprises with 50+ employees, with solutions that scale appropriately."
    },
    {
      question: "Can you integrate with our existing business systems?",
      answer: "Yes. We specialize in connecting CRM platforms, accounting software, project management tools, and custom APIs to create unified workflows."
    },
    {
      question: "What's your typical project timeline for SMEs?",
      answer: "SME projects typically range from 4-8 weeks depending on complexity, with phased delivery allowing you to see value progressively."
    },
    {
      question: "Do you provide enterprise-level hosting and support?",
      answer: "Yes. We offer managed hosting with 99.9% uptime SLA, regular backups, security monitoring, and priority support with 4-hour response times."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const portfolioImages = [
    {
      id: 1,
      image: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
      title: "Jodie's Pampered Pooches",
      position: { top: '12%', left: '6%' },
      rotation: '-8deg',
      size: 'w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-28',
      delay: 0
    },
    {
      id: 2,
      image: "/assets/carousel/Design K9 Home Page.png",
      title: "Design K9 Training",
      position: { top: '18%', right: '8%' },
      rotation: '12deg',
      size: 'w-28 h-18 sm:w-36 sm:h-24 md:w-44 md:h-32',
      delay: 2
    },
    {
      id: 3,
      image: "/assets/carousel/UKBladeSharpening.png",
      title: "UK Blade Sharpening",
      position: { bottom: '25%', left: '4%' },
      rotation: '6deg',
      size: 'w-20 h-12 sm:w-28 sm:h-18 md:w-36 md:h-24',
      delay: 4
    },
    {
      id: 4,
      image: "/assets/carousel/JodiesPamperedPoochesWebsite.png",
      title: "Client Work",
      position: { bottom: '35%', right: '6%' },
      rotation: '-10deg',
      size: 'w-22 h-14 sm:w-26 sm:h-18 md:w-40 md:h-28',
      delay: 1
    },
    {
      id: 5,
      image: "/assets/carousel/Design K9 Home Page.png",
      title: "Portfolio Example",
      position: { top: '50%', left: '10%' },
      rotation: '-5deg',
      size: 'w-18 h-12 sm:w-24 sm:h-16 md:w-32 md:h-22',
      delay: 3
    }
  ];

  return (
    <main id="about" className="about-surface pt-24 pb-20">
      {/* Engaging Integrated Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Floating Portfolio Background */}
        {portfolioImages.map((example) => (
          <motion.div
            key={example.id}
            className={`absolute ${example.size} opacity-15 pointer-events-none z-0`}
            style={{
              ...example.position,
              transform: `rotate(${example.rotation})`,
            }}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.15, 0.22, 0.15],
              scale: [0.95, 1.05, 0.95],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: example.delay,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <img
                src={example.image}
                alt={example.title}
                className="w-full h-full object-cover filter blur-[2px]"
              />
            </div>
          </motion.div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column - Profile & Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Glow Effect Behind Photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-teal-500/20 to-emerald-500/30 blur-3xl opacity-60 animate-pulse"></div>

                {/* Profile Photo Container */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative w-full"
                >
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img
                      src="/compressed_image.jpg"
                      alt="Kevin Hannah, CMgr - Founder of SoleScope Studio & Design"
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <div className="about-refined-card text-center py-4 px-6 shadow-xl whitespace-nowrap">
                        <p className="text-sm font-semibold text-white mb-1">
                          Kevin Hannah, CMgr
                        </p>
                        <p className="text-xs text-white/70">
                          Chartered Manager • Founder
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Quick Value Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="mt-16 grid grid-cols-3 gap-4"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">7yrs</div>
                    <div className="text-xs text-white/70">FMCG Lead</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">6×</div>
                    <div className="text-xs text-white/70">Businesses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">CMgr</div>
                    <div className="text-xs text-white/70">Chartered</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-6"
              >
                <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200">
                  <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Taking new projects for Q4
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Scalable Solutions for Growing Businesses
              </h1>

              <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed font-light">
                Serving <span className="font-semibold text-white">sole traders</span>, <span className="font-semibold text-white">small businesses</span>, and <span className="font-semibold text-white">SMEs</span> across the UK
              </p>

              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                SoleScope is a modern studio for applied AI and high-performance web design. We help UK businesses—from sole traders to growing SMEs—deploy intelligent automation, scalable web platforms, and conversion-focused digital solutions that drive measurable growth.
              </p>

              <p className="text-base text-white/70 mb-8 leading-relaxed">
                I'm a Chartered Manager (CMgr) with 7 years' FMCG leadership and I've run 6 businesses across different scales. I specialize in combining strategic operational discipline with hands-on technical skills to deliver solutions that scale with your business and drive real ROI.
              </p>

              {/* Credential Chips */}
              <div className="mb-10">
                {['AI Automation', 'Enterprise Web Apps', 'CRM Integration', 'Multi-User Systems', 'Chartered Manager', 'SME Specialist'].map((credential, index) => (
                  <motion.span
                    key={credential}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="credential-chip"
                  >
                    {credential}
                  </motion.span>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/contact"
                  className="about-btn-primary mobile-touch-target group"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Free 15-min Discovery Call
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:contact@solescope.co.uk"
                  className="about-btn-secondary mobile-touch-target"
                >
                  <Mail className="h-5 w-5" />
                  Email Kevin
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/60"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Fast, affordable delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Transparent pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>UK-based support</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Overview Surface */}
      <section className="about-cards-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container space-y-20">

          {/* Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickFacts.map((fact, index) => (
              <div key={fact.title} className="about-refined-card text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <fact.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">
                  {fact.title}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {fact.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Metrics & Impact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                Metrics & Impact
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="about-refined-card metric-card"
                >
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-description">{metric.description}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-white text-sm mt-8 opacity-60">
              Figures reflect typical outcomes across small businesses and SMEs; actual results vary by scope, industry, and baseline metrics.
            </p>
          </div>

          {/* Services at a Glance */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                Services at a Glance
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="about-refined-card"
                >
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-white mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href={service.path}
                    className="inline-flex items-center text-white hover:text-purple-300 transition-colors font-medium"
                  >
                    {service.action}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why SoleScope */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                Why SoleScope
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentiators.map((diff, index) => (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="about-refined-card text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <diff.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">
                    {diff.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {diff.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How We Work */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                How We Work
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="about-refined-card step-card text-center"
                >
                  <div className="step-number">{step.number}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Outcomes & Case Highlights */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                Outcomes & Case Highlights
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="about-refined-card"
                >
                  <blockquote className="text-lg font-medium text-white mb-6 leading-relaxed">
                    "{outcome.title}"
                  </blockquote>
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="font-semibold text-white mb-2 uppercase tracking-wide">
                      {outcome.caseTitle}
                    </h4>
                    <p className="text-white text-sm mb-4 leading-relaxed">
                      {outcome.caseSummary}
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center text-white hover:text-purple-300 transition-colors font-medium text-sm"
                    >
                      {outcome.action}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={ref} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="faq-item"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="faq-button mobile-touch-target"
                  aria-expanded={activeIndex === index}
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  {activeIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-white flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white flex-shrink-0" />
                  )}
                </button>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-content"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight uppercase tracking-wide">
              Ready to make AI and your website actually work for your business?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="about-btn-primary mobile-touch-target"
              >
                <Calendar className="h-5 w-5" />
                Start a Discovery Call
              </a>
              <a
                href="mailto:contact@solescope.co.uk"
                className="about-btn-secondary mobile-touch-target"
              >
                <Mail className="h-5 w-5" />
                Email Kevin
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;