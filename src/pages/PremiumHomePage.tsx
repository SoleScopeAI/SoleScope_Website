import React from 'react';
import InteractiveHero from '../components/homepage/InteractiveHero';
import MobileServicesPreview from '../components/homepage/MobileServicesPreview';
import WhyChooseSoleScope from '../components/homepage/WhyChooseSoleScope';
import ServiceSnapshotGrid from '../components/homepage/ServiceSnapshotGrid';
import ClientResultsShowcase from '../components/homepage/ClientResultsShowcase';
import ProcessStepper from '../components/homepage/ProcessStepper';
import FinalCallToAction from '../components/homepage/FinalCallToAction';
import '../styles/homepage-galaxy.css';

const PremiumHomePage = () => {
  return (
    <div className="homepage-unified-surface overflow-hidden" role="document" aria-label="SoleScope Studio & Design Homepage">
      <InteractiveHero />
      <MobileServicesPreview />
      <WhyChooseSoleScope />
      <ServiceSnapshotGrid />
      <ClientResultsShowcase />
      <ProcessStepper />
      <FinalCallToAction />
    </div>
  );
};

export default PremiumHomePage;