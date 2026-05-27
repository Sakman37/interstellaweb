import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PdfDocument {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  pdf_url: string;
  storage_path: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface PdfDocumentFormProps {
  document?: PdfDocument | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_-]/g, '')
    .replace(/[_-]{2,}/g, '_')
    .replace(/^[_-]+|[_-]+$/g, '');

const PdfDocumentForm: React.FC<PdfDocumentFormProps> = ({ document, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: document?.title || '',
    slug: document?.slug || '',
    description: document?.description || '',
    is_published: document?.is_published ?? true,
  });
  const { toast } = useToast();

  const publicPath = useMemo(() => {
    if (!formData.slug) return '';
    return `https://interstellawebs.com/${formData.slug}`;
  }, [formData.slug]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadPdf = async (file: File, slug: string) => {
    const fileName = `${Date.now()}-${slug}.pdf`;
    const storagePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('pdf-documents')
      .upload(storagePath, file, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('pdf-documents')
      .getPublicUrl(storagePath);

    return {
      pdfUrl: data.publicUrl,
      storagePath,
    };
  };

  const deleteStoredPdf = async (storagePath?: string | null) => {
    if (!storagePath) return;

    const { error } = await supabase.storage
      .from('pdf-documents')
      .remove([storagePath]);

    if (error) {
      console.error('Error deleting PDF from storage:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedSlug = normalizeSlug(formData.slug);
    if (!formData.title.trim() || !normalizedSlug) {
      toast({
        title: 'Campos requeridos',
        description: 'Debes completar el titulo y un slug valido.',
        variant: 'destructive',
      });
      return;
    }

    if (!document && !pdfFile) {
      toast({
        title: 'PDF requerido',
        description: 'Selecciona un archivo PDF para crear el enlace.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      let pdfUrl = document?.pdf_url || '';
      let storagePath = document?.storage_path || '';

      if (pdfFile) {
        const uploadedFile = await uploadPdf(pdfFile, normalizedSlug);
        pdfUrl = uploadedFile.pdfUrl;
        storagePath = uploadedFile.storagePath;
      }

      const payload = {
        title: formData.title.trim(),
        slug: normalizedSlug,
        description: formData.description.trim() || null,
        pdf_url: pdfUrl,
        storage_path: storagePath,
        is_published: formData.is_published,
      };

      const result = document
        ? await supabase.from('pdf_documents').update(payload).eq('id', document.id)
        : await supabase.from('pdf_documents').insert([payload]);

      if (result.error) {
        if (pdfFile && storagePath && storagePath !== document?.storage_path) {
          await deleteStoredPdf(storagePath);
        }
        throw result.error;
      }

      if (pdfFile && document?.storage_path && document.storage_path !== storagePath) {
        await deleteStoredPdf(document.storage_path);
      }

      toast({
        title: document ? 'PDF actualizado' : 'PDF publicado',
        description: document
          ? 'El documento quedo actualizado en el dominio.'
          : 'El nuevo enlace publico ya quedo creado.',
      });

      onSubmit();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '';
      console.error('Error saving PDF document:', error);
      toast({
        title: 'Error',
        description:
          errorMessage.includes('pdf_documents_slug_key')
            ? 'Ese slug ya existe. Usa otro diferente.'
            : 'No se pudo guardar el documento PDF.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="pdf-title">Titulo *</Label>
          <Input
            id="pdf-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Propuesta comercial La Offi"
            required
          />
        </div>

        <div>
          <Label htmlFor="pdf-slug">Slug publico *</Label>
          <Input
            id="pdf-slug"
            value={formData.slug}
            onChange={(e) => handleInputChange('slug', normalizeSlug(e.target.value))}
            placeholder="laoffi_propuesta"
            required
          />
          <p className="mt-2 text-sm text-muted-foreground">
            URL final: {publicPath || 'https://interstellawebs.com/tu_slug'}
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="pdf-description">Descripcion</Label>
        <Textarea
          id="pdf-description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Texto breve para contextualizar el documento."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="pdf-file">
          Archivo PDF {document ? '(opcional para reemplazar)' : '*'}
        </Label>
        <Input
          id="pdf-file"
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          disabled={loading}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          {pdfFile
            ? `Archivo listo: ${pdfFile.name}`
            : document
              ? 'Si no seleccionas otro archivo se mantiene el PDF actual.'
              : 'Sube el archivo que quieres publicar en el dominio.'}
        </p>
      </div>

      <div className="rounded-lg border border-border/70 bg-background/30 p-4">
        <p className="text-sm font-medium text-foreground">Enlace actual del PDF</p>
        <a
          href={document?.pdf_url || '#'}
          target="_blank"
          rel="noreferrer"
          className="mt-2 block break-all text-sm text-primary underline-offset-4 hover:underline"
        >
          {document?.pdf_url || 'Se generara al guardar el documento'}
        </a>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="pdf-published"
          checked={formData.is_published}
          onCheckedChange={(checked) => handleInputChange('is_published', checked)}
        />
        <Label htmlFor="pdf-published">Publicado</Label>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="hero-button">
          {loading ? 'Guardando...' : document ? 'Actualizar PDF' : 'Publicar PDF'}
        </Button>
      </div>
    </form>
  );
};

export default PdfDocumentForm;
