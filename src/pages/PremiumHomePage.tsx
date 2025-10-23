import React from 'react';
import InteractiveHero from '../components/homepage/InteractiveHero';
import WhyChooseSoleScope from '../components/homepage/WhyChooseSoleScope';
import ServiceSnapshotGrid from '../components/homepage/ServiceSnapshotGrid';
import ClientResultsCarousel from '../components/homepage/ClientResultsCarousel';
import AutomationInAction from '../components/homepage/AutomationInAction';
import TestimonialsStrip from '../components/homepage/TestimonialsStrip';
import ProcessStepper from '../components/homepage/ProcessStepper';
import FinalCallToAction from '../components/homepage/FinalCallToAction';

const PremiumHomePage = () => {
  return (
    <div className="overflow-hidden" role="document" aria-label="SoleScope Studio & Design Homepage">
      <InteractiveHero />
      <WhyChooseSoleScope />
      <ServiceSnapshotGrid />
      <ClientResultsCarousel />
      <AutomationInAction />
      <TestimonialsStrip />
      <ProcessStepper />
      <FinalCallToAction />
    </div>
  );
};

export default PremiumHomePage;