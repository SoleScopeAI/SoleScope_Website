import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  isLoaderActive?: boolean;
  onNavbarReady?: (logoRect: DOMRect, brandNameRect: DOMRect) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  isLoaderActive = false,
  onNavbarReady 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const location = useLocation();
  const logoRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLSpanElement>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation data - restored from original structure
  const navigationData = {
    primary: [
      {
        title: 'Home',
        path: '/',
        description: 'Homepage with hero section and service overview'
      },
      {
        title: 'Services',
        path: '/services',
        description: 'Our digital solutions',
        children: [
          {
            title: 'Website Design & Hosting',
            path: '/services/website-design',
            description: 'Professional websites with managed hosting'
          },
          {
            title: 'Custom WebApps',
            path: '/services/custom-webapps',
            description: 'Tailored web applications with hosting'
          },
          {
            title: 'AI Dashboards',
            path: '/services/ai-dashboards',
            description: 'Business intelligence and analytics'
          },
          {
            title: 'Brand Identity & Visuals',
            path: '/services/brand-identity',
            description: 'Logos and visual branding'
          },
          {
            title: 'AI Automations',
            path: '/services/ai-automations',
            description: 'Intelligent business automation'
          }
        ]
      },
      {
        title: 'About',
        path: '/about',
        description: 'Our story and team'
      },
      {
        title: 'Contact',
        path: '/contact',
        description: 'Get in touch with us'
      },
      {
        title: 'FAQ',
        path: '/faq',
        description: 'Frequently asked questions'
      }
    ],
    secondary: [
      {
        title: 'Blog',
        path: '/blog',
        description: 'Latest insights and industry trends'
      },
      {
        title: 'Client Portal',
        path: '/client-portal',
        external: false,
        description: 'Client dashboard and portal'
      }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Capture navbar element positions for loader animation
  useEffect(() => {
    if (!isLoaderActive && logoRef.current && brandNameRef.current && onNavbarReady) {
      const logoRect = logoRef.current.getBoundingClientRect();
      const brandNameRect = brandNameRef.current.getBoundingClientRect();
      onNavbarReady(logoRect, brandNameRect);
    }
  }, [isLoaderActive, onNavbarReady]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSubmenu(null);
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
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

  const handleSubmenuEnter = (itemTitle: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
    }
    setActiveSubmenu(itemTitle);
  };

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 400);
  };

  const isActiveRoute = (item: any): boolean => {
    if (item.path === '/' && location.pathname === '/') return true;
    if (item.path !== '/' && location.pathname.startsWith(item.path)) return true;
    if (item.children && item.children.some((child: any) => isActiveRoute(child))) return true;
    return false;
  };

  const handleLinkClick = (e: React.MouseEvent, item: any) => {
    if (item.external) {
      // Let external links work normally
      return;
    }
    
    // For mobile menu, always navigate and close menu
    if (isOpen) {
      setIsOpen(false);
      setActiveSubmenu(null);
      // Let react-router handle navigation
      return;
    }
    
    // For desktop with children, toggle submenu
    if (item.children && !isOpen) {
      e.preventDefault();
      setActiveSubmenu(activeSubmenu === item.title ? null : item.title);
    }
    // For regular internal links, let react-router handle navigation
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: any, index: number) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (item.children && !isOpen) {
          setActiveSubmenu(activeSubmenu === item.title ? null : item.title);
        } else if (!item.external) {
          // Let react-router handle navigation
        }
        break;
      case 'ArrowDown':
        if (item.children) {
          e.preventDefault();
          setActiveSubmenu(item.title);
          setFocusedIndex(0);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        setFocusedIndex(Math.min(index + 1, navigationData.primary.length - 1));
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedIndex(Math.max(index - 1, 0));
        break;
      case 'Escape':
        setActiveSubmenu(null);
        break;
    }
  };

  const handleSubmenuKeyDown = (e: React.KeyboardEvent, subItems: any[], subIndex: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = Math.min(subIndex + 1, subItems.length - 1);
        const nextElement = document.querySelector(`[data-submenu-index="${nextIndex}"]`);
        if (nextElement) (nextElement as HTMLElement).focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = Math.max(subIndex - 1, 0);
        const prevElement = document.querySelector(`[data-submenu-index="${prevIndex}"]`);
        if (prevElement) (prevElement as HTMLElement).focus();
        break;
      case 'Escape':
        setActiveSubmenu(null);
        const parentLink = document.querySelector(`[data-nav-item="${subItems[0]?.path?.split('/')[1]}"]`);
        if (parentLink) (parentLink as HTMLElement).focus();
        break;
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      role="navigation"
      aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'nav-blur border-b border-white/10' : 'bg-transparent'
      }`}
      style={{
        opacity: isLoaderActive ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2 -m-2"
            aria-label="SoleScope Studio & Design - Go to homepage"
          >
            <div ref={logoRef} className="w-10 h-10 relative" data-shared="brandMark">
              <img
                src="/edited-photo.png"
                alt=""
                role="presentation"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span 
              ref={brandNameRef}
              className="text-xl md:text-2xl font-bold text-white tracking-tight hover:text-purple-300 transition-colors duration-300"
            >
              SoleScope Studio & Design
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2" role="menubar" aria-label="Main menu">
            {navigationData.primary.map((item, index) => (
              <div key={item.title} className="relative" role="none">
                <Link
                  to={item.path}
                  role="menuitem"
                  aria-haspopup={item.children ? "true" : "false"}
                  aria-expanded={item.children && activeSubmenu === item.title ? "true" : "false"}
                  aria-current={isActiveRoute(item) ? "page" : undefined}
                  aria-describedby={`nav-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  data-nav-item={item.path.split('/')[1] || 'home'}
                  className={`group relative flex items-center space-x-2 px-4 py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 rounded-lg min-h-[44px] ${
                    isActiveRoute(item)
                      ? 'text-purple-400 bg-purple-400/10 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  } focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black`}
                  onClick={(e) => handleLinkClick(e, item)}
                  onMouseEnter={() => item.children && handleSubmenuEnter(item.title)}
                  onMouseLeave={() => item.children && handleSubmenuLeave()}
                  onFocus={() => item.children && setActiveSubmenu(item.title)}
                  onKeyDown={(e) => handleKeyDown(e, item, index)}
                >
                  <span>{item.title}</span>
                  {item.children && (
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeSubmenu === item.title ? 'rotate-180' : ''
                      }`} 
                      aria-hidden="true"
                    />
                  )}
                  
                </Link>
                
                {/* Hidden description for screen readers */}
                <span id={`nav-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="sr-only">
                  {item.description}
                </span>
                
                {/* Dropdown Menu */}
                {item.children && (
                  <AnimatePresence>
                    {activeSubmenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        role="menu"
                        aria-label={`${item.title} submenu`}
                        className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                        onMouseEnter={() => handleSubmenuEnter(item.title)}
                        onMouseLeave={handleSubmenuLeave}
                      >
                        {/* Submenu Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-b border-gray-700">
                          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            {item.title}
                          </span>
                        </div>
                        
                        {item.children.map((subItem, subIndex) => (
                          <Link
                            key={subItem.title}
                            to={subItem.path}
                            role="menuitem"
                            data-submenu-index={subIndex}
                            aria-describedby={`submenu-desc-${subIndex}`}
                            aria-current={location.pathname === subItem.path ? "page" : undefined}
                            className={`group block px-4 py-4 transition-all duration-200 min-h-[44px] ${
                              location.pathname === subItem.path
                                ? 'text-purple-400 bg-purple-400/10 border-l-2 border-purple-400'
                                : 'text-gray-300 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-purple-400/50'
                            } focus:outline-none focus:bg-purple-400/10 focus:text-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black`}
                            onClick={() => setActiveSubmenu(null)}
                            onKeyDown={(e) => handleSubmenuKeyDown(e, item.children!, subIndex)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-purple-400/60 rounded-full mt-2 flex-shrink-0 group-hover:bg-purple-400 transition-colors" aria-hidden="true" />
                              <div>
                                <div className="font-medium text-sm mb-1">{subItem.title}</div>
                                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                                  {subItem.description}
                                </div>
                              </div>
                            </div>
                            <span id={`submenu-desc-${subIndex}`} className="sr-only">
                              {subItem.description}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            {/* Client Portal Button */}
            <Link
              to="/client-portal"
              role="button"
              aria-label="Go to client portal"
              className="btn-secondary text-sm px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg flex items-center space-x-2 ml-4 min-h-[44px]"
            >
              <span>Client Portal</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              to="/client-portal"
              className="inline-flex items-center gap-1 h-7 px-3 text-xs font-medium rounded-full bg-purple-600/80 hover:bg-purple-600 text-white border border-white/10 transition-all duration-300"
            >
              Portal
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
              className="text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: 0, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Fixed Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                id="mobile-menu"
                ref={menuRef}
                role="menu"
                aria-label="Mobile navigation menu"
                className="lg:hidden fixed inset-y-0 right-0 w-[86%] max-w-sm bg-black/98 backdrop-blur-xl border-l border-white/10 z-[70] overflow-y-auto"
                style={{ top: 0, bottom: 0 }}
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-black/98 z-10">
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
                    className="p-2 text-gray-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/5"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Drawer Navigation Items */}
                <div className="px-4 py-6 space-y-2">
                  {navigationData.primary.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {/* Main menu item */}
                      <Link
                        to={item.path}
                        role="menuitem"
                        aria-describedby={`mobile-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                        aria-current={isActiveRoute(item) ? "page" : undefined}
                        onClick={(e) => handleLinkClick(e, item)}
                        className={`group flex items-center space-x-3 px-4 py-4 text-base font-medium transition-all duration-300 rounded-xl min-h-[44px] ${
                          isActiveRoute(item)
                            ? 'text-purple-400 bg-purple-400/10 border border-purple-400/20'
                            : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                        } focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black`}
                      >
                        <div className="flex-1">
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                            {item.description}
                          </div>
                        </div>
                        {item.children && (
                          <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        )}
                      </Link>

                      <span id={`mobile-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="sr-only">
                        {item.description}
                      </span>

                      {/* Mobile submenu */}
                      {item.children && (
                        <div className="ml-4 mt-2 space-y-1" role="group" aria-label={`${item.title} submenu`}>
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.path}
                              role="menuitem"
                              aria-current={location.pathname === subItem.path ? "page" : undefined}
                              onClick={() => setIsOpen(false)}
                              className={`block px-4 py-3 text-sm transition-all duration-300 rounded-lg min-h-[44px] flex items-center ${
                                location.pathname === subItem.path
                                  ? 'text-purple-400 bg-purple-400/10 border-l-2 border-purple-400'
                                  : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-purple-400/50'
                              } focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black`}
                            >
                              <div className="flex-1">
                                <div className="font-medium mb-1">{subItem.title}</div>
                                <div className="text-xs text-gray-500">{subItem.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Mobile Secondary Navigation */}
                  {navigationData.secondary.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (navigationData.primary.length + index) * 0.05 }}
                    >
                      {item.external ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          aria-describedby={`mobile-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="group flex items-center space-x-3 px-4 py-4 text-base font-medium transition-all duration-300 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black min-h-[44px]"
                        >
                          <div className="flex-1">
                            <div className="font-semibold">{item.title}</div>
                            <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                              {item.description}
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          to={item.path}
                          role="menuitem"
                          aria-describedby={`mobile-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                          aria-current={location.pathname === item.path ? "page" : undefined}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center space-x-3 px-4 py-4 text-base font-medium transition-all duration-300 rounded-xl min-h-[44px] ${
                            location.pathname === item.path
                              ? 'text-purple-400 bg-purple-400/10 border border-purple-400/20'
                              : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                          } focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black`}
                        >
                          <div className="flex-1">
                            <div className="font-semibold">{item.title}</div>
                            <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      )}

                      <span id={`mobile-desc-${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="sr-only">
                        {item.description}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;