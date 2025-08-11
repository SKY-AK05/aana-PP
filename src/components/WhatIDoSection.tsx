'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

const serviceData: ServiceCard[] = [
  {
    icon: "🎥",
    title: "Video Editing & Post-Production",
    description: "Craft compelling narratives through precise editing, effects, and sound mixing, turning raw footage into viral campaigns and cinematic stories for brands like Cadbury and Prime Video."
  },
  {
    icon: "📹",
    title: "Cinematography & Camera Operation",
    description: "Capture stunning visuals with professional shooting techniques, from influencer reels to event coverage, ensuring high-quality footage that elevates storytelling."
  },
  {
    icon: "🤖",
    title: "AI Tools & Innovative Design",
    description: "Leverage AI for smart editing and character generation, combined with graphic design and retouching, to create innovative, trend-setting content that drives engagement."
  }
];

const WhatIDoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Set initial state for all elements
      gsap.set('.service-card', {
        xPercent: 100,
        opacity: 0,
        rotation: 5,
        filter: 'brightness(0.5)',
      });



      // Animate heading and subtitle when section enters viewport
      gsap.from(headingRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      });

      // Create a pinned scroll experience with sequential card reveals
      const cards = gsap.utils.toArray('.service-card');

      // Create master timeline for all card animations
      const masterTl = gsap.timeline();

      // Add each card animation to the master timeline
      cards.forEach((card: any, i: number) => {
        const cardTl = gsap.timeline();

        // Multi-phase animation for each card
        cardTl.to(card, {
          xPercent: 70,
          opacity: 0.6,
          filter: 'brightness(0.7)',
          duration: 0.3,
          ease: 'power2.out'
        })
          .to(card, {
            xPercent: 30,
            opacity: 1,
            filter: 'brightness(1)',
            boxShadow: '0 0 20px rgba(229, 9, 20, 0.3)',
            duration: 0.4,
            ease: 'power2.out'
          })
          .to(card, {
            xPercent: 0,
            rotation: 0,
            boxShadow: '0 0 30px rgba(229, 9, 20, 0.5)',
            duration: 0.3,
            ease: 'power2.out'
          });

        // Add each card timeline to master with stagger
        masterTl.add(cardTl, i * 1); // 1 second between each card start
      });

      // Pin the section and scrub through the master timeline
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 1.5}`, // Pin for 1.5 viewport heights
        pin: true,
        scrub: 1,
        animation: masterTl,
        // markers: true, // Uncomment for debugging
      });



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="what-i-do-section relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          #e50914 0%, 
          #ff6b6b 15%, 
          #ffa8a8 30%, 
          #ffcccc 45%, 
          #000000 60%, 
          #000000 100%)`
      }}
    >
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            What I Do
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
            I offer a range of specialized services to bring your vision to life with cinematic quality and creative flair.
            Each service is tailored to meet the unique demands of your project.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Desktop Layout - Overlapping cards */}
          <div className="hidden lg:block relative h-[600px] max-w-7xl mx-auto">
            {serviceData.map((service, index) => (
              <div
                key={index}
                className={`service-card absolute w-80 xl:w-96 h-72 xl:h-80 ${index === 0 ? 'top-18 left-16 rotate-1' :
                  index === 1 ? 'top-18 right-1/3 transform -translate-x-1/2 -rotate-3' :
                    'top-18 right-14 rotate-2'
                  }`}
                style={{
                  willChange: 'transform',
                  zIndex: serviceData.length - index
                }}
              >
                <div className="h-full bg-black/60 backdrop-blur-xl border border-white/30 rounded-2xl p-6 xl:p-8 shadow-2xl transition-all duration-300 group">
                  {/* Icon */}
                  <div className="text-3xl xl:text-4xl mb-4 xl:mb-6 opacity-90">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl xl:text-2xl font-bold text-white mb-3 xl:mb-4 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-xs xl:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout - Stacked cards */}
          <div className="lg:hidden space-y-16">
            {serviceData.map((service, index) => (
              <div
                key={`mobile-${index}`}
                className="service-card"
                style={{ willChange: 'transform' }}
              >
                <div className="bg-black/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-2xl">
                  {/* Icon */}
                  <div className="text-3xl mb-4 opacity-90">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default WhatIDoSection;