import React, { useState, useEffect } from 'react';
import { Globe, Code, Smartphone, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import { Project } from '@/pages/Admin';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ProjectImage = ({ project }: { project: Project }) => {
  const [imgError, setImgError] = React.useState(false);

  if (!imgError && project.image_url) {
    return (
      <div className="aspect-video rounded-lg mb-6 relative overflow-hidden">
        {project.image_url.includes('video') ? (
          <video
            src={project.image_url}
            className="w-full h-full object-cover"
            controls
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute top-2 left-2 px-3 py-1 bg-accent/80 text-white text-sm rounded-full">
          {project.category}
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-gradient-to-br from-secondary to-accent/20 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
      <div className="relative z-10 text-center">
        <Globe className="h-16 w-16 text-accent mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">{project.category}</p>
      </div>
    </div>
  );
};

const Portafolio = () => {
  useScrollToTop();
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const categories = [t('portfolio.categories.all'), ...Array.from(new Set(projects.map(p => p.category)))];
  const [selectedCategory, setSelectedCategory] = React.useState(t('portfolio.categories.all'));

  const filteredProjects = selectedCategory === t('portfolio.categories.all')
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  const whatsappMessage = encodeURIComponent("Hola, me interesa conocer más sobre sus proyectos 🚀");
  const whatsappUrl = `https://wa.me/573127877182?text=${whatsappMessage}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('portfolio.title')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('portfolio.subtitle')}
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
                    
                    {/* Project Image with Fallback */}
                    <ProjectImage project={project} />
                    
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
                        <p className="text-sm text-muted-foreground mb-3">{t('portfolio.technologies')}</p>
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
                        <p className="text-sm text-muted-foreground mb-3">{t('portfolio.features')}</p>
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
                      {project.demo_url && project.demo_url !== "#" && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full hero-button">
                            {t('portfolio.viewDetails')}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      <Button 
                        variant="outline" 
                        className="flex-1 border-accent/50 text-accent hover:bg-accent/10"
                        onClick={() => handleViewDetails(project)}
                      >
                        {t('portfolio.viewDetails')}
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
                  {t('portfolio.cta.title')}
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('portfolio.cta.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="hero-button text-lg px-8 py-4">
                    {t('portfolio.cta.createProject')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
    </Layout>
  );
};

export default Portafolio;
