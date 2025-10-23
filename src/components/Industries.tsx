import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Scissors, 
  Hammer, 
  Sparkles, 
  Car, 
  Home, 
  Heart,
  Coffee,
  Camera
} from 'lucide-react';

const Industries = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const industries = [
    {
      icon: Scissors,
      title: "Beauty & Grooming",
      examples: "Hair stylists, dog groomers, beauticians, nail technicians",
    },
    {
      icon: Hammer,
      title: "Trades & Crafts",
      examples: "Carpenters, plumbers, electricians, blade sharpeners",
    },
    {
      icon: Home,
      title: "Home Services",
      examples: "Cleaners, gardeners, handymen, decorators",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      examples: "Personal trainers, massage therapists, yoga instructors",
    },
    {
      icon: Car,
      title: "Automotive",
      examples: "Mobile mechanics, car detailers, driving instructors",
    },
    {
      icon: Coffee,
      title: "Food & Hospitality",
      examples: "Catering, food trucks, personal chefs, event planning",
    },
    {
      icon: Camera,
      title: "Creative Services",
      examples: "Photographers, designers, musicians, writers",
    },
    {
      icon: Sparkles,
      title: "Specialized Services",
      examples: "Consultants, coaches, tutors, repair services",
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-rich-black-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-wide uppercase">
            INDUSTRIES WE EMPOWER
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto font-light">
            From traditional trades to modern services, we help professionals across the UK build their digital presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-rich-black-0 border border-gray-800 p-6 hover:border-white transition-all duration-300 rounded-lg shadow-md"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <industry.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3 uppercase tracking-wide">
                {industry.title}
              </h3>
              <p className="text-gray-400 text-sm font-light">
                {industry.examples}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-8 font-light">
            Don't see your industry? We work with all service-based businesses.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-rich-black-0 px-8 py-3 font-medium hover:bg-rich-black-0 hover:text-white hover:border hover:border-white hover:shadow-lg transition-all duration-300 uppercase tracking-wide rounded-lg shadow-md"
          >
            DISCUSS YOUR BUSINESS
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;