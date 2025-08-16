// hooks/useLanguage.tsx - Sistema de traducciones mejorado
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Sobre Nosotros',
    'nav.contact': 'Contáctanos',
    'nav.startNow': 'Empezar Ahora',
    'nav.customConsultation': 'Consulta Personalizada',
    
    // Home Page
    'home.hero.title1': 'Llevamos tu negocio',
    'home.hero.title2': 'al espacio digital',
    'home.hero.subtitle': 'Asesoramiento, acompañamiento y soluciones tecnológicas a medida que transforman ideas en realidades digitales extraordinarias.',
    'home.hero.startNow': 'Empezar Ahora',
    'home.hero.freeConsultation': 'Consulta Gratuita',
    'home.services.title': 'Lo que ofrecemos',
    'home.services.subtitle': 'Asesoramiento, acompañamiento y soluciones tecnológicas a medida',
    'home.tech.title': 'Aplicaciones Tecnológicas',
    'home.tech.subtitle': 'Tecnología de vanguardia para impulsar tu presencia digital',
    'home.portfolio.title': 'Nuestro Portafolio',
    'home.portfolio.subtitle': 'Proyectos que han llevado a nuestros clientes hacia el éxito digital',
    'home.portfolio.viewMore': 'Ver Más Proyectos',
    'home.testimonials.title': 'Lo que dicen nuestros clientes',
    'home.cta.title': '¿Listo para conquistar el universo digital?',
    'home.cta.subtitle': 'Únete a las empresas que ya han dado el salto cuántico hacia el éxito. Tu nave espacial digital está esperando.',
    'home.cta.takeOff': 'Despegar Ahora 🚀',
    'home.cta.exploreServices': 'Explorar Servicios',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Tecnología espacial para llevar tu negocio a nuevas dimensiones digitales',
    'services.webDevelopment': 'Desarrollo de Plataformas Web',
    'services.webDevelopmentDesc': 'Desde tiendas online hasta sistemas corporativos complejos, desarrollamos plataformas web que impulsan el crecimiento de tu negocio con tecnología de vanguardia.',
    'services.customDesign': 'Diseño Web Personalizado',
    'services.customDesignDesc': 'Creamos experiencias digitales únicas que reflejan la identidad de tu marca. Diseños responsivos, modernos y optimizados para conversión.',
    'services.customSoftware': 'Software Personalizado',
    'services.customSoftwareDesc': 'Aplicaciones web, sistemas de gestión, CRM, ERP y plataformas SaaS desarrolladas específicamente para optimizar los procesos de tu empresa.',
    'services.chatbots': 'Chatbots y Automatizaciones',
    'services.chatbotsDesc': 'Implementamos inteligencia artificial para automatizar procesos, mejorar la atención al cliente y optimizar la eficiencia operacional.',
    'services.consultNow': 'Consultar Ahora',
    'services.mainServices': 'Servicios Principales',
    'services.wordpressPackages': 'Paquetes WordPress',
    'services.wordpressSubtitle': 'Soluciones completas y listas para despegar tu presencia digital',
    'services.modernTech': 'Tecnologías Modernas',
    'services.modernSubtitle': 'Desarrollos avanzados con las tecnologías más innovadoras del mercado',
    'services.requestQuote': 'Solicitar Cotización',
    'services.cta.title': '¿No encuentras lo que buscas?',
    'services.cta.subtitle': 'Desarrollamos soluciones personalizadas para cada necesidad. Conversemos sobre tu proyecto y creemos algo extraordinario juntos.',
    'services.cta.customConsultation': 'Consulta Personalizada 🚀',
    
    // Portfolio
    'portfolio.title': 'Nuestro Portafolio',
    'portfolio.subtitle': 'Descubre los proyectos que han llevado a nuestros clientes hacia el éxito digital',
    'portfolio.categories.all': 'Todos',
    'portfolio.categories.ecommerce': 'E-commerce',
    'portfolio.categories.saas': 'SaaS',
    'portfolio.categories.mobile': 'Mobile App',
    'portfolio.categories.edtech': 'EdTech',
    'portfolio.categories.crm': 'CRM',
    'portfolio.categories.marketplace': 'Marketplace',
    'portfolio.technologies': 'Tecnologías:',
    'portfolio.features': 'Características principales:',
    'portfolio.similarProject': 'Proyecto Similar',
    'portfolio.viewDetails': 'Ver Detalles',
    'portfolio.cta.title': '¿Te inspira alguno de estos proyectos?',
    'portfolio.cta.subtitle': 'Cada proyecto es único, pero la pasión por la excelencia es constante. Hablemos sobre cómo podemos crear algo extraordinario para ti.',
    'portfolio.cta.createProject': 'Crear Mi Proyecto 🚀',
    
    // About
    'about.title': 'Sobre InterstellaWebs',
    'about.subtitle': 'Navegamos el vasto universo digital para crear soluciones que trascienden fronteras',
    'about.mission': 'Nuestra Misión',
    'about.missionText': 'Transformar ideas brillantes en realidades digitales extraordinarias, proporcionando a nuestros clientes las herramientas tecnológicas necesarias para navegar exitosamente en el cosmos digital y alcanzar nuevas dimensiones de crecimiento empresarial.',
    'about.vision': 'Nuestra Visión',
    'about.visionText': 'Ser la nave nodriza que guíe a las empresas hacia el éxito en el universo digital, reconocidos como pioneros en innovación tecnológica y excelencia en desarrollo web, expandiendo fronteras y creando conexiones intergalácticas entre marcas y usuarios.',
    'about.values.title': 'Nuestros Valores Estelares',
    'about.values.subtitle': 'Los principios que guían nuestra travesía por el cosmos digital',
    'about.values.innovation': 'Innovación Espacial',
    'about.values.innovationDesc': 'Exploramos constantemente nuevas tecnologías y metodologías para ofrecer soluciones que van más allá de lo convencional.',
    'about.values.excellence': 'Excelencia Estelar',
    'about.values.excellenceDesc': 'Cada proyecto es una oportunidad para superar expectativas y crear experiencias digitales que brillan como estrellas.',
    'about.values.collaboration': 'Colaboración Galáctica',
    'about.values.collaborationDesc': 'Trabajamos codo a codo con nuestros clientes, formando equipos unidos hacia el éxito del proyecto.',
    'about.values.code': 'Código Cuántico',
    'about.values.codeDesc': 'Escribimos código limpio, escalable y eficiente que impulsa el rendimiento y la evolución continua.',
    'about.stats.title': 'Nuestro Impacto Galáctico',
    'about.stats.projects': 'Proyectos Completados',
    'about.stats.clients': 'Clientes Satisfechos',
    'about.stats.delivered': 'Proyectos Entregados',
    'about.stats.support': 'Soporte Técnico',
    'about.story.title': 'Nuestra Historia Espacial',
    'about.philosophy.title': 'Filosofía Intergaláctica',
    'about.philosophy.quote1': 'No hay límites en el espacio digital, solo nuevas fronteras por explorar',
    'about.philosophy.quote2': 'Cada proyecto es una nueva expedición hacia la excelencia digital',
    'about.cta.title': '¿Listo para la próxima expedición?',
    'about.cta.subtitle': 'Únete a nuestra misión de transformar el paisaje digital. Tu próxima aventura cósmica comienza con un simple clic.',
    'about.cta.takeOff': 'Despega con nosotros 🚀',
    'about.cta.startConversation': 'Iniciar Conversación',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Estamos aquí para hacer realidad tu proyecto digital',
    'contact.name': 'Nombre',
    'contact.email': 'Correo Electrónico',
    'contact.subject': 'Motivo',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensaje enviado exitosamente',
    'contact.error': 'Error al enviar el mensaje',
    
    // Common/Buttons
    'common.all': 'Todos',
    'common.technologies': 'Tecnologías',
    'common.features': 'Características',
    'common.viewMore': 'Ver Más',
    'common.getStarted': 'Comenzar',
    'common.learnMore': 'Saber Más',
    'common.contact': 'Contactar',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.startNow': 'Start Now',
    'nav.customConsultation': 'Custom Consultation',
    
    // Home Page
    'home.hero.title1': 'We take your business',
    'home.hero.title2': 'to digital space',
    'home.hero.subtitle': 'Advisory, support and custom technological solutions that transform ideas into extraordinary digital realities.',
    'home.hero.startNow': 'Start Now',
    'home.hero.freeConsultation': 'Free Consultation',
    'home.services.title': 'What we offer',
    'home.services.subtitle': 'Advisory, support and custom technological solutions',
    'home.tech.title': 'Technological Applications',
    'home.tech.subtitle': 'Cutting-edge technology to boost your digital presence',
    'home.portfolio.title': 'Our Portfolio',
    'home.portfolio.subtitle': 'Projects that have led our clients to digital success',
    'home.portfolio.viewMore': 'View More Projects',
    'home.testimonials.title': 'What our clients say',
    'home.cta.title': 'Ready to conquer the digital universe?',
    'home.cta.subtitle': 'Join the companies that have already made the quantum leap to success. Your digital spacecraft is waiting.',
    'home.cta.takeOff': 'Take Off Now 🚀',
    'home.cta.exploreServices': 'Explore Services',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Space technology to take your business to new digital dimensions',
    'services.webDevelopment': 'Web Platform Development',
    'services.webDevelopmentDesc': 'From online stores to complex corporate systems, we develop web platforms that drive business growth with cutting-edge technology.',
    'services.customDesign': 'Custom Web Design',
    'services.customDesignDesc': 'We create unique digital experiences that reflect your brand identity. Responsive, modern designs optimized for conversion.',
    'services.customSoftware': 'Custom Software',
    'services.customSoftwareDesc': 'Web applications, management systems, CRM, ERP and SaaS platforms developed specifically to optimize your company processes.',
    'services.chatbots': 'Chatbots and Automations',
    'services.chatbotsDesc': 'We implement artificial intelligence to automate processes, improve customer service and optimize operational efficiency.',
    'services.consultNow': 'Consult Now',
    'services.mainServices': 'Main Services',
    'services.wordpressPackages': 'WordPress Packages',
    'services.wordpressSubtitle': 'Complete solutions ready to launch your digital presence',
    'services.modernTech': 'Modern Technologies',
    'services.modernSubtitle': 'Advanced developments with the most innovative technologies in the market',
    'services.requestQuote': 'Request Quote',
    'services.cta.title': 'Can\'t find what you\'re looking for?',
    'services.cta.subtitle': 'We develop custom solutions for every need. Let\'s talk about your project and create something extraordinary together.',
    'services.cta.customConsultation': 'Custom Consultation 🚀',
    
    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Discover the projects that have led our clients to digital success',
    'portfolio.categories.all': 'All',
    'portfolio.categories.ecommerce': 'E-commerce',
    'portfolio.categories.saas': 'SaaS',
    'portfolio.categories.mobile': 'Mobile App',
    'portfolio.categories.edtech': 'EdTech',
    'portfolio.categories.crm': 'CRM',
    'portfolio.categories.marketplace': 'Marketplace',
    'portfolio.technologies': 'Technologies:',
    'portfolio.features': 'Key features:',
    'portfolio.similarProject': 'Similar Project',
    'portfolio.viewDetails': 'View Details',
    'portfolio.cta.title': 'Inspired by any of these projects?',
    'portfolio.cta.subtitle': 'Each project is unique, but the passion for excellence is constant. Let\'s talk about how we can create something extraordinary for you.',
    'portfolio.cta.createProject': 'Create My Project 🚀',
    
    // About
    'about.title': 'About InterstellaWebs',
    'about.subtitle': 'We navigate the vast digital universe to create solutions that transcend boundaries',
    'about.mission': 'Our Mission',
    'about.missionText': 'Transform brilliant ideas into extraordinary digital realities, providing our clients with the necessary technological tools to successfully navigate the digital cosmos and reach new dimensions of business growth.',
    'about.vision': 'Our Vision',
    'about.visionText': 'To be the mother ship that guides companies to success in the digital universe, recognized as pioneers in technological innovation and excellence in web development, expanding frontiers and creating intergalactic connections between brands and users.',
    'about.values.title': 'Our Stellar Values',
    'about.values.subtitle': 'The principles that guide our journey through the digital cosmos',
    'about.values.innovation': 'Space Innovation',
    'about.values.innovationDesc': 'We constantly explore new technologies and methodologies to offer solutions that go beyond conventional.',
    'about.values.excellence': 'Stellar Excellence',
    'about.values.excellenceDesc': 'Each project is an opportunity to exceed expectations and create digital experiences that shine like stars.',
    'about.values.collaboration': 'Galactic Collaboration',
    'about.values.collaborationDesc': 'We work side by side with our clients, forming united teams towards project success.',
    'about.values.code': 'Quantum Code',
    'about.values.codeDesc': 'We write clean, scalable and efficient code that drives performance and continuous evolution.',
    'about.stats.title': 'Our Galactic Impact',
    'about.stats.projects': 'Completed Projects',
    'about.stats.clients': 'Satisfied Clients',
    'about.stats.delivered': 'Delivered Projects',
    'about.stats.support': 'Technical Support',
    'about.story.title': 'Our Space Story',
    'about.philosophy.title': 'Intergalactic Philosophy',
    'about.philosophy.quote1': 'There are no limits in digital space, only new frontiers to explore',
    'about.philosophy.quote2': 'Each project is a new expedition towards digital excellence',
    'about.cta.title': 'Ready for the next expedition?',
    'about.cta.subtitle': 'Join our mission to transform the digital landscape. Your next cosmic adventure begins with a simple click.',
    'about.cta.takeOff': 'Take off with us 🚀',
    'about.cta.startConversation': 'Start Conversation',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We\'re here to make your digital project a reality',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully',
    'contact.error': 'Error sending message',
    
    // Common/Buttons
    'common.all': 'All',
    'common.technologies': 'Technologies',
    'common.features': 'Features',
    'common.viewMore': 'View More',
    'common.getStarted': 'Get Started',
    'common.learnMore': 'Learn More',
    'common.contact': 'Contact',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'es' | 'en'>(() => {
    // Detectar idioma del navegador al inicializar
    const browserLang = navigator.language.toLowerCase();
    const storedLang = localStorage.getItem('interstellawebs-language') as 'es' | 'en';
    
    if (storedLang) {
      return storedLang;
    }
    
    // Si el navegador está en inglés, usar inglés, sino español por defecto
    return browserLang.includes('en') ? 'en' : 'es';
  });

  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('interstellawebs-language', language);
    // Cambiar el idioma del documento HTML
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations['es']];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};