import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') return null;

  // Route name mapping for better UX
  const routeNames: { [key: string]: string } = {
    'services': 'Services',
    'resources': 'Resources',
    'pricing': 'Pricing',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'website-design': 'Website Design',
    'custom-webapps': 'Custom WebApps',
    'ai-dashboards': 'AI Dashboards',
    'brand-identity': 'Brand Identity',
    'ai-automations': 'AI Automations',
    'custom-ai-automations': 'AI Automations',
    'blog': 'Blog',
    'case-studies': 'Case Studies',
    'guides': 'Guides',
    'about': 'About',
    'contact': 'Contact',
    'faq': 'FAQs'
  };

  const breadcrumbItems = [
    { name: 'Home', path: '/', icon: Home }
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathnames.forEach((pathname) => {
    currentPath += `/${pathname}`;
    const displayName = routeNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
    breadcrumbItems.push({
      name: displayName,
      path: currentPath,
      icon: null
    });
  });

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className="pt-24 pb-4 bg-gradient-to-r from-black via-purple-950/10 to-black border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm" role="list">
          {breadcrumbItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center"
              role="listitem"
            >
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 text-gray-500 mx-2 flex-shrink-0" 
                  aria-hidden="true"
                />
              )}
              
              {index === breadcrumbItems.length - 1 ? (
                // Current page (not a link)
                <span 
                  className="flex items-center space-x-2 text-purple-400 font-medium"
                  aria-current="page"
                >
                  {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                  <span>{item.name}</span>
                </span>
              ) : (
                // Breadcrumb link
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                  aria-label={index === 0 ? "Go to homepage" : `Go to ${item.name}`}
                >
                  {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;