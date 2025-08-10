"use client";

import React, { useRef, useLayoutEffect } from 'react';
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
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!triggerRef.current || !containerRef.current) return;

        const cards = gsap.utils.toArray<HTMLDivElement>('.project-card-item');
        const totalWidth = cards.reduce((acc, card) => acc + card.offsetWidth, 0);
        const amountToScroll = totalWidth - window.innerWidth;

        const tween = gsap.to(containerRef.current, {
          x: -amountToScroll,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          animation: tween,
        });

        // Staggered card entrance animation
        gsap.from(cards, {
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      });

      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLDivElement>('.project-card-item');
        cards.forEach(card => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="bg-black text-white film-grain overflow-hidden">
      <div ref={triggerRef} className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-white cinematic-title">
            MY WORK
          </h2>
        </div>

        {/* Horizontal Scrolling Container */}
        <div ref={containerRef} className={cn(
          "w-max flex gap-8 px-4 md:px-8", // Desktop: flex row
          "md:w-max md:flex-row",
          "max-md:w-full max-md:flex-col" // Mobile: flex column
        )}>
          {projects.map((project, index) => (
            <div key={index} className="project-card-item md:w-[45vw] lg:w-[35vw] xl:w-[28vw] max-md:mb-8">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

    