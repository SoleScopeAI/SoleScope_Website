import React from 'react';
import PremiumHeroSection from '../components/PremiumHeroSection';
import ValueProposition from '../components/ValueProposition';
import ServicesPreview from '../components/ServicesPreview';
import PremiumTestimonials from '../components/PremiumTestimonials';
import FinalCTA from '../components/FinalCTA';

const PremiumHomePage = () => {
  return (
    <div className="overflow-hidden" role="document" aria-label="SoleScope Studio & Design Homepage">
      <PremiumHeroSection />
      <ValueProposition />
      <ServicesPreview />
      <PremiumTestimonials />
      <FinalCTA />
    </div>
  );
};

export default PremiumHomePage;