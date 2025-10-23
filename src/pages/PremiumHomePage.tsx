import React from 'react';
import InteractiveHero from '../components/homepage/InteractiveHero';
import ValueProposition from '../components/ValueProposition';
import ServicesPreview from '../components/ServicesPreview';
import TechnologyRoadmap from '../components/homepage/TechnologyRoadmap';
import PortfolioShowcase from '../components/homepage/PortfolioShowcase';
import AICapabilitiesShowcase from '../components/homepage/AICapabilitiesShowcase';
import PricingPackages from '../components/homepage/PricingPackages';
import ClientSuccessMetrics from '../components/homepage/ClientSuccessMetrics';
import ComprehensiveCTA from '../components/homepage/ComprehensiveCTA';

const PremiumHomePage = () => {
  return (
    <div className="overflow-hidden" role="document" aria-label="SoleScope Studio & Design Homepage">
      <InteractiveHero />
      <ValueProposition />
      <ServicesPreview />
      <TechnologyRoadmap />
      <PortfolioShowcase />
      <AICapabilitiesShowcase />
      <PricingPackages />
      <ClientSuccessMetrics />
      <ComprehensiveCTA />
    </div>
  );
};

export default PremiumHomePage;