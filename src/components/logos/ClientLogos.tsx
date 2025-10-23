import React from 'react';

interface LogoProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const PetGroomingLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#EC4899",
  secondaryColor = "#A855F7"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="80" r="35" fill={primaryColor} opacity="0.9"/>
    <circle cx="75" cy="50" r="20" fill={primaryColor} opacity="0.8"/>
    <circle cx="125" cy="50" r="20" fill={primaryColor} opacity="0.8"/>
    <circle cx="60" cy="75" r="18" fill={secondaryColor} opacity="0.7"/>
    <circle cx="140" cy="75" r="18" fill={secondaryColor} opacity="0.7"/>
    <path d="M 85 95 Q 100 105 115 95" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <circle cx="90" cy="80" r="5" fill="white"/>
    <circle cx="110" cy="80" r="5" fill="white"/>
  </svg>
);

export const DogTrainingLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#3B82F6",
  secondaryColor = "#6366F1"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="70" fill={primaryColor} opacity="0.2"/>
    <circle cx="100" cy="100" r="50" fill={primaryColor} opacity="0.4"/>
    <circle cx="100" cy="100" r="30" fill={secondaryColor} opacity="0.8"/>
    <path d="M 100 70 L 90 100 L 110 90 Z" fill="white"/>
    <path d="M 70 100 Q 100 80 130 100" stroke={secondaryColor} strokeWidth="5" strokeLinecap="round" fill="none"/>
  </svg>
);

export const BladeServiceLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#F97316",
  secondaryColor = "#EF4444"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 60 140 L 140 60 L 150 70 L 70 150 Z" fill={primaryColor}/>
    <path d="M 140 60 L 160 40 L 170 50 L 150 70 Z" fill={secondaryColor}/>
    <circle cx="65" cy="145" r="8" fill={secondaryColor}/>
    <path d="M 80 130 L 120 90" stroke="white" strokeWidth="2" opacity="0.6"/>
    <path d="M 90 130 L 130 90" stroke="white" strokeWidth="2" opacity="0.6"/>
    <path d="M 100 130 L 140 90" stroke="white" strokeWidth="2" opacity="0.6"/>
  </svg>
);

export const FitnessLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#10B981",
  secondaryColor = "#14B8A6"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="90" width="30" height="20" rx="4" fill={primaryColor}/>
    <rect x="130" y="90" width="30" height="20" rx="4" fill={primaryColor}/>
    <rect x="70" y="85" width="60" height="30" rx="4" fill={secondaryColor}/>
    <circle cx="50" cy="100" r="15" fill={primaryColor} opacity="0.3"/>
    <circle cx="150" cy="100" r="15" fill={primaryColor} opacity="0.3"/>
    <path d="M 100 70 L 110 80 L 100 90 L 90 80 Z" fill={secondaryColor}/>
  </svg>
);

export const LegalLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#64748B",
  secondaryColor = "#94A3B8"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 100 40 L 140 90 L 60 90 Z" fill={primaryColor}/>
    <rect x="75" y="90" width="50" height="70" fill={secondaryColor}/>
    <rect x="85" y="100" width="30" height="35" fill="white" opacity="0.3"/>
    <rect x="85" y="125" width="30" height="35" fill="white" opacity="0.3"/>
    <circle cx="100" cy="55" r="8" fill="white"/>
  </svg>
);

export const BakeryLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#F59E0B",
  secondaryColor = "#EF4444"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="120" rx="60" ry="40" fill={primaryColor}/>
    <path d="M 70 120 Q 70 80 100 70 Q 130 80 130 120" fill={secondaryColor} opacity="0.8"/>
    <circle cx="80" cy="100" r="8" fill={primaryColor} opacity="0.6"/>
    <circle cx="100" cy="95" r="8" fill={primaryColor} opacity="0.6"/>
    <circle cx="120" cy="100" r="8" fill={primaryColor} opacity="0.6"/>
    <path d="M 60 125 Q 100 135 140 125" stroke={secondaryColor} strokeWidth="3"/>
  </svg>
);

export const CleaningLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#06B6D4",
  secondaryColor = "#3B82F6"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="60" fill={primaryColor} opacity="0.2"/>
    <path d="M 60 100 Q 80 70 100 80 Q 120 70 140 100" fill="none" stroke={secondaryColor} strokeWidth="4"/>
    <circle cx="70" cy="90" r="6" fill={primaryColor}/>
    <circle cx="90" cy="80" r="8" fill={primaryColor}/>
    <circle cx="110" cy="80" r="8" fill={primaryColor}/>
    <circle cx="130" cy="90" r="6" fill={primaryColor}/>
    <path d="M 80 110 Q 100 130 120 110" fill="none" stroke={secondaryColor} strokeWidth="3" opacity="0.6"/>
  </svg>
);

export const ConsultingLogo: React.FC<LogoProps> = ({
  className = "w-full h-full",
  primaryColor = "#1E3A8A",
  secondaryColor = "#D97706"
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 150 L 70 80 L 100 100 L 130 60 L 150 90" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="70" cy="80" r="8" fill={secondaryColor}/>
    <circle cx="100" cy="100" r="8" fill={secondaryColor}/>
    <circle cx="130" cy="60" r="8" fill={secondaryColor}/>
    <circle cx="150" cy="90" r="8" fill={secondaryColor}/>
    <path d="M 100 40 L 110 55 L 125 55 L 113 65 L 118 80 L 100 70 L 82 80 L 87 65 L 75 55 L 90 55 Z" fill={secondaryColor} opacity="0.3"/>
  </svg>
);

export const getLogoForIndustry = (industry: string) => {
  const industryMap: { [key: string]: React.FC<LogoProps> } = {
    'Pet Grooming & Care': PetGroomingLogo,
    'Dog Training Services': DogTrainingLogo,
    'Equipment Services': BladeServiceLogo,
    'Fitness & Wellness': FitnessLogo,
    'Legal Services': LegalLogo,
    'Food & Beverage': BakeryLogo,
    'Cleaning Services': CleaningLogo,
    'Business Consulting': ConsultingLogo,
  };

  return industryMap[industry] || ConsultingLogo;
};
