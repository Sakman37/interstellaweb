INSERT INTO storage.buckets (id, name, public)
VALUES ('pdf-documents', 'pdf-documents', true)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.pdf_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  pdf_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT pdf_documents_slug_format CHECK (slug ~ '^[a-z0-9]+(?:[_-][a-z0-9]+)*$')
);

ALTER TABLE public.pdf_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "PDF documents are publicly readable"
ON public.pdf_documents
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage PDF documents"
ON public.pdf_documents
FOR ALL
USING (auth.jwt() ->> 'email' = 'juan@interstellawebs.com')
WITH CHECK (auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "PDF documents are publicly downloadable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'pdf-documents');

CREATE POLICY "Admins can upload PDF documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'pdf-documents' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "Admins can update PDF documents"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'pdf-documents' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

CREATE POLICY "Admins can delete PDF documents"
ON storage.objects
FOR DELETE
USING (bucket_id = 'pdf-documents' AND auth.jwt() ->> 'email' = 'juan@interstellawebs.com');

DROP TRIGGER IF EXISTS update_pdf_documents_updated_at ON public.pdf_documents;

CREATE TRIGGER update_pdf_documents_updated_at
  BEFORE UPDATE ON public.pdf_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
