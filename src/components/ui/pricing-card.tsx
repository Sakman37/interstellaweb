import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './button';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
  ctaText?: string;
  onCTAClick?: () => void;
}

const PricingCard = ({ 
  title, 
  price, 
  features, 
  featured = false, 
  ctaText = "Contratar",
  onCTAClick 
}: PricingCardProps) => {
  const whatsappMessage = encodeURIComponent(`Hola, estoy interesado en el paquete ${title} 🚀`);
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  const handleClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className={`pricing-card ${featured ? 'featured' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-full">
            Más Popular
          </span>
        </div>
      )}
      
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <div className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ${price}
          </span>
          <span className="text-sm text-muted-foreground font-normal"> COP</span>
        </div>
      </div>
      
      <div className="space-y-4 mt-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={handleClick}
          className={`w-full ${featured ? 'hero-button' : 'hero-button opacity-80 hover:opacity-100'}`}
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;