import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  location: string;
  timeAgo: string;
  technologies: string[];
  rating?: number;
}

const TestimonialCard = ({ 
  content, 
  author, 
  role, 
  location, 
  timeAgo, 
  technologies,
  rating = 5 
}: TestimonialCardProps) => {
  return (
    <div className="nebula-card p-6 h-full">
      <div className="flex flex-col h-full">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(rating)].map((_, index) => (
            <Star key={index} className="h-4 w-4 text-accent fill-current" />
          ))}
        </div>
        
        {/* Quote Icon */}
        <Quote className="h-8 w-8 text-accent mb-4" />
        
        {/* Content */}
        <blockquote className="text-foreground leading-relaxed flex-grow mb-6">
          "{content}"
        </blockquote>
        
        {/* Technologies */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Tecnologías:</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-secondary/50 text-accent rounded-full border border-accent/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Author Info */}
        <div className="border-t border-border/20 pt-4">
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
          <p className="text-xs text-muted-foreground">{location} • {timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;