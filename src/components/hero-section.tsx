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


const navLinks = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
];

const stats = [
  { id: 'stat-1', value: "15+", label: "Years Experience" },
  { id: 'stat-2', value: "280+", label: "Projects Delivered" },
  { id: 'stat-3', value: "99%", label: "Client Satisfaction" },
]

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-element", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
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
              B/N
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="text-sm font-medium text-stone-300 hover:text-primary transition-colors">
                      {link.label}
                  </Link>
              ))}
            </nav>

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

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Column (Text) */}
        <div className="md:col-span-5 flex flex-col justify-center text-left py-16 md:py-0 hero-element">
          <h1 className="font-headline text-6xl lg:text-8xl font-black text-white leading-none">
            Bharath<br />Naidu,
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-md">
            A creative Video Editor and Graphic Designer with a passion for cinematic storytelling and crafting visually stunning narratives.
          </p>
          <div className="mt-12 flex items-center gap-4">
             <div className="w-0.5 h-12 bg-primary"></div>
             <div>
                <p className="font-headline font-bold text-white tracking-wider">BY HARDWORK & DETERMINATION</p>
                <p className="text-sm text-foreground/60">Currently shaping visuals that inspire.</p>
             </div>
          </div>
        </div>
        
        {/* Center Column (Image) */}
        <div className="md:col-span-4 flex items-center justify-center relative order-first md:order-none">
          <div className="absolute inset-y-0 right-0 w-full bg-primary hero-element" style={{width: '75%'}}></div>
          <div className="relative w-full h-full hero-element">
            <Image 
              src="/assets/profile-hero.jpg" 
              data-ai-hint="man portrait"
              alt="Bharath Naidu" 
              fill 
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Right Column (Stats/Awards) */}
        <div className="md:col-span-3 flex flex-col justify-center items-start md:items-end py-16 md:py-0 text-left md:text-right">
          <div className="space-y-10">
            {stats.map((stat, index) => (
              <div key={stat.id} className="hero-element">
                <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
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
