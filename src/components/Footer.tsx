import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rich-black-0 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 relative">
                <img 
                  src="/Vector.png" 
                  alt="SoleScope AI Owl Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-white tracking-wider uppercase">
                SoleScope Studio & Design
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md font-light">
              Blending AI technology with human-first design to help sole traders and small service businesses win more clients with modern digital systems.
            </p>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-white" />
                <span className="font-light">contact@solescope.co.uk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-white" />
                <span className="font-light">07447 180903</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4 tracking-wide uppercase">SERVICES</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services" className="hover:text-white transition-colors font-light">Website Design & Hosting</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors font-light">Custom WebApps & Hosting</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors font-light">AI Dashboards</Link></li>
              <li><Link to="/services/custom-ai-automations" className="hover:text-white transition-colors font-light">Custom AI Automations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4 tracking-wide uppercase">COMPANY</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors font-light">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors font-light">FAQs</Link></li>
              <li><Link to="/client-portal" className="hover:text-white transition-colors font-light">Client Portal</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors font-light">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="font-light">&copy; 2025 SoleScope Marketing. All rights reserved. Proudly serving businesses across the UK.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;