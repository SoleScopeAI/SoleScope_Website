import React, { useState } from 'react';
import '../styles/voice-agent-flagship.css';
import FlagshipHero from '../components/voice-agent/FlagshipHero';
import ProductClarity from '../components/voice-agent/ProductClarity';
import DifferentiationGrid from '../components/voice-agent/DifferentiationGrid';
import HowItWorksFlow from '../components/voice-agent/HowItWorksFlow';
import UseCaseCards from '../components/voice-agent/UseCaseCards';
import EcosystemIntegration from '../components/voice-agent/EcosystemIntegration';
import PricingPositioning from '../components/voice-agent/PricingPositioning';
import ClosingCTA from '../components/voice-agent/ClosingCTA';
import DemoBookingModal from '../components/voice-agent/DemoBookingModal';

const AIVoiceAgentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookDemo = () => {
    setIsModalOpen(true);
  };

  const handleSeeDemo = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <FlagshipHero onBookDemo={handleBookDemo} onSeeDemo={handleSeeDemo} />

      <ProductClarity />

      <DifferentiationGrid />

      <HowItWorksFlow />

      <UseCaseCards />

      <EcosystemIntegration />

      <PricingPositioning onBookDemo={handleBookDemo} />

      <ClosingCTA onBookDemo={handleBookDemo} />

      <DemoBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default AIVoiceAgentPage;
