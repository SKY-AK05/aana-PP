
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

const YouTubeVideoCard: React.FC<{ step: CareerStep | null, isVisible: boolean }> = ({ step, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!step) return null;

  const handleClick = () => {
    if (step.youtubeUrl) {
      window.open(step.youtubeUrl, '_blank');
    }
  };

  return (
    <div
      className={`relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl cursor-pointer group transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
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

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

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

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white font-bold text-lg">{step.company}</div>
          <div className="text-gray-300 text-sm">{step.period}</div>
        </div>

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
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<CareerStep | null>(careerData[0]);
  const [isCardVisible, setIsCardVisible] = useState(true);

  useEffect(() => {
    if (!sectionRef.current || !rightPanelRef.current) return;
    
    const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Pin the right panel
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              pin: rightPanelRef.current,
              pinSpacing: false,
            });

            // Create triggers for each text block on the left
            careerData.forEach((step) => {
              ScrollTrigger.create({
                trigger: `#step-${step.stepNumber}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                  setIsCardVisible(false);
                  setTimeout(() => {
                    setActiveStep(step);
                    setIsCardVisible(true);
                  }, 300); // Wait for fade out to complete
                },
                onEnterBack: () => {
                   setIsCardVisible(false);
                  setTimeout(() => {
                    setActiveStep(step);
                    setIsCardVisible(true);
                  }, 300);
                },
              });
            });
        });

        // Simple stagger animation for mobile
        mm.add("(max-width: 767px)", () => {
          gsap.utils.toArray('.mobile-work-item').forEach((item: any) => {
            gsap.from(item, {
              opacity: 0,
              y: 50,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            });
          });
        });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl lg:text-7xl font-bold font-headline text-white mb-4">
            MY WORK
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto">
            A showcase of my professional journey through video editing and cinematography.
          </p>
        </div>

        {/* Desktop Layout: 2-column with sticky right panel */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left Panel: Scrolling Text Content */}
          <div className="left-panel flex flex-col">
            {careerData.map((step) => (
              <div key={step.stepNumber} id={`step-${step.stepNumber}`} className="min-h-screen py-24 flex flex-col justify-center">
                  <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-primary font-headline mb-2">
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
              </div>
            ))}
          </div>

          {/* Right Panel: Sticky Video */}
          <div ref={rightPanelRef} className="right-panel h-screen flex items-center justify-center">
              <div className="w-full aspect-[16/10]">
                  <YouTubeVideoCard step={activeStep} isVisible={isCardVisible} />
              </div>
          </div>
        </div>

        {/* Mobile Layout: Stacked cards */}
        <div className="md:hidden space-y-16">
            {careerData.map((step) => (
                <div key={step.stepNumber} className="mobile-work-item">
                    <div className="space-y-4 mb-6">
                      <h3 className="text-2xl font-bold text-primary font-headline">
                        {step.company}
                      </h3>
                      <p className="text-gray-400 font-medium">{step.period}</p>
                      <h4 className="text-3xl font-bold text-white font-headline leading-tight">
                        {step.role}
                      </h4>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {step.title}
                      </p>
                      <p className="text-base text-gray-400 leading-relaxed">
                        {step.shortDescription}
                      </p>
                    </div>
                    <div className="w-full aspect-[16/10]">
                        <YouTubeVideoCard step={step} isVisible={true} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MyWorkSection;

    