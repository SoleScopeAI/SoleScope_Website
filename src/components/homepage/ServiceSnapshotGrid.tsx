import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Globe, Code, BarChart3, Palette, Bot, ArrowRight, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';
import ContactFormModal from '../ContactFormModal';

const ServiceSnapshotGrid = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  interface Service {
    icon: any;
    title: string;
    path: string | null;
    highlights: string[];
    color: string;
    glowColor: string;
    isAI?: boolean;
    isContact?: boolean;
    insight: string;
  }

  const services: Service[] = [
    {
      icon: Bot,
      title: "AI Automations",
      path: "/services/custom-ai-automations",
      highlights: [
        "24/7 intelligent lead qualification",
        "Automated client workflows",
        "Custom AI integrations"
      ],
      color: "from-cyan-400 via-purple-500 to-emerald-400",
      glowColor: "rgba(34, 211, 238, 0.3)",
      isAI: true,
      insight: "Automate your lead handling 10× faster"
    },
    {
      icon: Globe,
      title: "Website Design",
      path: "/services/website-design",
      highlights: [
        "Mobile-responsive design",
        "Fully managed hosting",
        "SEO optimized"
      ],
      color: "from-purple-600 to-purple-700",
      glowColor: "rgba(168, 85, 247, 0.3)",
      insight: "Convert visitors into paying customers"
    },
    {
      icon: Code,
      title: "Custom WebApps",
      path: "/services/custom-webapps",
      highlights: [
        "Tailored functionality",
        "Enterprise-grade hosting",
        "Scalable architecture"
      ],
      color: "from-purple-600 to-purple-700",
      glowColor: "rgba(168, 85, 247, 0.3)",
      insight: "Build the exact solution your business needs"
    },
    {
      icon: BarChart3,
      title: "AI Dashboards",
      path: "/services/ai-dashboards",
      highlights: [
        "Real-time analytics",
        "Predictive insights",
        "Custom data visualizations"
      ],
      color: "from-purple-600 to-purple-700",
      glowColor: "rgba(168, 85, 247, 0.3)",
      insight: "Make data-driven decisions instantly"
    },
    {
      icon: Palette,
      title: "Brand Identity",
      path: "/services/brand-identity",
      highlights: [
        "Complete brand packages",
        "Logo & visual systems",
        "Marketing materials"
      ],
      color: "from-purple-600 to-purple-700",
      glowColor: "rgba(168, 85, 247, 0.3)",
      insight: "Stand out with professional branding"
    },
    {
      icon: MessageSquare,
      title: "Get In Touch",
      path: null,
      highlights: [
        "Direct founder contact",
        "Response within 24h",
        "Free consultation"
      ],
      color: "from-emerald-400 via-cyan-500 to-blue-500",
      glowColor: "rgba(16, 185, 129, 0.3)",
      isContact: true,
      insight: "Let's discuss your project today"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      aria-labelledby="services-snapshot-heading"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced headline with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-wide mb-3"
            style={{
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.8), rgba(179, 156, 255, 1), rgba(168, 85, 247, 0.8))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{
              backgroundPosition: ['0% center', '200% center', '0% center']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Our Services
          </motion.p>

          <motion.h2
            id="services-snapshot-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 uppercase tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 50%, #FFFFFF 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={inView ? {
              backgroundPosition: ['0% center', '200% center', '0% center']
            } : {}}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Explore What We Build
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Complete digital solutions designed for service businesses who want to compete and win online.
          </motion.p>
        </motion.div>

        {/* Enhanced service grid with glass morphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onHoverStart={() => setHoveredService(index)}
              onHoverEnd={() => setHoveredService(null)}
              className="relative h-full group"
            >
              {service.isContact ? (
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="block h-full relative w-full text-left"
                >
                  <motion.div
                    className="h-full backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-blue-500/5 border-emerald-400/20"
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    boxShadow: hoveredService === index
                      ? `0 20px 60px -15px ${service.glowColor}, 0 0 0 1px rgba(255, 255, 255, 0.1)`
                      : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Luminous border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${service.glowColor}, transparent, ${service.glowColor})`,
                      filter: 'blur(20px)',
                      transform: 'scale(1.02)'
                    }}
                  />

                  {/* AI service ambient animation */}
                  {service.isAI && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-emerald-400/5 rounded-3xl"
                      animate={{
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  {/* Contact service ambient animation */}
                  {service.isContact && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-cyan-500/5 to-blue-500/5 rounded-3xl"
                      animate={{
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Enhanced icon with pulsing glow */}
                    <motion.div
                      className="relative mb-6"
                      animate={hoveredService === index ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: hoveredService === index ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center relative overflow-hidden`}
                        whileHover={{ rotate: 5 }}
                        style={{
                          boxShadow: hoveredService === index
                            ? `0 0 40px ${service.glowColor}, 0 0 60px ${service.glowColor}`
                            : `0 0 20px ${service.glowColor}`
                        }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1
                          }}
                        />
                        <service.icon className="h-10 w-10 text-white relative z-10 drop-shadow-lg" />
                      </motion.div>

                      {/* Pulsing glow ring */}
                      {hoveredService === index && (
                        <motion.div
                          className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl`}
                          initial={{ opacity: 0.5, scale: 1 }}
                          animate={{
                            opacity: [0.5, 0, 0.5],
                            scale: [1, 1.3, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                          style={{ filter: 'blur(15px)' }}
                        />
                      )}
                    </motion.div>

                    {/* Title with luminous divider */}
                    <div className="mb-5">
                      <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${
                        service.isAI
                          ? 'text-white group-hover:text-cyan-300'
                          : service.isContact
                          ? 'text-white group-hover:text-emerald-300'
                          : 'text-white group-hover:text-purple-300'
                      }`}>
                        {service.title}
                      </h3>

                      {/* Luminous divider */}
                      <motion.div
                        className={`h-0.5 bg-gradient-to-r ${service.color} rounded-full`}
                        initial={{ width: 0, opacity: 0 }}
                        animate={hoveredService === index ? {
                          width: '100%',
                          opacity: 1
                        } : {
                          width: '0%',
                          opacity: 0
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                          boxShadow: hoveredService === index ? `0 0 10px ${service.glowColor}` : 'none'
                        }}
                      />
                    </div>

                    {/* Animated bullet highlights */}
                    <ul className="space-y-3 mb-6">
                      {service.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0.7, x: 0 }}
                          animate={hoveredService === index ? {
                            opacity: 1,
                            x: 4
                          } : {
                            opacity: 0.7,
                            x: 0
                          }}
                          transition={{
                            duration: 0.3,
                            delay: idx * 0.05
                          }}
                          className="flex items-start space-x-3 text-sm"
                        >
                          <CheckCircle
                            className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                              service.isAI ? 'text-cyan-400' : service.isContact ? 'text-emerald-400' : 'text-purple-400'
                            }`}
                          />
                          <span className="text-slate-300 leading-relaxed">
                            {highlight}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover insight line */}
                    <AnimatePresence>
                      {hoveredService === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="mb-4 pt-4 border-t border-white/10"
                        >
                          <div className="flex items-center space-x-2">
                            <Sparkles className={`h-4 w-4 ${
                              service.isAI ? 'text-cyan-400' : service.isContact ? 'text-emerald-400' : 'text-purple-400'
                            }`} />
                            <p className={`text-sm italic font-medium ${
                              service.isAI ? 'text-cyan-300' : service.isContact ? 'text-emerald-300' : 'text-purple-300'
                            }`}>
                              {service.insight}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Learn More CTA */}
                    <motion.div
                      className={`flex items-center space-x-2 font-semibold text-sm transition-all duration-300 ${
                        service.isAI ? 'text-cyan-400' : service.isContact ? 'text-emerald-400' : 'text-purple-400'
                      }`}
                      animate={hoveredService === index ? { x: 4 } : { x: 0 }}
                    >
                      <span>{service.isContact ? 'Contact Now' : 'Learn More'}</span>
                      <motion.div
                        animate={hoveredService === index ? {
                          x: [0, 4, 0]
                        } : {}}
                        transition={{
                          duration: 1,
                          repeat: hoveredService === index ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Bottom gradient bar */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-b-3xl`}
                    initial={{ opacity: 0 }}
                    animate={hoveredService === index ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: hoveredService === index ? `0 0 20px ${service.glowColor}` : 'none'
                    }}
                  />
                </motion.div>
              </button>
              ) : (
                <Link
                  to={service.path!}
                  className="block h-full relative"
                >
                  <motion.div
                    className={`h-full backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 relative overflow-hidden ${
                      service.isAI
                        ? 'bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-emerald-500/5 border-cyan-400/20'
                        : 'bg-white/3 border-white/10'
                    }`}
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      boxShadow: hoveredService === index
                        ? `0 20px 60px -15px ${service.glowColor}, 0 0 0 1px rgba(255, 255, 255, 0.1)`
                        : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {/* Luminous border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${service.glowColor}, transparent, ${service.glowColor})`,
                        filter: 'blur(20px)',
                        transform: 'scale(1.02)'
                      }}
                    />

                    {/* AI service ambient animation */}
                    {service.isAI && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-emerald-400/5 rounded-3xl"
                        animate={{
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      {/* Enhanced icon with pulsing glow */}
                      <motion.div
                        className="relative mb-6"
                        animate={hoveredService === index ? {
                          scale: [1, 1.05, 1],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: hoveredService === index ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <motion.div
                          className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center relative overflow-hidden`}
                          whileHover={{ rotate: 5 }}
                          style={{
                            boxShadow: hoveredService === index
                              ? `0 0 40px ${service.glowColor}, 0 0 60px ${service.glowColor}`
                              : `0 0 20px ${service.glowColor}`
                          }}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '200%']
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              repeatDelay: 1
                            }}
                          />
                          <service.icon className="h-10 w-10 text-white relative z-10 drop-shadow-lg" />
                        </motion.div>

                        {/* Pulsing glow ring */}
                        {hoveredService === index && (
                          <motion.div
                            className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl`}
                            initial={{ opacity: 0.5, scale: 1 }}
                            animate={{
                              opacity: [0.5, 0, 0.5],
                              scale: [1, 1.3, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                            style={{ filter: 'blur(15px)' }}
                          />
                        )}
                      </motion.div>

                      {/* Title with luminous divider */}
                      <div className="mb-5">
                        <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${
                          service.isAI
                            ? 'text-white group-hover:text-cyan-300'
                            : 'text-white group-hover:text-purple-300'
                        }`}>
                          {service.title}
                        </h3>

                        {/* Luminous divider */}
                        <motion.div
                          className={`h-0.5 bg-gradient-to-r ${service.color} rounded-full`}
                          initial={{ width: 0, opacity: 0 }}
                          animate={hoveredService === index ? {
                            width: '100%',
                            opacity: 1
                          } : {
                            width: '0%',
                            opacity: 0
                          }}
                          transition={{ duration: 0.4 }}
                          style={{
                            boxShadow: hoveredService === index ? `0 0 10px ${service.glowColor}` : 'none'
                          }}
                        />
                      </div>

                      {/* Animated bullet highlights */}
                      <ul className="space-y-3 mb-6">
                        {service.highlights.map((highlight, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0.7, x: 0 }}
                            animate={hoveredService === index ? {
                              opacity: 1,
                              x: 4
                            } : {
                              opacity: 0.7,
                              x: 0
                            }}
                            transition={{
                              duration: 0.3,
                              delay: idx * 0.05
                            }}
                            className="flex items-start space-x-3 text-sm"
                          >
                            <CheckCircle
                              className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                                service.isAI ? 'text-cyan-400' : 'text-purple-400'
                              }`}
                            />
                            <span className="text-slate-300 leading-relaxed">
                              {highlight}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Hover insight line */}
                      <AnimatePresence>
                        {hoveredService === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4 pt-4 border-t border-white/10"
                          >
                            <div className="flex items-center space-x-2">
                              <Sparkles className={`h-4 w-4 ${
                                service.isAI ? 'text-cyan-400' : 'text-purple-400'
                              }`} />
                              <p className={`text-sm italic font-medium ${
                                service.isAI ? 'text-cyan-300' : 'text-purple-300'
                              }`}>
                                {service.insight}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Learn More CTA */}
                      <motion.div
                        className={`flex items-center space-x-2 font-semibold text-sm transition-all duration-300 ${
                          service.isAI ? 'text-cyan-400' : 'text-purple-400'
                        }`}
                        animate={hoveredService === index ? { x: 4 } : { x: 0 }}
                      >
                        <span>Learn More</span>
                        <motion.div
                          animate={hoveredService === index ? {
                            x: [0, 4, 0]
                          } : {}}
                          transition={{
                            duration: 1,
                            repeat: hoveredService === index ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Bottom gradient bar */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-b-3xl`}
                      initial={{ opacity: 0 }}
                      animate={hoveredService === index ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        boxShadow: hoveredService === index ? `0 0 20px ${service.glowColor}` : 'none'
                      }}
                    />
                  </motion.div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center relative group"
            >
              {/* Button glow aura */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ transform: 'scale(1.1)' }}
              />

              {/* Button */}
              <motion.div
                className="relative px-12 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-lg rounded-2xl uppercase tracking-wide overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 10px 30px rgba(108, 62, 240, 0.3)',
                    '0 15px 40px rgba(108, 62, 240, 0.5)',
                    '0 10px 30px rgba(108, 62, 240, 0.3)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Gradient slide animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '200%',
                    transition: { duration: 1, ease: "easeInOut" }
                  }}
                />

                <span className="relative z-10 flex items-center space-x-3">
                  <span>View All Services</span>
                  <motion.div
                    animate={{
                      x: [0, 4, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-6 text-sm text-slate-400"
          >
            Discover how SoleScope transforms digital presence for service-based businesses.
          </motion.p>
        </motion.div>
      </div>

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};

export default ServiceSnapshotGrid;
