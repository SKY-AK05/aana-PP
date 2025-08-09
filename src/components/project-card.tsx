"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';
import Link from 'next/link';

type ProjectCardProps = {
  project: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    video?: string;
    poster?: string;
    tags: string[];
    aiHint: string;
    youtubeUrl: string;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!card) return;

    const handleMouseEnter = () => {
      // Play video on hover (desktop only)
      if (video && window.innerWidth > 768) {
        video.currentTime = 0;
        video.play().catch(() => {
          // Fallback if video fails to play
          console.log('Video autoplay failed');
        });
      }

      // GSAP hover animations
      gsap.to(card, {
        scale: 1.02,
        y: -8,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.4,
          ease: 'power2.out'
        });
      }

      if (content) {
        gsap.to(content, {
          y: -4,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      // Pause and reset video
      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      // Reset animations
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });

      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.7,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
      
      if (content) {
        gsap.to(content, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link 
      href={project.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="group relative bg-black border border-white/10 overflow-hidden rounded-lg h-full flex flex-col shadow-2xl shadow-black/50 will-change-transform cinematic-glow cinematic-transition"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card)) 0%, #000000 100%)'
      }}
    >
      {/* Video/Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Background Image */}
        <Image
          src={project.poster || project.image}
          alt={project.title}
          data-ai-hint={project.aiHint}
          fill
          className="object-cover"
        />

        {/* Hover Video (Desktop Only) */}
        {project.video && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
            muted
            loop
            playsInline
            poster={project.poster || project.image}
          >
            <source src={project.video} type="video/mp4" />
            <source src={project.video.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Cinematic Overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 transition-opacity duration-300"
        />

        {/* Play Button Indicator */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play className="w-5 h-5 text-white ml-0.5" />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Subtitle */}
        <div className="text-sm font-medium tracking-wider uppercase mb-2 text-primary">
          {project.subtitle}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold font-headline mb-4 text-white leading-tight cinematic-title">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 mb-6 flex-grow leading-relaxed text-sm md:text-base">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {project.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="font-normal bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition-colors duration-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Cinematic Border Glow */}
      <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"></div>
    </Link>
  );
}
