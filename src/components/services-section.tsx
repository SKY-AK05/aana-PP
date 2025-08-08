"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { Video, Scissors, Layers, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Video className="w-10 h-10 text-primary" />,
    title: 'Video Editing',
    description: 'From raw footage to a polished final product, I handle cutting, sequencing, and sound mixing to tell a compelling story.',
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: 'Motion Graphics',
    description: 'Bringing static designs to life with animation, creating engaging intros, lower thirds, and visual effects.',
  },
  {
    icon: <Layers className="w-10 h-10 text-primary" />,
    title: 'Graphic Design',
    description: 'Creating stunning visuals for thumbnails, social media, and branding that capture attention and communicate clearly.',
  },
  {
    icon: <Scissors className="w-10 h-10 text-primary" />,
    title: 'Color Correction & Grading',
    description: 'Enhancing footage to create a specific mood or style, ensuring a professional and consistent look.',
  },
];

export function ServicesSection() {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
        gsap.from(".service-card", {
            scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
        });
        }, containerRef);
        return () => ctx.revert();
    }, []);

  return (
    <section id="services" ref={containerRef} className="py-20 md:py-28 bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">What I Do</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            I offer a range of services to bring your vision to life.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 services-grid">
          {services.map((service, index) => (
            <Card key={index} className="service-card bg-background text-center p-6 rounded-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2">
                <CardHeader className="items-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        {service.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/70">{service.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
