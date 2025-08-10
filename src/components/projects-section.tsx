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
        description: "Creative Technologist & Editor for AI-based teasers. Developed unique character concepts using AI tools, blending VFX and storytelling for audience engagement.",
        video: "/assets/videos/jiohotstar-preview.mp4",
        poster: "/assets/images/jiohotstar-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Prime Video",
        description: "Video Editor for suspense-driven series trailer. Managed pacing, transitions, and visual tone for maximum tension.",
        video: "/assets/videos/primevideo-preview.mp4",
        poster: "/assets/images/primevideo-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Dharma Productions",
        description: "Assistant Editor for character-driven promo. Focused on emotional impact through careful shot selection and sound design.",
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
        description: "Lead Video Editor for a cinematic social media campaign. Blended rich color grading with dynamic shots to boost online engagement.",
        video: "/assets/videos/cadbury-preview.mp4",
        poster: "/assets/images/cadbury-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Coca-Cola",
        description: "Senior Video Editor for a festive holiday commercial. Integrated motion graphics and visual effects to create a magical atmosphere.",
        video: "/assets/videos/cocacola-preview.mp4",
        poster: "/assets/images/cocacola-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Boat",
        description: "Lead Video Editor for a high-energy gaming headset launch. Utilized fast-paced editing and sound design to match the product's intensity.",
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
        description: "Video Editor for an emerging artist's music video. Crafted a visual narrative that complemented the song's emotional arc.",
        video: "/assets/videos/universal-preview.mp4",
        poster: "/assets/images/universal-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Doctorpedia",
        description: "Editor & Cinematographer for an educational medical series. Translated complex topics into accessible and engaging video content.",
        video: "/assets/videos/doctorpedia-preview.mp4",
        poster: "/assets/images/doctorpedia-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "ComedyCulture",
        description: "Video Editor for short-form viral comedy reels. Optimized content for YouTube Shorts and Instagram Reels, focusing on pacing and timing.",
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
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<string | null>(workData[0].category);
  const [activeSubcategory, setActiveSubcategory] = useState(allSubcategories[0]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!containerRef.current || !leftRef.current || !rightRef.current) return;

        // Pin the entire section container
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftRef.current,
          pinSpacing: false,
        });

        // Triggers for each subcategory
        allSubcategories.forEach((subcategory) => {
          const subcategoryTrigger = containerRef.current?.querySelector(`[data-subcategory-trigger="${subcategory.title}"]`);
          if (!subcategoryTrigger) return;
          
          ScrollTrigger.create({
            trigger: subcategoryTrigger,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
              setActiveCategory(subcategory.category);
              setActiveSubcategory(subcategory);
            },
            onEnterBack: () => {
               setActiveCategory(subcategory.category);
               setActiveSubcategory(subcategory);
            },
          });
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
  
  useEffect(() => {
    // GSAP animation for video transition
    if (rightRef.current) {
        gsap.fromTo(rightRef.current.querySelector('.video-container'), 
            { autoAlpha: 0, scale: 0.98 },
            { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
    }
    if (videoRef.current) {
        videoRef.current.load();
    }
  }, [activeSubcategory]);


  const handleVideoHover = (e: React.MouseEvent<HTMLDivElement>, action: 'play' | 'pause') => {
    if (window.innerWidth < 768 || !videoRef.current) return;
    if (action === 'play') {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
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
            <div className="space-y-8 hidden md:block">
              {workData.map((cat) => {
                const isCategoryActive = activeCategory === cat.category;
                return (
                  <div key={cat.category}>
                    <h3 className={cn(
                        "font-headline text-2xl transition-colors duration-300 cursor-pointer",
                        isCategoryActive ? "text-primary" : "text-white/70"
                    )}
                    onClick={() => setActiveCategory(isCategoryActive ? null : cat.category)}
                    >
                        {cat.category}
                    </h3>
                    <div className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out pl-4 border-l-2",
                        isCategoryActive ? "max-h-[1000px] opacity-100 mt-4 border-primary" : "max-h-0 opacity-0 border-white/20"
                    )}>
                        <div className="space-y-6">
                            {cat.subcategories.map((sub) => {
                                const isSubcategoryActive = activeSubcategory.title === sub.title && isCategoryActive;
                                return (
                                    <div key={sub.title}>
                                        <h4 className={cn(
                                            "font-bold text-lg transition-colors duration-300",
                                            isSubcategoryActive ? "text-white" : "text-white/60"
                                        )}>
                                            {sub.title}
                                        </h4>
                                        <p className={cn(
                                            "text-white/70 text-sm transition-all duration-300 whitespace-pre-line",
                                            isSubcategoryActive ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
                                        )}>
                                            {sub.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Used for both desktop triggers and mobile content */}
        <div className="w-full md:w-2/3 md:py-20">
           <div className="p-4 md:p-8 space-y-16">
             {/* Desktop: Hidden triggers for scroll detection */}
             <div className="hidden md:block space-y-48">
              {workData.map((category) => (
                <div key={category.category} data-category={category.category}>
                  {category.subcategories.map((sub) => (
                    <div 
                      key={sub.title} 
                      data-subcategory-trigger={sub.title}
                      className="h-[100vh]" // Each trigger needs significant height
                    >
                      {/* This content is invisible, it's just for triggering scroll events */}
                    </div>
                  ))}
                </div>
              ))}
             </div>

             {/* Right Panel Video Display (Desktop) */}
             <div ref={rightRef} className="hidden md:flex items-center justify-center h-screen sticky top-0">
                {activeSubcategory && (
                    <div 
                        className="video-container relative group w-full max-w-2xl"
                        onClick={() => handleVideoClick(activeSubcategory.youtubeUrl)}
                        onMouseEnter={(e) => handleVideoHover(e, 'play')}
                        onMouseLeave={(e) => handleVideoHover(e, 'pause')}
                    >
                       <video
                          ref={videoRef}
                          key={activeSubcategory.video} // Key change forces re-render
                          poster={activeSubcategory.poster}
                          muted
                          loop
                          playsInline
                          className="w-full object-cover rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(213,0,50,0.7)] transition-shadow duration-300 cursor-pointer"
                          style={{ aspectRatio: '16/9' }}
                      >
                         <source src={activeSubcategory.video} type="video/mp4" />
                      </video>
                       <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <Play className="w-12 h-12 text-white/80" />
                        </div>
                    </div>
                )}
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
                           <p className="text-white/70 text-sm mb-4 whitespace-pre-line">{item.description}</p>
                           <div 
                              className="relative group"
                              onClick={() => handleVideoClick(item.youtubeUrl)}
                           >
                              <video
                                  src={item.video}
                                  poster={item.poster}
                                  controls
                                  className="w-full object-cover rounded-lg shadow-lg"
                                  style={{ aspectRatio: '16/9' }}
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