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

const careerData: CareerStep[] = [
  {
    stepNumber: 1,
    company: "Sociohub Media",
    role: "Lead Video Editor & Cinematography",
    period: "2024 – Present",
    title: "Leading creative video production from concept to delivery",
    shortDescription: "Managing end-to-end influencer and brand video campaigns that drive engagement and reach for top-tier brands and content creators.",
    achievements: [
      "Shot & edited influencer content for Comedy Culture's YouTube channel",
      "Collaborated with top brands like Cadbury, Coca-Cola, Sony Pictures, Zee Group, Xiaomi, Boat",
      "Led a team of 8 editors delivering fast-paced, trend-setting reels",
      "Achieved 40% increase in engagement rates across client campaigns"
    ],
    brands: ["Cadbury", "Coca-Cola", "Sony Pictures", "Xiaomi", "Boat"],
    youtubeUrl: "https://www.youtube.com/@ComedyCulture",
    videoId: "dQw4w9WgXcQ"
  },
  {
    stepNumber: 2,
    company: "Twilight Entertainment", 
    role: "Senior Video Editor",
    period: "2023 – 2024",
    title: "Specialized in creating compelling video content with AI integration",
    shortDescription: "Delivering high-impact campaigns across 200+ brands in 30+ industries, integrating cutting-edge AI technology for innovative storytelling.",
    achievements: [
      "Delivered content for 200+ brands across 30+ diverse industries",
      "Specialized in high-impact campaigns from music videos to influencer reels",
      "Integrated AI-generated characters for innovative storytelling approaches",
      "Maintained 99% client satisfaction rate with rapid turnaround times"
    ],
    brands: ["Universal Music", "Dharma Productions", "Prime Video"],
    youtubeUrl: "https://www.youtube.com/@TwilightEntertainment",
    videoId: "dQw4w9WgXcQ"
  }
];

// Add remaining career steps
careerData.push(
  {
    stepNumber: 3,
    company: "Cocoma Digital",
    role: "Video Editor (Team Lead)",
    period: "2021 – 2023",
    title: "Premium content for major streaming platforms",
    shortDescription: "Specialized in branded video content and digital monetization strategies for leading streaming platforms and high-traffic channels.",
    achievements: [
      "Edited music videos, trailers & teasers for Prime Video originals",
      "Produced branded content for Tata EV Motors and Amazon mini TV",
      "Managed YouTube monetization for multiple high-traffic channels",
      "Delivered content for Langistan and other premium streaming projects"
    ],
    brands: ["Prime Video", "Amazon", "Tata Motors"],
    youtubeUrl: "https://www.youtube.com/@CocomaDigital",
    videoId: "dQw4w9WgXcQ"
  },
  {
    stepNumber: 4,
    company: "Travenix & Vijayeesam",
    role: "Photographer & Video Editor",
    period: "2020",
    title: "Developed expertise in photography and video editing",
    shortDescription: "Building foundational skills in visual storytelling through photography and video editing for various commercial and creative projects.",
    achievements: [
      "Created compelling visual content for travel and lifestyle brands",
      "Developed photography skills alongside video editing expertise",
      "Managed multiple client projects with tight deadlines",
      "Built portfolio across different creative disciplines"
    ],
    brands: ["Travel", "Lifestyle", "Commercial"],
    youtubeUrl: "https://www.youtube.com/@TravenixMedia",
    videoId: "dQw4w9WgXcQ"
  },
  {
    stepNumber: 5,
    company: "Box Office India & Sound Box India",
    role: "Video Editor",
    period: "2018 – 2020",
    title: "Started professional journey in video editing",
    shortDescription: "Beginning career in video editing with focus on entertainment content, building technical skills and industry knowledge.",
    achievements: [
      "Edited entertainment content for Box Office India",
      "Worked on sound design and audio post-production",
      "Developed technical proficiency in professional editing software",
      "Built foundation for future career growth in video production"
    ],
    brands: ["Box Office", "Entertainment", "Audio"],
    youtubeUrl: "https://www.youtube.com/@BoxOfficeIndia",
    videoId: "dQw4w9WgXcQ"
  }
);const 
YouTubeVideoCard: React.FC<{
  step: CareerStep;
}> = ({ step }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (step.youtubeUrl) {
      window.open(step.youtubeUrl, '_blank');
    }
  };

  return (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl cursor-pointer group transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ willChange: 'transform' }}
    >
      {/* Static Thumbnail instead of iframe for better performance */}
      <div className="relative w-full h-full">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          {/* Thumbnail placeholder */}
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{step.company}</div>
            <div className="text-gray-400">{step.role}</div>
          </div>
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-opacity duration-300" />
        
        {/* YouTube Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`bg-red-600 rounded-full p-4 transform transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
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
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};const 
MyWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastUpdateTime = useRef(0);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const container = sectionRef.current?.querySelector('.horizontal-container') as HTMLElement;
      const slides = gsap.utils.toArray('.work-slide') as HTMLElement[];
      
      if (container && slides.length > 0) {
        // Set up smooth horizontal scroll
        const totalWidth = slides.length * window.innerWidth;
        
        // Enable GPU acceleration and optimize for performance
        gsap.set(container, { 
          willChange: "transform",
          force3D: true,
          transformOrigin: "0 0"
        });
        
        gsap.set(slides, { 
          willChange: "auto",
          force3D: true
        });

        // Simplified main horizontal scroll - single ScrollTrigger for better performance
        const scrollTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.3, // Further reduced scrub for smoother animation
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1, // Lower priority for better performance
          onUpdate: (self) => {
            const now = Date.now();
            
            // Throttle updates to 60fps for smoother performance
            if (now - lastUpdateTime.current < 16) return;
            lastUpdateTime.current = now;
            
            const progress = self.progress;
            const currentStepIndex = Math.min(Math.floor(progress * careerData.length), careerData.length - 1);
            const stepProgress = ((progress * careerData.length) % 1) * 100;
            
            // Use requestAnimationFrame for smooth state updates
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
            }
            
            animationFrameId.current = requestAnimationFrame(() => {
              if (currentStepIndex !== activeStep) {
                setActiveStep(currentStepIndex);
              }
              setScrollProgress(stepProgress);
              
              // Simple header fade without additional animations
              const header = document.querySelector('.header-container');
              if (header) {
                (header as HTMLElement).style.opacity = String(1 - (progress * 0.2));
              }
            });
          },
          animation: gsap.to(container, {
            x: () => -(totalWidth - window.innerWidth),
            ease: "none",
            force3D: true
          })
        });

        // Pre-set all slides to visible to avoid layout shifts
        gsap.set(slides, { opacity: 1, y: 0 });
      }

      // Initialize state
      setActiveStep(0);
      setScrollProgress(0);

    }, sectionRef);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Remove activeStep dependency to prevent re-initialization

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-background text-foreground overflow-hidden scroll-optimized film-grain"
      style={{ 
        willChange: 'auto',
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
      {/* Compact Sticky Header */}
      <div className="header-container sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Compact Title */}
            <div className="flex items-center space-x-6">
              <h2 className="text-2xl lg:text-3xl font-black font-headline cinematic-title">MY WORK</h2>
              <span className="hidden lg:block text-foreground/60 text-sm font-medium">Career journey through video editing and cinematography</span>
            </div>
            
            {/* Compact Progress Tracker */}
            <div className="flex items-center space-x-3">
              {careerData.map((step, index) => (
                <div key={index} className="flex items-center">
                  {/* Compact Step Circle */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs cinematic-transition ${
                      index <= activeStep
                        ? 'bg-primary border-primary text-primary-foreground cinematic-glow'
                        : 'bg-transparent border-border text-foreground/50'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Company Name - Hidden on mobile */}
                    <div className="hidden md:block">
                      <div className={`text-xs font-medium cinematic-transition ${
                        index <= activeStep ? 'text-primary' : 'text-foreground/50'
                      }`}>
                        {step.company.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Connecting Line */}
                  {index < careerData.length - 1 && (
                    <div className="relative mx-2 w-6">
                      <div className="h-px bg-border w-full" />
                      <div 
                        className="absolute top-0 left-0 h-px bg-primary cinematic-transition"
                        style={{
                          width: index < activeStep 
                            ? '100%' 
                            : index === activeStep 
                              ? `${scrollProgress}%`
                              : '0%'
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container - Optimized for smooth scrolling */}
      <div className="horizontal-container flex transform-gpu" style={{ willChange: 'transform' }}>
        {careerData.map((step, stepIndex) => (
          <div 
            key={stepIndex} 
            className="work-slide flex-shrink-0 w-screen min-h-[90vh] flex items-center transform-gpu" 
            style={{ willChange: 'auto' }}
          >
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
              
              {/* Left Content - Optimized for better space usage */}
              <div className="slide-content space-y-4 transform-gpu">
                {/* Company Header - Compact */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl lg:text-3xl font-black text-primary font-headline">
                    {step.company}
                  </h3>
                  <span className="text-foreground/60 text-sm font-medium">{step.period}</span>
                </div>
                
                {/* Role - Prominent but not oversized */}
                <h4 className="text-3xl lg:text-4xl font-black text-foreground font-headline leading-tight">
                  {step.role}
                </h4>
                
                {/* Title - Concise */}
                <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed">
                  {step.title}
                </p>
                
                {/* Description - Compact */}
                <p className="text-base text-foreground/70 leading-relaxed">
                  {step.shortDescription}
                </p>
                
                {/* Achievements - Compact list */}
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider">Key Achievements</h5>
                  <div className="space-y-1">
                    {step.achievements.slice(0, 3).map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Brand Tags - Compact */}
                {step.brands && (
                  <div className="flex flex-wrap gap-2">
                     {step.brands.map((brand, index) => (
                       <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                         {brand}
                       </span>
                     ))}
                  </div>
                )}
              </div>

              {/* Right Video Card - Centered and optimized */}
              <div className="video-card flex items-center justify-center transform-gpu">
                <div className="w-full max-w-lg aspect-[16/9]">
                  <YouTubeVideoCard step={step} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyWorkSection;