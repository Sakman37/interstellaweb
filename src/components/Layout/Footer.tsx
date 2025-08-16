import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  // Servicios con las rutas reales corregidas
  const services = [
    { name: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
    { name: 'Diseño Web', path: '/servicios/diseno-web' },
    { name: 'Software Personalizado', path: '/servicios/software-personalizado' },
    { name: 'Chatbots y Automatización', path: '/servicios/chatbots-automatizacion' }
  ];

  const whatsappMessage = encodeURIComponent("Hola, estoy interesado en sus servicios de desarrollo web 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  return (
    <footer className="relative mt-20 border-t border-border/20">
      <div className="nebula-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="cosmic-glow">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    InterstellaWebs
                  </h3>
                  <p className="text-xs text-muted-foreground">WEB DEVELOPMENT</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Llevamos tu negocio al espacio digital con tecnología de vanguardia y diseño futurista.
              </p>
            </div>

            {/* Services - CORREGIDO CON RUTAS */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Servicios</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.path} 
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <a 
                    href="mailto:info@interstellawebs.com"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    info@interstellawebs.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Palmira, Valle del Cauca, Colombia
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Enlaces Útiles</h4>
              <div className="space-y-3">
                <Link 
                  to="/contacto"
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Contáctanos
                </Link>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Pedir Presupuesto
                </a>
                
                {/* Social Media */}
                <div className="flex space-x-4 pt-2">
                  <a 
                    href="#" 
                    className="p-2 rounded-lg border border-border/50 hover:border-accent/50 transition-colors duration-200"
                  >
                    <Facebook className="h-4 w-4 text-muted-foreground hover:text-accent" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 rounded-lg border border-border/50 hover:border-accent/50 transition-colors duration-200"
                  >
                    <Instagram className="h-4 w-4 text-muted-foreground hover:text-accent" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-border/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2025 InterstellaWebs. Todos los derechos reservados.
              </p>
              <p className="text-sm text-muted-foreground">
                Desarrollado con 🚀 por InterstellaWebs
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Star Field Effect */}
      <div className="star-field opacity-30" />
    </footer>
  );
};

export default Footer;