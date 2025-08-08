"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'Video Editing (Premiere Pro, Final Cut)', level: 95 },
  { name: 'Motion Graphics (After Effects)', level: 90 },
  { name: 'Graphic Design (Photoshop, Illustrator)', level: 85 },
  { name: 'Color Correction & Grading', level: 80 },
  { name: 'Storytelling & Narrative', level: 90 },
];

const testimonials = [
  { quote: "Bharath's editing transformed our footage into a compelling story. A true artist.", name: "Jane Doe, CEO of TechCorp" },
  { quote: "The motion graphics were stunning and perfectly matched our brand's energy.", name: "John Smith, Project Manager" },
  { quote: "An absolute pleasure to work with. Professional, creative, and delivered beyond expectations.", name: "Emily White, Marketing Director" },
];

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
      
      gsap.from(".skill-bar-fill", {
        scrollTrigger: { trigger: ".skills-container", start: "top 80%", toggleActions: "play none none none" },
        width: "0%",
        stagger: 0.1,
        duration: 1.5,
        ease: 'power3.inOut',
      });

      gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: ".testimonials-container", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
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

        <div className="skills-container">
          <h3 className="text-3xl font-headline font-bold text-center mb-12">My Skills</h3>
          <div className="max-w-4xl mx-auto space-y-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <p className="text-lg font-medium mb-2">{skill.name}</p>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className="skill-bar-fill bg-primary h-4 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-container">
          <h3 className="text-3xl font-headline font-bold text-center mb-12">What Clients Say</h3>
          <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-secondary border-0 testimonial-card">
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <p className="text-xl italic text-foreground mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                        <cite className="font-semibold text-primary not-italic">{testimonial.name}</cite>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
