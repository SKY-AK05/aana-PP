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
        if (!containerRef.current || !leftRef.current || sections.length === 0) return;

        // Pin the left panel while the right one scrolls
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `bottom-=${window.innerHeight}`,
          pin: leftRef.current,
          pinSpacing: false,
        });
        
        // For each video section, create a trigger to update the active category
        sections.forEach((section, index) => {
          const item = allItems[index];
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveCategory(item.categoryIndex),
            onEnterBack: () => setActiveCategory(item.categoryIndex),
            animation: gsap.fromTo(section, 
              { autoAlpha: 0.2, y: 50 },
              { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            ),
            toggleActions: 'play reverse play reverse',
          });
        });

      });

      mm.add("(max-width: 767px)", () => {
        // On mobile, ensure all categories can be opened manually
        // No special scroll animations needed
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (index: number) => {
    // Allow manual toggle on both mobile and desktop
    setActiveCategory(activeCategory === index ? null : index);
    
    // On desktop, scroll to the corresponding video
    if (window.innerWidth >= 768) {
        const firstItemIndex = portfolioData.slice(0, index).reduce((acc, cat) => acc + cat.items.length, 0);
        const targetVideo = rightRef.current?.querySelectorAll('.work-item-video')[firstItemIndex];
        if (targetVideo) {
            gsap.to(window, {
                scrollTo: {
                    y: (targetVideo as HTMLElement).offsetTop + rightRef.current!.offsetTop,
                    autoKill: false
                },
                duration: 1
            });
        }
    }
  };


  return (
    <section id="work" ref={containerRef} className="bg-black text-white film-grain overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row min-h-screen relative">
        {/* Left Panel */}
        <div ref={leftRef} className="md:w-1/3 md:h-screen p-8 md:p-12 flex flex-col justify-center self-start">
            <div className='w-full'>
                <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-12 cinematic-title">
                    MY WORK
                </h2>
                <div className="space-y-4">
                {portfolioData.map((cat, catIndex) => (
                    <div key={cat.title} className="border-b border-white/10 overflow-hidden">
                        <button 
                            className="w-full flex justify-between items-center text-left py-4"
                            onClick={() => handleCategoryClick(catIndex)}
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
        <div ref={rightRef} className="w-full md:w-2/3 md:py-[50vh]">
           <div className="p-8 space-y-16">
             {allItems.map((item, index) => (
                <div key={`${item.name}-${index}`} className="work-item-video space-y-4">
                    <h3 className="font-semibold text-xl text-primary md:hidden">{item.name}</h3>
                    <p className="text-sm italic text-white/60 md:hidden">{item.role}</p>
                    <video
                        src={item.videoUrl}
                        poster={item.poster}
                        muted
                        loop
                        playsInline
                        className="w-full object-cover rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(213,0,50,0.7)] transition-shadow duration-300 cursor-pointer"
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
