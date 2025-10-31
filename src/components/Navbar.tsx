import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const submenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      submenu: [
        { name: 'All Services', path: '/services' },
        { name: 'Website Design & Hosting', path: '/services/website-design' },
        { name: 'Custom WebApps & Hosting', path: '/services/custom-webapps' },
        { name: 'AI Dashboards & Analytics', path: '/services/ai-dashboards' },
        { name: 'Brand Identity & Visuals', path: '/services/brand-identity' }
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-rich-black-0 border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 relative">
              <img 
                src="/Vector.png" 
                alt="SoleScope AI Owl Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-semibold text-white tracking-wider uppercase hover:text-glow transition-all duration-300">
              SoleScope Studio & Design
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  onMouseEnter={() => {
                    if (item.submenu) {
                      if (submenuTimeoutRef.current) {
                        clearTimeout(submenuTimeoutRef.current);
                      }
                      setActiveSubmenu(item.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.submenu) {
                      submenuTimeoutRef.current = setTimeout(() => {
                        setActiveSubmenu(null);
                      }, 400);
                    }
                  }}
                  className={`transition-all duration-300 font-medium text-sm tracking-wide uppercase hover:text-white relative ${
                    location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white'
                      : 'text-gray-400 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:transition-all hover:after:duration-300'
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && activeSubmenu === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-rich-black-0 border border-gray-800 opacity-100 visible transition-all duration-300 z-50 rounded-lg"
                    onMouseEnter={() => {
                      if (submenuTimeoutRef.current) {
                        clearTimeout(submenuTimeoutRef.current);
                      }
                      setActiveSubmenu(item.name);
                    }}
                    onMouseLeave={() => {
                      submenuTimeoutRef.current = setTimeout(() => {
                        setActiveSubmenu(null);
                      }, 400);
                    }}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors uppercase tracking-wide"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://ClientPortal.solescope.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SoleScope Marketing client portal in a new tab"
              className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium tracking-tight rounded-full bg-purple-600/80 hover:bg-purple-600 active:bg-purple-700 text-white border border-white/10 shadow-[0_0_0_2px_rgba(168,85,247,0.25)] hover:shadow-[0_0_0_3px_rgba(168,85,247,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300/70 focus:ring-offset-2 focus:ring-offset-black"
            >
              Client Portal
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white transition-colors z-50 relative p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-rich-black-0 border-t border-gray-800 rounded-lg shadow-2xl z-40 relative"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                      location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
                        ? 'text-white bg-gray-800'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                            location.pathname === subItem.path
                              ? 'text-white bg-gray-800'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="https://ClientPortal.solescope.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open SoleScope Marketing client portal in a new tab"
                className="block w-full text-center h-10 px-5 py-2 text-sm font-medium tracking-tight rounded-full bg-purple-600/80 hover:bg-purple-600 active:bg-purple-700 text-white border border-white/10 shadow-[0_0_0_2px_rgba(168,85,247,0.25)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300/70"
              >
                Client Portal
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;