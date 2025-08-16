import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import interLogo from '@/assets/inter.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const servicesButtonRef = useRef(null);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Calcular posición del dropdown
  useEffect(() => {
    if (isServicesOpen && servicesButtonRef.current) {
      const rect = servicesButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px de margen
        left: rect.left
      });
    }
  }, [isServicesOpen]);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.portfolio'), path: '/portafolio' },
    { name: t('nav.about'), path: '/sobre-nosotros' },
    { name: t('nav.contact'), path: '/contacto' },
  ];

  const serviceItems = [
    { name: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
    { name: 'Diseño Web', path: '/servicios/diseno-web' },
    { name: 'Software Personalizado', path: '/servicios/software-personalizado' },
    { name: 'Chatbots y Automatización', path: '/servicios/chatbots-automatizacion' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border/20">
        <div className="nebula-card">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="cosmic-glow">
                    <img 
                      src={interLogo} 
                      alt="InterstellaWebs Logo" 
                      className="h-20 w-50 object-contain group-hover:scale-200 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    InterstellaWebs
                  </h1>
                  <p className="text-xs text-muted-foreground">WEB DEVELOPMENT</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent" />
                    )}
                  </Link>
                ))}
                
                {/* Services Dropdown */}
                <div className="relative">
                  <button
                    ref={servicesButtonRef}
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200"
                  >
                    {t('nav.services')}
                    <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                </div>
              </div>

              {/* Language Toggle & CTA Button */}
              <div className="hidden md:flex items-center space-x-4">
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="flex items-center px-3 py-2 rounded-lg border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors duration-200"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
                </button>
                
                <Link to="/contacto">
                  <Button className="hero-button">
                    {t('nav.startNow')}
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-border/50 backdrop-blur-sm"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </button>
            </nav>

            {/* Mobile Navigation - CORREGIDO */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-border/20">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive(item.path)
                          ? 'text-primary'
                          : 'text-foreground hover:text-accent'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Services Menu - CORREGIDO */}
                  <div className="pl-3">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center py-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200"
                    >
                      {t('nav.services')}
                      <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                        isServicesOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {isServicesOpen && (
                      <div className="ml-4 mt-2 space-y-2 border-l-2 border-border/30 pl-4">
                        {serviceItems.map((service) => (
                          <Link
                            key={service.name}
                            to={service.path}
                            onClick={() => {
                              setIsServicesOpen(false);
                              setIsMenuOpen(false);
                            }}
                            className="block py-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Language Toggle Mobile - AÑADIDO */}
                  <div className="px-3">
                    <button
                      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                      className="flex items-center w-full px-3 py-2 rounded-lg border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors duration-200"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">{language === 'es' ? 'English' : 'Español'}</span>
                    </button>
                  </div>
                  
                  <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                    <Button className="hero-button w-full mt-4">
                      {t('nav.startNow')}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Services Dropdown - Fuera del contenedor del header */}
      {isServicesOpen && (
        <>
          {/* Overlay para cerrar el dropdown al hacer click fuera */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsServicesOpen(false)}
          />
          
          {/* Dropdown Menu - Posicionado de forma absoluta en toda la página */}
          <div 
            className="fixed z-[9999] w-64 bg-card/95 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl overflow-hidden animate-slide-in-up"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              minWidth: '280px'
            }}
          >
            <div className="py-2">
              {serviceItems.map((service, index) => (
                <Link
                  key={service.name}
                  to={service.path}
                  onClick={() => setIsServicesOpen(false)}
                  className="block px-4 py-3 text-sm text-foreground hover:text-accent hover:bg-secondary/30 transition-all duration-200 border-l-4 border-transparent hover:border-accent group"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                    {service.name}
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Decorative gradient border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
            
            {/* Flecha decorativa apuntando al botón */}
            <div className="absolute -top-2 left-6 w-4 h-4 bg-card/95 border-l border-t border-border/50 rotate-45 backdrop-blur-lg"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;