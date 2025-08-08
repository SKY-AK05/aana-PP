"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Header } from './header';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Clients worldwide' },
];

export function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-[#EBEAE6]">
      <Header />
      <div className="flex h-full">
        {/* Left Panel */}
        <div className="w-full md:w-2/5 bg-[#1C1C1C] text-white flex flex-col justify-center p-8 md:p-16">
          <div className="max-w-md">
            <p className="text-lg text-stone-400 mb-2">Hey. I'm Bharath,</p>
            <h1 className="text-5xl md:text-7xl font-bold font-headline uppercase leading-none">
              A Video
              <br />
              & Motion
              <br />
              <span className="text-[#B5AB9D]">Designer</span>
            </h1>
            <p className="mt-6 text-stone-300">
              Transforming ideas into stunning visuals – Video editing and motion graphics
              that captivates, engages, and delivers results.
            </p>
            <Button className="mt-8 rounded-full bg-stone-800 text-white hover:bg-stone-700 px-8 py-6 text-lg">
              Contact Me <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden md:flex w-3/5 relative items-center justify-center">
          <div className="absolute -left-48 w-[650px] h-[650px] bg-[#D8D2C7] rounded-full" />
          <div className="absolute -left-52 w-[650px] h-[650px] z-10">
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="person portfolio"
              alt="Bharath Naidu"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="absolute right-16 bottom-20 z-20 space-y-8 text-right">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-bold text-stone-800">{stat.value}</p>
                <p className="text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
