import React from 'react';
import { ArrowRight, Palette, Zap, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const DisenoWeb = () => {
  useScrollToTop();
  const { t } = useLanguage();

  const features = [
    {
      icon: Palette,
      title: "Diseño Único",
      description: "Interfaces personalizadas que reflejan tu marca"
    },
    {
      icon: Zap,
      title: "Experiencia de Usuario",
      description: "Navegación intuitiva y conversiones optimizadas"
    },
    {
      icon: Users,
      title: "Centrado en el Usuario",
      description: "Diseños pensados para tu audiencia objetivo"
    },
    {
      icon: TrendingUp,
      title: "Resultados Medibles",
      description: "Diseños que aumentan tus conversiones"
    }
  ];

  const whatsappMessage = encodeURIComponent("Hola, estoy interesado en diseño web 🚀");
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
              Diseño Web
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Diseños que cautivan, convierten y conectan con tu audiencia
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="nebula-card p-6 text-center">
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

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="cosmic-glow">
            <div className="nebula-card p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ¿Listo para destacar?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Creemos juntos el diseño perfecto para tu marca
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button className="hero-button text-lg px-8 py-4">
                  Solicitar Diseño 🚀
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DisenoWeb;