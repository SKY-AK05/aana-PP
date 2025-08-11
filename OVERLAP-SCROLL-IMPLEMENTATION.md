# GSAP Overlap Scroll Implementation - Contact Section

## Overview
This implementation creates a smooth "overlap scroll" transition where the Contact Us section slides up over the previous section (What I Do) as the user scrolls, creating a cinematic layered effect.

## Key Features

### 1. Overlap Animation
- **Initial State**: Contact section starts at `y: 100%` (completely below viewport)
- **Final State**: Contact section animates to `y: 0%` (normal position)
- **Duration**: Animation spans 100vh (one viewport height) on desktop, 50vh on mobile
- **Easing**: `ease: "none"` for natural, linear scroll-synced movement

### 2. Section Pinning
- Previous section (What I Do) gets pinned during the overlap transition
- Uses `ScrollTrigger.create()` with `pin: true`
- Trigger starts when previous section bottom hits viewport bottom
- Ensures seamless visual continuity during overlap

### 3. Content Animation
- Content elements (title, subtitle, form) start hidden (`opacity: 0, y: 30`)
- Animate in with staggered timing after overlap completes
- Uses `power2.out` easing for smooth, natural feel
- Form elements have additional stagger delay for polished effect

### 4. Responsive Design
- **Desktop**: Full 100vh overlap duration for dramatic effect
- **Mobile**: Reduced to 50vh for better mobile UX
- Uses `gsap.matchMedia()` for responsive breakpoints
- Maintains smooth performance across all devices

## Code Structure

### GSAP Setup
```javascript
// Set initial position for overlap effect
gsap.set(section, {
  y: '100%', // Start below viewport
  willChange: 'transform',
  zIndex: 10 // Ensure proper stacking
});
```

### Overlap ScrollTrigger
```javascript
// Create timeline with both overlap and content animations
const overlapTl = gsap.timeline();

overlapTl.to(section, {
  y: '0%', // Slide up animation
  ease: "none"
});

// Content animations during scroll
overlapTl.to([title, subtitle], {
  opacity: 1,
  y: 0,
  duration: 0.3,
  stagger: 0.1,
  ease: "none"
}, 0.7); // Start at 70% of overlap

ScrollTrigger.create({
  trigger: previousSection,
  start: "center bottom", // Start earlier for smoother effect
  end: "+=100vh", // Adjust duration here
  pin: previousSection,
  scrub: 1, // Slight lag for smoothness
  ease: "none",
  animation: overlapTl
});
```

### Content Animation
```javascript
// Animate after overlap completes
const contentTl = gsap.timeline();
contentTl.to([title, subtitle], {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
});
```

## Customization Options

### Adjust Animation Duration
```javascript
// Desktop duration (line ~95)
end: "+=100vh", // Change to "+=150vh" for longer overlap

// Mobile duration (line ~140)  
end: "+=50vh", // Change to "+=75vh" for longer mobile overlap
```

### Adjust Trigger Start Point
```javascript
// Earlier trigger for more dramatic effect
start: "center bottom", // Change to "top bottom" for even earlier start

// Later trigger for more subtle effect  
start: "bottom bottom", // Change to "bottom center" for later start
```

### Modify Section Colors
```javascript
// Contact section background (line ~180)
background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 100%)'

// Form styling (line ~210)
className="p-8 md:p-10 bg-white/10 backdrop-blur-lg border border-white/20"
```

### Adjust Content Animation Timing
```javascript
// Title/subtitle stagger (line ~95)
stagger: 0.2, // Change to 0.3 for slower reveal

// Form elements stagger (line ~102)
stagger: 0.1, // Change to 0.15 for slower form reveal
```

### Change Section Heights
The overlap effect automatically adapts to section heights, but you can modify:
- Previous section: Adjust `min-h-screen` class in WhatIDoSection
- Contact section: Adjust `min-h-screen` class in contact-section

## Performance Optimizations

### Hardware Acceleration
- Uses `willChange: 'transform'` for GPU acceleration
- `transform3d(0,0,0)` triggers hardware acceleration
- Optimized for 60fps smooth scrolling

### Memory Management
- Proper cleanup with `ScrollTrigger.getAll().forEach(trigger => trigger.kill())`
- `gsap.matchMedia().revert()` for responsive cleanup
- Context-based cleanup prevents memory leaks

### Scroll Performance
- `scrub: true` provides smooth scroll-synced animation
- `ease: "none"` eliminates unnecessary easing calculations
- Minimal DOM queries with cached element references

## Browser Compatibility
- Works in all modern browsers supporting GSAP 3
- Graceful fallback animation if previous section not found
- Mobile-optimized with reduced animation complexity

## Debugging
Uncomment the markers line for visual debugging:
```javascript
// markers: true // Shows ScrollTrigger start/end points
```

## Dependencies
- GSAP 3.x
- ScrollTrigger plugin
- React 18+
- Next.js (for SSR compatibility checks)

## Integration Notes
- Requires previous section to have class `.what-i-do-section`
- Contact section automatically detects and pins previous section
- Works with any section layout - just ensure proper class naming
- Z-index management ensures proper layering during overlap