'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Client {
  name: string;
  logo?: string;
  category: string;
}

const clientsData: Client[] = [
  { name: 'Cadbury', category: 'Food & Beverage' },
  { name: 'Coca-Cola', category: 'Food & Beverage' },
  { name: 'Sony Pictures', category: 'Entertainment' },
  { name: 'Prime Video', category: 'Streaming' },
  { name: 'Xiaomi', category: 'Technology' },
  { name: 'Boat', category: 'Electronics' },
  { name: 'Universal Music', category: 'Music' },
  { name: 'Dharma Productions', category: 'Film Production' },
  { name: 'Jio', category: 'Telecommunications' },
  { name: 'Tata Motors', category: 'Automotive' },
  { name: 'Wake Fit', category: 'Lifestyle' },
  { name: 'Comedy Culture', category: 'Digital Content' }
];

const testimonials = [
  {
    quote: "Bharath's editing expertise boosted our campaign engagement by 40%. His cinematic approach perfectly captured our brand essence.",
    author: "Marketing Team",
    company: "Cadbury"
  },
  {
    quote: "Professional, creative, and always delivers on time. The video content quality exceeded our expectations.",
    author: "Content Director",
    company: "Sony Pictures"
  },
  {
    quote: "Working with Bharath transformed our YouTube channel. His AI integration and editing skills are exceptional.",
    author: "Creative Head",
    company: "Comedy Culture"
  }
];

const ClientsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.from('.clients-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate client cards
      gsap.from('.client-card', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.clients-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate testimonials
      gsap.from('.testimonial-card', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-background text-foreground film-grain"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="clients-title text-4xl lg:text-5xl font-black font-headline cinematic-title mb-6">
            TRUSTED BY LEADING BRANDS
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Over 15 years of delivering exceptional video content for top-tier brands across 30+ industries
          </p>
        </div>

        {/* Clients Grid */}
        <div className="clients-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {clientsData.map((client, index) => (
            <div 
              key={index}
              className="client-card p-6 bg-card/80 backdrop-blur-xl border border-border rounded-xl hover:border-primary/40 cinematic-glow cinematic-transition group text-center shadow-sm"
            >
              <div className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary cinematic-transition">
                {client.name}
              </div>
              <div className="text-foreground/50 text-sm">
                {client.category}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-section">
          <h3 className="text-3xl font-black font-headline text-center mb-12 cinematic-accent-primary">
            CLIENT TESTIMONIALS
          </h3>
          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="testimonial-card p-6 bg-card/80 backdrop-blur-xl border border-border rounded-xl hover:border-primary/40 cinematic-glow cinematic-transition shadow-sm"
              >
                <div className="text-primary text-4xl mb-4">"</div>
                <p className="text-foreground/80 text-base leading-relaxed mb-4">
                  {testimonial.quote}
                </p>
                <div className="border-t border-border pt-4">
                  <div className="text-foreground font-semibold">{testimonial.author}</div>
                  <div className="text-primary text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;