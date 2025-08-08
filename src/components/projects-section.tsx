"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './project-card';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
      title: "Cadbury & Coca-Cola",
      description: "Short highlight reel previews for major brand campaigns.",
      image: "https://placehold.co/800x600.png",
      aiHint: "product commercial",
      tags: ["Video Editing", "Brand Film", "Commercial"],
    },
    {
      title: "Dharma Productions",
      description: "Cinematic behind-the-scenes clips and promotional content.",
      image: "https://placehold.co/800x600.png",
      aiHint: "movie set",
      tags: ["Cinematography", "BTS", "Promo"],
    },
    {
      title: "Universal Music",
      description: "Dynamic music video montages for various artists.",
      image: "https://placehold.co/800x600.png",
      aiHint: "music video",
      tags: ["Music Video", "Montage", "Rhythm Editing"],
    },
    {
      title: "Jio-Hotstar AI Characters",
      description: "Before-and-after showcase of AI-generated characters.",
      image: "https://placehold.co/800x600.png",
      aiHint: "character animation",
      tags: ["AI Integration", "VFX", "Animation"],
    },
    {
      title: "Prime Video Music",
      description: "Color grading comparisons for music video projects.",
      image: "https://placehold.co/800x600.png",
      aiHint: "color grading",
      tags: ["Color Grading", "Post-Production", "Music Video"],
    },
     {
      title: "Comedy Culture",
      description: "Split-screen edits showcasing raw vs. final cuts for YouTube.",
      image: "https://placehold.co/800x600.png",
      aiHint: "comedy show",
      tags: ["YouTube", "Comedy", "Editing"],
    },
    {
      title: "TATA EV & Amazon miniTV",
      description: "Engaging short-form commercials for major brands.",
      image: "https://placehold.co/800x600.png",
      aiHint: "electric car",
      tags: ["Commercial", "Short-Form", "Social Media"],
    },
];

export function ProjectsSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isMobile || !sectionRef.current || !containerRef.current) return;

    const items = gsap.utils.toArray(".work-item");
    
    const ctx = gsap.context(() => {
        const horizontalScroll = gsap.to(containerRef.current, {
            x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => "+=" + (containerRef.current!.scrollWidth - window.innerWidth),
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        items.forEach((item, i) => {
            gsap.from(item as HTMLElement, {
                x: 200,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item as HTMLElement,
                    containerAnimation: horizontalScroll,
                    start: "left 90%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="work" ref={sectionRef} className="bg-white text-black overflow-hidden">
        {isMobile ? (
            <div className="py-20 md:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold text-black">My Work</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-black/70">
                            A selection of projects that showcase my passion for visual storytelling.
                        </p>
                    </div>
                    <div className="flex flex-col gap-12">
                        {projects.map((project, index) => (
                           <div key={index} className="w-full">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <div className="h-screen flex items-center justify-start relative">
                <div ref={containerRef} className="flex h-full py-20 pl-20">
                    <div className="flex items-center pr-20">
                         <div className="text-left w-[30vw]">
                            <h2 className="font-headline text-5xl font-bold text-black mb-6">My Work</h2>
                            <p className="text-lg text-black/70">
                                A selection of projects that showcase my passion for visual storytelling. Scroll to explore.
                            </p>
                        </div>
                    </div>
                    {projects.map((project, index) => (
                        <div key={index} className="work-item flex-shrink-0 w-[70vw] h-[70vh] mr-16">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                     <div className="flex-shrink-0 w-[20vw]"></div>
                </div>
            </div>
        )}
    </section>
  );
}
