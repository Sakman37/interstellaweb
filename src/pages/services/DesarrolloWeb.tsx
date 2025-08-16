import React from 'react';
import { ArrowRight, Globe, Server, Database, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PricingCard from '@/components/ui/pricing-card';
import Layout from '@/components/Layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const DesarrolloWeb = () => {
  useScrollToTop();
  const { t } = useLanguage();

  const features = [
    {
      icon: Globe,
      title: "Sitios Web Responsivos",
      description: "Diseños que se adaptan perfectamente a cualquier dispositivo"
    },
    {
      icon: Server,
      title: "Optimización SEO",
      description: "Posicionamiento en buscadores desde el primer día"
    },
    {
      icon: Database,
      title: "Bases de Datos",
      description: "Gestión eficiente de toda tu información"
    },
    {
      icon: Code2,
      title: "Código Limpio",
      description: "Desarrollo con las mejores prácticas y estándares"
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

  const whatsappMessage = encodeURIComponent("Hola, estoy interesado en desarrollo web 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(/src/assets/bannerint.png)' }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Desarrollo Web
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Creamos sitios web que impulsan tu negocio hacia el éxito digital
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ¿Por qué elegir nuestro desarrollo web?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Características que hacen la diferencia en cada proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="nebula-card p-6 text-center animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="cosmic-glow mb-4">
                  <feature.icon className="h-12 w-12 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
                Paquetes WordPress
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones completas y listas para despegar tu presencia digital
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

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tecnologías que utilizamos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trabajamos con las herramientas más modernas del mercado
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {['WordPress', 'React', 'PHP', 'MySQL', 'CSS3', 'JavaScript'].map((tech, index) => (
              <div key={index} className="nebula-card p-6 text-center animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-2xl font-bold text-primary mb-2">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Nuestro Proceso
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un proceso claro y eficiente para garantizar tu éxito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Análisis",
                description: "Entendemos tus necesidades y objetivos"
              },
              {
                step: "02", 
                title: "Diseño",
                description: "Creamos mockups y prototipos visuales"
              },
              {
                step: "03",
                title: "Desarrollo",
                description: "Programamos tu sitio web con las mejores tecnologías"
              },
              {
                step: "04",
                title: "Lanzamiento",
                description: "Publicamos y monitoreamos el rendimiento"
              }
            ].map((process, index) => (
              <div key={index} className="nebula-card p-6 text-center relative animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl font-bold text-accent mb-4">{process.step}</div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-accent/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="cosmic-glow">
            <div className="nebula-card p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ¿Listo para comenzar tu proyecto web?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Conversemos sobre tus ideas y creemos juntos el sitio web que tu negocio necesita para destacar en el mundo digital.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="hero-button text-lg px-8 py-4">
                    Solicitar Cotización 🚀
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

export default DesarrolloWeb;