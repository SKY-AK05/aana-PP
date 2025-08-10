"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { ProgressBar } from './progress-bar';

gsap.registerPlugin(ScrollTrigger);

const workData = [
  {
    category: "OTT & Entertainment",
    subcategories: [
      {
        title: "Jio-Hotstar",
        description: `As the Creative Technologist & Editor for this AI-driven teaser campaign, my role began with extensive conceptual research. The objective was to push the boundaries of traditional promotional content by integrating AI-generated character concepts into the storytelling process. I oversaw the merging of VFX with these AI assets, ensuring seamless interaction between live-action and digital elements. Using Premiere Pro and After Effects, I crafted sequences that built suspense while retaining brand consistency. The editing process involved frame-accurate pacing, audio balancing, and color grading to evoke the right emotional tone. This approach not only impressed the client but also set a precedent for blending cutting-edge AI tools with mainstream OTT marketing.`,
        video: "/assets/videos/jiohotstar-preview.mp4",
        poster: "/assets/images/jiohotstar-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Prime Video",
        description: `For this high-stakes series trailer, my primary role as Video Editor was to craft a narrative defined by suspense and psychological tension. The project required a meticulous approach to pacing, where every cut, transition, and moment of silence was deliberate. I worked extensively with the director to select shots that maximized emotional impact and visual storytelling. Using DaVinci Resolve for color grading, I developed a moody, high-contrast look that enhanced the series' dark themes. The sound design, mixed in Adobe Audition, was layered with subtle foley and a haunting score to keep viewers on the edge of their seats. The final trailer successfully generated significant buzz, contributing to a strong launch viewership.`,
        video: "/assets/videos/primevideo-preview.mp4",
        poster: "/assets/images/primevideo-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Dharma Productions",
        description: `As an Assistant Editor on this character-driven promo, I was deeply involved in the post-production workflow from start to finish. My responsibilities included organizing and logging footage, creating initial assembly cuts, and managing media assets. This project was a masterclass in collaborative storytelling; I worked closely with the lead editor to refine scenes, focusing on performance and emotional resonance. I utilized Avid Media Composer to maintain a streamlined workflow across the team. A key challenge was weaving multiple character arcs into a cohesive and compelling narrative within a short runtime. The promo was praised for its emotional depth, a testament to the team's careful and dedicated editing process.`,
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
        description: `As the Lead Video Editor for this cinematic social media campaign, the goal was to create a visually rich and emotionally resonant experience that felt both premium and heartfelt. The core of the project was its color grading; I developed a warm, vibrant palette that made the product look irresistible while evoking feelings of joy and connection. The workflow involved a combination of Premiere Pro for editing and DaVinci Resolve for color. I integrated subtle motion graphics and dynamic transitions to maintain high energy and visual interest, ensuring the campaign stood out in a crowded digital landscape. The result was a significant increase in online engagement and brand sentiment.`,
        video: "/assets/videos/cadbury-preview.mp4",
        poster: "/assets/images/cadbury-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Coca-Cola",
        description: `Tasked as the Senior Video Editor for a global festive commercial, the creative challenge was to evoke a sense of universal magic and holiday wonder. I spearheaded the post-production process, integrating complex motion graphics and VFX sequences into the live-action footage. Working with a team of animators, we used After Effects to bring magical elements to life, from sparkling lights to animated characters. The edit was paced to a sweeping orchestral score, with each beat accentuating the on-screen action. The final commercial was a global success, celebrated for its technical artistry and its ability to capture the festive spirit across different cultures.`,
        video: "/assets/videos/cocacola-preview.mp4",
        poster: "/assets/images/cocacola-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
       {
        title: "Boat",
        description: `For the launch of a new gaming headset, I was the Lead Video Editor responsible for creating a high-energy, immersive ad. The project demanded an editing style that mirrored the intensity of competitive gaming. I used fast-paced cuts, dynamic camera movements, and impactful sound design to create a sense of action and excitement. The sound mix was crucial; I layered in-game audio, explosive sound effects, and a driving electronic soundtrack to create a powerful auditory experience. The visuals were enhanced with glitch effects and aggressive color grading in Premiere Pro, resulting in a product launch video that resonated strongly with the target gaming audience and drove impressive initial sales.`,
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
        description: `As the Video Editor for an emerging artist's debut music video, my focus was on crafting a visual narrative that was as compelling as the song itself. The concept was a blend of performance and storytelling, requiring a delicate balance between the two. I worked to create a visual arc that mirrored the song's emotional journey, from introspective verses to an explosive chorus. The edit involved creative transitions and a distinct color grade that established the artist's unique aesthetic. The final video was instrumental in launching the artist's career, earning praise for its authentic storytelling and visual polish.`,
        video: "/assets/videos/universal-preview.mp4",
        poster: "/assets/images/universal-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "Doctorpedia",
        description: `In my dual role as Editor and Cinematographer for this educational medical series, the challenge was to make complex health topics accessible and engaging for a lay audience. As cinematographer, I designed a clean, well-lit visual style that felt professional and trustworthy. As editor, I translated dense medical information into clear, concise video content, using motion graphics to illustrate key concepts. The editing process was focused on clarity and pacing, ensuring that viewers could easily follow along without feeling overwhelmed. The series was a great success, empowering thousands of patients with reliable and easy-to-understand medical knowledge.`,
        video: "/assets/videos/doctorpedia-preview.mp4",
        poster: "/assets/images/doctorpedia-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      },
      {
        title: "ComedyCulture",
        description: `This project involved editing short-form viral comedy reels for major social media platforms. The key to success in this format is timing. My role was to distill longer comedy sketches into punchy, 30-second videos optimized for platforms like YouTube Shorts and Instagram Reels. I focused on rapid-fire pacing, quick cuts, and using on-screen text and sound effects to maximize comedic impact. Each video was A/B tested for engagement, allowing us to refine our editing formula for what worked best. The result was a massive increase in channel viewership and follower growth, demonstrating the power of short-form video when edited effectively.`,
        video: "/assets/videos/comedy-preview.mp4",
        poster: "/assets/images/comedy-poster.jpg",
        youtubeUrl: "https://www.youtube.com"
      }
    ]
  }
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] =useState(0);
  
  const activeSubcategory = workData[activeCategoryIndex]?.subcategories[activeSubcategoryIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!containerRef.current || !leftRef.current || !rightRef.current) return;
        
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `bottom-=${rightRef.current.offsetHeight - window.innerHeight} bottom`,
          pin: leftRef.current,
          pinSpacing: false,
        });

        workData.forEach((category, catIndex) => {
          const categoryContainer = document.getElementById(`category-${catIndex}`);

          if(categoryContainer){
            ScrollTrigger.create({
              trigger: categoryContainer,
              start: "top 30%",
              end: "bottom 30%",
              onToggle: self => {
                  if (self.isActive) {
                    setActiveCategoryIndex(catIndex);
                  }
              }
            });

            category.subcategories.forEach((sub, subIndex) => {
                const subcategoryTrigger = document.getElementById(`subcategory-${catIndex}-${subIndex}`);
                if(subcategoryTrigger){
                   ScrollTrigger.create({
                        trigger: subcategoryTrigger,
                        start: "top center",
                        end: "bottom center",
                        onToggle: self => {
                            if (self.isActive) {
                               setActiveSubcategoryIndex(subIndex);
                            }
                        },
                    });
                }
            });
          }
        });
      });
      
      mm.add("(max-width: 767px)", () => {
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
  }, [activeCategoryIndex]);

  useEffect(() => {
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
    <section id="work" ref={containerRef} className="bg-black text-white film-grain overflow-hidden py-20 md:py-28">
      <div className="container mx-auto relative">
         <div className="text-center mb-16 md:mb-24">
            <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-6 cinematic-title">
              MY WORK
            </h2>
            <div className="hidden md:block">
              <ProgressBar 
                categories={workData} 
                activeCategoryIndex={activeCategoryIndex}
                activeSubcategoryIndex={activeSubcategoryIndex}
              />
            </div>
         </div>

        <div className="flex flex-col md:flex-row min-h-[100vh]">
          {/* Left Panel */}
          <div ref={leftRef} className="md:w-1/2 md:h-screen p-4 md:p-8 flex-col justify-center self-start md:sticky top-0 hidden md:flex">
            {/* This space will be pinned, content is driven by scroll on the right */}
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{minHeight: "400px"}}
            >
              {workData.map((cat, catIndex) => (
                cat.subcategories.map((sub, subIndex) => {
                  const isActive = activeCategoryIndex === catIndex && activeSubcategoryIndex === subIndex;
                  return (
                    <div key={`${catIndex}-${subIndex}`} className={cn(
                      "absolute inset-0 flex flex-col justify-center transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0"
                    )}>
                      <h3 className="font-headline text-3xl font-bold text-primary mb-4">
                        {sub.title}
                      </h3>
                      <p className="text-white/80 leading-relaxed whitespace-pre-line text-lg">
                        {sub.description}
                      </p>
                    </div>
                  )
                })
              ))}
            </div>
          </div>

          {/* Right Panel (Scrollable content) */}
          <div ref={rightRef} className="w-full md:w-1/2 md:py-8">
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

               {/* Hidden scroll triggers for desktop */}
              <div className="hidden md:block">
                 {workData.map((cat, catIndex) => (
                    <div key={cat.category} id={`category-${catIndex}`} className="h-[200vh]">
                       {cat.subcategories.map((sub, subIndex) => (
                          <div key={sub.title} id={`subcategory-${catIndex}-${subIndex}`} className="h-[100vh]"></div>
                       ))}
                    </div>
                 ))}
              </div>
              
              {/* Mobile View */}
              <div className="block md:hidden space-y-12 p-4">
                  {workData.map((cat) => (
                    <div key={cat.category} className="mobile-section">
                       <h3 className="font-headline text-3xl text-primary mb-6">{cat.category}</h3>
                       <div className="space-y-8">
                         {cat.subcategories.map(item => (
                           <div key={item.title}>
                             <h4 className="font-bold text-xl text-white mb-2">{item.title}</h4>
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
