import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PremiumNavbar from './components/PremiumNavbar';
import ScrollToTop from './components/ScrollToTop';
import KeyboardNavigationGuide from './components/KeyboardNavigationGuide';
import ScrollAnimations from './components/ScrollAnimations';
import PremiumFooter from './components/PremiumFooter';
import SkipToContent from './components/SkipToContent';

import PremiumHomePage from './pages/PremiumHomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AIWebsiteDesignPage from './pages/AIWebsiteDesignPage';
import WebsiteDesignPage from './pages/WebsiteDesignPage';
import CustomWebAppsPage from './pages/CustomWebAppsPage';
import AIDashboardsPage from './pages/AIDashboardsPage';
import BrandIdentityPage from './pages/BrandIdentityPage';
import CustomAIAutomationsPage from './pages/CustomAIAutomationsPage';

const App = () => {
  return (
    <div role="application" aria-label="SoleScope Studio & Design Website">
      <ScrollToTop />
      <ScrollAnimations />
      <SkipToContent />
      
      <header role="banner">
        <PremiumNavbar />
      </header>

      <main role="main" id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<PremiumHomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/ai-website-design" element={<AIWebsiteDesignPage />} />
          <Route path="/services/website-design" element={<WebsiteDesignPage />} />
          <Route path="/services/custom-webapps" element={<CustomWebAppsPage />} />
          <Route path="/services/ai-dashboards" element={<AIDashboardsPage />} />
          <Route path="/services/brand-identity" element={<BrandIdentityPage />} />
          <Route path="/services/custom-ai-automations" element={<CustomAIAutomationsPage />} />
        </Routes>
      </main>

      <footer role="contentinfo">
        <PremiumFooter />
      </footer>
      
      <KeyboardNavigationGuide />
    </div>
  );
};

export default App;