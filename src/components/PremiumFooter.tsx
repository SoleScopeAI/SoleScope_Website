import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const PremiumFooter = () => {
  const currentYear = new Date().getFullYear();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <footer className="dark-theme-page border-t border-white/10" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 relative">
                <img
                  src="/edited-photo.png"
                  alt="SoleScope AI Owl Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                SoleScope Studio & Design
              </span>
            </div>
            <p className="dark-text-body mb-6 max-w-md leading-relaxed">
              AI-powered websites, apps, and dashboards that help service businesses win more clients and grow sustainably.
            </p>
            <div className="space-y-3 dark-text-body">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent-primary" />
                <a href="mailto:contact@solescope.co.uk" className="dark-link">
                  contact@solescope.co.uk
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent-primary" />
                <a href="tel:+442033756616" className="dark-link">
                  +44 20 3375 6616
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent-primary" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 md:col-span-2">
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold dark-text-primary mb-6 tracking-wide uppercase">
                  Services
                </h3>
                <ul className="space-y-3 dark-text-body">
                  <li>
                    <Link to="/services/website-design" className="dark-link">
                      Website Design & Hosting
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/custom-webapps" className="dark-link">
                      Custom WebApps & Hosting
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/ai-dashboards" className="dark-link">
                      AI Dashboards & Analytics
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/brand-identity" className="dark-link">
                      Brand Identity & Visuals
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/custom-ai-automations" className="dark-link">
                      Custom AI Automations
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold dark-text-primary mb-6 tracking-wide uppercase">
                  Company
                </h3>
                <ul className="space-y-3 dark-text-body">
                  <li>
                    <Link to="/about" className="dark-link">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="dark-link">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/client-portal" className="dark-link">
                      Client Portal
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile: Accordion Layout */}
            <div className="md:hidden space-y-3">
              {/* Services Accordion */}
              <div className="mobile-footer-accordion">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="mobile-footer-accordion-trigger"
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  {servicesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {servicesOpen && (
                  <div className="mobile-footer-accordion-content space-y-3">
                    <Link to="/services/website-design" className="block dark-link text-sm">
                      Website Design & Hosting
                    </Link>
                    <Link to="/services/custom-webapps" className="block dark-link text-sm">
                      Custom WebApps & Hosting
                    </Link>
                    <Link to="/services/ai-dashboards" className="block dark-link text-sm">
                      AI Dashboards & Analytics
                    </Link>
                    <Link to="/services/brand-identity" className="block dark-link text-sm">
                      Brand Identity & Visuals
                    </Link>
                    <Link to="/services/custom-ai-automations" className="block dark-link text-sm">
                      Custom AI Automations
                    </Link>
                  </div>
                )}
              </div>

              {/* Company Accordion */}
              <div className="mobile-footer-accordion">
                <button
                  onClick={() => setCompanyOpen(!companyOpen)}
                  className="mobile-footer-accordion-trigger"
                  aria-expanded={companyOpen}
                >
                  <span>Company</span>
                  {companyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {companyOpen && (
                  <div className="mobile-footer-accordion-content space-y-3">
                    <Link to="/about" className="block dark-link text-sm">
                      About Us
                    </Link>
                    <Link to="/contact" className="block dark-link text-sm">
                      Contact
                    </Link>
                    <Link to="/client-portal" className="block dark-link text-sm">
                      Client Portal
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center dark-text-muted">
          <p>&copy; {currentYear} SoleScope Studio & Design. All rights reserved. Proudly serving businesses across the UK.</p>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;