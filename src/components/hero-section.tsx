"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight, Menu, X, Phone } from 'lucide-react';

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
];


export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground flex flex-col">
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
               <div className="flex items-center gap-2 text-sm font-medium text-stone-300">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 123 456 7890</span>
              </div>
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
                      <div className="flex items-center justify-center gap-2 text-lg font-medium text-stone-300 pt-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>+91 123 456 7890</span>
                      </div>
                  </nav>
              </div>
          </div>
      )}

      {/* Main Content */}
       <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="flex items-center justify-center p-8 md:p-12">
            <div className="max-w-md text-center md:text-left">
                <p className="text-lg text-primary mb-2 font-medium">Hey. I'm Bharath,</p>
                <h1 className="text-5xl lg:text-7xl font-bold font-headline uppercase leading-none">
                A Video
                <br />
                & Motion
                <br />
                <span className="text-foreground/80">Designer</span>
                </h1>
                <p className="mt-6 text-foreground/70 font-body">
                Transforming ideas into stunning visuals – Video editing and motion graphics
                that captivates, engages, and delivers results.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" className="h-14 text-lg font-bold rounded-full">
                        <Link href="#contact">Contact Me <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </div>
            </div>
        </div>

        {/* Right Panel */}
        <div className="relative flex items-center justify-center bg-secondary/20 p-0 md:p-0 overflow-hidden">
             {/* Image */}
             <div className="absolute top-0 right-[7.5%] h-[90%] w-[85%]">
                <div className="relative h-full w-full rounded-br-[80px] overflow-hidden">
                    <div className="absolute inset-0 bg-background opacity-50 z-10"></div>
                     <Image src="/assets/profile-hero.jpg" data-ai-hint="man portrait" alt="Bharath Naidu" fill className="object-cover" />
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
