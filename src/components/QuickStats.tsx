import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, TrendingUp, Users, Award } from 'lucide-react';
import '../styles/homepage-galaxy.css';

const QuickStats = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    {
      icon: Clock,
      value: "2-4 weeks",
      label: "Average Delivery",
      description: "from start to live"
    },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: "Uptime SLA",
      description: "hosting guarantee"
    },
    {
      icon: Users,
      value: "500+",
      label: "Projects Delivered",
      description: "successful launches"
    },
    {
      icon: Award,
      value: "< 24h",
      label: "Response Time",
      description: "for all inquiries"
    }
  ];

  return (
    <section
      ref={ref}
      className="homepage-section"
      aria-labelledby="stats-heading"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="stats-heading" className="sr-only">Our Performance Statistics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="homepage-refined-card homepage-metric-card"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600/30 to-purple-700/30 border border-purple-500/40 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="homepage-metric-value">{stat.value}</div>
              <div className="homepage-metric-label">{stat.label}</div>
              <div className="homepage-metric-description">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStats;
