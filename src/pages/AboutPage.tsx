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
      {/* Compact Page Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              About SoleScope Studio & Design
            </h1>
            <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
              SoleScope is a modern studio for applied AI and high-performance web design. We help under-served UK sole traders and small service businesses deploy right-sized automation and conversion-focused sites—fast, affordable, and actually used day-to-day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Overview Surface */}
      <section className="about-cards-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
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

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Portrait */}
            <div className="text-center lg:text-left">
              <div className="w-64 h-64 mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-white/20 mb-6">
                <img 
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Kevin Hannah, CMgr - Founder of SoleScope Studio & Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wide">
                Kevin Hannah, CMgr
              </h2>
              <p className="text-xl text-white mb-6 opacity-80">
                Chartered Manager
              </p>
              <p className="text-lg text-white mb-2 font-medium">
                Founder, SoleScope Studio & Design
              </p>
              
              <p className="text-white mb-8 leading-relaxed">
                I'm a Chartered Manager (CMgr) with 7 years' FMCG leadership, and I've run 6 small businesses. I specialise in AI application and web design for sole traders and small service teams—combining operational discipline with hands-on build skills to deliver solutions that actually get used.
              </p>

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
                  className="about-btn-primary"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Free 15-min Discovery Call
                </a>
                <a
                  href="mailto:contact@solescope.co.uk"
                  className="about-btn-secondary"
                >
                  <Mail className="h-5 w-5" />
                  Email Kevin
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={ref} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="faq-button"
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="about-btn-primary"
              >
                <Calendar className="h-5 w-5" />
                Start a Discovery Call
              </a>
              <a
                href="mailto:contact@solescope.co.uk"
                className="about-btn-secondary"
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