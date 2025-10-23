import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
        { name: 'Website Design & Hosting', path: '/services/website-design' },
        { name: 'Custom WebApps & Hosting', path: '/services/custom-webapps' },
        { name: 'AI Dashboards & Analytics', path: '/services/ai-dashboards' },
        { name: 'Brand Identity & Visuals', path: '/services/brand-identity' },
        { name: 'Custom AI Automations', path: '/services/custom-ai-automations' }
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
      role="navigation"
      aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'nav-blur' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 relative">
              <img
                src="/edited-photo.png"
                alt="SoleScope AI Owl Logo"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight hover:text-purple-300 transition-colors duration-300">
              SoleScope Studio & Design
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8" role="menubar" aria-label="Main menu">
            {navItems.map((item) => (
              <div key={item.name} className="relative group" role="none">
                <Link
                  to={item.path}
                  role="menuitem"
                  aria-haspopup={item.submenu ? "true" : "false"}
                  aria-expanded={item.submenu && servicesOpen ? "true" : "false"}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={`relative px-4 py-2 font-medium text-sm tracking-wide uppercase transition-all duration-300 ${
                    location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
                      ? 'text-purple-400'
                      : 'text-gray-300 hover:text-white'
                  } focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded-lg active:scale-100`}
                  onMouseEnter={() => {
                    if (item.submenu) {
                      if (submenuTimeoutRef.current) {
                        clearTimeout(submenuTimeoutRef.current);
                      }
                      setServicesOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.submenu) {
                      submenuTimeoutRef.current = setTimeout(() => {
                        setServicesOpen(false);
                      }, 400);
                    }
                  }}
                  onFocus={() => item.submenu && setServicesOpen(true)}
                  onBlur={() => item.submenu && setServicesOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.location.href = item.path;
                    }
                    if (e.key === 'ArrowDown' && item.submenu) {
                      e.preventDefault();
                      setServicesOpen(true);
                      // Focus first submenu item
                      setTimeout(() => {
                        const firstSubmenuItem = document.querySelector(`[data-submenu="${item.name}"] a`);
                        if (firstSubmenuItem) (firstSubmenuItem as HTMLElement).focus();
                      }, 100);
                    }
                  }}
                >
                  <span className="flex items-center">
                    {item.name}
                    {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
                  </span>
                </Link>
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        role="menu"
                        aria-label={`${item.name} submenu`}
                        className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl z-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        data-submenu={item.name}
                        onMouseEnter={() => {
                          if (submenuTimeoutRef.current) {
                            clearTimeout(submenuTimeoutRef.current);
                          }
                          setServicesOpen(true);
                        }}
                        onMouseLeave={() => {
                          submenuTimeoutRef.current = setTimeout(() => {
                            setServicesOpen(false);
                          }, 400);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setServicesOpen(false);
                            // Return focus to parent menu item
                            const parentLink = document.querySelector(`a[href="${item.path}"]`);
                            if (parentLink) (parentLink as HTMLElement).focus();
                          }
                        }}
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            role="menuitem"
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-purple-600/20 focus:text-white focus:bg-purple-600/20 focus:outline-none transition-colors first:rounded-t-lg last:rounded-b-lg"
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowDown' && subIndex < item.submenu!.length - 1) {
                                e.preventDefault();
                                const nextItem = e.currentTarget.nextElementSibling;
                                if (nextItem) (nextItem as HTMLElement).focus();
                              }
                              if (e.key === 'ArrowUp' && subIndex > 0) {
                                e.preventDefault();
                                const prevItem = e.currentTarget.previousElementSibling;
                                if (prevItem) (prevItem as HTMLElement).focus();
                              }
                              if (e.key === 'Escape') {
                                setServicesOpen(false);
                                const parentLink = document.querySelector(`a[href="${item.path}"]`);
                                if (parentLink) (parentLink as HTMLElement).focus();
                              }
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            {/* Client Portal Button */}
            <a
              href="https://ClientPortal.solescope.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              aria-label="Open client portal in new tab"
              className="btn-secondary text-sm px-6 py-2 focus:outline-none rounded-lg"
            >
              Client Portal
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
              className="text-gray-300 hover:text-white transition-colors p-2 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
              className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800 rounded-b-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors focus:outline-none ${
                        location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
                          ? 'text-purple-400 bg-purple-600/20'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      } rounded-lg`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-1" role="group" aria-label={`${item.name} submenu`}>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
                              location.pathname === subItem.path
                                ? 'text-purple-400 bg-purple-600/20'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            } rounded-lg`}
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
                  role="button"
                  aria-label="Open client portal in new tab"
                  className="block w-full text-center bg-transparent border-2 border-purple-500 text-purple-400 px-3 py-2 text-sm font-medium rounded-lg mt-4 hover:bg-purple-600 hover:text-white transition-colors focus:outline-none"
                >
                  Client Portal
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default PremiumNavbar;