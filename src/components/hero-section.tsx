"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import {Button} from './ui/button';
import {gsap} from 'gsap';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({defaults: {ease: 'power3.out'}});
    const ctx = gsap.context(() => {
      tl.fromTo('.hero-eyebrow', {y: -20, opacity: 0}, {y: 0, opacity: 1, duration: 0.8}, 0.2);
      tl.fromTo('.hero-heading', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1}, 0.4);
      tl.fromTo('.hero-subheading', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1}, 0.6);
      tl.fromTo('.hero-button', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1}, 0.8);
      tl.fromTo('.hero-image-container', {y: 50, opacity: 0}, {y: 0, opacity: 1, duration: 1.2}, 0.6);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-dvh flex flex-col justify-center overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-secondary/20 rounded-b-[10rem] md:rounded-b-[20rem]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="hero-eyebrow font-semibold text-primary uppercase tracking-widest mb-4">Bharath Naidu</p>
            <h1 className="hero-heading font-headline font-bold text-5xl md:text-7xl text-foreground tracking-tight">
              Creative Video Editor & Designer
            </h1>
            <p className="hero-subheading text-xl text-foreground/70 mt-6 max-w-lg mx-auto md:mx-0">
              I craft compelling visual stories that blend creativity with strategy, helping brands connect with their audience.
            </p>
            <div className="hero-button mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <a href="#work">View My Work</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center items-center h-full">
            <div className="hero-image-container relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] mt-8 md:mt-0">
              <Image
                src="/assets/profile.jpg"
                data-ai-hint="friendly person"
                alt="Bharath Naidu"
                fill
                className="relative z-10 rounded-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
