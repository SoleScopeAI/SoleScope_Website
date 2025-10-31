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
import ClientPortalPage from './pages/ClientPortalPage';

import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { ClientAuthProvider } from './contexts/ClientAuthContext';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import ProtectedClientRoute from './components/client/ProtectedClientRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ClientsPage from './pages/admin/ClientsPage';
import ProjectsPage from './pages/admin/ProjectsPage';
import InvoicesPage from './pages/admin/InvoicesPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import ClientLayout from './components/client/ClientLayout';
import ClientDashboardPage from './pages/client/ClientDashboardPage';

const App = () => {
  return (
    <AdminAuthProvider>
      <ClientAuthProvider>
        <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route
          path="/client/*"
          element={
            <ProtectedClientRoute>
              <ClientLayout />
            </ProtectedClientRoute>
          }
        >
          <Route path="dashboard" element={<ClientDashboardPage />} />
        </Route>

        <Route
          path="/*"
          element={
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
                  <Route path="/client-portal" element={<ClientPortalPage />} />
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
          }
        />
        </Routes>
      </ClientAuthProvider>
    </AdminAuthProvider>
  );
};

export default App;