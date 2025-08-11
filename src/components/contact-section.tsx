"use client";

import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Refs for GSAP animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const formElement = formRef.current;

    if (!section || !title || !subtitle || !formElement) return;

    // Find the previous section (What I Do section) for overlap effect
    const previousSection = document.querySelector('.what-i-do-section') as HTMLElement;
    
    // Set initial states for overlap scroll effect
    gsap.set(section, {
      y: '100%', // Start completely below viewport
      willChange: 'transform',
      zIndex: 10 // Ensure contact section overlaps previous section
    });

    // Set initial states for content elements (hidden until overlap completes)
    gsap.set([title, subtitle], {
      opacity: 0,
      y: 30,
      willChange: "transform, opacity"
    });

    // Set initial states for form elements
    const formElements = formElement.querySelectorAll('label, input, textarea, button');
    gsap.set(formElements, {
      opacity: 0,
      y: 30,
      willChange: "transform, opacity"
    });

    // OVERLAP SCROLL ANIMATION
    // Pin the previous section and animate contact section sliding up over it
    if (previousSection) {
      // Create main timeline for overlap effect
      const overlapTl = gsap.timeline();
      
      // Add the slide-up animation
      overlapTl.to(section, {
        y: '0%', // Slide contact section up to normal position
        ease: "none"
      });
      
      // Add content animations that happen during the scroll
      overlapTl.to([title, subtitle], {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "none"
      }, 0.7); // Start when overlap is 70% complete
      
      overlapTl.to(formElements, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "none"
      }, 0.8); // Start when overlap is 80% complete

      ScrollTrigger.create({
        trigger: previousSection,
        start: "center bottom", // Start earlier - when previous section center hits bottom
        end: "+=100vh", // Animation lasts for one viewport height (adjust duration here)
        pin: previousSection, // Pin the previous section during overlap
        scrub: 1, // Smooth scroll syncing with slight lag
        ease: "none", // Clean, natural feel
        animation: overlapTl,
        // Uncomment for debugging:
        // markers: true
      });
    } else {
      // Fallback animation if previous section not found
      gsap.set(section, { y: '0%' });
      
      const fallbackTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        }
      });

      fallbackTl.to([title, subtitle], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }).to(formElements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");
    }

    // Responsive adjustments for mobile
    const mm = gsap.matchMedia();
    
    mm.add("(max-width: 768px)", () => {
      // On mobile, reduce the overlap distance for better UX
      if (previousSection) {
        // Kill existing ScrollTriggers for this section
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === previousSection) {
            trigger.kill();
          }
        });
        
        // Create mobile-optimized timeline
        const mobileOverlapTl = gsap.timeline();
        
        mobileOverlapTl.to(section, {
          y: '0%',
          ease: "none"
        });
        
        mobileOverlapTl.to([title, subtitle], {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "none"
        }, 0.6);
        
        mobileOverlapTl.to(formElements, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "none"
        }, 0.7);
        
        ScrollTrigger.create({
          id: "overlap-scroll-mobile",
          trigger: previousSection,
          start: "center bottom", // Start earlier on mobile too
          end: "+=50vh", // Shorter overlap on mobile (adjust mobile duration here)
          pin: previousSection,
          scrub: 1,
          ease: "none",
          animation: mobileOverlapTl
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || trigger.trigger === previousSection) {
          trigger.kill();
        }
      });
      mm.revert();
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await submitContactForm(values);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message,
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen py-12 md:py-16 overflow-hidden"
      style={{
        // Ensure section has full width for seamless overlap
        width: '100%',
        // Add subtle background gradient for visual depth
        background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 100%)',
        // Ensure proper stacking context for overlap
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Content Container - Positioned for overlap scroll effect */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Section - Will fade in after overlap completes */}
          <div className="text-center mb-8 md:mb-10">
            <h2 
              ref={titleRef}
              className="font-headline text-4xl md:text-5xl font-bold text-white"
            >
              Let's Create Together
            </h2>
            <p 
              ref={subtitleRef}
              className="mt-4 max-w-2xl mx-auto text-lg text-gray-300"
            >
              Have a project in mind or just want to connect? I'd love to hear from you.
            </p>
          </div>

          {/* Form Container - Elements will stagger-fade in after overlap */}
          <Card className="p-8 md:p-10 bg-white/10 backdrop-blur-lg border border-white/20">
            <div ref={formRef}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-white">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            {...field} 
                            className="h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            {...field} 
                            className="h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            {...field} 
                            rows={6} 
                            className="text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-bold bg-red-600 hover:bg-red-700 text-white" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : <>Send Message <Send className="ml-2 h-5 w-5" /></>}
                  </Button>
                </form>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
