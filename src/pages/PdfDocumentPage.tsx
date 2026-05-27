import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import NotFound from './NotFound';

interface PublicPdfDocument {
  title: string;
  slug: string;
  description: string | null;
  pdf_url: string;
}

const PdfDocumentPage = () => {
  const { slug } = useParams();
  const [document, setDocument] = useState<PublicPdfDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('pdf_documents')
          .select('title, slug, description, pdf_url')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setNotFound(true);
          return;
        }

        setDocument(data);
      } catch (error) {
        console.error('Error fetching PDF document:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [slug]);

  useEffect(() => {
    if (document) {
      window.document.title = `${document.title} | InterstellaWebs`;
    }
  }, [document]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-2 border-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Cargando documento...</p>
        </div>
      </div>
    );
  }

  if (notFound || !document) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="nebula-card mb-6 overflow-hidden rounded-3xl border border-border/70 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver a InterstellaWebs
              </Link>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                <FileText className="h-3.5 w-3.5" />
                Documento PDF
              </div>
              <h1 className="text-3xl font-bold text-foreground md:text-5xl">{document.title}</h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                {document.description || 'Consulta el documento directamente desde esta pagina o descargalo en PDF.'}
              </p>
              <p className="mt-4 font-mono text-sm text-muted-foreground">/{document.slug}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button asChild className="hero-button">
                <a href={document.pdf_url} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir PDF
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={document.pdf_url} download>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-2xl shadow-black/20">
          <iframe
            src={`${document.pdf_url}#view=FitH`}
            title={document.title}
            className="h-[75vh] w-full bg-background"
          />
        </div>
      </div>
    </div>
  );
};

export default PdfDocumentPage;
