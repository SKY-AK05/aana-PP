"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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


export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const sections = rightRef.current?.querySelectorAll('.work-item-video') || [];
        if (!containerRef.current || sections.length === 0) return;

        const scrollLen = (sections.length) * 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollLen}%`,
            pin: leftRef.current,
            scrub: 1,
          }
        });

        sections.forEach((section, i) => {
           tl.fromTo(section, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.5, immediateRender: false }
          )
          .to(section, 
            { opacity: 0, y: -50, duration: 0.5 }, 
            "+=0.5"
          );
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const allItems = portfolioData.flatMap(cat => cat.items);

  return (
    <section id="work" ref={containerRef} className="bg-black text-white film-grain">
      <div className="container mx-auto flex flex-col md:flex-row min-h-screen">
        {/* Left Panel */}
        <div ref={leftRef} className="md:w-1/3 p-8 md:p-12 space-y-12 self-start">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-6 cinematic-title sticky top-12">
              MY WORK
          </h2>
          {portfolioData.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-2xl font-bold text-primary mb-6">{cat.title}</h3>
              <ul className="space-y-6">
                {cat.items.map(item => (
                  <li key={item.name}>
                    <span className="font-semibold text-lg text-white/90">{item.name}</span><br/>
                    <span className="text-sm italic text-white/60">{item.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div ref={rightRef} className="w-full md:w-2/3 relative">
          {/* Mobile Layout */}
           <div className="block md:hidden p-8">
             {portfolioData.map((cat) => (
                <div key={cat.title} className="mb-12">
                  <h3 className="text-2xl font-bold text-primary mb-6">{cat.title}</h3>
                  <div className="space-y-8">
                     {cat.items.map(item => (
                        <div key={item.name} className="work-item-video-mobile">
                            <video
                                src={item.videoUrl}
                                poster={item.poster}
                                muted
                                controls
                                playsInline
                                className="w-full object-cover rounded-lg shadow-lg"
                            />
                            <div className="mt-4">
                               <span className="font-semibold text-lg text-white/90">{item.name}</span><br/>
                               <span className="text-sm italic text-white/60">{item.role}</span>
                            </div>
                        </div>
                     ))}
                  </div>
                </div>
             ))}
           </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {allItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className="work-item-video h-screen flex items-center justify-center p-8">
                <video
                  src={item.videoUrl}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  className="w-full max-w-2xl object-cover rounded-lg shadow-2xl shadow-primary/10 hover:shadow-[0_0_25px_rgba(213,0,50,0.7)] transition-shadow duration-300 cursor-pointer"
                  style={{
                      aspectRatio: '16/9'
                  }}
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
