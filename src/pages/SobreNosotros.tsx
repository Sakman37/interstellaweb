import React from 'react';
import { Rocket, Target, Eye, ArrowRight, Star, Users, Code, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout/Layout';
import { Link } from 'react-router-dom';

const SobreNosotros = () => {
  const values = [
    {
      icon: Rocket,
      title: "Innovación Espacial",
      description: "Exploramos constantemente nuevas tecnologías y metodologías para ofrecer soluciones que van más allá de lo convencional."
    },
    {
      icon: Star,
      title: "Excelencia Estelar",
      description: "Cada proyecto es una oportunidad para superar expectativas y crear experiencias digitales que brillan como estrellas."
    },
    {
      icon: Users,
      title: "Colaboración Galáctica",
      description: "Trabajamos codo a codo con nuestros clientes, formando equipos unidos hacia el éxito del proyecto."
    },
    {
      icon: Code,
      title: "Código Cuántico",
      description: "Escribimos código limpio, escalable y eficiente que impulsa el rendimiento y la evolución continua."
    }
  ];

  const stats = [
    { number: "50+", label: "Proyectos Completados" },
    { number: "30+", label: "Clientes Satisfechos" },
    { number: "100%", label: "Proyectos Entregados" },
    { number: "24/7", label: "Soporte Técnico" }
  ];

  const whatsappMessage = encodeURIComponent("Hola, quiero conocer más sobre InterstellaWebs 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Sobre InterstellaWebs
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Navegamos el vasto universo digital para crear soluciones que trascienden fronteras
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Mission */}
            <div className="animate-slide-in-up">
              <div className="nebula-card p-8 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="cosmic-glow">
                    <Target className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Nuestra Misión</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transformar ideas brillantes en realidades digitales extraordinarias, 
                  proporcionando a nuestros clientes las herramientas tecnológicas necesarias 
                  para navegar exitosamente en el cosmos digital y alcanzar nuevas dimensiones 
                  de crecimiento empresarial.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="nebula-card p-8 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="cosmic-glow">
                    <Eye className="h-12 w-12 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Nuestra Visión</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ser la nave nodriza que guíe a las empresas hacia el éxito en el universo digital, 
                  reconocidos como pioneros en innovación tecnológica y excelencia en desarrollo web, 
                  expandiendo fronteras y creando conexiones intergalácticas entre marcas y usuarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Nuestros Valores Estelares
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían nuestra travesía por el cosmos digital
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-card text-center">
                  <div className="cosmic-glow mb-6">
                    <value.icon className="h-12 w-12 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="cosmic-glow">
            <div className="nebula-card p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Nuestro Impacto Galáctico
                  </span>
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Nuestra Historia Espacial
                </span>
              </h2>
            </div>
            
            <div className="nebula-card p-8 md:p-12">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">InterstellaWebs</strong> nació de la visión de explorar 
                  las infinitas posibilidades del desarrollo web moderno. Como exploradores digitales, 
                  entendimos que cada proyecto es una nueva galaxia por descubrir, llena de desafíos 
                  únicos y oportunidades extraordinarias.
                </p>
                
                <p>
                  Desde nuestros primeros pasos en el cosmos digital, hemos estado comprometidos con 
                  la innovación constante, la excelencia técnica y la satisfacción total de nuestros 
                  clientes. Cada línea de código que escribimos está impregnada de creatividad, 
                  precisión y la pasión por crear experiencias digitales que trascienden lo ordinario.
                </p>
                
                <p>
                  Hoy, continuamos nuestra misión de conectar empresas con el futuro digital, 
                  utilizando las tecnologías más avanzadas y metodologías probadas para garantizar 
                  que cada proyecto no solo cumpla, sino que supere las expectativas más ambiciosas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quotes */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Filosofía Intergaláctica
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="cosmic-glow">
              <div className="nebula-card p-8 text-center">
                <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
                <blockquote className="text-xl font-medium text-foreground mb-4">
                  "No hay límites en el espacio digital, solo nuevas fronteras por explorar"
                </blockquote>
                <p className="text-muted-foreground">— Filosofía InterstellaWebs</p>
              </div>
            </div>
            
            <div className="cosmic-glow">
              <div className="nebula-card p-8 text-center">
                <Rocket className="h-16 w-16 text-accent mx-auto mb-6" />
                <blockquote className="text-xl font-medium text-foreground mb-4">
                  "Cada proyecto es una nueva expedición hacia la excelencia digital"
                </blockquote>
                <p className="text-muted-foreground">— Misión InterstellaWebs</p>
              </div>
            </div>
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
                  ¿Listo para la próxima expedición?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Únete a nuestra misión de transformar el paisaje digital. 
                Tu próxima aventura cósmica comienza con un simple clic.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="hero-button text-lg px-8 py-4">
                    Despega con nosotros 🚀
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                
                <Link to="/contacto">
                  <Button variant="outline" className="text-lg px-8 py-4 border-accent/50 text-accent hover:bg-accent/10">
                    Iniciar Conversación
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

export default SobreNosotros;