import React from 'react';
import PremiumNavbar from '../components/PremiumNavbar';
import PremiumFooter from '../components/PremiumFooter';
import EnhancedHero from '../components/automations/EnhancedHero';
import OverviewValue from '../components/automations/OverviewValue';
import AICapabilities from '../components/automations/AICapabilities';
import WorkflowExamples from '../components/automations/WorkflowExamples';
import CentralDashboard from '../components/automations/CentralDashboard';
import UnifiedRoadmap from '../components/automations/UnifiedRoadmap';
import WhyChoose from '../components/automations/WhyChoose';
import ContactSection from '../components/automations/ContactSection';
import FlagshipCTA from '../components/automations/FlagshipCTA';
import '../styles/services-galaxy.css';

const CustomAIAutomationsPage = () => {
  return (
    <main className="services-surface pt-24 pb-20">
      <PremiumNavbar />

      <EnhancedHero />

      <section className="services-cards-surface">
        <div className="container">
          <OverviewValue />

          <AICapabilities />

          <WorkflowExamples />

          <CentralDashboard />

          <UnifiedRoadmap />

          <WhyChoose />

          <ContactSection />

          <FlagshipCTA />
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
};

export default CustomAIAutomationsPage;
