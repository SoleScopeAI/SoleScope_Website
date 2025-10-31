import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Calendar,
  Mail,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  TrendingUp,
  Award,
  Users,
  Brain,
  Shield,
  Lightbulb,
  Handshake,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import '../styles/about-galaxy.css';

const AboutPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    document.title = "About Kevin Hannah | SoleScope Studio & Design — Boutique AI & Web for Real Businesses";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Meet Kevin Hannah, CMgr - Chartered Manager and founder of SoleScope Studio & Design. Blending 7+ years FMCG leadership with AI automation and modern web design for UK small businesses.');
    }

    return () => {
      document.title = "SoleScope Studio & Design | AI-Powered Websites, Branding & Marketing";
    };
  }, []);

  const [expandedInsight, setExpandedInsight] = useState(false);
  const [expandedPillars, setExpandedPillars] = useState<number[]>([]);
  const [expandedTimeline, setExpandedTimeline] = useState<number[]>([]);
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);

  const togglePillar = (index: number) => {
    setExpandedPillars(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleTimeline = (index: number) => {
    setExpandedTimeline(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleValue = (index: number) => {
    setActiveValueIndex(activeValueIndex === index ? null : index);
  };

  const skillTags = [
    "AI Strategy",
    "Automation Workflows",
    "Web Systems Design",
    "Operational Leadership",
    "CRM Integration",
    "7+ Yrs FMCG",
    "6× Founder",
    "Chartered Manager"
  ];

  const corePillars = [
    {
      icon: Users,
      title: "Human-Led Approach",
      summary: "Every build begins with understanding your process, not replacing it.",
      detail: "We start by listening to how you actually work. Our AI and web systems are designed to enhance your existing processes, not force you into rigid templates. The goal is technology that feels natural because it's built around your real workflow."
    },
    {
      icon: Target,
      title: "Practical Automation",
      summary: "We focus on what saves you real time and money — not just trends.",
      detail: "Not every business needs cutting-edge AI. We implement automation where it creates measurable benefit: booking reminders that reduce no-shows, lead capture that actually converts, inbox triage that saves hours. If it doesn't deliver value, we don't build it."
    },
    {
      icon: TrendingUp,
      title: "Scalable by Design",
      summary: "Each solution grows with you — whether you're a one-person trade or a small office team.",
      detail: "We build systems that start simple and expand as you grow. A sole trader gets streamlined booking automation. A growing team gets CRM integration and collaborative workflows. Your technology scales without requiring a complete rebuild."
    },
    {
      icon: Award,
      title: "Proven Management Backbone",
      summary: "Built on seven years of operational leadership, ensuring structure and consistency.",
      detail: "Our approach comes from real operational experience in high-volume environments. We understand project timelines, stakeholder communication, and delivering on commitments. You get boutique service with enterprise discipline."
    }
  ];

  const timeline = [
    {
      year: "2017–2021",
      title: "Leadership in FMCG Management",
      summary: "Warburtons and operational excellence.",
      detail: "Spent over seven years managing large-scale operations in the FMCG sector at Warburtons and similar organizations. Learned how small process improvements can transform results, managing teams, optimizing workflows, and delivering consistent performance under pressure."
    },
    {
      year: "2021–2024",
      title: "Founder of Multiple Small Ventures",
      summary: "Refining automation and web processes.",
      detail: "Launched and grew six small businesses across different sectors. Each venture taught practical lessons about what local business owners actually need from technology: clarity, reliability, and systems that don't require a tech degree to operate."
    },
    {
      year: "2024–Present",
      title: "Founder of SoleScope Studio & Design",
      summary: "Building boutique AI and automation systems for UK SMEs.",
      detail: "Combined operational discipline with hands-on technical skills to create SoleScope. Now helping small and medium-sized businesses deploy AI-driven systems, modern web platforms, and practical automation that actually gets used daily."
    },
    {
      year: "Next",
      title: "Expanding Scalable Frameworks",
      summary: "Premium digital platforms for growing businesses.",
      detail: "Building reusable automation frameworks and sophisticated digital platforms that help established businesses scale efficiently. Focusing on industries where technology can create competitive advantage without requiring dedicated IT teams."
    }
  ];

  const studioValues = [
    {
      title: "Simplicity Wins",
      description: "If it's not easy to use, it doesn't get used.",
      detail: "We've seen expensive systems sit unused because they're too complicated. Every interface we design, every automation we build, goes through the 'would a non-technical owner use this?' test. Simplicity isn't about fewer features—it's about intuitive design."
    },
    {
      title: "AI Where It Matters",
      description: "We apply automation only where it creates measurable benefit.",
      detail: "AI isn't magic—it's a tool. We implement it where it solves real problems: qualifying leads so you talk to serious prospects, automating appointment reminders to reduce no-shows, or organizing customer data so nothing falls through cracks. If traditional tools work better, we use those."
    },
    {
      title: "Transparency",
      description: "No jargon, no hidden retainers — clear systems you own.",
      detail: "You'll understand exactly what you're getting, what it costs, and how it works. No surprise fees, no vendor lock-in, no technical jargon hiding simple concepts. You own your website, your data, and your systems. We're here to build and support, not control."
    },
    {
      title: "Partnership Mindset",
      description: "We work with your business, not just for it.",
      detail: "Your success is our success. We're not order-takers who disappear after launch. We stay involved, monitor what's working, suggest improvements, and adapt as your business evolves. Think of us as your part-time technical team—invested in your growth."
    }
  ];

  return (
    <main id="about" className="about-surface pt-24 pb-20">
      {/* Hero Section - Founder Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Founder Image */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-1">
              <div className="w-80 h-80 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Kevin Hannah, CMgr - Founder of SoleScope Studio & Design, Chartered Manager specializing in AI strategy and web systems design"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="order-2 lg:order-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                Kevin Hannah, CMgr
              </h1>
              <p className="text-2xl text-white/90 mb-4 font-semibold">
                Founder & Chartered Manager
              </p>
              <p className="text-xl text-white/70 mb-8">
                Founder, SoleScope Studio & Design
              </p>

              <div className="text-white/90 mb-8 leading-relaxed space-y-4">
                <p>
                  I'm a Chartered Manager (CMgr) with over seven years of leadership in the UK's FMCG industry and a track record of founding and scaling multiple small businesses. My work now blends that operational discipline with advanced AI-driven systems design, automation, and modern web experiences for small to medium-sized organisations.
                </p>
                <p>
                  At SoleScope Studio & Design, I focus on helping real businesses—not tech companies—benefit from the latest in AI, automation, and human-centred web design. The goal is simple: to deliver digital systems that work seamlessly, save time, and actually get used.
                </p>
              </div>

              {/* Skill Tags */}
              <div className="mb-8 flex flex-wrap gap-2">
                {skillTags.map((skill) => (
                  <span key={skill} className="credential-chip">
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="about-btn-primary mobile-touch-target"
                >
                  <Calendar className="h-5 w-5" />
                  Book a Free 15-Min Discovery Call
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

      {/* Beyond the Basics - Expandable Insight */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-refined-card expandable-insight-card"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wide">
              Beyond the Basics
            </h2>

            <div className="text-white/90 leading-relaxed space-y-4">
              <p className="text-lg">
                Blending management expertise with hands-on digital build skills, I help small and medium-sized businesses translate real-world operations into efficient automated systems.
              </p>

              {expandedInsight && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 pt-4"
                >
                  <p>
                    Before founding SoleScope Studio & Design, I spent over seven years managing large-scale operations in the FMCG sector, where I learned how small process improvements can transform results. Over time, I launched and grew multiple small ventures — learning firsthand what local business owners need from technology: clarity, reliability, and practical value.
                  </p>
                  <p>
                    That experience shaped SoleScope's boutique model — a studio that combines the craft of web design with the power of AI and automation, delivered in a way that's genuinely human and accessible.
                  </p>
                  <p>
                    Every project we take on aims to make technology feel natural — from smart client onboarding workflows to websites that convert better without endless maintenance. It's about giving businesses more control and less complexity.
                  </p>
                </motion.div>
              )}
            </div>

            <button
              onClick={() => setExpandedInsight(!expandedInsight)}
              className="mt-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors font-medium"
              aria-expanded={expandedInsight}
            >
              {expandedInsight ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="h-5 w-5" />
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <ChevronDown className="h-5 w-5" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="about-cards-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Core Pillars
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The principles that guide every project we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corePillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="about-refined-card pillar-card cursor-pointer"
                onClick={() => togglePillar(index)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    <pillar.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>
                </div>

                {expandedPillars.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 border-t border-white/10"
                  >
                    <p className="text-white/70 leading-relaxed">
                      {pillar.detail}
                    </p>
                  </motion.div>
                )}

                <button
                  className="mt-4 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
                  aria-expanded={expandedPillars.includes(index)}
                >
                  {expandedPillars.includes(index) ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Learn More</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Professional Timeline
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From operational excellence to boutique AI solutions
            </p>
          </motion.div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <div className="grid grid-cols-4 gap-6">
              {timeline.map((period, index) => (
                <motion.div
                  key={period.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="about-refined-card timeline-card min-h-[320px] cursor-pointer" onClick={() => toggleTimeline(index)}>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-purple-300 font-semibold mb-2 text-center">{period.year}</p>
                    <h3 className="text-lg font-bold text-white mb-2 text-center uppercase tracking-wide">
                      {period.title}
                    </h3>
                    <p className="text-white/70 text-sm text-center mb-4">
                      {period.summary}
                    </p>

                    {expandedTimeline.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-white/10"
                      >
                        <p className="text-white/60 text-sm leading-relaxed text-center">
                          {period.detail}
                        </p>
                      </motion.div>
                    )}

                    <button
                      className="mt-4 mx-auto flex items-center gap-1 text-white/50 hover:text-white transition-colors text-xs font-medium"
                      aria-expanded={expandedTimeline.includes(index)}
                    >
                      {expandedTimeline.includes(index) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Stacked Timeline */}
          <div className="lg:hidden space-y-8">
            {timeline.map((period, index) => (
              <motion.div
                key={period.year}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                {index < timeline.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-purple-500/20" />
                )}

                <div className="about-refined-card cursor-pointer" onClick={() => toggleTimeline(index)}>
                  <p className="text-purple-300 font-semibold mb-2">{period.year}</p>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                    {period.title}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {period.summary}
                  </p>

                  {expandedTimeline.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-4 border-t border-white/10"
                    >
                      <p className="text-white/60 leading-relaxed">
                        {period.detail}
                      </p>
                    </motion.div>
                  )}

                  <button
                    className="mt-4 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
                    aria-expanded={expandedTimeline.includes(index)}
                  >
                    {expandedTimeline.includes(index) ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Read More</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Values - Accordion */}
      <section ref={ref} className="about-cards-surface py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              Studio Values
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The commitments we make to every client
            </p>
          </motion.div>

          <div className="space-y-4">
            {studioValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="faq-item"
              >
                <button
                  onClick={() => toggleValue(index)}
                  className="faq-button mobile-touch-target"
                  aria-expanded={activeValueIndex === index}
                >
                  <div className="text-left pr-4">
                    <h3 className="font-bold text-white text-lg mb-1">{value.title}</h3>
                    <p className="text-white/70 text-sm">{value.description}</p>
                  </div>
                  {activeValueIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-white flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white flex-shrink-0" />
                  )}
                </button>
                {activeValueIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-content"
                  >
                    <p>{value.detail}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="about-refined-card text-center py-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Ready to see what streamlined AI and modern web design can do for your business?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how boutique AI solutions and conversion-focused web design can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="about-btn-primary mobile-touch-target"
              >
                <Calendar className="h-5 w-5" />
                Book a Free 15-Min Discovery Call
              </a>
              <a
                href="/services"
                className="about-btn-secondary mobile-touch-target"
              >
                <ArrowRight className="h-5 w-5" />
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
