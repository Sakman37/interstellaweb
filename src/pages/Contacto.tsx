import React, { useState } from 'react';
import { Mail, Send, ArrowRight, Check, AlertCircle, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface FormData {
  nombre: string;
  correo: string;
  motivo: string;
  mensaje: string;
}

// Componentes nativos que funcionan igual que shadcn pero sin dependencias
const Input = ({ 
  id, 
  name, 
  type, 
  placeholder, 
  value, 
  onChange, 
  required,
  className = "",
  ...props 
}: {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Textarea = ({ 
  id, 
  name, 
  placeholder, 
  value, 
  onChange, 
  rows,
  required,
  className = "",
  ...props 
}: {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical ${className}`}
      {...props}
    />
  );
};

const Label = ({ 
  htmlFor, 
  children,
  className = "",
  ...props 
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

const Contacto = () => {
  useScrollToTop();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    motivo: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const motivoOptions = [
    { value: 'web', label: 'Desarrollo Web / Landing Page' },
    { value: 'ecommerce', label: 'Tienda Online / E-commerce' },
    { value: 'software', label: 'Software Personalizado' },
    { value: 'chatbot', label: 'Chatbots y Automatizaciones' },
    { value: 'consultoria', label: 'Consultoría Tecnológica' },
    { value: 'soporte', label: 'Soporte Técnico' },
    { value: 'otro', label: 'Otro' }
  ];

  // Toast personalizado mejorado
  const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
    // Crear elemento toast
    const toastContainer = document.createElement('div');
    toastContainer.className = `fixed top-4 right-4 z-50 max-w-sm transform translate-x-full opacity-0 transition-all duration-300`;
    
    const toastElement = document.createElement('div');
    toastElement.className = `p-4 rounded-lg shadow-lg border ${
      variant === 'destructive' 
        ? 'bg-red-500/90 border-red-600 text-white' 
        : 'bg-green-500/90 border-green-600 text-white'
    } backdrop-blur-sm`;
    
    toastElement.innerHTML = `
      <div class="font-semibold">${title}</div>
      <div class="text-sm opacity-90">${description}</div>
    `;
    
    toastContainer.appendChild(toastElement);
    document.body.appendChild(toastContainer);
    
    // Animación de entrada
    setTimeout(() => {
      toastContainer.style.transform = 'translateX(0)';
      toastContainer.style.opacity = '1';
    }, 10);
    
    // Remover después de 5 segundos con animación
    setTimeout(() => {
      toastContainer.style.transform = 'translateX(full)';
      toastContainer.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toastContainer)) {
          document.body.removeChild(toastContainer);
        }
      }, 300);
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError(null);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      motivo: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validación del frontend
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.motivo || !formData.mensaje.trim()) {
      const errorMsg = 'Por favor completa todos los campos del formulario.';
      setError(errorMsg);
      showToast('Campos requeridos', errorMsg, 'destructive');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo.trim())) {
      const errorMsg = 'Por favor ingresa un correo electrónico válido.';
      setError(errorMsg);
      showToast('Email inválido', errorMsg, 'destructive');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos para enviar
      const dataToSend = {
        nombre: formData.nombre.trim(),
        correo: formData.correo.trim().toLowerCase(),
        motivo: motivoOptions.find(opt => opt.value === formData.motivo)?.label || formData.motivo,
        mensaje: formData.mensaje.trim()
      };

      console.log('Enviando datos:', dataToSend);

      // Hacer la petición a la API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok && data.success) {
        setIsSubmitted(true);
        showToast('¡Mensaje enviado! 🚀', 'Nos pondremos en contacto contigo pronto.');

        // Reset form
        setFormData({
          nombre: '',
          correo: '',
          motivo: '',
          mensaje: ''
        });
      } else {
        throw new Error(data.message || `Error HTTP ${response.status}`);
      }

    } catch (error) {
      console.error('Error enviando email:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(`Error al enviar el mensaje: ${errorMessage}`);
      
      // Fallback: abrir WhatsApp como backup
      const whatsappMessage = `🚀 Contacto desde la web:
      
*Nombre:* ${formData.nombre}
*Correo:* ${formData.correo}
*Motivo:* ${motivoOptions.find(opt => opt.value === formData.motivo)?.label || formData.motivo}
*Mensaje:* ${formData.mensaje}`;
      
      const whatsappUrl = `https://wa.me/573127877182?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Usar confirm para preguntar si quiere usar WhatsApp
      const useWhatsApp = window.confirm('Hubo un problema enviando el email. ¿Quieres enviar tu mensaje por WhatsApp como alternativa?');
      
      if (useWhatsApp) {
        window.open(whatsappUrl, '_blank');
        showToast('Mensaje enviado por WhatsApp', 'Tu mensaje se envió por WhatsApp como respaldo.');
        
        setIsSubmitted(true);
        setFormData({
          nombre: '',
          correo: '',
          motivo: '',
          mensaje: ''
        });
      } else {
        showToast('Error al enviar', 'Por favor intenta nuevamente o contacta por WhatsApp.', 'destructive');
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent("Hola, quiero agendar una reunión para hablar sobre mi proyecto 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="cosmic-glow">
              <div className="nebula-card p-12 max-w-2xl mx-auto">
                <div className="cosmic-glow mb-8">
                  <Check className="h-20 w-20 text-accent mx-auto" />
                </div>
                
                <h1 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ¡Mensaje Enviado! 🚀
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto 
                  para comenzar tu viaje hacia el éxito digital.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="hero-button"
                  >
                    Enviar Otro Mensaje
                  </Button>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10">
                      WhatsApp Directo
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="cosmic-glow">
                <div className="nebula-card p-8">
                  <h2 className="text-3xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Envíanos un Mensaje
                    </span>
                  </h2>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span className="text-red-500 text-sm">{error}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">{t('contact.name')}</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder={t('contact.name')}
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="correo">{t('contact.email')}</Label>
                      <Input
                        id="correo"
                        name="correo"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.correo}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivo">{t('contact.subject')}</Label>
                      <select
                        id="motivo"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleSelectChange}
                        required
                        disabled={isSubmitting}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" disabled>Selecciona el motivo de tu consulta</option>
                        {motivoOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">{t('contact.message')}</Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        placeholder={t('contact.message')}
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        rows={6}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full hero-button"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t('contact.send')}
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Al enviar este formulario, aceptas que nos pongamos en contacto contigo 
                        para discutir tu proyecto.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Iniciemos el Despegue
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Cada gran proyecto comienza con una conversación. Cuéntanos tu visión 
                    y nosotros la convertiremos en realidad digital.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  <div className="nebula-card p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Email</h3>
                        <p className="text-muted-foreground">info@interstellawebs.com</p>
                        <p className="text-sm text-muted-foreground">clients@interstellawebs.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="nebula-card p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">WhatsApp</h3>
                        <p className="text-muted-foreground">+57 312 787 7182</p>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-accent transition-colors"
                        >
                          Enviar mensaje directo
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="nebula-card p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Ubicación</h3>
                        <p className="text-muted-foreground">Palmira, Valle del Cauca</p>
                        <p className="text-muted-foreground">Colombia</p>
                      </div>
                    </div>
                  </div>

                  <div className="nebula-card p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Horario</h3>
                        <p className="text-muted-foreground">Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Sábados: 9:00 AM - 2:00 PM</p>
                        <p className="text-sm text-primary">Soporte 24/7 disponible</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <a
                    href="https://wa.me/573127877182?text=Hola%2C%20quiero%20agendar%20una%20reunión%20para%20discutir%20mi%20proyecto%20%F0%9F%9A%80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full hero-button">
                      📅 Agendar Reunión
                    </Button>
                  </a>
                  
                  <a
                    href="https://wa.me/573127877182?text=Hola%2C%20quiero%20solicitar%20un%20presupuesto%20para%20mi%20proyecto%20%F0%9F%9A%80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full border-accent/50 text-accent hover:bg-accent/10">
                      💰 Solicitar Presupuesto
                    </Button>
                  </a>
                </div>

                {/* Why Choose Us */}
                <div className="nebula-card p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    ¿Por qué elegirnos?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-muted-foreground">Consulta inicial gratuita</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-muted-foreground">Propuesta personalizada</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-muted-foreground">Soporte técnico 24/7</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-muted-foreground">Garantía de satisfacción</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-background/50 to-background-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                Preguntas <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Frecuentes</span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="nebula-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  ¿Cuánto tiempo toma desarrollar un proyecto?
                </h3>
                <p className="text-muted-foreground">
                  Los tiempos varían según la complejidad. Una landing page toma 1-2 semanas, 
                  mientras que un e-commerce completo puede tomar 4-8 semanas.
                </p>
              </div>

              <div className="nebula-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  ¿Ofrecen soporte post-lanzamiento?
                </h3>
                <p className="text-muted-foreground">
                  Sí, incluimos soporte técnico y mantenimiento. También ofrecemos tutoriales 
                  de administración para que puedas gestionar tu sitio web.
                </p>
              </div>

              <div className="nebula-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  ¿Trabajan con empresas fuera de Colombia?
                </h3>
                <p className="text-muted-foreground">
                  Absolutamente. Trabajamos con clientes de toda América Latina y el mundo, 
                  ofreciendo comunicación fluida en español e inglés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="cosmic-glow">
            <div className="nebula-card p-12 max-w-4xl mx-auto">
              <Mail className="h-16 w-16 text-accent mx-auto mb-6" />
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ¿Listo para el despegue?
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Tu próxima aventura digital está a un mensaje de distancia. 
                Hagamos que tu proyecto brille como una estrella en el cosmos digital.
              </p>
              
              <div className="text-sm text-muted-foreground">
                <p>📧 info@interstellawebs.com</p>
                <p>📍 Palmira, Valle del Cauca, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;