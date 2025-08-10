
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const workData = [
  {
    category: "OTT & Entertainment",
    subcategories: [
      {
        title: "Jio-Hotstar",
        description: "Creative Technologist & Editor for AI-based teasers",
        video: "/assets/videos/jiohotstar-preview.mp4",
        poster: "/assets/images/jiohotstar-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Prime Video",
        description: "Video Editor for suspenseful series trailer",
        video: "/assets/videos/primevideo-preview.mp4",
        poster: "/assets/images/primevideo-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Dharma Productions",
        description: "Assistant Editor for character-driven promo",
        video: "/assets/videos/dharma-preview.mp4",
        poster: "/assets/images/dharma-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      }
    ]
  },
  {
    category: "Global Brands",
    subcategories: [
      {
        title: "Cadbury",
        description: "Lead Video Editor for a cinematic social media campaign",
        video: "/assets/videos/cadbury-preview.mp4",
        poster: "/assets/images/cadbury-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Coca-Cola",
        description: "Senior Video Editor for a festive holiday commercial with motion graphics",
        video: "/assets/videos/cocacola-preview.mp4",
        poster: "/assets/images/cocacola-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Boat",
        description: "Lead Video Editor for a high-energy gaming headset launch video",
        video: "/assets/videos/boat-preview.mp4",
        poster: "/assets/images/boat-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      }
    ]
  },
  {
    category: "Music & Content",
    subcategories: [
       {
        title: "Universal Music",
        description: "Video Editor for an emerging artist's music video",
        video: "/assets/videos/universal-preview.mp4",
        poster: "/assets/images/universal-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Doctorpedia",
        description: "Editor & Cinematographer for an educational medical series",
        video: "/assets/videos/doctorpedia-preview.mp4",
        poster: "/assets/images/doctorpedia-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "ComedyCulture",
        description: "Video Editor for short-form viral comedy reels on YouTube",
        video: "/assets/videos/comedy-preview.mp4",
        poster: "/assets/images/comedy-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      }
    ]
  }
];

const allSubcategories = workData.flatMap(cat => cat.subcategories.map(sub => ({ ...sub, category: cat.category })));

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeSubcategory, setActiveSubcategory] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: Pin left panel and animate right sections
        if (!containerRef.current || !leftRef.current || !rightRef.current) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${rightRef.current!.offsetHeight - window.innerHeight}`,
          pin: leftRef.current,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        });

        const videoSections = gsap.utils.toArray<HTMLDivElement>('.video-section');
        videoSections.forEach((section, index) => {
            gsap.fromTo(section,
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1,
                    y: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom top',
                        toggleActions: 'play none none reverse',
                        onEnter: () => setActiveSubcategory(index),
                        onEnterBack: () => setActiveSubcategory(index),
                    }
                }
            );
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: Animate sections in on scroll, no pinning
        const allSections = gsap.utils.toArray<HTMLDivElement>('.mobile-section');
        allSections.forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleVideoHover = (e: React.MouseEvent<HTMLVideoElement>, action: 'play' | 'pause') => {
    if (window.innerWidth < 768) return;
    const video = e.currentTarget;
    if (action === 'play') {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const handleVideoClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  return (
    <section id="work" ref={containerRef} className="bg-black text-white film-grain overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row min-h-[100vh] relative">
        {/* Left Panel */}
        <div ref={leftRef} className="md:w-1/3 md:h-screen p-8 md:p-12 flex flex-col justify-center self-start md:sticky top-0">
          <div className='w-full'>
            <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-12 cinematic-title">
              MY WORK
            </h2>
            <div className="space-y-6 hidden md:block">
              {workData.map((cat, catIndex) => (
                <div key={cat.category}>
                  <h3 className="font-headline text-2xl text-primary mb-4">{cat.category}</h3>
                  <ul className="space-y-5 border-l-2 border-white/20 pl-6">
                    {cat.subcategories.map((sub, subIndex) => {
                      const globalIndex = allSubcategories.findIndex(s => s.title === sub.title && s.category === cat.category);
                      const isActive = globalIndex === activeSubcategory;
                      return (
                        <li key={sub.title} className={cn(
                          "transition-all duration-300",
                          isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                        )}>
                          <h4 className={cn("font-bold text-lg transition-colors duration-300", isActive ? "text-primary" : "text-white")}>{sub.title}</h4>
                          <p className={cn("text-white/70 text-sm transition-all duration-300", { "max-h-40 opacity-100 mt-1": isActive, "max-h-0 opacity-0": !isActive })}>
                            {sub.description}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div ref={rightRef} className="w-full md:w-2/3 md:py-20">
           <div className="p-4 md:p-8 space-y-16">
             {/* Desktop View */}
             <div className="hidden md:block space-y-24">
              {allSubcategories.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="video-section">
                    <div className="relative group">
                       <video
                          src={item.video}
                          poster={item.poster}
                          muted
                          loop
                          playsInline
                          className="w-full object-cover rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(213,0,50,0.7)] transition-shadow duration-300 cursor-pointer"
                          style={{ aspectRatio: '16/9' }}
                          onClick={() => handleVideoClick(item.youtubeUrl)}
                          onMouseEnter={(e) => handleVideoHover(e, 'play')}
                          onMouseLeave={(e) => handleVideoHover(e, 'pause')}
                      />
                       <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <Play className="w-12 h-12 text-white/80" />
                        </div>
                    </div>
                  </div>
              ))}
             </div>
             {/* Mobile View */}
             <div className="block md:hidden space-y-12">
                {workData.map((cat) => (
                  <div key={cat.category} className="mobile-section">
                     <h3 className="font-headline text-3xl text-primary mb-6">{cat.category}</h3>
                     <div className="space-y-8">
                       {cat.subcategories.map(item => (
                         <div key={item.title}>
                           <h4 className="font-bold text-xl text-white mb-1">{item.title}</h4>
                           <p className="text-white/70 text-sm mb-4">{item.description}</p>
                           <div className="relative group">
                              <video
                                  src={item.video}
                                  poster={item.poster}
                                  controls
                                  className="w-full object-cover rounded-lg shadow-lg"
                                  style={{ aspectRatio: '16/9' }}
                                  onClick={() => handleVideoClick(item.youtubeUrl)}
                              />
                              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center pointer-events-none">
                                <Play className="w-12 h-12 text-white/80" />
                              </div>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}

    