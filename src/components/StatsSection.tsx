'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  number: string;
  label: string;
  suffix?: string;
  icon: string;
}

const statsData: Stat[] = [
  {
    number: '15',
    suffix: '+',
    label: 'Years Experience',
    icon: '🎬'
  },
  {
    number: '200',
    suffix: '+',
    label: 'Projects Completed',
    icon: '🎥'
  },
  {
    number: '30',
    suffix: '+',
    label: 'Industries Served',
    icon: '🏢'
  },
  {
    number: '100',
    suffix: '%',
    label: 'Client Satisfaction',
    icon: '⭐'
  }
];

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate stats when section enters viewport
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          // Animate each stat number
          statsData.forEach((stat, index) => {
            const targetNumber = parseInt(stat.number);
            gsap.to({ value: 0 }, {
              value: targetNumber,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                setAnimatedStats(prev => {
                  const newStats = [...prev];
                  newStats[index] = Math.round(this.targets()[0].value);
                  return newStats;
                });
              }
            });
          });

          // Animate the cards
          gsap.from('.stat-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-black via-gray-900 to-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className="stat-card text-center p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#e50914]/40 hover:shadow-[0_0_20px_rgba(229,9,20,0.2)] transition-all duration-300 group"
            >
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-[#e50914] mb-2 font-headline">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-white/70 text-sm lg:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;