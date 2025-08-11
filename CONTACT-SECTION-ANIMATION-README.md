# Contact Section Unmask Animation

## Overview
This implementation adds a smooth "unmask" GSAP animation to the Contact Us section that reveals content from left to right on scroll, followed by staggered fade-in animations for text and form elements.

## Features
- ✅ Clip-path unmask animation (left to right reveal)
- ✅ ScrollTrigger integration for scroll-based activation
- ✅ Staggered fade-in for text and form elements
- ✅ Mobile responsive design
- ✅ 60fps performance optimization
- ✅ Hardware acceleration enabled
- ✅ Clean TypeScript implementation

## Animation Sequence
1. **Unmask Phase** (1.2s): Section content reveals from left to right using clip-path
2. **Text Phase** (0.6s each, 0.15s stagger): Title and subtitle fade in with upward motion
3. **Form Phase** (0.6s each, 0.15s stagger): Form elements fade in with upward motion

## Technical Implementation

### Key Components
- **Mask Container**: Wraps all content with clip-path animation
- **ScrollTrigger**: Activates animation when section is 75% in viewport
- **Hardware Acceleration**: Uses `transform3d(0,0,0)` and `willChange` for 60fps
- **Stagger Animation**: 0.15s delay between each element's animation

### Performance Optimizations
- Initial states set via GSAP for smooth start
- `willChange` CSS property for optimized rendering
- Hardware acceleration enabled
- Cleanup function prevents memory leaks

## Customization Options

### Animation Timing
```javascript
// Unmask duration (currently 1.2s)
duration: 1.2,

// Stagger delay between elements (currently 0.15s)
stagger: 0.15,

// Individual element animation duration (currently 0.6s)
duration: 0.6,
```

### Scroll Trigger Points
```javascript
scrollTrigger: {
  trigger: section,
  start: "top 75%",    // Start when 75% in viewport
  end: "bottom 25%",   // End when 25% in viewport
  toggleActions: "play none none reverse"
}
```

### Clip-Path Directions
```javascript
// Current: Left to right
clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" // Hidden
clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" // Visible

// Alternative: Right to left
clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" // Hidden
clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" // Visible

// Alternative: Top to bottom
clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" // Hidden
clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" // Visible
```

### Easing Options
```javascript
// Current easing
ease: "power2.out"

// Alternative easing options
ease: "power1.out"    // Gentler
ease: "power3.out"    // More dramatic
ease: "back.out(1.7)" // Bounce effect
ease: "elastic.out"   // Elastic effect
```

### Animation Overlap Timing
```javascript
// Text starts before mask completes
}, "-=0.2");

// Form starts before text completes  
}, "-=0.3");

// Adjust these values to change overlap timing
```

## Mobile Responsiveness
- Uses responsive Tailwind classes (`py-20 md:py-28`, `text-4xl md:text-5xl`)
- Clip-path works consistently across all screen sizes
- Touch-friendly form elements with proper sizing
- Optimized for mobile performance

## Browser Support
- Modern browsers with CSS clip-path support
- Fallback: Content displays normally without animation
- GSAP handles cross-browser compatibility

## Debugging
Uncomment the markers line in ScrollTrigger for visual debugging:
```javascript
scrollTrigger: {
  // ... other options
  markers: true // Shows trigger points
}
```

## Dependencies
- GSAP 3.x (already installed)
- ScrollTrigger plugin (imported and registered)
- React 18+ with hooks support
- TypeScript support

## File Structure
```
src/components/
├── contact-section.tsx (main component)
└── ui/ (shadcn/ui components)
```

## Usage
The component is ready to use and will automatically initialize animations when mounted. No additional setup required.

```tsx
import { ContactSection } from '@/components/contact-section';

// Use in your page
<ContactSection />
```