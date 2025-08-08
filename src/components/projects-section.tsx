"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './project-card';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "QuantumLeap AI",
    description: "A cutting-edge platform for AI model deployment and management.",
    image: "https://placehold.co/600x400.png",
    aiHint: "futuristic dashboard",
    tags: ["Next.js", "AI", "SaaS", "Design"],
  },
  {
    title: "Nova Finance",
    description: "A mobile-first banking app designed for the next generation of users.",
    image: "https://placehold.co/600x400.png",
    aiHint: "finance app",
    tags: ["React Native", "FinTech", "Mobile"],
  },
  {
    title: "Helios Design System",
    description: "A comprehensive design system to unify product aesthetics and workflow.",
    image: "https://placehold.co/600x400.png",
    aiHint: "design system",
    tags: ["UI/UX", "Figma", "Web"],
  },
  {
    title: "Apex E-commerce",
    description: "A high-performance e-commerce storefront with immersive 3D product views.",
    image: "https://placehold.co/600x400.png",
    aiHint: "ecommerce website",
    tags: ["E-commerce", "Three.js", "Performance"],
  },
   {
    title: "Orbit Social",
    description: "A decentralized social media platform focused on user privacy.",
    image: "https://placehold.co/600x400.png",
    aiHint: "social media",
    tags: ["Web3", "Mobile", "React"],
  },
  {
    title: "Zenith VR",
    description: "An interactive virtual reality experience for architectural visualization.",
    image: "https://placehold.co/600x400.png",
    aiHint: "virtual reality",
    tags: ["VR", "Unreal Engine", "3D"],
  },
];

const filters = ["All", "Web", "Mobile", "Design"];

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

  return (
    <section id="work" ref={containerRef} className="bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">My Work</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            A selection of projects that I'm proud of. Each one was a unique challenge.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
            {filters.map((filter) => (
                <Button key={filter} variant={activeFilter === filter ? 'default' : 'secondary'} onClick={() => setActiveFilter(filter)}>
                    {filter}
                </Button>
            ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
