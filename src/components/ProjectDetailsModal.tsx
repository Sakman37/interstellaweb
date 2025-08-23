import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';
import { Project } from '@/pages/Admin';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ 
  project, 
  isOpen, 
  onClose 
}) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">
                {project.title}
              </DialogTitle>
              <Badge variant="secondary" className="mb-4">
                {project.category}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Imagen principal */}
          {project.image_url && (
            <div className="aspect-video rounded-lg overflow-hidden">
              {project.image_url.includes('video') ? (
                <video 
                  src={project.image_url} 
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Descripción */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Descripción detallada */}
          {project.detailed_description && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Detalles del Proyecto</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {project.detailed_description}
              </p>
            </div>
          )}

          {/* Tecnologías */}
          {project.technologies.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Tecnologías Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Características */}
          {project.features.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Características Principales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Imágenes detalladas */}
          {project.detailed_images.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">Galería del Proyecto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.detailed_images.map((imageUrl, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    {imageUrl.includes('video') ? (
                      <video
                        src={imageUrl}
                        className="w-full h-48 object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={imageUrl}
                        alt={`${project.title} - Imagen ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-4 pt-4 border-t border-border/20">
            {project.demo_url && project.demo_url !== '#' && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <Button className="hero-button">
                  Ver Proyecto Live
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
            {project.case_study_url && project.case_study_url !== '#' && (
              <a href={project.case_study_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  Caso de Estudio
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;