"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
             <div className="absolute top-0 -left-4 w-20 h-20">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M 20,50 C 20,20 80,20 80,50" stroke="#4a4a4a" fill="transparent" strokeWidth="2"/>
                    <path d="M 20,50 C 20,80 80,80 80,50" stroke="#4a4a4a" fill="transparent" strokeWidth="2"/>
                </svg>
             </div>
            <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-foreground tracking-tighter">
              <span className="relative inline-block">
                <span className="absolute -top-12 -left-8 text-primary/70 text-6xl font-medium font-serif italic">Hey</span>
                
              </span>
              <br/>
              There,
              <br />
              I'm Bharath
            </h1>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 bg-teal-100/50 rounded-full blur-2xl"></div>
              <Image
                src="https://placehold.co/600x600.png"
                data-ai-hint="friendly person"
                alt="Bharath Naidu"
                width={400}
                height={400}
                className="relative z-10 rounded-full object-cover"
                priority
              />
              <div className="absolute top-10 right-0 z-20 bg-white p-3 rounded-full shadow-md">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">HI!</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8 md:-mt-16">
            <div className="bg-amber-100/80 p-6 rounded-lg max-w-sm shadow-sm">
                <p className="text-foreground/80 text-lg">
                    Developer and systems thinker building AI tools, simplifying workflows, mentoring minds, and solving real-world problems with clarity, logic, and purpose.
                </p>
            </div>
        </div>
      </div>
       <Button variant="default" size="icon" className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg">
          <MessageSquare size={32} />
       </Button>
    </section>
  );
}
