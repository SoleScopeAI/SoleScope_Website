import React from 'react';

const SkipToContent = () => {
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={skipToMain}
      className="skip-link"
      aria-label="Skip to main content"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          skipToMain();
        }
      }}
    >
      Skip to main content
    </button>
  );
};

export default SkipToContent;