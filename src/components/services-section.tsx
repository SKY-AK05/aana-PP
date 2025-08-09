"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { Video, Scissors, Layers, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { Card } from './ui/card';

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
    const containerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLDivElement>(".service-card-3d");
            if (cards.length === 0) return;

            // Set initial positions
            gsap.set(cards, {
                x: (i) => (i - (cards.length - 1) / 2) * 200,
                rotationY: (i) => (i - (cards.length - 1) / 2) * -15,
                transformOrigin: "center center -200px"
            });

            cards.forEach((card, i) => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(cards, {
                        x: (j) => {
                            if (i === j) return (j - (cards.length - 1) / 2) * 120;
                            return (j - (cards.length - 1) / 2) * 250 + (j < i ? -100 : 100);
                        },
                        rotationY: (j) => {
                             if (i === j) return 0;
                             return (j - (cards.length - 1) / 2) * -20;
                        },
                        z: (j) => i === j ? 100 : 0,
                        overwrite: "auto",
                        ease: "power2.out",
                        duration: 0.5
                    });
                });
            });

            gridRef.current?.addEventListener('mouseleave', () => {
                gsap.to(cards, {
                     x: (i) => (i - (cards.length - 1) / 2) * 200,
                     rotationY: (i) => (i - (cards.length - 1) / 2) * -15,
                     z: 0,
                     ease: "power2.out",
                     duration: 0.7
                });
            });

             // Entrance animation
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 100,
                z: -300,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
            });


        }, containerRef);
        return () => ctx.revert();
    }, []);

  return (
    <section id="services" ref={containerRef} className="py-24 md:py-32 bg-black border-t border-border overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
                <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary">What I Do</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
                    I offer a range of services to bring your vision to life.
                </p>
            </div>
            
            <div 
                ref={gridRef} 
                className="services-3d-container flex items-center justify-center h-[500px] w-full"
            >
                <div className="services-grid-background"></div>
                {services.map((service, index) => (
                    <Card 
                        key={index} 
                        className="service-card-3d absolute w-[320px] h-[420px] p-8 flex flex-col items-center justify-center text-center rounded-2xl cursor-pointer"
                    >
                        <div className="mb-6 bg-black/50 p-4 rounded-full border border-primary/50">
                            {service.icon}
                        </div>
                        <h3 className="text-3xl font-bold font-headline text-white mb-4">{service.title}</h3>
                        <p className="text-foreground/70 leading-relaxed">{service.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}
