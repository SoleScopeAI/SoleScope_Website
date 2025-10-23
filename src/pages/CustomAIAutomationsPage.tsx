import React, { useEffect } from 'react';
import PremiumNavbar from '../components/PremiumNavbar';
import PremiumFooter from '../components/PremiumFooter';
import FlagshipHero from '../components/automations/FlagshipHero';
import Overview from '../components/automations/Overview';
import ValueSplit from '../components/automations/ValueSplit';
import DiscoveryProcess from '../components/automations/DiscoveryProcess';
import InteractiveDashboard from '../components/automations/InteractiveDashboard';
import SectorUseCases from '../components/automations/SectorUseCases';
import PackagesTiers from '../components/automations/PackagesTiers';
import HostingSupport from '../components/automations/HostingSupport';
import FinalCTA from '../components/automations/FinalCTA';

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

      <FlagshipHero />

      <Overview />

      <ValueSplit />

      <DiscoveryProcess />

      <InteractiveDashboard />

      <SectorUseCases />

      <PackagesTiers />

      <HostingSupport />

      <FinalCTA />

      <PremiumFooter />
    </div>
  );
};

export default CustomAIAutomationsPage;
