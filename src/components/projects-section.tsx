"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  name: string;
  role: string;
  videoUrl: string;
  poster: string;
  youtubeUrl: string;
}

interface Category {
  title: string;
  items: WorkItem[];
}

const portfolioData: Category[] = [
  {
    title: "OTT & Entertainment",
    items: [
      {
        name: "Jio-Hotstar",
        role: "Creative Technologist & Editor for AI-based teasers",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/jiohotstar-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
      {
        name: "Prime Video",
        role: "Video Editor for a new series trailer, focusing on suspenseful pacing",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/primevideo-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
      {
        name: "Dharma Productions",
        role: "Assistant Editor for a film promo, crafting a character-driven teaser",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/dharma-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
    ],
  },
  {
    title: "Global Brands",
    items: [
      {
        name: "Cadbury",
        role: "Lead Video Editor for a cinematic social media campaign",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/cadbury-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
      {
        name: "Coca-Cola",
        role: "Senior Video Editor for a festive holiday commercial with motion graphics",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/cocacola-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
      {
        name: "Boat",
        role: "Lead Video Editor for a high-energy gaming headset launch video",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/boat-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
    ],
  },
  {
    title: "Music & Content",
    items: [
      {
        name: "Universal Music",
        role: "Video Editor for an emerging artist's music video",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/universal-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
      {
        name: "Doctorpedia",
        role: "Editor & Cinematographer for an educational medical series",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/doctorpedia-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
      {
        name: "ComedyCulture",
        role: "Video Editor for short-form viral comedy reels on YouTube",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        poster: "/assets/images/comedy-poster.jpg",
        youtubeUrl: "https://www.youtube.com",
      },
    ],
  },
];

const allItems = portfolioData.flatMap((cat, catIndex) => 
  cat.items.map(item => ({ ...item, categoryIndex: catIndex }))
);

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const sections = rightRef.current?.querySelectorAll('.work-item-video') || [];
        if (!containerRef.current || sections.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${rightRef.current?.offsetHeight! - window.innerHeight}`,
            pin: leftRef.current,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
        
        sections.forEach((section, index) => {
          const item = allItems[index];
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveCategory(item.categoryIndex),
            onEnterBack: () => setActiveCategory(item.categoryIndex),
          });
        });

        // Add a master timeline for fading videos
        const videoTl = gsap.timeline({
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        sections.forEach((section, i) => {
          videoTl.from(section, { autoAlpha: 0, y: 100, ease: 'power2.inOut' }, i)
                 .to(section, { autoAlpha: 1, y: 0, ease: 'power2.inOut' }, i + 0.5)
                 .to(section, { autoAlpha: 0, y: -100, ease: 'power2.inOut' }, i + 1);
        });

      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="bg-black text-white film-grain overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row min-h-screen relative">
        {/* Left Panel */}
        <div ref={leftRef} className="md:w-1/3 md:h-screen p-8 md:p-12 flex flex-col justify-center">
            <div className='w-full'>
                <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-12 cinematic-title">
                    MY WORK
                </h2>
                <div className="space-y-4">
                {portfolioData.map((cat, catIndex) => (
                    <div key={cat.title} className="border-b border-white/10 overflow-hidden">
                        <button 
                            className="w-full flex justify-between items-center text-left py-4"
                            onClick={() => setActiveCategory(activeCategory === catIndex ? null : catIndex)}
                        >
                            <h3 className="text-2xl font-bold text-primary">{cat.title}</h3>
                             <ChevronDown className={cn("w-6 h-6 text-primary transition-transform duration-300", { "rotate-180": activeCategory === catIndex })} />
                        </button>
                        <div className={cn("transition-all duration-500 ease-in-out grid", {
                            'grid-rows-[1fr] opacity-100': activeCategory === catIndex,
                            'grid-rows-[0fr] opacity-0': activeCategory !== catIndex,
                        })}>
                            <div className="overflow-hidden">
                                <ul className="space-y-6 py-4">
                                    {cat.items.map(item => (
                                    <li key={item.name}>
                                        <span className="font-semibold text-lg text-white/90">{item.name}</span><br/>
                                        <span className="text-sm italic text-white/60">{item.role}</span>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>

        {/* Right Panel */}
        <div ref={rightRef} className="w-full md:w-2/3 relative md:h-screen">
          {/* Mobile Layout */}
           <div className="block md:hidden p-8 space-y-8">
             {allItems.map(item => (
                <div key={item.name} className="work-item-video-mobile space-y-4">
                    <h3 className="font-semibold text-xl text-primary">{item.name}</h3>
                    <p className="text-sm italic text-white/60">{item.role}</p>
                    <video
                        src={item.videoUrl}
                        poster={item.poster}
                        muted
                        controls
                        playsInline
                        className="w-full object-cover rounded-lg shadow-lg"
                    />
                </div>
             ))}
           </div>
          
          {/* Desktop Layout: Videos are positioned absolutely to fade over each other */}
          <div className="hidden md:block h-full">
            {allItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className="work-item-video absolute inset-0 h-full w-full flex items-center justify-center p-8 opacity-0">
                <video
                  src={item.videoUrl}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  className="w-full max-w-3xl object-cover rounded-lg shadow-2xl shadow-primary/10 hover:shadow-[0_0_25px_rgba(213,0,50,0.7)] transition-shadow duration-300 cursor-pointer"
                  style={{ aspectRatio: '16/9' }}
                  onClick={() => window.open(item.youtubeUrl, "_blank")}
                  onMouseEnter={e => e.currentTarget.play()}
                  onMouseLeave={e => e.currentTarget.pause()}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
