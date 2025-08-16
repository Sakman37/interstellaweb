import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const ServiceCard = ({ icon: Icon, title, description, className = "" }: ServiceCardProps) => {
  return (
    <div className={`service-card ${className}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="cosmic-glow">
          <Icon className="h-12 w-12 text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;