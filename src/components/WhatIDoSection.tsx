
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface Service {
  icon: string;
  title: string;
  description: string;
}

const servicesData: Service[] = [
  {
    icon: '🎥',
    title: 'Video Editing & Post-Production',
    description: 'Craft compelling narratives through precise editing, effects, and sound mixing, turning raw footage into viral campaigns and cinematic stories for brands like Cadbury and Prime Video.',
  },
  {
    icon: '📹',
    title: 'Cinematography & Camera Operation',
    description: 'Capture stunning visuals with professional shooting techniques, from influencer reels to event coverage, ensuring high-quality footage that elevates storytelling.',
  },
  {
    icon: '🤖',
    title: 'AI Tools & Innovative Design',
    description: 'Leverage AI for smart editing and character generation, combined with graphic design and retouching, to create innovative, trend-setting content that drives engagement.',
  },
];

const WhatIDoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate heading and subtitle when section enters viewport
      gsap.from(headingRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      const leftCards = gsap.utils.toArray('.left-card');
      const rightCards = gsap.utils.toArray('.right-card');
      const cardsContainer = sectionRef.current?.querySelector('.cards-container');

      if (!cardsContainer || leftCards.length === 0 || rightCards.length === 0) return;

      // Set initial states for cards
      gsap.set(leftCards, { position: 'absolute', top: 0, left: 0 });
      gsap.set(rightCards, { yPercent: 0 });
      gsap.set(leftCards.slice(1), { autoAlpha: 0 }); // Hide all but the first left card

      // Master timeline for the scroll-based animations
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Loop through cards to create the stacking and scrolling animations
      leftCards.forEach((card: any, i) => {
        if (i < leftCards.length - 1) {
          // Animate the current left card to stack
          tl.to(card, {
            y: -40,
            scale: 1 - (leftCards.length - 1 - i) * 0.05, // Scale down based on position
            autoAlpha: 1,
            duration: 1,
            ease: 'power2.inOut',
          }, `card-${i}`)
          // Reveal the next left card
          .to(leftCards[i + 1], {
            autoAlpha: 1,
            duration: 0.5,
          }, `card-${i}+=0.5`);

          // Animate the corresponding right card to scroll up
          tl.to(rightCards[i], {
            yPercent: -100, // Move the card up by its full height
            duration: 1.5,
            ease: 'power2.inOut'
          }, `card-${i}`);
        }
      });
      
      // Pin the container and link the timeline to the scroll action
      ScrollTrigger.create({
        trigger: cardsContainer,
        start: 'top top',
        end: `+=${leftCards.length * 150}%`, // Adjust duration based on number of cards
        pin: true,
        scrub: 1,
        animation: tl,
        // markers: true, // Uncomment for debugging
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="what-i-do-section relative min-h-screen bg-background text-foreground py-20 md:py-28 overflow-hidden font-body"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl lg:text-7xl font-bold font-headline text-white mb-6 tracking-tight">
            WHAT I DO
          </h2>
          <p className="text-white/80 text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
            I offer a range of specialized services to bring your vision to life with cinematic quality and creative flair.
          </p>
        </div>

        {/* This container will be pinned */}
        <div className="cards-container relative grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ minHeight: '80vh' }}>

          {/* Left Column for Stacking Cards */}
          <div className="left-column relative h-full flex items-center justify-center">
            {servicesData.map((service, index) => (
              <div
                key={`left-${index}`}
                className="left-card absolute w-full max-w-md p-8 bg-card border border-white/10 rounded-2xl shadow-2xl"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <h3 className="text-2xl font-bold font-headline text-white leading-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="text-white/70 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column for Scrolling Content */}
          <div className="right-column relative h-full overflow-hidden">
             {servicesData.map((service, index) => (
              <div 
                key={`right-${index}`} 
                className="right-card h-full flex flex-col justify-center items-center p-8"
                style={{ willChange: 'transform' }}
              >
                 <div className="w-full max-w-md p-8 bg-black/60 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl transition-all duration-300 group hover:border-primary/40 hover:shadow-[0_0_30px_rgba(213,0,50,0.3)]">
                  <div className="text-5xl mb-6 opacity-90">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold font-headline text-primary mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
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

    