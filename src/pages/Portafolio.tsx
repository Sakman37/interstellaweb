import React from 'react';
import { Globe, Code, Smartphone, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout/Layout';

const Portafolio = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Galáctico",
      description: "Tienda online completa con sistema de pagos integrado, gestión de inventario automatizada y dashboard administrativo avanzado. Desarrollada con tecnologías modernas para garantizar escalabilidad y performance óptimo.",
      category: "E-commerce",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: [
        "Pasarela de pagos múltiple",
        "Gestión de inventario en tiempo real",
        "Dashboard administrativo",
        "Sistema de cupones y descuentos",
        "Integración con redes sociales",
        "Optimización SEO avanzada"
      ],
      image: "/placeholder-ecommerce.jpg",
      demoUrl: "#",
      caseStudyUrl: "#"
    },
    {
      id: 2,
      title: "Dashboard Empresarial Quantum",
      description: "Sistema de gestión integral con analytics en tiempo real, reportes automatizados y múltiples niveles de usuario. Solución completa para empresas que buscan optimizar sus procesos operacionales.",
      category: "SaaS",
      technologies: ["Angular", "Laravel", "MySQL", "Redis"],
      features: [
        "Analytics en tiempo real",
        "Reportes automatizados",
        "Gestión de usuarios y roles",
        "API REST completa",
        "Integración con sistemas externos",
        "Backup automático de datos"
      ],
      image: "/placeholder-dashboard.jpg",
      demoUrl: "#",
      caseStudyUrl: "#"
    },
    {
      id: 3,
      title: "App Móvil Stellar",
      description: "Aplicación multiplataforma con funcionalidades avanzadas, diseño intuitivo y sincronización en la nube. Experiencia de usuario excepcional en dispositivos móviles y tablets.",
      category: "Mobile App",
      technologies: ["React Native", "Firebase", "TypeScript", "Redux"],
      features: [
        "Sincronización en la nube",
        "Notificaciones push",
        "Modo offline",
        "Autenticación biométrica",
        "Integración con mapas",
        "Chat en tiempo real"
      ],
      image: "/placeholder-mobile.jpg",
      demoUrl: "#",
      caseStudyUrl: "#"
    },
    {
      id: 4,
      title: "Plataforma Educativa Cosmos",
      description: "Sistema de gestión de aprendizaje con videos interactivos, evaluaciones automáticas y seguimiento de progreso. Diseñado para instituciones educativas modernas.",
      category: "EdTech",
      technologies: ["Vue.js", "Django", "PostgreSQL", "AWS"],
      features: [
        "Videos interactivos",
        "Evaluaciones automáticas",
        "Seguimiento de progreso",
        "Aulas virtuales",
        "Certificaciones digitales",
        "Integración con sistemas académicos"
      ],
      image: "/placeholder-education.jpg",
      demoUrl: "#",
      caseStudyUrl: "#"
    },
    {
      id: 5,
      title: "CRM Intergaláctico",
      description: "Sistema de gestión de clientes completo con automatización de procesos, seguimiento de ventas y análisis predictivo. Solución enterprise para equipos de ventas de alto rendimiento.",
      category: "CRM",
      technologies: ["Next.js", "Supabase", "Prisma", "Tailwind"],
      features: [
        "Automatización de procesos",
        "Seguimiento de ventas",
        "Análisis predictivo",
        "Integración con email marketing",
        "Reportes avanzados",
        "API para integraciones"
      ],
      image: "/placeholder-crm.jpg",
      demoUrl: "#",
      caseStudyUrl: "#"
    },
    {
      id: 6,
      title: "Marketplace Digital",
      description: "Plataforma de comercio electrónico multi-vendor con sistema de comisiones, gestión de vendedores y pagos distribuidos. Ecosistema completo para marketplaces digitales.",
      category: "Marketplace",
      technologies: ["Laravel", "Vue.js", "Redis", "Elasticsearch"],
      features: [
        "Sistema multi-vendor",
        "Gestión de comisiones",
        "Pagos distribuidos",
        "Sistema de reseñas",
        "Chat entre usuarios",
        "Analytics para vendedores"
      ],
      image: "/placeholder-marketplace.jpg",
      demoUrl: "#",
      caseStudyUrl: "#"
    }
  ];

  const categories = ["Todos", "E-commerce", "SaaS", "Mobile App", "EdTech", "CRM", "Marketplace"];
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const filteredProjects = selectedCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const whatsappMessage = encodeURIComponent("Hola, me interesa conocer más sobre sus proyectos 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Nuestro Portafolio
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Descubre los proyectos que han llevado a nuestros clientes hacia el éxito digital
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'bg-secondary/50 text-muted-foreground hover:text-accent hover:bg-secondary/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="nebula-card p-8 h-full">
                  <div className="flex flex-col h-full">
                    {/* Project Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-secondary to-accent/20 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <div className="relative z-10 text-center">
                        <Globe className="h-16 w-16 text-accent mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-foreground">
                          {project.title}
                        </h3>
                        <span className="px-3 py-1 text-sm bg-accent/20 text-accent rounded-full">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-3">Tecnologías:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 text-sm bg-secondary/50 text-foreground rounded-full border border-border/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-3">Características principales:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.features.slice(0, 4).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/20">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full hero-button">
                          Proyecto Similar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                      <Button variant="outline" className="flex-1 border-accent/50 text-accent hover:bg-accent/10">
                        Ver Detalles
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
                  ¿Te inspira alguno de estos proyectos?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Cada proyecto es único, pero la pasión por la excelencia es constante. 
                Hablemos sobre cómo podemos crear algo extraordinario para ti.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="hero-button text-lg px-8 py-4">
                    Crear Mi Proyecto 🚀
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

export default Portafolio;