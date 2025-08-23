import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/pages/Admin';

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    detailed_description: project?.detailed_description || '',
    category: project?.category || '',
    demo_url: project?.demo_url || '',
    case_study_url: project?.case_study_url || '',
    is_published: project?.is_published ?? true,
  });
  
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);
  const [features, setFeatures] = useState<string[]>(project?.features || []);
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [imageUrl, setImageUrl] = useState(project?.image_url || '');
  const [detailedImages, setDetailedImages] = useState<string[]>(project?.detailed_images || []);
  
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  const uploadImage = async (file: File, isDetailed = false): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const bucketName = file.type.startsWith('video/') ? 'project-videos' : 'project-images';
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const url = await uploadImage(file);
      setImageUrl(url);
      toast({
        title: "Imagen subida",
        description: "La imagen principal se subió correctamente",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "No se pudo subir la imagen",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDetailedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setLoading(true);
      const uploadPromises = files.map(file => uploadImage(file, true));
      const urls = await Promise.all(uploadPromises);
      setDetailedImages([...detailedImages, ...urls]);
      toast({
        title: "Imágenes subidas",
        description: `Se subieron ${urls.length} archivos correctamente`,
      });
    } catch (error) {
      console.error('Error uploading detailed images:', error);
      toast({
        title: "Error",
        description: "No se pudieron subir algunas imágenes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeDetailedImage = (index: number) => {
    setDetailedImages(detailedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.category.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa título, descripción y categoría",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        ...formData,
        technologies,
        features,
        image_url: imageUrl || null,
        detailed_images: detailedImages,
      };

      let result;
      if (project) {
        result = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);
      } else {
        result = await supabase
          .from('projects')
          .insert([projectData]);
      }

      if (result.error) throw result.error;

      toast({
        title: project ? "Proyecto actualizado" : "Proyecto creado",
        description: project ? "Los cambios se guardaron correctamente" : "El proyecto se creó correctamente",
      });
      
      onSubmit();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el proyecto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Categoría *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descripción *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="detailed_description">Descripción Detallada</Label>
        <Textarea
          id="detailed_description"
          value={formData.detailed_description}
          onChange={(e) => handleInputChange('detailed_description', e.target.value)}
          rows={4}
          placeholder="Descripción completa que se mostrará en el modal de detalles"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="demo_url">URL Demo</Label>
          <Input
            id="demo_url"
            value={formData.demo_url}
            onChange={(e) => handleInputChange('demo_url', e.target.value)}
            placeholder="https://ejemplo.com"
          />
        </div>
        <div>
          <Label htmlFor="case_study_url">URL Caso de Estudio</Label>
          <Input
            id="case_study_url"
            value={formData.case_study_url}
            onChange={(e) => handleInputChange('case_study_url', e.target.value)}
            placeholder="https://ejemplo.com/caso-estudio"
          />
        </div>
      </div>

      {/* Imagen Principal */}
      <div>
        <Label>Imagen Principal</Label>
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={handleMainImageUpload}
            disabled={loading}
          />
          {imageUrl && (
            <div className="relative inline-block">
              {imageUrl.includes('video') ? (
                <video src={imageUrl} className="w-32 h-20 object-cover rounded" controls />
              ) : (
                <img src={imageUrl} alt="Preview" className="w-32 h-20 object-cover rounded" />
              )}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2"
                onClick={() => setImageUrl('')}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Imágenes Detalladas */}
      <div>
        <Label>Imágenes/Videos Detallados</Label>
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleDetailedImageUpload}
            disabled={loading}
          />
          {detailedImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {detailedImages.map((url, index) => (
                <div key={index} className="relative">
                  {url.includes('video') ? (
                    <video src={url} className="w-full h-20 object-cover rounded" controls />
                  ) : (
                    <img src={url} alt={`Detail ${index}`} className="w-full h-20 object-cover rounded" />
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={() => removeDetailedImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tecnologías */}
      <div>
        <Label>Tecnologías</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Agregar tecnología"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
          />
          <Button type="button" onClick={addTechnology}>Agregar</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => removeTechnology(tech)}>
              {tech} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <Label>Características</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Agregar característica"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature}>Agregar</Button>
        </div>
        <div className="space-y-2">
          {features.map((feature) => (
            <Badge key={feature} variant="secondary" className="cursor-pointer block w-fit" onClick={() => removeFeature(feature)}>
              {feature} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      </div>

      {/* Publicado */}
      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={formData.is_published}
          onCheckedChange={(checked) => handleInputChange('is_published', checked)}
        />
        <Label htmlFor="published">Publicado</Label>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="hero-button">
          {loading ? 'Guardando...' : (project ? 'Actualizar' : 'Crear')}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;