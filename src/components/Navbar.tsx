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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
          <div className="md:hidden flex items-center gap-3">
            <a
              href="https://ClientPortal.solescope.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SoleScope Marketing client portal in a new tab"
              className="inline-flex items-center gap-1 h-7 px-3 text-xs font-medium rounded-full bg-purple-600/80 hover:bg-purple-600 text-white border border-white/10 transition-all duration-300"
            >
              Client Portal
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white transition-colors p-2 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Fixed Overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
              style={{ top: 0, left: 0, right: 0, bottom: 0 }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
              className="md:hidden fixed inset-y-0 right-0 w-[86%] max-w-sm bg-rich-black-0 backdrop-blur-xl border-l border-gray-700 z-[70] overflow-y-auto"
              style={{ top: 0, bottom: 0 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-rich-black-0 z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8">
                    <img
                      src="/Vector.png"
                      alt="SoleScope Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-base font-bold text-white">SoleScope</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/5"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Navigation Items */}
              <div className="py-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center h-12 px-6 text-sm font-medium tracking-wide uppercase transition-colors border-b border-gray-800/50 ${
                        location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
                          ? 'text-white bg-gray-800'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="bg-black/40" role="group" aria-label={`${item.name} submenu`}>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center h-12 px-10 text-xs font-medium transition-colors border-b border-gray-800/30 ${
                              location.pathname === subItem.path
                                ? 'text-white bg-purple-600/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;