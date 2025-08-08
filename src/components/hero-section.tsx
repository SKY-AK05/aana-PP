"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(backgroundRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      })
      .from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
      }, "-=0.8")
      .from(subheadlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(buttonRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .fromTo(scrollIndicatorRef.current, {
        y: -20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative h-dvh w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Abstract background"
          data-ai-hint="abstract technology"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 ref={headlineRef} className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase">
          Bharath Naidu
        </h1>
        <p ref={subheadlineRef} className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-300">
          Creative Developer & Designer building immersive digital experiences.
        </p>
        <div ref={buttonRef} className="mt-8">
          <Button asChild size="lg" className="font-bold text-lg px-8 py-6 rounded-full">
            <Link href="#work">View My Work</Link>
          </Button>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ArrowDown className="h-8 w-8 text-white" />
      </div>
    </section>
  );
}
