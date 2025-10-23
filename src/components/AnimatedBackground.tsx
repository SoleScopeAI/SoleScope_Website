import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'hero' | 'section';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'default', 
  className = '' 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary animated haze background */}
      <div className="animated-haze-bg opacity-60" />
      
      {/* Floating particles for hero sections */}
      {variant === 'hero' && (
        <>
          <div className="floating-particles" />
          <div className="pulse-glow pulse-glow-1" />
          <div className="pulse-glow pulse-glow-2" />
        </>
      )}
      
      {/* Gradient overlay for sections */}
      {variant === 'section' && (
        <div className="gradient-overlay opacity-40" />
      )}
      
      {/* Subtle gradient overlay for default */}
      {variant === 'default' && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-rich-black-1/20" />
      )}
    </div>
  );
};

export default AnimatedBackground;