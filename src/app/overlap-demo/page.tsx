'use client';

import React from 'react';
import WhatIDoSection from '@/components/WhatIDoSection';
import { ContactSection } from '@/components/contact-section';

export default function OverlapDemo() {
  return (
    <main className="min-h-screen">
      {/* Add some initial content to allow scrolling */}
      <section className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Scroll Down</h1>
          <p className="text-xl">to see the overlap scroll effect</p>
        </div>
      </section>
      
      {/* What I Do Section - This will be pinned during overlap */}
      <WhatIDoSection />
      
      {/* Contact Section - This will slide up over the previous section */}
      <ContactSection />
      
      {/* Add some content after to show the effect completes */}
      <section className="h-screen bg-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Effect Complete</h2>
          <p className="text-lg">The overlap scroll transition is now finished</p>
        </div>
      </section>
    </main>
  );
}