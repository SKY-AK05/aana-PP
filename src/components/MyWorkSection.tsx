'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Subcategory {
  title: string;
  description: string;
  media: string;
  type?: 'video' | 'image';
}

interface WorkCategory {
  category: string;
  role: string;
  title: string;
  description: string;
  media: string;
  subcategories: Subcategory[];
}

const workData: WorkCategory[] = [
  {
    category: "Sociohub Media",
    role: "Lead Video Editor & Cinematography",
    title: "Multi-Disciplinary Creative Leadership",
    description: "As a multi-disciplinary leader, I head a team of 8 in crafting viral, cinematic content for 200+ brands across 30+ industries, from global campaigns to influencer reels and meme-driven videos. Leveraging AI-generated characters for innovative storytelling, I blend art, tech, and culture to drive engagement and conversions that leave a lasting impact.",
    media: "/images/sociohub.jpg",
    subcategories: [
      {
        title: "Brand Campaigns",
        description: "Collaborating with top-tier brands like Cadbury, Coca-Cola, Sony Pictures, Zee Group, Xiaomi, Boat, Dharma Productions, and Universal Music to produce high-engagement visuals that merge cinematic narratives with digital trends.",
        media: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        title: "Influencer Content",
        description: "Handling end-to-end video shoots and editing for influencers, creating fast-paced, trend-setting reels that boost visibility and audience interaction.",
        media: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        title: "YouTube Production & Team Leadership",
        description: "Sketching, shooting, and editing videos for Comedy Culture's YouTube channel, while leading a promoted team to deliver consistent, engaging content that grows subscriber bases.",
        media: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        type: "image"
      }
    ]
  },
  {
    category: "Twilight Entertainment",
    role: "Senior Video Editor",
    title: "Post-Production Excellence",
    description: "Focused on post-production excellence for informative and advertising content, I specialized in sound mixing, mastering, and visual storytelling to create compelling videos that educate and promote, drawing on my expertise in AI tools and smart editing.",
    media: "/images/twilight.jpg",
    subcategories: [
      {
        title: "Informative Video Editing",
        description: "Producing educational content through informative video editing for Doctorpedia, ensuring clear, engaging narratives that simplify complex topics for wide audiences.",
        media: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        title: "Memorial & Slideshow Editing",
        description: "Crafting emotional slideshows and memorial videos for Urlifemedia, using cinematic techniques to honor stories with sensitivity and high production value.",
        media: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        title: "Advertisement Sound Production",
        description: "Delivering professional sound mixing and mastering for Wake Fit mattress ads, enhancing audio-visual synergy to create immersive, persuasive commercials.",
        media: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        type: "image"
      }
    ]
  },
  {
    category: "Cocoma Digital",
    role: "Video Editor & Team Lead",
    title: "Streaming Platform Content Creation",
    description: "As team lead, I managed high-profile editing projects for streaming platforms like Prime Video, including music videos, trailers, and monetization strategies, while working with clients like Tata EV and Amazon mini TV to produce dynamic, monetizable content.",
    media: "/images/cocoma.jpg",
    subcategories: [
      {
        title: "Prime Video Content Creation",
        description: "Editing music videos, trailers, and teasers for Prime Video, resulting in polished, cinematic pieces that captivate viewers and support platform growth.",
        media: "https://images.unsplash.com/photo-1489599735734-79b4af4e22f6?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        title: "YouTube Monetization Strategies",
        description: "Implementing YouTube monetization for Prime Video content, optimizing videos for algorithm success and increased revenue through strategic editing.",
        media: "https://images.unsplash.com/photo-1489599735734-79b4af4e22f6?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        title: "Client Project Management",
        description: "Collaborating on projects with Tata EV Motors, Langistan (in-house brand), Amazon mini TV, and others, delivering versatile edits that align with brand goals and drive results.",
        media: "https://images.unsplash.com/photo-1489599735734-79b4af4e22f6?w=800&h=600&fit=crop",
        type: "image"
      }
    ]
  }
];



const MediaCard: React.FC<{
  media: string;
  title: string;
  type?: 'video' | 'image'
}> = ({ media, title, type = 'image' }) => {
  return (
    <div className="media-card relative w-full h-full rounded-xl overflow-hidden bg-muted border border-border">
      {type === 'video' ? (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={media.replace('.mp4', '.jpg')}
        >
          <source src={media} type="video/mp4" />
        </video>
      ) : (
        <img
          src={media}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          loading="lazy"
        />
      )}
      <div className="absolute bottom-4 right-4">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border">
          <p className="text-foreground/80 text-xs font-medium">{title}</p>
        </div>
      </div>
    </div>
  );
};

const MyWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState(0);
  const [currentContent, setCurrentContent] = useState(workData[0]);
  const [currentSubcontent, setCurrentSubcontent] = useState(workData[0].subcategories[0]);



  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Wait for DOM to be ready
      setTimeout(() => {
        // Create scroll triggers for each subcategory
        let sectionIndex = 0;
        workData.forEach((category, categoryIndex) => {
          category.subcategories.forEach((subcategory, subIndex) => {
            const triggerElement = document.querySelector(`.work-trigger-${sectionIndex}`);

            if (triggerElement) {
              ScrollTrigger.create({
                trigger: triggerElement,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => updateContent(categoryIndex, subIndex),
                onEnterBack: () => updateContent(categoryIndex, subIndex),
                markers: false // Set to true for debugging
              });
            }

            sectionIndex++;
          });
        });

        function updateContent(categoryIndex: number, subIndex: number) {
          if (categoryIndex === activeCategory && subIndex === activeSubcategory) return;

          setActiveCategory(categoryIndex);
          setActiveSubcategory(subIndex);

          // Animate content changes
          const tl = gsap.timeline();

          // Fade out current content
          tl.to('.content-panel', {
            opacity: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.out"
          })
            .call(() => {
              setCurrentContent(workData[categoryIndex]);
              setCurrentSubcontent(workData[categoryIndex].subcategories[subIndex]);
            })
            // Fade in new content
            .to('.content-panel', {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            });
        }

        // Initial animation
        gsap.fromTo('.content-panel',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );

      }, 100);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="bg-background text-foreground relative">
      {/* Section Title */}
      <div className="text-center py-20">
        <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">MY WORK</h2>
        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
          A showcase of my professional journey through video editing and cinematography
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-20 px-12 max-w-7xl mx-auto">
            {/* Left Panel - Sticky */}
            <div className="sticky top-24 h-fit">
              <div className="content-panel">
                {/* Progress Indicator */}
                <div className="flex items-center space-x-4 mb-8">
                  {workData.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-300 ${categoryIndex === activeCategory
                        ? 'bg-foreground border-foreground text-background'
                        : categoryIndex < activeCategory
                          ? 'bg-foreground border-foreground text-background'
                          : 'border-border text-foreground/50'
                        }`}>
                        {categoryIndex + 1}
                      </div>
                      {categoryIndex < workData.length - 1 && (
                        <div className={`w-8 h-0.5 transition-all duration-300 ${categoryIndex < activeCategory ? 'bg-foreground' : 'bg-border'
                          }`} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-foreground/60 text-sm font-medium mb-4">
                  {currentContent.category} • {currentContent.role}
                </div>
                <h1 className="text-4xl font-bold mb-6 leading-tight text-foreground">
                  {currentSubcontent.title}
                </h1>
                <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                  {currentSubcontent.description}
                </p>

                {/* Progress indicator */}
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-foreground">
                    {activeSubcategory + 1}
                  </div>
                  <div className="text-sm text-foreground/50">/</div>
                  <div className="text-sm text-foreground/50">
                    {currentContent.subcategories.length}
                  </div>
                  <div className="flex-1 h-px bg-border ml-4">
                    <div
                      className="h-full bg-foreground transition-all duration-500"
                      style={{
                        width: `${((activeSubcategory + 1) / currentContent.subcategories.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Scrollable triggers */}
            <div className="space-y-32">
              {workData.map((category, categoryIndex) =>
                category.subcategories.map((subcategory, subIndex) => {
                  const globalIndex = workData.slice(0, categoryIndex).reduce((acc, cat) => acc + cat.subcategories.length, 0) + subIndex;
                  return (
                    <div
                      key={`${categoryIndex}-${subIndex}`}
                      className={`work-trigger-${globalIndex} h-[75vh] flex items-center`}
                      data-category={categoryIndex}
                      data-subcategory={subIndex}
                    >
                      <MediaCard
                        media={subcategory.media}
                        title={subcategory.title}
                        type={subcategory.type}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-6 space-y-16">
          {workData.map((category, categoryIndex) =>
            category.subcategories.map((subcategory, subIndex) => (
              <div key={`${categoryIndex}-${subIndex}`} className="space-y-6">
                <div>
                  <div className="text-foreground/60 text-sm font-medium mb-2">
                    {category.category} • {category.role}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {subcategory.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {subcategory.description}
                  </p>
                </div>
                <div className="h-[50vh]">
                  <MediaCard
                    media={subcategory.media}
                    title={subcategory.title}
                    type={subcategory.type}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-32"></div>
    </section>
  );
};

export default MyWorkSection;
