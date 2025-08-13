"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  { name: 'Cadbury', logo: '/assets/CB.png', type: 'png' },
  { name: 'Coca-Cola', logo: '/assets/Coca-Cola_logo.svg', type: 'svg' },
  { name: 'Prime Video', logo: '/assets/PV.png', type: 'png' },
  { name: 'Universal Music', logo: '/assets/UNI.png', type: 'png' },
  { name: 'Dharma Productions', logo: '/assets/DP.png', type: 'png' },
  { name: 'Jio', logo: '/assets/JIO.png', type: 'png' },
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLDivElement>(null);
  const photoBorderRef = useRef<HTMLDivElement>(null);
  const bioContentRef = useRef<HTMLDivElement>(null);
  const companiesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([photoRef.current, bioContentRef.current], {
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
        .to([photoRef.current, bioContentRef.current], {
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div ref={photoRef} className="relative lg:col-span-2">
            {/* Flip Card */}
            <div className="flip-card aspect-square cursor-pointer max-w-sm mx-auto">
              <div className="flip-card-inner">
                {/* Front Side - Photo */}
                <div className="flip-card-front">
                  <div
                    ref={photoImgRef}
                    className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
                  >
                    <Image
                      src="/assets/profile-hero.jpg"
                      data-ai-hint="man portrait"
                      alt="Bharath Naidu"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                  </div>
                </div>

                {/* Back Side - Signature */}
                <div className="flip-card-back">
                  <div className="p-4 h-full flex items-center justify-center">
                    {/* Extra Large Signature */}
                    <div className="w-full max-w-lg">
                      <Image
                        src="/assets/2.png"
                        alt="Bharath Naidu Signature"
                        width={540}
                        height={270}
                        className="object-contain filter brightness-110 w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated border element */}
            <div
              ref={photoBorderRef}
              className="absolute -inset-2 rounded-2xl border-2 border-primary/20 -z-10 max-w-sm mx-auto left-0 right-0"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, hsl(var(--primary) / 0.1) 50%, transparent 70%)'
              }}
            />

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/10 rounded-full blur-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/5 rounded-full blur-lg -z-10" />
          </div>
          
          <style jsx>{`
            .flip-card {
              perspective: 1000px;
            }
            
            .flip-card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              transition: transform 0.6s;
              transform-style: preserve-3d;
            }
            
            .flip-card:hover .flip-card-inner {
              transform: rotateY(180deg);
            }
            
            .flip-card-front,
            .flip-card-back {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              border-radius: 1rem;
            }
            
            .flip-card-front {
              background: white;
            }
            
            .flip-card-back {
              background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
              transform: rotateY(180deg);
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>

          <div ref={bioContentRef} className="lg:col-span-3">
            <h2 className="font-headline text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              About Me
            </h2>
            <div className="space-y-6 text-lg text-white/80 leading-relaxed font-medium">
              <p>
                Hey, I’m Bharath. I’ve spent over 15 years bringing stories to life for brands like Coca-Cola, Sony Pictures, Xiaomi, Boat, and Dharma Productions. My work blends cinematic storytelling with digital trends — from brand films and trailers to influencer reels and AI-driven visuals.
              </p>
              <p>
                I believe in making every frame count. Whether it’s launching a product, sparking a viral moment, or building something never seen before, I bring both creativity and precision to the table.
              </p>
              <p>
                At the end of the day, it’s about connecting with people. That’s what got me started, and it’s still what drives me today.
              </p>
            </div>

            <div ref={companiesRef} className="mt-12">
              <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-white/60 mb-8">
                Trusted by Industry Leaders
              </h3>
              
              {/* Badge-style layout with logos */}
              <div className="flex flex-wrap gap-3 justify-center">
                {companies.map((company) => (
                  <div 
                    key={company.name} 
                    className="company-logo inline-flex items-center px-3 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain mr-2 filter brightness-90"
                    />
                    {company.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
