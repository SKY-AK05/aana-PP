"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { Video, Scissors, Layers, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Video className="w-12 h-12 text-primary" />,
    title: 'Video Editing',
    description: 'Crafting compelling stories from raw footage through precise cutting, sequencing, and sound mixing.',
    previewVideo: "/assets/videos/cadbury-preview.mp4",
  },
  {
    icon: <Sparkles className="w-12 h-12 text-primary" />,
    title: 'Motion Graphics',
    description: 'Bringing static visuals to life with dynamic intros, lower thirds, and engaging animations.',
    previewVideo: "/assets/videos/boat-preview.mp4",
  },
  {
    icon: <Layers className="w-12 h-12 text-primary" />,
    title: 'Graphic Design',
    description: 'Creating stunning visuals for thumbnails, branding, and social media that capture attention.',
    previewVideo: "/assets/videos/primevideo-preview.mp4",
  },
  {
    icon: <Scissors className="w-12 h-12 text-primary" />,
    title: 'Color Grading',
    description: 'Enhancing footage with professional color correction to create a consistent, cinematic look.',
    previewVideo: "/assets/videos/cocacola-preview.mp4",
  },
];

export function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useLayoutEffect(() => {
        const leftEl = leftRef.current;
        const rightEl = rightRef.current;

        if (!leftEl || !rightEl || !sectionRef.current) return;

        const cards = gsap.utils.toArray<HTMLDivElement>('.service-card');
        videoRefs.current = cards.map(card => card.querySelector('video'));

        const playVideo = (index: number) => {
            videoRefs.current.forEach((video, i) => {
                if (video) {
                    if (i === index) {
                        video.play().catch(e => console.error("Video play failed", e));
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });
        };

        const ctx = gsap.context(() => {
             // Pin the left column
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${rightEl.offsetHeight - window.innerHeight}`,
                pin: leftEl,
                pinSpacing: true,
                scrub: true,
            });

            // Animate card content on scroll
            cards.forEach((card, index) => {
                const cardContent = card.querySelector('.service-card-content');
                gsap.fromTo(card,
                    { opacity: 0.3, scale: 0.95 },
                    {
                    opacity: 1,
                    scale: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top center+=100',
                        end: 'center center',
                        scrub: 1,
                        onEnter: () => playVideo(index),
                        onEnterBack: () => playVideo(index),
                    }
                });

                 gsap.fromTo(cardContent,
                    { y: 30, opacity: 0 },
                    {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top center',
                        end: 'center center',
                        scrub: 1,
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-black border-t border-border overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* Left Sticky Column */}
            <div ref={leftRef} className="md:h-screen flex flex-col justify-center">
                <div className="max-w-md">
                     <h2 className="font-headline text-5xl md:text-6xl font-bold cinematic-title mb-6">What I Do</h2>
                    <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
                        I offer a range of specialized services to bring your vision to life with cinematic quality and creative flair. Each service is tailored to meet the unique demands of your project.
                    </p>
                </div>
            </div>

            {/* Right Scrollable Column */}
            <div ref={rightRef} className="flex flex-col gap-24 md:gap-32">
                {services.map((service, index) => (
                    <div 
                        key={index}
                        className="service-card h-screen flex items-center justify-center relative rounded-2xl overflow-hidden group"
                    >
                        <video
                            ref={el => videoRefs.current[index] = el}
                            src={service.previewVideo}
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                            muted
                            loop
                            playsInline
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                        
                        <div className="service-card-content relative text-center p-8 max-w-lg">
                            <div className="inline-block mb-6 bg-primary/10 p-4 rounded-full border border-primary/50">
                                {service.icon}
                            </div>
                            <h3 className="text-4xl font-bold font-headline text-white mb-4">{service.title}</h3>
                            <p className="text-foreground/80 leading-relaxed text-lg">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
