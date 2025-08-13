'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CareerStep {
  stepNumber: number;
  company: string;
  role: string;
  period: string;
  title: string;
  shortDescription: string;
  achievements: string[];
  brands?: string[];
  youtubeUrl?: string;
  videoId?: string;
}

// Define career data
const careerData: CareerStep[] = [
  {
    stepNumber: 1,
    company: 'Sociohub Media',
    role: 'Lead Video Editor & Cinematography',
    period: '2024 – Present',
    title: 'Leading creative video production from concept to delivery',
    shortDescription:
      'Managing end-to-end influencer and brand video campaigns that drive engagement and reach for top-tier brands and content creators.',
    achievements: [
      'Shot & edited influencer content for Comedy Culture\'s YouTube channel',
      'Collaborated with top brands like Cadbury, Coca-Cola, Sony Pictures, Zee Group, Xiaomi, Boat',
      'Led a team of 8 editors delivering fast-paced, trend-setting reels',
      'Achieved 40% increase in engagement rates across client campaigns',
    ],
    brands: ['Cadbury', 'Coca-Cola', 'Sony Pictures', 'Xiaomi', 'Boat'],
    youtubeUrl: 'https://www.youtube.com/@ComedyCulture',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    stepNumber: 2,
    company: 'Twilight Entertainment',
    role: 'Senior Video Editor',
    period: '2023 – 2024',
    title: 'Specialized in creating compelling video content with AI integration',
    shortDescription:
      'Delivering high-impact campaigns across 200+ brands in 30+ industries, integrating cutting-edge AI technology for innovative storytelling.',
    achievements: [
      'Delivered content for 200+ brands across 30+ diverse industries',
      'Specialized in high-impact campaigns from music videos to influencer reels',
      'Integrated AI-generated characters for innovative storytelling approaches',
      'Maintained 99% client satisfaction rate with rapid turnaround times',
    ],
    brands: ['Universal Music', 'Dharma Productions', 'Prime Video'],
    youtubeUrl: 'https://www.youtube.com/@TwilightEntertainment',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    stepNumber: 3,
    company: 'Cocoma Digital',
    role: 'Video Editor (Team Lead)',
    period: '2021 – 2023',
    title: 'Premium content for major streaming platforms',
    shortDescription:
      'Specialized in branded video content and digital monetization strategies for leading streaming platforms and high-traffic channels.',
    achievements: [
      'Edited music videos, trailers & teasers for Prime Video originals',
      'Produced branded content for Tata EV Motors and Amazon mini TV',
      'Managed YouTube monetization for multiple high-traffic channels',
      'Delivered content for Langistan and other premium streaming projects',
    ],
    brands: ['Prime Video', 'Amazon', 'Tata Motors'],
    youtubeUrl: 'https://www.youtube.com/@CocomaDigital',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    stepNumber: 4,
    company: 'Travenix & Vijayeesam',
    role: 'Photographer & Video Editor',
    period: '2020',
    title: 'Developed expertise in photography and video editing',
    shortDescription:
      'Building foundational skills in visual storytelling through photography and video editing for various commercial and creative projects.',
    achievements: [
      'Created compelling visual content for travel and lifestyle brands',
      'Developed photography skills alongside video editing expertise',
      'Managed multiple client projects with tight deadlines',
      'Built portfolio across different creative disciplines',
    ],
    brands: ['Travel', 'Lifestyle', 'Commercial'],
    youtubeUrl: 'https://www.youtube.com/@TravenixMedia',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    stepNumber: 5,
    company: 'Box Office India & Sound Box India',
    role: 'Video Editor',
    period: '2018 – 2020',
    title: 'Started professional journey in video editing',
    shortDescription:
      'Beginning career in video editing with focus on entertainment content, building technical skills and industry knowledge.',
    achievements: [
      'Edited entertainment content for Box Office India',
      'Worked on sound design and audio post-production',
      'Developed technical proficiency in professional editing software',
      'Built foundation for future career growth in video production',
    ],
    brands: ['Box Office', 'Entertainment', 'Audio'],
    youtubeUrl: 'https://www.youtube.com/@BoxOfficeIndia',
    videoId: 'dQw4w9WgXcQ',
  },
];

const YouTubeVideoCard: React.FC<{ step: CareerStep }> = ({ step }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (step.youtubeUrl) {
      window.open(step.youtubeUrl, '_blank');
    }
  };

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Video Thumbnail/Preview */}
      <div className="relative w-full h-full">
        {step.videoId && (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${step.videoId}?autoplay=${
              isHovered ? 1 : 0
            }&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
            title={`${step.company} - ${step.role}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

        {/* YouTube Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`bg-red-600 rounded-full p-4 transform transition-all duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Company Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white font-bold text-lg">{step.company}</div>
          <div className="text-gray-300 text-sm">{step.period}</div>
        </div>

        {/* YouTube Logo */}
        <div className="absolute top-4 right-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const MyWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const container = sectionRef.current?.querySelector(
        '.horizontal-container'
      ) as HTMLElement;
      const slides = gsap.utils.toArray('.work-slide') as HTMLElement[];

      if (container && slides.length > 0) {
        // Set up smooth horizontal scroll
        const totalWidth = slides.length * window.innerWidth;

        // Enable GPU acceleration
        gsap.set(container, { willChange: 'transform' });
        gsap.set(slides, { willChange: 'transform, opacity' });

        // Main horizontal scroll timeline
        const timeline = gsap.to(container, {
          x: () => -(totalWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: self => {
              setScrollProgress(self.progress * 100);
            }
          },
        });
        
        // Individual slide animations
        slides.forEach((slide) => {
          const content = slide.querySelector('.slide-content');
          const video = slide.querySelector('.video-card');

          if (content && video) {
            gsap.fromTo(
              [content, video],
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut',
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: timeline,
                  start: 'left 80%',
                  end: 'right 20%',
                  scrub: true,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Simplified Section Header (sticky) */}
      <div className="sticky top-0 z-20 py-8 px-8 bg-gradient-to-r from-black/80 to-[#e50914]/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl lg:text-7xl font-bold font-headline text-white mb-4">
            MY WORK
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl">
            A showcase of my professional journey through video editing and cinematography
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="horizontal-container flex" style={{ willChange: 'transform' }}>
        {careerData.map((step, stepIndex) => (
          <div
            key={stepIndex}
            className="work-slide flex-shrink-0 w-screen h-screen flex items-center justify-center"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-[80vh]">
              {stepIndex % 2 === 0 ? (
                <>
                  <div className="video-card h-full order-1 lg:order-1">
                    <YouTubeVideoCard step={step} />
                  </div>
                  <div className="slide-content space-y-6 order-2 lg:order-2">
                    <div>
                      <h3 className="text-3xl font-bold text-[#e50914] font-headline mb-2">
                        {step.company}
                      </h3>
                      <p className="text-gray-400 font-medium mb-4">{step.period}</p>
                      <h4 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-headline leading-tight">
                        {step.role}
                      </h4>
                      <p className="text-xl text-gray-300 leading-relaxed mb-4">
                        {step.title}
                      </p>
                      <p className="text-base text-gray-400 leading-relaxed">
                        {step.shortDescription}
                      </p>
                    </div>

                    {step.brands && (
                      <div className="flex flex-wrap gap-3">
                        {step.brands.map((brand, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-[#e50914]/20 border border-[#e50914]/30 text-[#e50914] text-sm font-medium rounded-full"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="slide-content space-y-6 order-2 lg:order-1">
                    <div>
                       <h3 className="text-3xl font-bold text-[#e50914] font-headline mb-2">
                        {step.company}
                      </h3>
                      <p className="text-gray-400 font-medium mb-4">{step.period}</p>
                      <h4 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-headline leading-tight">
                        {step.role}
                      </h4>
                      <p className="text-xl text-gray-300 leading-relaxed mb-4">
                        {step.title}
                      </p>
                      <p className="text-base text-gray-400 leading-relaxed">
                        {step.shortDescription}
                      </p>
                    </div>
                    {step.brands && (
                      <div className="flex flex-wrap gap-3">
                        {step.brands.map((brand, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-[#e50914]/20 border border-[#e50914]/30 text-[#e50914] text-sm font-medium rounded-full"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="video-card h-full order-1 lg:order-2">
                    <YouTubeVideoCard step={step} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-800/50 z-30">
          <div className="h-full bg-[#e50914]" style={{ width: `${scrollProgress}%` }} />
      </div>
    </section>
  );
};

export default MyWorkSection;
