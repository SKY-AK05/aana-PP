"use client";

import React, { useState, useLayoutEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { Linkedin, Github, Dribbble } from 'lucide-react';
import { ThemeToggle } from './ui/theme-toggle';


const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const stats = [
  { id: 'stat-1', value: "15+", numericValue: 15, suffix: "+", label: "Years Experience" },
  { id: 'stat-2', value: "280+", numericValue: 280, suffix: "+", label: "Projects Delivered" },
  { id: 'stat-3', value: "99%", numericValue: 99, suffix: "%", label: "Client Satisfaction" },
]

// Animated Counter Component
function AnimatedCounter({ targetValue, suffix, duration = 2 }: { targetValue: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    const element = countRef.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // GSAP counter animation
            gsap.to({ value: 0 }, {
              value: targetValue,
              duration: duration,
              ease: "power2.out",
              onUpdate: function() {
                setCount(Math.round(this.targets()[0].value));
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetValue, duration]);

  return (
    <span ref={countRef} className="text-4xl font-bold text-foreground">
      {count}{suffix}
    </span>
  );
}

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Main hero elements animation
      tl.from(".hero-element", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Stats slide-in animation
      if (statsRef.current) {
        const statElements = statsRef.current.querySelectorAll('.stat-item');
        gsap.set(statElements, { opacity: 0, x: 50 });
        
        gsap.to(statElements, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.5
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="text-2xl font-bold font-headline tracking-tighter text-foreground">
              B/N
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>

            <div className="flex items-center md:hidden">
              <ThemeToggle />
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
                <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors text-center" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Column (Text) */}
        <div className="md:col-span-5 flex flex-col justify-center text-left py-16 md:py-0 hero-element">
          <h1 className="font-headline text-6xl lg:text-8xl font-black text-foreground leading-none">
            Bharath<br />Naidu
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-md">
            A creative Video Editor and Graphic Designer with a passion for cinematic storytelling and crafting visually stunning narratives.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="w-0.5 h-12 bg-primary"></div>
            <div>
              <p className="font-headline font-bold text-foreground tracking-wider">BY HARDWORK & DETERMINATION</p>
              <p className="text-sm text-foreground/60">Currently shaping visuals that inspire.</p>
            </div>
          </div>
        </div>

        {/* Center Column (Image) */}
        <div className="md:col-span-4 flex flex-col justify-end relative order-first md:order-none min-h-screen">
          <div className="absolute inset-y-0 right-0 w-full bg-primary hero-element" style={{ width: '75%' }}></div>
          <div className="relative w-full flex-shrink-0 hero-element mb-[-100px]" style={{ height: '650px', marginLeft: '13%' }}>
            <Image
              src="/assets/myheroimage.png"
              data-ai-hint="man illustration"
              alt="Bharath Naidu"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Right Column (Stats/Awards) */}
        <div className="md:col-span-3 flex flex-col justify-center items-start md:items-end py-16 md:py-0 text-left md:text-right">
          <div ref={statsRef} className="space-y-10">
            {stats.map((stat, index) => (
              <div key={stat.id} className="stat-item">
                <AnimatedCounter 
                  targetValue={stat.numericValue} 
                  suffix={stat.suffix}
                  duration={2 + (index * 0.2)} // Slightly different durations for variety
                />
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2 mt-16 hero-element">
            <Button asChild variant="ghost" size="icon">
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                <Dribbble className="h-5 w-5 text-foreground/80 hover:text-primary" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
                <Github className="h-5 w-5 text-foreground/80 hover:text-primary" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-foreground/80 hover:text-primary" />
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
