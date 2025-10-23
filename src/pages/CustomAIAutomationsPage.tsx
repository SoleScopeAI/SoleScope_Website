import React, { useEffect } from 'react';
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

const CustomAIAutomationsPage = () => {
  useEffect(() => {
    document.body.classList.add('page-custom-ai-automations');
    return () => {
      document.body.classList.remove('page-custom-ai-automations');
    };
  }, []);

  return (
    <div className="dark-theme-page min-h-screen">
      <PremiumNavbar />

      <EnhancedHero />

      <OverviewValue />

      <AICapabilities />

      <WorkflowExamples />

      <CentralDashboard />

      <UnifiedRoadmap />

      <WhyChoose />

      <ContactSection />

      <FlagshipCTA />

      <PremiumFooter />
    </div>
  );
};

export default CustomAIAutomationsPage;
