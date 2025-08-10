"use client";

import React, { useState, useLayoutEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Button } from './ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
];

const stats = [
  { id: 'stat-1', value: "15+", label: "Years Experience" },
  { id: 'stat-2', value: "280+", label: "Projects Delivered" },
  { id: 'stat-3', value: "99%", label: "Client Satisfaction" },
  { id: 'stat-4', value: "50+", label: "Clients Worldwide" },
]

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Helper function to get element positions ---
      const getTargetPosition = (targetId: string, letterElement: HTMLElement) => {
        const target = document.getElementById(targetId);
        if (!target || !letterElement.parentElement) return { x: 0, y: 0 };
        const targetRect = target.getBoundingClientRect();
        const parentRect = letterElement.parentElement.getBoundingClientRect();
        
        // Find a specific letter if possible, otherwise center of element
        const targetLetter = Array.from(target.textContent || '').find(c => c.toUpperCase() === letterElement.textContent);
        let charX = targetRect.left + (targetRect.width / 2);

        if(targetLetter) {
            // A bit of a hack to estimate letter position
            const text = target.textContent || '';
            const index = text.toUpperCase().indexOf(targetLetter);
            if(index !== -1){
                charX = targetRect.left + (targetRect.width * (index / text.length));
            }
        }
        
        return {
          x: charX - parentRect.left - (letterElement.offsetWidth / 2),
          y: targetRect.top - parentRect.top + (targetRect.height / 2) - (letterElement.offsetHeight / 2),
        };
      };

      // --- Animation Timeline ---
      const tl = gsap.timeline({
        onComplete: () => setIsIntroDone(true)
      });
      
      const letters = gsap.utils.toArray<HTMLElement>('.intro-letter');

      if (letters.length === 0) return;

      const targets = [
        'target-B', 'target-H', 'target-A1', 'target-R',
        'target-A2', 'target-T', 'target-H2'
      ];

      // Step 1: Intro Fade In
      tl.from(letters, {
        opacity: 0,
        scale: 1.2,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.05,
      });

      // Step 2 & 3: Letter Break Apart & Land
      tl.to(letters, {
        x: (i) => getTargetPosition(targets[i], letters[i]).x,
        y: (i) => getTargetPosition(targets[i], letters[i]).y,
        scale: 0.2,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.inOut',
        stagger: 0.05,
        delay: 0.5
      }, );
      
      // Step 4: Reveal Hero Section
      tl.to('.hero-content', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6');
      
      tl.from(".hero-content > *", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, "-=0.5");
      
      tl.from(".stat-item", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, "<");


    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      
      {/* Intro Animation Layer */}
      {!isIntroDone && (
        <div className="intro-container">
          <div className="intro-text">
            {'BHARATH'.split('').map((letter, i) => (
              <span key={i} className="intro-letter">{letter}</span>
            ))}
          </div>
        </div>
      )}

      {/* Main Hero Content */}
      <div className={cn("hero-content w-full h-full flex flex-col", { 'opacity-0': !isIntroDone })}>
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              <Link href="/" className="text-2xl font-bold font-headline tracking-tighter text-white">
                BHARATH
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {navLinks.map(link => (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href} className="text-sm font-medium text-stone-300 hover:text-primary transition-colors">
                            {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
              <h1 className="text-4xl lg:text-5xl font-bold font-headline">
                Hi, I'm <br/>
                <span className="text-primary" id="target-B">B</span>harath N<span id="target-A1">a</span>idu
              </h1>
              <p className="text-lg text-foreground/80" id="target-R">Video Edito<span className='opacity-0'>r</span> | Cinematographer | <span id="target-A2">S</span>toryteller</p>
              <p className="text-md text-foreground/60 italic">“Blending cinematic storytelling with viral digital trends.”</p>
          </div>

          {/* Center Image */}
          <div className="hero-image flex-1 flex items-start justify-center order-1 md:order-2 w-full h-full">
            <div className="relative w-[320px] h-[420px] lg:w-[400px] lg:h-[500px] mx-auto mt-24 md:mt-0" style={{ transform: 'translateX(20px)' }}>
                <div className="relative h-full w-full rounded-bl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl">
                    <Image src="/assets/profile-hero.jpg" data-ai-hint="man portrait" alt="Bharath Naidu" fill className="object-cover" />
                </div>
            </div>
          </div>
          
          {/* Right Content */}
          <div className="right-content text-left md:text-left space-y-6 order-3 md:order-3 pt-24 md:pt-0 md:pl-8">
              <h2 className="text-4xl lg:text-5xl font-bold font-headline">
                A VIDEO<br/>&amp; GRAP<span id="target-H">H</span>IC<br/><span className="text-primary">DESIGNER</span>
              </h2>
              <p className="text-md text-foreground/70">
                Transforming ideas into stunning visuals – Video editing and graphic design that captivates, engages, and delivers results.
              </p>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="stats-container container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                  <div key={stat.id} className="stat-item">
                      <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                      <p className="text-sm text-foreground/60 uppercase tracking-wider" id={stat.id === 'stat-2' ? 'target-T' : (stat.id === 'stat-3' ? 'target-H2' : undefined)}>
                        {stat.label}
                      </p>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
