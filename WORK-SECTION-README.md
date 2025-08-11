# Cinematic "My Work" Section

A professional, scroll-synced portfolio showcase component with sticky panels and smooth GSAP animations.

## Features

✅ **Sticky Left Panel** - Text content stays fixed while scrolling through subcategories  
✅ **Scroll-Synced Media** - Right panel updates smoothly as you scroll  
✅ **Progress Indicator** - Top navigation showing categories and subcategories  
✅ **Cinematic Animations** - GSAP-powered fade/scale transitions  
✅ **Responsive Design** - Desktop grid layout, mobile stack layout  
✅ **Performance Optimized** - Lazy loading and smooth 60fps scrolling  

## Quick Start

1. **Install Dependencies** (already included in your project):
   ```bash
   npm install gsap
   ```

2. **Use the Component**:
   ```tsx
   import MyWorkSection from '@/components/MyWorkSection';

   export default function Portfolio() {
     return (
       <main>
         <MyWorkSection />
       </main>
     );
   }
   ```

3. **View Demo**:
   Navigate to `/work-demo` to see the component in action.

## Customization

### Replace Placeholder Data

Edit the `workData` array in `MyWorkSection.tsx`:

```tsx
const workData: WorkCategory[] = [
  {
    category: "Your Brand",
    role: "Your Role",
    title: "Project Title",
    description: "Project description...",
    media: "/your-image.jpg",
    subcategories: [
      {
        title: "Subcategory 1",
        description: "Description...",
        media: "/your-media-1.jpg", // or .mp4 for video
        type: "image" // or "video"
      }
      // Add more subcategories...
    ]
  }
  // Add more categories...
];
```

### Styling Customization

The component uses Tailwind classes. Key customizable elements:

- **Colors**: Change `#e50914` (Netflix red) to your brand color
- **Typography**: Modify font sizes and weights in the JSX
- **Spacing**: Adjust `gap-16`, `px-8`, etc. for layout spacing
- **Animation**: Modify GSAP timeline durations and easing

### Animation Tweaks

In the `useEffect` hook, you can adjust:

```tsx
// Fade duration
duration: 0.3, // Make faster/slower

// Easing
ease: "power2.out", // Try "back.out", "elastic.out", etc.

// Scale effect
scale: 0.95, // More/less dramatic scaling
```

## File Structure

```
src/
├── components/
│   └── MyWorkSection.tsx     # Main component
└── app/
    └── work-demo/
        └── page.tsx          # Demo page
```

## Technical Details

- **Framework**: Next.js 15 with React 18
- **Styling**: TailwindCSS with dark theme
- **Animations**: GSAP with ScrollTrigger
- **Performance**: Lazy loading, optimized scroll triggers
- **Responsive**: CSS Grid (desktop) + Flexbox (mobile)

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Images are lazy-loaded for better performance
- GSAP context cleanup prevents memory leaks
- Scroll triggers are optimized for 60fps
- Component uses placeholder images from Unsplash (replace with your media)

## Troubleshooting

**Animations not working?**
- Ensure GSAP is installed: `npm install gsap`
- Check browser console for ScrollTrigger errors

**Layout issues on mobile?**
- Verify Tailwind responsive classes are working
- Check viewport meta tag in your HTML head

**Media not loading?**
- Replace placeholder URLs with your actual media files
- Ensure video files are properly encoded for web

## Next Steps

1. Replace placeholder data with your actual projects
2. Add your real media files to the `public` folder
3. Customize colors and typography to match your brand
4. Test on different devices and browsers
5. Consider adding loading states for better UX

The component is production-ready and optimized for professional portfolios!