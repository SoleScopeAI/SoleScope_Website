import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ClientProject {
  id: number;
  name: string;
  services: string[];
  screenshot: string;
  cta: string;
  url?: string;
}

interface ClientCardProps {
  project: ClientProject;
}

const ClientCard: React.FC<ClientCardProps> = ({ project }) => {
  return (
    <motion.div
      className="relative bg-rich-black-0 rounded-3xl border border-gray-800 overflow-hidden shadow-md group cursor-pointer"
      whileHover={{
        scale: 1.03,
        rotateY: 3,
        rotateX: 2,
        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.1)"
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Screenshot */}
      <div className="h-72 overflow-hidden">
        <img 
          src={project.screenshot} 
          alt={project.alt || project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 tracking-wide uppercase">
          {project.name}
        </h3>
        
        {/* Services Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.services.map((service, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800 text-gray-400 text-sm font-light rounded-full tracking-wide"
            >
              {service}
            </span>
          ))}
        </div>
        
        {/* CTA - Shows on hover */}
        <div className="flex items-center space-x-2 text-white font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>{project.cta}</span>
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default ClientCard;