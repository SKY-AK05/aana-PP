"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Corporate Brand Film",
    description: "A compelling brand story for a leading tech company.",
    image: "https://placehold.co/600x400.png",
    aiHint: "corporate video",
    tags: ["Video Editing", "Color Grading", "Storytelling"],
  },
  {
    title: "Social Media Campaign",
    description: "A series of high-energy ads for a new product launch.",
    image: "https://placehold.co/600x400.png",
    aiHint: "social media ad",
    tags: ["Motion Graphics", "Graphic Design", "Social Media"],
  },
  {
    title: "Event Highlights",
    description: "Capturing the energy and key moments of a major industry conference.",
    image: "https://placehold.co/600x400.png",
    aiHint: "conference event",
    tags: ["Live Event", "Video Editing", "Fast Turnaround"],
  },
  {
    title: "Product Explainer Video",
    description: "A clear and concise animated video explaining a complex software product.",
    image: "https://placehold.co/600x400.png",
    aiHint: "explainer video",
    tags: ["Animation", "Motion Graphics", "Scripting"],
  },
   {
    title: "Documentary Short",
    description: "A human-interest story told through powerful interviews and cinematography.",
    image: "https://placehold.co/600x400.png",
    aiHint: "documentary film",
    tags: ["Documentary", "Storytelling", "Color Correction"],
  },
  {
    title: "Brand Identity Design",
    description: "Creating a complete visual identity, from logo to brand guidelines.",
    image: "https://placehold.co/600x400.png",
    aiHint: "branding design",
    tags: ["Graphic Design", "Logo", "Branding"],
  },
];

const filters = ["All", "Video Editing", "Motion Graphics", "Graphic Design"];

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = React.useState("All");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  
  const filteredProjects = projects.filter(p => activeFilter === 'All' || p.tags.includes(activeFilter));

  return (
    <section id="work" ref={containerRef} className="bg-secondary/20 border-t border-border py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">My Work</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            A selection of projects that showcase my passion for visual storytelling.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
            {filters.map((filter) => (
                <Button key={filter} variant={activeFilter === filter ? 'default' : 'secondary'} onClick={() => setActiveFilter(filter)}>
                    {filter}
                </Button>
            ))}
        </div>

      </div>
    </section>
  );
}
