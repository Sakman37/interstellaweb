import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Palette, Code, Bot, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ui/service-card';
import TestimonialCard from '@/components/ui/testimonial-card';
import Layout from '@/components/Layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/pages/Admin';

// Componente para mostrar imagen del proyecto con fallback
const ProjectImage = ({ project }: { project: Project }) => {
  const [imgError, setImgError] = React.useState(false);

  if (!imgError && project.image_url) {
    return (
      <div className="aspect-video bg-gradient-to-br from-secondary to-accent/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        {project.image_url.includes('video') ? (
          <video
            src={project.image_url}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="aspect-video bg-gradient-to-br from-secondary to-accent/20 rounded-lg mb-4 flex items-center justify-center">
      <Globe className="h-12 w-12 text-accent" />
    </div>
  );
};

const Home = () => {
  useScrollToTop();
  const { t } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentProjects();
  }, []);

  const fetchRecentProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('updated_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error('Error fetching recent projects:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const testimonial = {
    content: "Juan fue el único que leyó mi informe y comprendió de verdad lo que necesitaba. Me ofreció excelentes sugerencias, añadió funciones que agilizaron mi flujo de trabajo y superó mis expectativas. Es honesto, es fácil trabajar con él, tiene una excelente comunicación y se esfuerza al máximo. Lo recomiendo ampliamente y seguiré trabajando con él.",
    author: "Joe F.",
    role: "@Bullsonline",
    location: "Auckland, New Zealand",
    timeAgo: "hace 2 meses",
    technologies: ["PHP", "MySQL", "HTML", "Laravel"]
  };

  const whatsappMessage = encodeURIComponent("Hola, estoy interesado en sus servicios de desarrollo web 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  // Función para truncar descripción
  const truncateDescription = (description: string, maxLength: number = 120) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-slide-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('home.hero.title1')}
              </span>
              <br />
              <span className="text-foreground">{t('home.hero.title2')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto">
                <Button className="hero-button text-lg px-8 py-4">
                  {t('home.hero.startNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-lg px-8 py-4 border-accent/50 text-accent hover:bg-accent/10">
                  {t('home.hero.freeConsultation')}
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 cosmic-glow opacity-30 animate-pulse" />
        <div className="absolute bottom-32 right-16 w-16 h-16 cosmic-glow opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 cosmic-glow opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('home.services.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technological Applications */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('home.tech.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.tech.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="nebula-card p-8 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="cosmic-glow">
                      <service.icon className="h-10 w-10 text-primary flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('home.portfolio.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.portfolio.subtitle')}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <div key={item.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="nebula-card p-6 h-full">
                    <ProjectImage project={item} />
                    <div className="mb-3">
                      <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {truncateDescription(item.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/portafolio">
              <Button className="hero-button">
                {t('home.portfolio.viewMore')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('home.testimonials.title')}
              </span>
            </h2>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="h-6 w-6 text-accent fill-current" />
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TestimonialCard {...testimonial} />
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
                  {t('home.cta.title')}
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('home.cta.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="hero-button text-lg px-8 py-4">
                    {t('home.cta.takeOff')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                
                <Link to="/servicios">
                  <Button variant="outline" className="text-lg px-8 py-4 border-accent/50 text-accent hover:bg-accent/10">
                    {t('home.cta.exploreServices')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;