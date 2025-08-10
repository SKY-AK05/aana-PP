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
        description: `Creative Technologist & Editor for AI-based teasers.
        Developed unique character concepts using AI tools, blending VFX 
        and storytelling for audience engagement.`,
        video: "/assets/videos/jiohotstar-preview.mp4",
        poster: "/assets/images/jiohotstar-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Prime Video",
        description: `Video Editor for suspense-driven series trailer.
        Managed pacing, transitions, and visual tone for maximum tension.`,
        video: "/assets/videos/primevideo-preview.mp4",
        poster: "/assets/images/primevideo-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Dharma Productions",
        description: `Assistant Editor for character-driven promo. Focused on 
        emotional impact through careful shot selection and sound design.`,
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
        description: `Lead Video Editor for a cinematic social media campaign. 
        Blended rich color grading with dynamic shots to boost online engagement.`,
        video: "/assets/videos/cadbury-preview.mp4",
        poster: "/assets/images/cadbury-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Coca-Cola",
        description: `Senior Video Editor for a festive holiday commercial. 
        Integrated motion graphics and visual effects to create a magical atmosphere.`,
        video: "/assets/videos/cocacola-preview.mp4",
        poster: "/assets/images/cocacola-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
       {
        title: "Boat",
        description: `Lead Video Editor for a high-energy gaming headset launch. 
        Utilized fast-paced editing and sound design to match the product's intensity.`,
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
        description: `Video Editor for an emerging artist's music video. 
        Crafted a visual narrative that complemented the song's emotional arc.`,
        video: "/assets/videos/universal-preview.mp4",
        poster: "/assets/images/universal-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Doctorpedia",
        description: `Editor & Cinematographer for an educational medical series. 
        Translated complex topics into accessible and engaging video content.`,
        video: "/assets/videos/doctorpedia-preview.mp4",
        poster: "/assets/images/doctorpedia-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "ComedyCulture",
        description: `Video Editor for short-form viral comedy reels. Optimized content 
        for YouTube Shorts and Instagram Reels, focusing on pacing and timing.`,
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
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeSubcategory, setActiveSubcategory] = useState(allSubcategories[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(workData[0].category);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!containerRef.current || !leftRef.current || !rightRef.current) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftRef.current,
          pinSpacing: false,
        });

        const categoryContainers = gsap.utils.toArray<HTMLDivElement>('.category-container');
        categoryContainers.forEach((catContainer) => {
          const categoryContent = catContainer.querySelector('.category-content');
          if (!categoryContent) return;

          ScrollTrigger.create({
            trigger: catContainer,
            start: "top 70%",
            end: "bottom 30%",
            onToggle: self => {
              if (self.isActive) {
                const categoryName = catContainer.dataset.category;
                if (categoryName) setActiveCategory(categoryName);
              }
            }
          });
        });

        const subcategoryTriggers = gsap.utils.toArray<HTMLDivElement>('.subcategory-trigger');
        subcategoryTriggers.forEach((trigger) => {
          const subTitle = trigger.dataset.title;
          const sub = allSubcategories.find(s => s.title === subTitle);
          if (!sub) return;

          ScrollTrigger.create({
            trigger: trigger,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSubcategory(sub),
            onEnterBack: () => setActiveSubcategory(sub),
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
    if (videoContainerRef.current) {
      gsap.fromTo(videoContainerRef.current, 
        { autoAlpha: 0, scale: 0.95 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
    if (videoRef.current) {
        videoRef.current.load();
    }
  }, [activeSubcategory]);

  const handleVideoHover = (action: 'play' | 'pause') => {
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
          <div className="w-full">
            <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-12 cinematic-title">
              MY WORK
            </h2>
            <div className="space-y-8 hidden md:block">
              {workData.map((cat) => {
                const isCategoryActive = activeCategory === cat.category;
                return (
                  <div key={cat.category} className="category-container" data-category={cat.category}>
                    <h3 className={cn(
                        "font-headline text-2xl transition-colors duration-300",
                        isCategoryActive ? "text-primary" : "text-white/70"
                    )}>
                        {cat.category}
                    </h3>
                    <div className={cn(
                        "category-content overflow-hidden transition-all duration-700 ease-in-out pl-4 border-l-2",
                        isCategoryActive ? "max-h-[1000px] opacity-100 mt-4 border-primary" : "max-h-0 opacity-0 mt-0 border-white/20"
                    )}>
                        <div className="space-y-6">
                            {cat.subcategories.map((sub) => {
                                const isSubcategoryActive = activeSubcategory.title === sub.title && isCategoryActive;
                                return (
                                    <div key={sub.title} className="subcategory-trigger" data-title={sub.title}>
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

        {/* Right Panel */}
        <div ref={rightRef} className="w-full md:w-2/3 md:py-20 flex items-center justify-center">
            {/* Desktop Video Display */}
            <div className="hidden md:flex items-center justify-center h-screen sticky top-0 w-full">
                {activeSubcategory && (
                    <div 
                        ref={videoContainerRef}
                        className="relative group w-full max-w-2xl cursor-pointer"
                        onClick={() => handleVideoClick(activeSubcategory.youtubeUrl)}
                        onMouseEnter={() => handleVideoHover('play')}
                        onMouseLeave={() => handleVideoHover('pause')}
                    >
                       <video
                          ref={videoRef}
                          key={activeSubcategory.video} 
                          poster={activeSubcategory.poster}
                          muted
                          loop
                          playsInline
                          className="w-full object-cover rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(213,0,50,0.7)] transition-shadow duration-300"
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
            <div className="block md:hidden space-y-12 p-4">
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
    </section>
  );
}
