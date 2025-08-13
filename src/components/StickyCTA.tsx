'use client';

import React, { useState, useEffect } from 'react';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // Smooth scroll to contact section or navigate to contact page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no contact section on current page, navigate to contact
      window.location.href = '/contact';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 px-6 py-3 bg-[#e50914] hover:bg-[#c50812] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-16 opacity-0 scale-95 pointer-events-none'
      } hover:scale-105 group`}
      aria-label="Hire Me"
    >
      <div className="flex items-center space-x-2">
        <span>Hire Me</span>
        <svg 
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-[#e50914] animate-ping opacity-20"></div>
    </button>
  );
};

export default StickyCTA;