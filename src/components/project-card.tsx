import React from 'react';
import Image from 'next/image';
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
    <div className="group bg-neutral-50 border border-neutral-200 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-900/10 h-full flex flex-col shadow-lg shadow-neutral-900/5">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          data-ai-hint={project.aiHint}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-2xl md:text-3xl font-bold font-headline mb-3 text-neutral-900">{project.title}</h3>
        <p className="text-neutral-600 mb-6 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal bg-neutral-200 text-neutral-800 hover:bg-neutral-300">{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
