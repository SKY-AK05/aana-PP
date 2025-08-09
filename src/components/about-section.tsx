"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: { trigger: ".about-content", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 items-center about-content">
          <div className="md:col-span-2">
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-2xl">
              <Image src="https://placehold.co/600x600.png" data-ai-hint="friendly person" alt="Bharath Naidu" fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-3">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">About Me</h2>
            <p className="text-lg text-foreground/80 mb-6">
              I'm a passionate Video Editor and Graphic Designer with a keen eye for storytelling. My experience is rooted in transforming raw ideas and footage into polished, impactful visual narratives that resonate with audiences.
            </p>
            <p className="text-lg text-foreground/80 mb-8">
              From fast-paced promotional videos to detailed graphic layouts, I bring a commitment to quality, creativity, and technical excellence. Let's create something memorable together.
            </p>
            <div className="flex space-x-4">
              <Button asChild variant="outline">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-5 w-5" /> LinkedIn</a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-5 w-5" /> Portfolio</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
