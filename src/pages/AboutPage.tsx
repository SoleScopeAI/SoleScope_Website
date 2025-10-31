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
      description: "Practical AI + clean web builds that convert."
    },
    {
      icon: Users,
      title: "Who we serve",
      description: "Sole traders & small local services."
    },
    {
      icon: Clock,
      title: "Typical engagement",
      description: "Focused site + 1–2 automations."
    },
    {
      icon: Rocket,
      title: "Onboarding",
      description: "Discovery → scoped plan → staged delivery."
    }
  ];

  const metrics = [
    {
      value: "2–4 weeks",
      label: "Avg. Setup Time",
      description: "from kickoff to live"
    },
    {
      value: "99.9%",
      label: "Automation Uptime",
      description: "monitored workflows"
    },
    {
      value: "+35–120%",
      label: "Lead Lift",
      description: "structured service pages + reviews"
    },
    {
      value: "–40%",
      label: "Missed Bookings",
      description: "reminders + simplified steps"
    },
    {
      value: "<24h",
      label: "Response SLA",
      description: "founder-led comms"
    },
    {
      value: "↓ admin time",
      label: "Owner Effort",
      description: "inbox triage & CRM-lite"
    }
  ];

  const services = [
    {
      title: "AI Application & Automation",
      description: "Lead capture & qualification · Inbox triage · Light CRM & reminders · Niche chatbots/KBs · Reviews flows · Analytics hooks",
      action: "See AI capabilities →",
      path: "/services/custom-ai-automations"
    },
    {
      title: "Modern Web Design",
      description: "Fast, mobile-first builds · Service pages that convert · SEO foundations · Hosting & updates · Content guidance",
      action: "See web design work →",
      path: "/services/website-design"
    }
  ];

  const differentiators = [
    {
      icon: Target,
      title: "Small-Service Specialist",
      description: "Built for real operators (groomers, trades, trainers, local pros)."
    },
    {
      icon: Zap,
      title: "Right-Sized AI",
      description: "Tools/APIs + light custom code matched to workflow and budget."
    },
    {
      icon: Shield,
      title: "Ops Discipline",
      description: "Plans that ship, handovers that stick, support that's clear."
    },
    {
      icon: CheckCircle,
      title: "Transparent & Affordable",
      description: "Clear scope, staged delivery, no fluff."
    },
    {
      icon: Settings,
      title: "Automation-Ready",
      description: "Booking, reminders, reviews, email where useful."
    },
    {
      icon: Award,
      title: "Own Your Assets",
      description: "You keep your site, data, and access."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Discover",
      description: "Clarify goals, customers, quick wins."
    },
    {
      number: "2",
      title: "Design",
      description: "Map UX, content, data-flow; confirm stack."
    },
    {
      number: "3",
      title: "Deploy",
      description: "Launch site & automations with clean handover."
    },
    {
      number: "4",
      title: "Improve",
      description: "Track results, iterate, scale."
    }
  ];

  const outcomes = [
    {
      title: "Inbound enquiries doubled after restructuring service pages and adding reviews flow.",
      caseTitle: "Local Dog Grooming Service",
      caseSummary: "Transformed booking process with automated reminders and review collection system.",
      action: "Read more →"
    },
    {
      title: "Missed bookings cut by 40% via reminders + simplified calendar steps.",
      caseTitle: "Mobile Mechanic Business",
      caseSummary: "Streamlined scheduling with AI-powered customer communication and follow-up automation.",
      action: "Read more →"
    }
  ];

  const faqs = [
    {
      question: "Do you work beyond sole traders?",
      answer: "SMEs welcome; focus is micro/small services."
    },
    {
      question: "Do you build custom AI from scratch?",
      answer: "Right-sized blend of tools, APIs, and light custom code."
    },
    {
      question: "How fast can we start?",
      answer: "After discovery, most projects begin within 1–2 weeks."
    },
    {
      question: "Can you host and maintain my site?",
      answer: "Yes; tiered options; you own your assets."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main id="about" className="about-surface pt-24 pb-20">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
                Applied AI & Web Design for UK Sole Traders
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight mobile-h1"
            >
              Strategic Technology.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                Built for Small Business.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 mobile-body-text"
            >
              SoleScope bridges the gap between enterprise-grade technology and sole trader reality.
              We deliver intelligent automation and conversion-optimized web experiences that don't just look professional—they transform how UK service businesses operate, compete, and grow.
            </motion.p>

            {/* Value Proposition Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-12 max-w-3xl mx-auto"
            >
              <p className="text-lg text-white/80 leading-relaxed">
                Where operational expertise meets technical execution. No corporate overhead. No cookie-cutter templates.
                Just practical, purpose-built solutions that work from day one—and scale as you do.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <a
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              >
                <Calendar className="h-6 w-6" />
                Start Your Discovery Call
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#founder"
                className="px-8 py-4 bg-white/5 border-2 border-white/20 rounded-xl font-semibold text-white text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 inline-flex items-center gap-3"
              >
                Meet the Founder
                <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/40"
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mobile-single-col"
          >
            {/* Portrait */}
            <div className="text-center lg:text-left mobile-centered">
              <div className="w-72 h-72 mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl mb-6">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Kevin Hannah, CMgr - Founder of SoleScope Studio & Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-3 uppercase tracking-wide">
                Kevin Hannah, CMgr
              </h2>
              <p className="text-xl text-white mb-3 opacity-80 font-medium">
                Chartered Manager | Founder & Principal Consultant
              </p>
              <p className="text-lg text-purple-300 mb-8 font-medium">
                SoleScope Studio & Design
              </p>

              <div className="space-y-4 text-white leading-relaxed">
                <p>
                  With <strong>seven years of senior leadership in FMCG operations</strong>—spanning supply chain optimization, cross-functional team management, and process transformation across multi-site manufacturing environments—I bring a unique perspective to technology consulting that bridges strategic operations and technical execution.
                </p>

                <p>
                  As a <strong>Chartered Manager (CMgr)</strong>, I've consistently delivered measurable operational improvements: reducing fulfillment errors by 35%, implementing lean methodologies that cut cycle times by 28%, and leading teams of 40+ through digital transformation initiatives. This operational rigor isn't theoretical—it's the foundation of how I design and deploy technology for small businesses.
                </p>

                <p>
                  Beyond corporate leadership, I've <strong>founded and operated six diverse small businesses</strong> across retail, service, and consulting sectors. This hands-on entrepreneurial experience—managing everything from customer acquisition and cashflow to vendor negotiations and day-to-day operations—gives me an insider's understanding of the challenges sole traders face. I don't just build solutions for small businesses; I've lived the reality of running them.
                </p>

                <p>
                  <strong>SoleScope represents the intersection of these experiences:</strong> enterprise-caliber operational methodology applied to small business technology needs. I specialize in AI-powered workflow automation, conversion-focused web design, and lean CRM implementation—combining modern technical capabilities (React, Node.js, Python, AI APIs) with practical deployment strategies that fit real-world constraints of time, budget, and operational capacity.
                </p>

                <p className="text-white/90 italic border-l-4 border-purple-500 pl-4">
                  My approach is simple: treat every client's business as if it were my own. That means transparent scoping, staged delivery that minimizes risk, clear ownership of digital assets, and ongoing support that respects your time. No jargon. No vendor lock-in. Just practical technology that works.
                </p>
              </div>

              {/* Credential Chips */}
              <div className="mb-8">
                {['AI Solutions', 'Web Design', 'Automation & CRM-lite', 'Chartered Manager', '7 yrs FMCG', '6× Founder'].map((credential) => (
                  <span key={credential} className="credential-chip">
                    {credential}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="about-btn-primary mobile-touch-target"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Free 15-min Discovery Call
                </a>
                <a
                  href="mailto:contact@solescope.co.uk"
                  className="about-btn-secondary mobile-touch-target"
                >
                  <Mail className="h-5 w-5" />
                  Email Kevin
                </a>
              </div>
            </div>
          </motion.div>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mobile-double-col"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mobile-double-col">
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
              Figures reflect typical ranges; results vary by scope & baseline.
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mobile-single-col">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mobile-single-col">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mobile-single-col">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mobile-single-col">
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