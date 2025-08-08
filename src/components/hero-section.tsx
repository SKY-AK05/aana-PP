"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const ctx = gsap.context(() => {
            tl.fromTo(".hero-eyebrow", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2);
            tl.fromTo(".hero-heading", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.4);
            tl.fromTo(".hero-subheading", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.6);
            tl.fromTo(".hero-button", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.8);
            tl.fromTo(".hero-image", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, 0.6);
        }, containerRef);
        return () => ctx.revert();
    }, []);


  return (
    <section id="hero" ref={containerRef} className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative text-center md:text-left">
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
          <div className="relative flex justify-center hero-image">
             <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                 <Image
                    src="https://placehold.co/600x600.png"
                    data-ai-hint="friendly person"
                    alt="Bharath Naidu"
                    width={400}
                    height={400}
                    className="relative z-10 rounded-full object-cover border-4 border-background"
                    priority
                />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <a href="#about" aria-label="Scroll to next section">
            <ArrowDown className="w-8 h-8 text-foreground/50 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
