"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight, Menu, X } from 'lucide-react';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Clients worldwide' },
];

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
];


export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="text-2xl font-bold font-headline tracking-tighter text-white">
              BHARATH
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-sm font-medium text-stone-300 hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center">
              <Button asChild className="hidden md:inline-flex">
                  <Link href="#contact">Contact Me</Link>
              </Button>
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                      <Button asChild>
                          <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Me</Link>
                      </Button>
                  </nav>
              </div>
          </div>
      )}


      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen pt-24 pb-12">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Panel */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <p className="text-lg text-primary mb-2 font-medium">Hey. I'm Bharath,</p>
            <h1 className="text-5xl lg:text-7xl font-bold font-headline uppercase leading-none">
              A Video
              <br />
              & Motion
              <br />
              <span className="text-[#B5AB9D]">Designer</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto md:mx-0 text-stone-300 font-body">
              Transforming ideas into stunning visuals – Video editing and motion graphics
              that captivates, engages, and delivers results.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
                <Button asChild size="lg" className="h-14 text-lg font-bold">
                    <Link href="#contact">Contact Me <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden md:flex flex-col items-center justify-center space-y-8">
              <div className="relative w-full max-w-sm aspect-square rounded-full overflow-hidden border-8 border-primary/20 shadow-2xl">
                  <Image src="/assets/profile-hero.jpg" data-ai-hint="man portrait" alt="Bharath Naidu" fill className="object-cover" />
              </div>

              <div className="grid grid-cols-2 gap-8 text-center w-full max-w-md">
                  {stats.map((stat) => (
                      <div key={stat.label}>
                          <p className="text-4xl font-bold text-stone-100 font-headline">{stat.value}</p>
                          <p className="text-stone-400">{stat.label}</p>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
