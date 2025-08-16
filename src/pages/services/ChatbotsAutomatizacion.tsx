import React from 'react';
import { ArrowRight, Bot, MessageCircle, Clock, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ChatbotsAutomatizacion = () => {
  useScrollToTop();
  const { t } = useLanguage();

  const features = [
    {
      icon: Bot,
      title: "Inteligencia Artificial",
      description: "Chatbots inteligentes que aprenden de cada interacción"
    },
    {
      icon: MessageCircle,
      title: "Atención 24/7",
      description: "Soporte automático las 24 horas del día"
    },
    {
      icon: Clock,
      title: "Respuestas Instantáneas",
      description: "Reduce tiempos de respuesta a segundos"
    },
    {
      icon: BarChart,
      title: "Análisis Avanzado",
      description: "Métricas y reportes de todas las interacciones"
    }
  ];

  const whatsappMessage = encodeURIComponent("Hola, estoy interesado en chatbots y automatización 🚀");
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
              Chatbots y Automatización
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Inteligencia artificial que revoluciona tu atención al cliente
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
                  ¿Listo para automatizar?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Implementemos IA en tu negocio y optimicemos tus procesos
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button className="hero-button text-lg px-8 py-4">
                  Implementar IA 🚀
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

export default ChatbotsAutomatizacion;