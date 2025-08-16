import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Palette, Code, Bot, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ui/service-card';
import TestimonialCard from '@/components/ui/testimonial-card';
import Layout from '@/components/Layout/Layout';

const Home = () => {
  const services = [
    {
      icon: Globe,
      title: "Desarrollo de Plataformas Web",
      description: "E-commerce, tiendas online, WordPress y sitios corporativos que impulsan tu negocio al siguiente nivel digital."
    },
    {
      icon: Palette,
      title: "Diseño Web Personalizado",
      description: "Interfaces futuristas y experiencias únicas que conectan con tu audiencia y reflejan la esencia de tu marca."
    },
    {
      icon: Code,
      title: "Software Personalizado",
      description: "Aplicaciones web, sistemas de gestión y plataformas SaaS desarrolladas específicamente para tus necesidades."
    },
    {
      icon: Bot,
      title: "Chatbots y Automatizaciones",
      description: "Inteligencia artificial que optimiza procesos, mejora la atención al cliente y automatiza tareas repetitivas."
    }
  ];

  const portfolioItems = [
    {
      title: "E-commerce Galáctico",
      description: "Tienda online con sistema de pagos integrado y gestión de inventario automatizada.",
      image: "/placeholder-ecommerce.jpg"
    },
    {
      title: "Dashboard Empresarial",
      description: "Sistema de gestión integral con analytics en tiempo real y reportes automatizados.",
      image: "/placeholder-dashboard.jpg"
    },
    {
      title: "App Móvil Innovadora",
      description: "Aplicación multiplataforma con funcionalidades avanzadas y diseño intuitivo.",
      image: "/placeholder-mobile.jpg"
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-slide-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Llevamos tu negocio
              </span>
              <br />
              <span className="text-foreground">al espacio digital</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Asesoramiento, acompañamiento y soluciones tecnológicas a medida que 
              transforman ideas en realidades digitales extraordinarias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto">
                <Button className="hero-button text-lg px-8 py-4">
                  Empezar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-lg px-8 py-4 border-accent/50 text-accent hover:bg-accent/10">
                  Consulta Gratuita
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
                Lo que ofrecemos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Asesoramiento, acompañamiento y soluciones tecnológicas a medida
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
                Aplicaciones Tecnológicas
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnología de vanguardia para impulsar tu presencia digital
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
                Nuestro Portafolio
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proyectos que han llevado a nuestros clientes hacia el éxito digital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="nebula-card p-6 h-full">
                  <div className="aspect-video bg-gradient-to-br from-secondary to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                    <Globe className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portafolio">
              <Button className="hero-button">
                Ver Más Proyectos
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
                Lo que dicen nuestros clientes
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
                  ¿Listo para conquistar el universo digital?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Únete a las empresas que ya han dado el salto cuántico hacia el éxito. 
                Tu nave espacial digital está esperando.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="hero-button text-lg px-8 py-4">
                    Despegar Ahora 🚀
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                
                <Link to="/servicios">
                  <Button variant="outline" className="text-lg px-8 py-4 border-accent/50 text-accent hover:bg-accent/10">
                    Explorar Servicios
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