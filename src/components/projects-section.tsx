"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './project-card';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Chocolate Symphony – Cadbury Campaign",
        subtitle: "Cadbury | Lead Video Editor",
        description: "Produced a cinematic social-media campaign video highlighting Cadbury's new dark chocolate. Blended rich color grading with dynamic shots of the product, crafting a narrative that boosted online engagement by 25%. I led storyboarding, cinematography, and final edit to emphasize the brand's heritage and sensory experience.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/cadbury-preview.mp4",
        poster: "/assets/images/cadbury-poster.jpg",
        aiHint: "chocolate commercial",
        tags: ["Video Editing", "Cinematography", "Color Grading", "Storyboarding"]
    },
    {
        title: "Winter Wonderland – Coca-Cola Festive Spot",
        subtitle: "Coca-Cola | Senior Video Editor",
        description: "Edited a festive holiday commercial for Coca-Cola. Integrated live-action and motion graphics to create a warm, nostalgic mood. Optimized pacing and music cues for maximal emotional impact during the holiday season; the spot earned 100k+ views within days of release.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/cocacola-preview.mp4",
        poster: "/assets/images/cocacola-poster.jpg",
        aiHint: "holiday commercial",
        tags: ["Video Editing", "Motion Graphics", "Sound Design", "Adobe After Effects"]
    },
    {
        title: "Prime Time – Prime Video Trailer",
        subtitle: "Prime Video | Video Editor",
        description: "Crafted the theatrical trailer for Prime Video's new series. Oversaw footage selection and suspenseful pacing, intercutting scenes to highlight the show's dramatic tension. The final trailer was featured on Prime's homepage and achieved high click-through rates.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/primevideo-preview.mp4",
        poster: "/assets/images/primevideo-poster.jpg",
        aiHint: "movie trailer",
        tags: ["Video Editing", "Trailer Editing", "Color Correction", "Adobe Premiere Pro"]
    },
    {
        title: "Starlight – Dharma Productions Promo",
        subtitle: "Dharma Productions | Assistant Editor",
        description: "Worked on the promotional video for a Dharma Productions film. Edited interviews and B-roll into a cohesive teaser, focusing on character-driven storytelling. My contribution helped the promo video trend on YouTube upon release.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/dharma-preview.mp4",
        poster: "/assets/images/dharma-poster.jpg",
        aiHint: "bollywood film",
        tags: ["Video Editing", "Cinematography", "Interview Filming", "DaVinci Resolve"]
    },
    {
        title: "AI Faces – Jio-Hotstar Original IP",
        subtitle: "Jio-Hotstar | Creative Technologist & Editor",
        description: "Developed AI-generated character visuals for a Jio-Hotstar original series. Combined my cinematography skills with custom AI tools to create lifelike avatars. Produced the launch video demonstrating the AI characters, showcasing the fusion of tech and storytelling.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/jiohotstar-preview.mp4",
        poster: "/assets/images/jiohotstar-poster.jpg",
        aiHint: "AI characters",
        tags: ["AI Tools", "Video Editing", "Visual Effects", "Python"]
    },
    {
        title: "Ocean Beats – Universal Music Video",
        subtitle: "Universal Music | Video Editor",
        description: "Edited a music video for an emerging Universal Music artist. Matched rhythm edits to the beat and applied cinematic color grades to enhance mood. The video's polished look helped it gain playlist rotations on music channels.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/universal-preview.mp4",
        poster: "/assets/images/universal-poster.jpg",
        aiHint: "music video",
        tags: ["Video Editing", "Music Video Editing", "Color Grading", "Adobe Premiere Pro"]
    },
    {
        title: "Glide – Boat Gaming Headset Campaign",
        subtitle: "Boat | Lead Video Editor",
        description: "Created a high-energy product launch video for Boat's gaming headset. Merged in-game footage and product shots with dynamic graphics. My edit highlighted product features and the gaming experience, leading to strong social engagement from the gaming community.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/boat-preview.mp4",
        poster: "/assets/images/boat-poster.jpg",
        aiHint: "gaming headset",
        tags: ["Video Editing", "Cinematography", "Motion Graphics", "Adobe After Effects"]
    },
    {
        title: "HealthGuard – Doctorpedia Series",
        subtitle: "Doctorpedia | Editor & Cinematographer",
        description: "Produced an educational video series for Doctorpedia. Shot and edited interviews with doctors into informative episodes. Emphasized clear visual explanations and motion-graphic overlays to make medical concepts accessible to a general audience.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/doctorpedia-preview.mp4",
        poster: "/assets/images/doctorpedia-poster.jpg",
        aiHint: "medical education",
        tags: ["Video Editing", "Cinematography", "Graphic Design", "Storyboarding"]
    },
    {
        title: "Reels of Laughter – ComedyCulture YouTube",
        subtitle: "ComedyCulture | Video Editor",
        description: "Edited short-form comedy reels for the ComedyCulture YouTube channel. Trimmed humorous moments and added quick-paced cuts to maximize comedic timing. The resulting viral clip series increased channel subscribers by 40% over two months.",
        image: "/assets/profile-hero.jpg",
        video: "/assets/videos/comedy-preview.mp4",
        poster: "/assets/images/comedy-poster.jpg",
        aiHint: "comedy show",
        tags: ["Video Editing", "Social Media Content", "Comedy Editing", "Sound Design"]
    }
];

export function ProjectsSection() {
    const isMobile = useIsMobile();
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Use matchMedia for responsive animations
            gsap.matchMedia().add("(min-width: 769px)", () => {
                if (!sectionRef.current || !containerRef.current) return;

                const items = gsap.utils.toArray(".work-item");

                // Horizontal scroll animation for desktop
                const horizontalScroll = gsap.to(containerRef.current, {
                    x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => "+=" + (containerRef.current!.scrollWidth - window.innerWidth),
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });

                // Cinematic reveal animations
                items.forEach((item, i) => {
                    gsap.fromTo(item as HTMLElement,
                        {
                            x: 300,
                            opacity: 0,
                            scale: 0.8
                        },
                        {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: item as HTMLElement,
                                containerAnimation: horizontalScroll,
                                start: "left 90%",
                                end: "left 20%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });
            });

            // Mobile vertical scroll animations
            gsap.matchMedia().add("(max-width: 768px)", () => {
                const items = gsap.utils.toArray(".work-item-mobile");

                items.forEach((item, i) => {
                    gsap.fromTo(item as HTMLElement,
                        {
                            y: 100,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: item as HTMLElement,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="work"
            ref={sectionRef}
            className="bg-black text-white overflow-hidden relative"
            style={{
                background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)'
            }}
        >
            {/* Subtle film grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Mobile Layout */}
            <div className="block md:hidden">
                <div className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-5xl md:text-6xl font-bold text-white mb-6">
                                MY WORK
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mb-6"></div>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
                                Cinematic stories crafted for brands that demand excellence. Each project is a journey from concept to compelling narrative.
                            </p>
                        </div>
                        <div className="flex flex-col gap-16">
                            {projects.map((project, index) => (
                                <div key={index} className="work-item-mobile w-full">
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Horizontal Scroll Layout */}
            <div className="hidden md:block">
                <div className="h-screen flex items-center justify-start relative">
                    <div ref={containerRef} className="flex h-full py-20 pl-20">
                        {/* Intro Section */}
                        <div className="flex items-center pr-32">
                            <div className="text-left w-[35vw] max-w-lg">
                                <div className="mb-8">
                                    <div className="inline-block px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
                                        <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">Featured Work</span>
                                    </div>
                                    <h2 className="font-headline text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
                                        MY<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                                            WORK
                                        </span>
                                    </h2>
                                    <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-red-500 mb-8"></div>
                                </div>
                                <p className="text-xl text-white/80 leading-relaxed mb-8">
                                    Cinematic stories crafted for brands that demand excellence. Each project is a journey from concept to compelling narrative.
                                </p>
                                <div className="flex items-center text-white/60">
                                    <div className="w-8 h-px bg-white/30 mr-4"></div>
                                    <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
                                </div>
                            </div>
                        </div>

                        {/* Project Cards */}
                        {projects.map((project, index) => (
                            <div key={index} className="work-item flex-shrink-0 w-[75vw] max-w-5xl h-[75vh] mr-20">
                                <ProjectCard project={project} />
                            </div>
                        ))}

                        {/* End spacer */}
                        <div className="flex-shrink-0 w-[25vw]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
