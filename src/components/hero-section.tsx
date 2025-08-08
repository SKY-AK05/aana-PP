"use client";

import React, { useState, useLayoutEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Button } from './ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
];

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".left-content > *", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.3
      });

      gsap.from(".right-content > *", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.5
      });
      
      gsap.from(".hero-image", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.1
      });

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: self => {
          gsap.to([".left-content", ".right-content"], { opacity: 1 - self.progress * 2, y: -self.progress * 50 });
          gsap.to(".hero-image", { scale: 1 - self.progress * 0.1 });
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="text-2xl font-bold font-headline tracking-tighter text-white">
              BHARATH
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center space-x-8">
                  {navLinks.map(link => (
                      <Link key={link.href} href={link.href} className="text-sm font-medium text-stone-300 hover:text-primary transition-colors">
                          {link.label}
                      </Link>
                  ))}
              </nav>
            </div>

            <div className="flex items-center md:hidden">
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-background z-40">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <nav className="flex flex-col space-y-4">
                      {navLinks.map(link => (
                          <Link key={link.href} href={link.href} className="text-lg font-medium text-stone-300 hover:text-primary transition-colors text-center" onClick={() => setIsMenuOpen(false)}>
                              {link.label}
                          </Link>
                      ))}
                  </nav>
              </div>
          </div>
      )}

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 items-center container mx-auto px-4 sm:px-6 lg:px-8 pt-0">
        {/* Left Content */}
        <div className="left-content text-left space-y-4 order-2 md:order-1 pt-24 md:pt-0">
            <h1 className="text-4xl lg:text-5xl font-bold font-headline">Hi, I'm <br/><span className="text-primary">Bharath Naidu</span></h1>
            <p className="text-lg text-foreground/80">Video Editor | Cinematographer | Storyteller</p>
            <p className="text-md text-foreground/60 italic">“Blending cinematic storytelling with viral digital trends.”</p>
        </div>

        {/* Center Image */}
        <div className="hero-image flex-1 flex items-start justify-center order-1 md:order-2 w-full h-full">
          <div className="relative w-[320px] h-[420px] lg:w-[400px] lg:h-[500px] mx-auto mt-24 md:mt-0">
              <div className="relative h-full w-full rounded-bl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl">
                  <Image src="/assets/profile-hero.jpg" data-ai-hint="man portrait" alt="Bharath Naidu" fill className="object-cover" />
              </div>
          </div>
        </div>
        
        {/* Right Content */}
        <div className="right-content text-left md:text-right space-y-8 order-3 md:order-3 pt-24 md:pt-0">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
              <div>
                <p className="text-4xl font-bold font-headline text-primary">15+</p>
                <p className="text-foreground/70">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-headline text-primary">280+</p>
                <p className="text-foreground/70">Projects Delivered</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-headline text-primary">*99%</p>
                <p className="text-foreground/70">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-headline text-primary">50</p>
                <p className="text-foreground/70">Clients worldwide</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
