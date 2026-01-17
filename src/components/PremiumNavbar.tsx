import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
        { name: 'Website Design & Hosting', path: '/services/website-design' },
        { name: 'Custom WebApps & Hosting', path: '/services/custom-webapps' },
        { name: 'AI Dashboards & Analytics', path: '/services/ai-dashboards' },
        { name: 'Brand Identity & Visuals', path: '/services/brand-identity' },
        { name: 'Custom AI Automations', path: '/services/custom-ai-automations' }
      ]
    },
    { name: 'AI Voice Agent', path: '/products/ai-voice-agent', flagship: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Mobile drawer rendered via portal
  const mobileDrawer = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
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
            className="lg:hidden fixed inset-y-0 right-0 w-[86%] bg-black/98 backdrop-blur-xl border-l border-white/10 z-[70] overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8">
                  <img
                    src="/edited-photo.png"
                    alt="SoleScope Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-base font-bold text-white">SoleScope</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="p-2 text-gray-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                    className={`flex items-center h-12 px-6 text-sm font-medium tracking-wide uppercase transition-colors border-b border-white/5 ${
                      (item as any).flagship
                        ? location.pathname === item.path
                          ? 'text-purple-300 bg-purple-500/20'
                          : 'text-purple-200 hover:text-white hover:bg-purple-500/10'
                        : location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
                        ? 'text-purple-400 bg-purple-600/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                          className={`flex items-center h-12 px-10 text-xs font-medium transition-colors border-b border-white/5 ${
                            location.pathname === subItem.path
                              ? 'text-purple-400 bg-purple-600/20'
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
    </AnimatePresence>
  );

  return (
    <>
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
          <div className="flex justify-between items-center py-4 md:h-auto h-14">
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
                      (item as any).flagship
                        ? location.pathname === item.path
                          ? 'text-purple-300 bg-purple-500/10 hover:bg-purple-500/15'
                          : 'text-purple-200 hover:text-purple-100 hover:bg-purple-500/5'
                        : location.pathname === item.path || (item.submenu && item.submenu.some(sub => location.pathname === sub.path))
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

              <Link
                to="/client-portal"
                role="button"
                aria-label="Go to client portal"
                className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium tracking-tight rounded-full bg-purple-600/80 hover:bg-purple-600 active:bg-purple-700 text-white border border-white/10 shadow-[0_0_0_2px_rgba(168,85,247,0.25)] hover:shadow-[0_0_0_3px_rgba(168,85,247,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300/70 focus:ring-offset-2 focus:ring-offset-black"
              >
                Client Portal
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <Link
                to="/client-portal"
                className="inline-flex items-center gap-1 h-7 px-3 text-xs font-medium rounded-full bg-purple-600/80 hover:bg-purple-600 text-white border border-white/10 transition-all duration-300"
              >
                Client Portal
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle mobile menu"
                className="text-gray-300 hover:text-white transition-colors p-2 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Drawer - Rendered via Portal */}
      {createPortal(mobileDrawer, document.body)}
    </>
  );
};

export default PremiumNavbar;