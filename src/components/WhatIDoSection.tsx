
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Clapperboard, MonitorPlay, Users, Wand2, Music } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats?: string;
}

const servicesData: Service[] = [
  {
    icon: <Clapperboard className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />,
    title: 'Video Editing & Post-Production',
    description: 'Crafting compelling narratives through precise editing, effects, and sound mixing for brands like Cadbury and Prime Video, driving 1M+ views and viral campaigns.',
    stats: '1M+ Views Generated'
  },
  {
    icon: <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />,
    title: 'Cinematography & Camera Operation',
    description: 'Capturing stunning visuals with professional shooting techniques for Comedy Culture and Xiaomi, from influencer reels to event coverage, elevating storytelling.',
    stats: '200+ Projects Shot'
  },
  {
    icon: <Wand2 className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />,
    title: 'AI Tools & Innovative Design',
    description: 'Leveraging AI for smart editing and character generation for Jio-Hotstar IP, creating trend-setting content with graphic design and retouching.',
    stats: 'AI-Powered Innovation'
  },
  {
    icon: <MonitorPlay className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />,
    title: 'Photography & Visual Design',
    description: 'Delivering captivating photography and visual design for Travenix & Vijayeesam, enhancing brand visuals with creative composition and post-processing.',
    stats: '15+ Years Experience'
  },
  {
    icon: <Music className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />,
    title: 'Sound Mixing & Audio Mastering',
    description: 'Enhancing videos with seamless audio for Wake Fit and Dharma Productions, providing professional sound mixing, mastering, and audio post-production.',
    stats: 'Professional Audio'
  },
  {
    icon: <Users className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />,
    title: 'Team Leadership & Project Management',
    description: 'Leading creative teams of 8+ editors at Sociohub Media, delivering high-impact campaigns for Coca-Cola and Tata EV with 100% client satisfaction.',
    stats: '100% Client Satisfaction'
  },
];

const WhatIDoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Simple entrance animation for heading
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Ensure cards are visible and animate them in
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="what-i-do-section relative bg-background text-foreground py-20 md:py-28 film-grain"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-8 md:mb-12">
          <h2 className="text-5xl lg:text-7xl font-black font-headline cinematic-title mb-6 tracking-tight">
            WHAT I DO
          </h2>
          <p className="text-foreground/70 text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
            I offer a range of specialized services to bring your vision to life with cinematic quality and creative flair.
          </p>
        </div>

        {/* Services Grid - Clean 3x2 Layout */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="service-card group p-6 lg:p-8 bg-card/80 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/40 cinematic-glow hover:shadow-[0_0_30px_rgba(213,0,50,0.2)] cinematic-transition transform hover:scale-[1.02] min-h-[320px] flex flex-col opacity-100 shadow-sm"
            >
              {/* Icon */}
              <div className="mb-4 lg:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg lg:text-xl font-bold font-headline text-foreground mb-3 lg:mb-4 leading-tight group-hover:text-primary cinematic-transition">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-foreground/70 text-sm lg:text-base leading-relaxed mb-4 flex-grow">
                {service.description}
              </p>
              
              {/* Stats Badge */}
              {service.stats && (
                <div className="mt-auto inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20 w-fit">
                  {service.stats}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
