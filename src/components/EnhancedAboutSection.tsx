
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

const awards = [
  { title: 'Guinness World Record', description: 'Largest Drumming Event', year: '2020' },
  { title: 'Best Short Film', description: 'Film Festival Award', year: '2019' },
  { title: 'Best Drummer', description: 'Music Competition', year: '2018' }
];

export function EnhancedAboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioContentRef = useRef<HTMLDivElement>(null);

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

      // Parallax effect for photo
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        animation: gsap.to(photoRef.current, {
          y: -50,
          ease: 'none'
        })
      });

      // Awards animation
      gsap.from('.award-card', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.awards-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-28 bg-background border-t border-border film-grain">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div ref={photoRef} className="relative lg:col-span-2">
            {/* Flip Card */}
            <div className="flip-card aspect-square cursor-pointer max-w-sm mx-auto">
              <div className="flip-card-inner">
                {/* Front Side - Photo */}
                <div className="flip-card-front">
                  <div
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
            
            <div className="mt-12 text-center">
              <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-foreground/60 mb-6">
                Trusted by Industry Leaders
              </h3>
              
              <div className="flex flex-wrap gap-x-4 gap-y-3 justify-center max-w-sm mx-auto">
                {companies.map((company) => (
                  <div 
                    key={company.name} 
                    className="company-logo inline-flex items-center px-3 py-1.5 bg-foreground/5 border border-border rounded-full text-xs font-medium text-foreground/80 hover:bg-foreground/10 hover:border-primary/20 transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain mr-2 filter dark:invert"
                    />
                    {company.name}
                  </div>
                ))}
              </div>
            </div>
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
              -webkit-backface-visibility: hidden; /* Safari */
              backface-visibility: hidden;
              border-radius: 1rem;
            }
            
            .flip-card-front {
              background: white;
            }
            
            .flip-card-back {
              background: linear-gradient(135deg, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary)) 100%);
              transform: rotateY(180deg);
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>

          <div ref={bioContentRef} className="lg:col-span-3">
            <h2 className="font-headline text-5xl md:text-6xl font-black cinematic-title mb-6 leading-tight">
              About Me
            </h2>
            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed font-medium">
              <p>
                For over <span className="text-primary font-semibold">15 years</span>, I've brought stories to life for 200+ brands, including industry giants like Coca-Cola, Sony Pictures, and Cadbury. My work blends cinematic storytelling with the latest digital trends.
              </p>
              <p>
                From my base in <span className="text-foreground font-semibold">Navi Mumbai</span>, I dive into every project with passion, whether it’s a viral reel or a feature film trailer. Outside of editing, I'm into photography, music production, and drumming—I even hold a Guinness World Record!
              </p>
            </div>

            {/* Awards Section */}
            <div className="awards-section mt-12">
              <h3 className="font-headline text-xl font-bold text-primary mb-6">
                Awards & Recognition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {awards.map((award, index) => (
                  <div 
                    key={index}
                    className="award-card p-4 bg-card/60 backdrop-blur-sm border border-border rounded-lg hover:border-primary/40 transition-all duration-300 shadow-sm text-center"
                  >
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-foreground font-semibold text-sm">{award.title}</div>
                    <div className="text-foreground/60 text-xs">{award.description}</div>
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
