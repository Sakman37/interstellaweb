-- Create storage buckets for project media
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('project-images', 'project-images', true),
  ('project-videos', 'project-videos', true);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT,
  category TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  demo_url TEXT,
  case_study_url TEXT,
  detailed_images TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (public read, admin write)
CREATE POLICY "Projects are publicly readable" 
ON public.projects 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins can manage projects" 
ON public.projects 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

-- Create policies for storage
CREATE POLICY "Project images are publicly readable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-images' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "Admins can update project images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-images' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "Admins can delete project images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-images' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "Project videos are publicly readable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'project-videos');

CREATE POLICY "Admins can upload project videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'project-videos' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "Admins can update project videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'project-videos' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "Admins can delete project videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'project-videos' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing projects data
INSERT INTO public.projects (title, description, category, technologies, features, demo_url, case_study_url) VALUES 
(
  'NZStudstock: Solución digital para criadores y subastas',
  'NZStudstock es una plataforma web diseñada para modernizar la manera en que los criadores gestionan y promocionan sus subastas de ganado. La solución permite a los usuarios publicar y administrar catálogos de ventas con fotos, videos y características detalladas de cada animal. El sitio incluye filtros avanzados por raza, tipo y rasgos, ofreciendo a los compradores una experiencia de búsqueda rápida e intuitiva.',
  'Marketplace',
  ARRAY['PHP', 'MySQL', 'Laravel', 'JavaScript', 'Tailwind CSS'],
  ARRAY['Pasarela de pagos múltiple', 'Gestión de inventario en tiempo real', 'Dashboard administrativo', 'Sistema de cupones y descuentos', 'Integración con redes sociales', 'Optimización SEO avanzada'],
  'https://nzstudstock.co.nz',
  '#'
),
(
  'Dashboard Empresarial Quantum',
  'Sistema de gestión integral con analytics en tiempo real, reportes automatizados y múltiples niveles de usuario. Solución completa para empresas que buscan optimizar sus procesos operacionales.',
  'SaaS',
  ARRAY['Angular', 'Laravel', 'MySQL', 'Redis'],
  ARRAY['Analytics en tiempo real', 'Reportes automatizados', 'Gestión de usuarios y roles', 'API REST completa', 'Integración con sistemas externos', 'Backup automático de datos'],
  '#',
  '#'
),
(
  'Plataforma Educativa Cosmos',
  'Sistema de gestión de aprendizaje con videos interactivos, evaluaciones automáticas y seguimiento de progreso. Diseñado para instituciones educativas modernas.',
  'EdTech',
  ARRAY['Vue.js', 'Django', 'PostgreSQL', 'AWS'],
  ARRAY['Videos interactivos', 'Evaluaciones automáticas', 'Seguimiento de progreso', 'Aulas virtuales', 'Certificaciones digitales', 'Integración con sistemas académicos'],
  '#',
  '#'
),
(
  'CRM Intergaláctico',
  'Sistema de gestión de clientes completo con automatización de procesos, seguimiento de ventas y análisis predictivo. Solución enterprise para equipos de ventas de alto rendimiento.',
  'CRM',
  ARRAY['Next.js', 'Supabase', 'Prisma', 'Tailwind'],
  ARRAY['Automatización de procesos', 'Seguimiento de ventas', 'Análisis predictivo', 'Integración con email marketing', 'Reportes avanzados', 'API para integraciones'],
  '#',
  '#'
),
(
  'Marketplace Digital',
  'Plataforma de comercio electrónico multi-vendor con sistema de comisiones, gestión de vendedores y pagos distribuidos. Ecosistema completo para marketplaces digitales.',
  'Marketplace',
  ARRAY['Laravel', 'Vue.js', 'Redis', 'Elasticsearch'],
  ARRAY['Sistema multi-vendor', 'Gestión de comisiones', 'Pagos distribuidos', 'Sistema de reseñas', 'Chat entre usuarios', 'Analytics para vendedores'],
  '#',
  '#'
);