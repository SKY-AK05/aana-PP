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
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const maskContainer = maskContainerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const formElement = formRef.current;

    if (!section || !maskContainer || !title || !subtitle || !formElement) return;

    // Set initial states for smooth 60fps performance
    gsap.set(maskContainer, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", // Fully hidden from left
      willChange: "clip-path" // Optimize for animations
    });

    // Set initial states for content elements
    gsap.set([title, subtitle], {
      opacity: 0,
      y: 20,
      willChange: "transform, opacity"
    });

    // Set initial states for form elements (all inputs, labels, button)
    const formElements = formElement.querySelectorAll('label, input, textarea, button');
    gsap.set(formElements, {
      opacity: 0,
      y: 20,
      willChange: "transform, opacity"
    });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%", // Start when section is 75% in viewport
        end: "bottom 25%",
        toggleActions: "play none none reverse", // Play on enter, reverse on leave
        // Uncomment for debugging:
        // markers: true
      }
    });

    // 1. Unmask animation (1.2s duration with power2.out ease)
    tl.to(maskContainer, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Fully visible
      duration: 1.2,
      ease: "power2.out"
    });

    // 2. Stagger-fade title and subtitle after mask completes
    tl.to([title, subtitle], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15, // 0.15s stagger between elements
      ease: "power2.out"
    }, "-=0.2"); // Start 0.2s before mask completes for smoother transition

    // 3. Stagger-fade form elements
    tl.to(formElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15, // 0.15s stagger between form elements
      ease: "power2.out"
    }, "-=0.3"); // Overlap with text animation

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
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
      className="py-20 md:py-28 border-t border-border bg-background overflow-hidden"
    >
      {/* 
        Mask Container: This div wraps all content and applies the clip-path animation
        The clip-path creates the "unmask" effect from left to right
        Mobile responsive: Works on all screen sizes
      */}
      <div 
        ref={maskContainerRef}
        className="w-full h-full"
        style={{
          // Initial clip-path set via GSAP for better performance
          // Using transform3d to enable hardware acceleration for 60fps
          transform: "translate3d(0,0,0)"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header Section - Will fade in after unmask */}
            <div className="text-center mb-12">
              <h2 
                ref={titleRef}
                className="font-headline text-4xl md:text-5xl font-bold text-primary"
              >
                Let's Create Together
              </h2>
              <p 
                ref={subtitleRef}
                className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70"
              >
                Have a project in mind or just want to connect? I'd love to hear from you.
              </p>
            </div>

            {/* Form Container - Elements will stagger-fade in after text */}
            <Card className="p-8 md:p-10 bg-secondary/30">
              <div ref={formRef}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Name" 
                              {...field} 
                              className="h-12 text-base bg-background" 
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
                          <FormLabel className="text-lg">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              {...field} 
                              className="h-12 text-base bg-background" 
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
                          <FormLabel className="text-lg">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              {...field} 
                              rows={6} 
                              className="text-base bg-background" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-lg font-bold" 
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
      </div>
    </section>
  );
}
