import React from 'react';
import { Linkedin, Github, Dribbble } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-foreground/60 text-center md:text-left">
            &copy; {new Date().getFullYear()} Bharath Naidu. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="icon">
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                <Dribbble className="h-5 w-5 text-foreground/80 hover:text-primary" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                <Github className="h-5 w-5 text-foreground/80 hover:text-primary" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-foreground/80 hover:text-primary" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
