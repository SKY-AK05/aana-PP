import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type ProjectCardProps = {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    aiHint: string;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group bg-secondary/30 border-border overflow-hidden rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          data-ai-hint={project.aiHint}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <div className="flex items-center text-lg font-semibold text-primary-foreground">
            View Project <ArrowRight className="ml-2 h-5 w-5" />
            </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-headline mb-2 text-foreground">{project.title}</h3>
        <p className="text-foreground/70 mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
