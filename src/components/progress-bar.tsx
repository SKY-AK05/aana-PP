"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

type ProgressBarProps = {
  categories: {
    category: string;
    subcategories: any[];
  }[];
  activeCategoryIndex: number;
  activeSubcategoryIndex: number;
};

export const ProgressBar = ({ categories, activeCategoryIndex, activeSubcategoryIndex }: ProgressBarProps) => {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    progressRefs.current.forEach((el, i) => {
      const circle = el?.querySelector('.progress-circle-fill');
      const dashes = el?.querySelectorAll('.progress-dash-fill');
      
      if (i < activeCategoryIndex) {
        // Completed categories
        gsap.to(circle, { strokeDashoffset: 0, duration: 0.5 });
        gsap.to(dashes, { scaleX: 1, duration: 0.5, stagger: 0.1 });
      } else if (i === activeCategoryIndex) {
        // Active category
        gsap.to(circle, { strokeDashoffset: 0, duration: 0.5 });
        dashes?.forEach((dash, dashIndex) => {
          if (dashIndex <= activeSubcategoryIndex) {
            gsap.to(dash, { scaleX: 1, duration: 0.5 });
          } else {
            gsap.to(dash, { scaleX: 0, duration: 0.5 });
          }
        });
      } else {
        // Inactive categories
        gsap.to(circle, { strokeDashoffset: 101, duration: 0.5 });
        gsap.to(dashes, { scaleX: 0, duration: 0.5 });
      }
    });
  }, [activeCategoryIndex, activeSubcategoryIndex]);

  return (
    <div className="flex justify-center items-start gap-8 md:gap-16">
      {categories.map((cat, catIndex) => (
        <div 
          key={cat.category} 
          ref={el => progressRefs.current[catIndex] = el}
          className="flex flex-col items-center gap-3"
        >
          <div className="relative w-10 h-10">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle
                className="text-white/20"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
              <circle
                className="progress-circle-fill text-primary"
                strokeWidth="2"
                strokeDasharray="100, 100"
                strokeDashoffset="101"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {catIndex + 1}
            </span>
          </div>
          <div className="flex gap-2">
            {cat.subcategories.map((_, subIndex) => (
              <div key={subIndex} className="w-5 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="progress-dash-fill h-full w-full bg-primary origin-left" style={{transform: 'scaleX(0)'}}/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
