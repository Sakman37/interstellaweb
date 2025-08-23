import React from 'react';
import { Globe, Palette, Code, Bot, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ui/service-card';
import PricingCard from '@/components/ui/pricing-card';
import Layout from '@/components/Layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToTop } from '@/hooks/useScrollToTop';


const Servicios = () => {
  useScrollToTop();
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Globe,
      title: t('services.webDevelopment'),
      description: t('services.webDevelopmentDesc')
    },
    {
      icon: Palette,
      title: t('services.customDesign'),
      description: t('services.customDesignDesc')
    },
    {
      icon: Code,
      title: t('services.customSoftware'),
      description: t('services.customSoftwareDesc')
    },
    {
      icon: Bot,
      title: t('services.chatbots'),
      description: t('services.chatbotsDesc')
    }
  ];

  const wordpressPackages = [
    {
      title: "Interstella Landing Page",
      price: "300.000",
      features: [
        "1 página optimizada",
        "WhatsApp flotante integrado",
        "Carrusel/banner/video de fondo",
        "Integración redes sociales",
        "Diseño 100% responsive",
        "Google Maps integrado",
        "3 CTAs estratégicos",
        "Formulario de contacto",
        "Galería de imágenes",
        "Hasta 2 tandas de cambios",
        "Hosting + dominio incluido",
        "Correos ilimitados",
        "Certificado SSL",
        "Backups automáticos",
        "WordPress + constructor visual",
        "Tutoriales de administración"
      ]
    },
    {
      title: "Interstella Web Informativa",
      price: "400.000",
      featured: true,
      features: [
        "4 páginas (home + 3 adicionales)",
        "WhatsApp flotante integrado",
        "Carrusel/banner/video de fondo",
        "Integración redes sociales",
        "Diseño 100% responsive",
        "Google Maps integrado",
        "Formulario de contacto",
        "Galería de imágenes",
        "Hasta 2 tandas de cambios",
        "Hosting + dominio incluido",
        "Correos ilimitados",
        "Certificado SSL",
        "Backups automáticos",
        "WordPress + constructor visual",
        "Tutoriales de administración",
        "SEO básico optimizado"
      ]
    },
    {
      title: "Interstella Tienda Online",
      price: "500.000",
      features: [
        "Pasarela de pago integrada",
        "4 páginas (Home, Tienda, Contactos, etc.)",
        "WhatsApp flotante integrado",
        "Carrusel/banner promocional",
        "Integración redes sociales",
        "Diseño 100% responsive",
        "Google Maps integrado",
        "Galería de imágenes",
        "Hasta 2 tandas de cambios",
        "Hosting + dominio incluido",
        "Correos ilimitados",
        "Certificado SSL",
        "Backups automáticos",
        "WordPress + WooCommerce",
        "Constructor visual",
        "Tutoriales de administración",
        "10 productos iniciales",
        "40 productos si envía en Excel",
        "Gestión de inventario",
        "Sistema de cupones"
      ]
    }
  ];

  const modernServices = [
    {
      title: "Aplicaciones React",
      description: "Aplicaciones web modernas y escalables con React, Next.js y tecnologías de última generación para experiencias de usuario excepcionales.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Sistemas Angular",
      description: "Plataformas empresariales robustas con Angular, perfectas para aplicaciones complejas que requieren arquitecturas escalables.",
      technologies: ["Angular", "TypeScript", "RxJS", "Angular Material"]
    },
    {
      title: "Backend Laravel",
      description: "APIs y sistemas backend potentes con Laravel, PHP moderno que garantiza seguridad, escalabilidad y rendimiento óptimo.",
      technologies: ["Laravel", "PHP", "MySQL", "Redis"]
    },
    {
      title: "Soluciones SaaS en AWS",
      description: "Plataformas SaaS completas desplegadas en AWS con arquitectura de microservicios, escalabilidad automática y alta disponibilidad.",
      technologies: ["AWS", "Docker", "Kubernetes", "Node.js"]
    }
  ];

  const whatsappMessage = encodeURIComponent("Hola, estoy interesado en conocer más sobre sus servicios 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/bannerint.png')" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('services.mainServices')}
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="nebula-card p-8 h-full">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="cosmic-glow">
                      <service.icon className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="hero-button">
                        {t('services.consultNow')}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WordPress Packages */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('services.wordpressPackages')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('services.wordpressSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {wordpressPackages.map((pkg, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PricingCard {...pkg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('services.modernTech')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('services.modernSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {modernServices.map((service, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="nebula-card p-8 h-full">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                   <div className="mb-6">
                     <p className="text-sm text-muted-foreground mb-3">{t('common.technologies')}:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-secondary/50 text-accent rounded-full border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                   <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                     <Button className="hero-button w-full">
                       {t('services.requestQuote')}
                       <ArrowRight className="ml-2 h-5 w-5" />
                     </Button>
                   </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="cosmic-glow">
            <div className="nebula-card p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('services.cta.title')}
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('services.cta.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="hero-button text-lg px-8 py-4">
                    {t('services.cta.customConsultation')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Servicios;