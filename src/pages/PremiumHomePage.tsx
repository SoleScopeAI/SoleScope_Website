import React from 'react';
import InteractiveHero from '../components/homepage/InteractiveHero';
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
      <div className="flex flex-col">
        <div className="order-2 md:order-1">
          <WhyChooseSoleScope />
        </div>
        <div className="order-1 md:order-2">
          <ServiceSnapshotGrid />
        </div>
      </div>
      <ClientResultsShowcase />
      <ProcessStepper />
      <FinalCallToAction />
    </div>
  );
};

export default PremiumHomePage;