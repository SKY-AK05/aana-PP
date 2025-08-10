
"use client";

import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './project-card';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Chocolate Symphony – Cadbury Campaign',
    subtitle: 'Cadbury | Lead Video Editor',
    description: 'Led the post-production for a cinematic social media campaign, focusing on vibrant color grading and dynamic motion graphics to create an immersive and appetizing visual experience that significantly boosted online engagement.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/cadbury-preview.mp4',
    poster: '/assets/images/cadbury-poster.jpg',
    tags: ['Video Editing', 'Color Grading', 'Motion Graphics', 'Premiere Pro'],
    aiHint: 'chocolate campaign',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'Festive Magic – Coca-Cola Global Ad',
    subtitle: 'Coca-Cola | Senior Video Editor',
    description: 'Spearheaded post-production for a global festive commercial, integrating complex VFX and motion graphics to evoke a sense of universal holiday wonder. The campaign was celebrated for its technical artistry and emotional resonance.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/cocacola-preview.mp4',
    poster: '/assets/images/cocacola-poster.jpg',
    tags: ['VFX', 'Storytelling', 'After Effects', 'Team Leadership'],
    aiHint: 'festive commercial',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'The Takedown – Prime Video Trailer',
    subtitle: 'Prime Video | Video Editor',
    description: 'Crafted a high-stakes trailer for a psychological thriller series, focusing on suspenseful pacing and a moody, high-contrast color grade to build tension. The trailer successfully generated significant buzz and strong launch viewership.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/primevideo-preview.mp4',
    poster: '/assets/images/primevideo-poster.jpg',
    tags: ['Trailer Editing', 'Sound Design', 'DaVinci Resolve', 'Narrative'],
    aiHint: 'thriller trailer',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'Character Arcs – Dharma Productions Promo',
    subtitle: 'Dharma Productions | Assistant Editor',
    description: 'Assisted in weaving multiple character arcs into a cohesive and compelling narrative for a film promo. Managed media assets and contributed to refining scenes, focusing on performance and emotional resonance using Avid Media Composer.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/dharma-preview.mp4',
    poster: '/assets/images/dharma-poster.jpg',
    tags: ['Avid Media Composer', 'Asset Management', 'Story Editing'],
    aiHint: 'film promo',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'Future Forward – Jio-Hotstar AI Teaser',
    subtitle: 'Jio-Hotstar | Creative Technologist & Editor',
    description: 'Pioneered an AI-driven teaser campaign by integrating AI-generated character concepts with live-action footage. This innovative approach pushed creative boundaries and set a new precedent in OTT marketing.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/jiohotstar-preview.mp4',
    poster: '/assets/images/jiohotstar-poster.jpg',
    tags: ['AI Integration', 'VFX', 'Creative Technology', 'R&D'],
    aiHint: 'ai teaser',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'Debut Launch – Universal Music Video',
    subtitle: 'Universal Music | Video Editor',
    description: 'Edited a debut music video for an emerging artist, blending performance and storytelling to create a visual arc that mirrored the song’s emotional journey. The video was instrumental in launching the artist’s career.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/universal-preview.mp4',
    poster: '/assets/images/universal-poster.jpg',
    tags: ['Music Video', 'Visual Storytelling', 'Color Grading', 'Artist Branding'],
    aiHint: 'music video',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'Game On – Boat Headset Launch',
    subtitle: 'Boat Lifestyle | Lead Video Editor',
    description: 'Created a high-energy ad for a new gaming headset, using fast-paced cuts, impactful sound design, and aggressive color grading to capture the intensity of competitive gaming. The ad drove impressive initial sales.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/boat-preview.mp4',
    poster: '/assets/images/boat-poster.jpg',
    tags: ['Product Launch', 'Sound Design', 'High-Energy Editing', 'Targeted Ads'],
    aiHint: 'gaming headset',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'Patient Stories – Doctorpedia Series',
    subtitle: 'Doctorpedia | Editor & Cinematographer',
    description: 'Translated complex medical topics into accessible and engaging video content. Designed a clean, trustworthy visual style and used motion graphics to illustrate key health concepts, empowering patients with reliable knowledge.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/doctorpedia-preview.mp4',
    poster: '/assets/images/doctorpedia-poster.jpg',
    tags: ['Cinematography', 'Educational Content', 'Motion Graphics', 'Health Comms'],
    aiHint: 'medical series',
    youtubeUrl: 'https://www.youtube.com'
  },
  {
    title: 'Viral Hits – ComedyCulture YouTube Channel',
    subtitle: 'ComedyCulture | Short-Form Video Editor',
    description: 'Edited short-form viral comedy reels, focusing on rapid-fire pacing and punchy timing to maximize comedic impact for YouTube Shorts and Instagram Reels. This strategy led to a massive increase in viewership and follower growth.',
    image: 'https://placehold.co/600x400.png',
    video: '/assets/videos/comedy-preview.mp4',
    poster: '/assets/images/comedy-poster.jpg',
    tags: ['Short-Form Video', 'Comedy Editing', 'Audience Engagement', 'A/B Testing'],
    aiHint: 'comedy youtube',
    youtubeUrl: 'https://www.youtube.com'
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Pin the right panel
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: rightPanelRef.current,
          pinSpacing: false,
        });
        
        // Animate title entrance
        gsap.from(".section-title", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        });

        // Create a trigger for each text block on the left to update active index
        const leftItems = gsap.utils.toArray<HTMLDivElement>('.left-panel-item');
        leftItems.forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) {
                setActiveIndex(index);
              }
            }
          });
          
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      });
      
      mm.add("(max-width: 767px)", () => {
         // On mobile, just a simple stagger animation for the cards
        const allCards = gsap.utils.toArray<HTMLDivElement>('.mobile-project-card');
        allCards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  const activeProject = projects[activeIndex];

  return (
    <section id="work" ref={sectionRef} className="bg-black text-white film-grain overflow-hidden py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-white cinematic-title section-title">
            MY WORK
          </h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16">
          {/* Left Panel: Scrollable Text */}
          <div ref={leftPanelRef} className="flex flex-col gap-24">
            {projects.map((project, index) => (
              <div key={index} className="left-panel-item">
                <div className={cn(
                  "text-sm font-medium tracking-wider uppercase mb-3 transition-colors duration-300",
                  activeIndex === index ? "text-primary" : "text-white/40"
                )}>
                  {project.subtitle}
                </div>
                <h3 className={cn(
                  "text-4xl font-bold font-headline mb-4 transition-colors duration-300",
                  activeIndex === index ? "text-white cinematic-title" : "text-white/60"
                )}>
                  {project.title}
                </h3>
                <p className={cn(
                  "text-white/60 leading-relaxed transition-opacity duration-300",
                  activeIndex === index ? "opacity-100" : "opacity-70"
                )}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Panel: Sticky Video */}
          <div ref={rightPanelRef} className="relative h-screen flex items-center justify-center">
            <div className="w-full aspect-video">
               {projects.map((project, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 ease-in-out",
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {activeIndex === index && <ProjectCard project={project} />}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-12">
           {projects.map((project, index) => (
            <div key={index} className="mobile-project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

    