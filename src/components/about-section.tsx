"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLDivElement>(null);
  const photoBorderRef = useRef<HTMLDivElement>(null);
  const bioContentRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([photoRef.current, bioContentRef.current, socialLinksRef.current], {
        opacity: 0,
        y: 30
      });

      // Main About section entrance animation
      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      aboutTimeline
        .to([photoRef.current, bioContentRef.current, socialLinksRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        });

      // Photo hover effects
      if (photoRef.current && photoImgRef.current && photoBorderRef.current) {
        const photoHoverTL = gsap.timeline({ paused: true });

        photoHoverTL
          .to(photoImgRef.current, {
            scale: 1.05,
            rotation: 1,
            duration: 0.4,
            ease: 'power2.out'
          })
          .to(photoBorderRef.current, {
            scale: 1.1,
            rotation: -1,
            duration: 0.4,
            ease: 'power2.out'
          }, 0);

        photoRef.current.addEventListener('mouseenter', () => photoHoverTL.play());
        photoRef.current.addEventListener('mouseleave', () => photoHoverTL.reverse());
      }

      // Parallax effect for photo
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(photoRef.current, {
          y: -50,
          ease: 'none'
        })
      });

      // Social links hover animations
      const socialLinks = socialLinksRef.current?.querySelectorAll('a');
      socialLinks?.forEach((link) => {
        const icon = link.querySelector('svg');

        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: 'power2.out'
          });
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 5,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div ref={photoRef} className="relative md:col-span-2">
            {/* Photo with enhanced styling */}
            <div className="relative group">
              <div
                ref={photoImgRef}
                className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
              >
                <Image
                  src="/assets/profile-hero.jpg"
                  data-ai-hint="man portrait"
                  alt="Bharath Naidu"
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
              </div>

              {/* Animated border element */}
              <div
                ref={photoBorderRef}
                className="absolute -inset-4 rounded-2xl border-2 border-primary/20 -z-10"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, hsl(var(--primary) / 0.1) 50%, transparent 70%)'
                }}
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/10 rounded-full blur-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/5 rounded-full blur-lg -z-10" />
          </div>

          <div ref={bioContentRef} className="md:col-span-3">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
              About Me
            </h2>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              I'm a passionate Video Editor and Graphic Designer with a keen eye for storytelling. My experience is rooted in transforming raw ideas and footage into polished, impactful visual narratives that resonate with audiences.
            </p>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              From fast-paced promotional videos to detailed graphic layouts, I bring a commitment to quality, creativity, and technical excellence. Let's create something memorable together.
            </p>

            <div className="flex space-x-4" ref={socialLinksRef}>
              <Button asChild variant="outline" className="group cinematic-focus rounded-lg">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" className="group cinematic-focus rounded-lg">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Portfolio
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
