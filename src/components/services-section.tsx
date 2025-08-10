"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { Video, Scissors, Layers, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Video className="w-10 h-10 text-primary" />,
    title: 'Video Editing',
    description: 'Crafting compelling stories from raw footage through precise cutting, sequencing, and sound mixing.',
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: 'Motion Graphics',
    description: 'Bringing static visuals to life with dynamic intros, lower thirds, and engaging animations.',
  },
  {
    icon: <Layers className="w-10 h-10 text-primary" />,
    title: 'Graphic Design',
    description: 'Creating stunning visuals for thumbnails, branding, and social media that capture attention.',
  },
  {
    icon: <Scissors className="w-10 h-10 text-primary" />,
    title: 'Color Grading',
    description: 'Enhancing footage with professional color correction to create a consistent, cinematic look.',
  },
];

export function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the section title and description
            gsap.from([titleRef.current, descriptionRef.current], {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });

            // Animate the service cards in a staggered grid
            const cards = gridRef.current?.children;
            if (cards) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                });
            }

            // Add hover effect to cards
            Array.from(cards || []).forEach(card => {
                const cardEl = card as HTMLElement;
                cardEl.addEventListener('mouseenter', () => {
                    gsap.to(cardEl, { y: -8, scale: 1.03, duration: 0.3, ease: 'power2.out' });
                });
                cardEl.addEventListener('mouseleave', () => {
                    gsap.to(cardEl, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-black border-t border-border overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 ref={titleRef} className="font-headline text-5xl md:text-6xl font-bold cinematic-title mb-6">What I Do</h2>
                <p ref={descriptionRef} className="mt-4 text-lg text-foreground/70 leading-relaxed">
                    I offer a range of specialized services to bring your vision to life with cinematic quality and creative flair. Each service is tailored to meet the unique demands of your project.
                </p>
            </div>

            <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <div 
                        key={service.title}
                        className="service-card bg-secondary/20 p-8 rounded-2xl border border-white/10 text-center flex flex-col items-center cinematic-transition cinematic-glow will-change-transform"
                        style={{
                            background: 'linear-gradient(145deg, hsl(var(--card)), #080808)'
                        }}
                    >
                        <div className="mb-6 bg-primary/10 p-4 rounded-full border border-primary/30">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold font-headline text-white mb-4">{service.title}</h3>
                        <p className="text-foreground/80 leading-relaxed text-base">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}