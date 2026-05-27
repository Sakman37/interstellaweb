import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus2, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout/Layout';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectsTable from '@/components/admin/ProjectsTable';
import PdfDocumentForm, { PdfDocument } from '@/components/admin/PdfDocumentForm';
import PdfDocumentsTable from '@/components/admin/PdfDocumentsTable';

export interface Project {
  id: string;
  title: string;
  description: string;
  detailed_description: string | null;
  category: string;
  technologies: string[];
  features: string[];
  image_url: string | null;
  demo_url: string | null;
  case_study_url: string | null;
  detailed_images: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<PdfDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showPdfForm, setShowPdfForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingDocument, setEditingDocument] = useState<PdfDocument | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAuth = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.email !== 'juan@interstellawebs.com') {
      navigate('/auth');
      return false;
    }

    return true;
  }, [navigate]);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);

    try {
      const [{ data: projectsData, error: projectsError }, { data: documentsData, error: documentsError }] =
        await Promise.all([
          supabase.from('projects').select('*').order('created_at', { ascending: false }),
          supabase.from('pdf_documents').select('*').order('created_at', { ascending: false }),
        ]);

      if (projectsError) throw projectsError;
      if (documentsError) throw documentsError;

      setProjects(projectsData || []);
      setDocuments(documentsData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los datos del panel admin.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const init = async () => {
      const isAdmin = await checkAuth();
      if (isAdmin) {
        fetchAdminData();
      } else {
        setLoading(false);
      }
    };

    init();
  }, [checkAuth, fetchAdminData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);

      if (error) throw error;

      toast({
        title: 'Proyecto eliminado',
        description: 'El proyecto se elimino correctamente.',
      });

      fetchAdminData();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el proyecto.',
        variant: 'destructive',
      });
    }
  };

  const handleProjectFormSubmit = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    fetchAdminData();
  };

  const handleCreateDocument = () => {
    setEditingDocument(null);
    setShowPdfForm(true);
  };

  const handleEditDocument = (document: PdfDocument) => {
    setEditingDocument(document);
    setShowPdfForm(true);
  };

  const handleDeleteDocument = async (document: PdfDocument) => {
    try {
      const { error } = await supabase.from('pdf_documents').delete().eq('id', document.id);

      if (error) throw error;

      if (document.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('pdf-documents')
          .remove([document.storage_path]);

        if (storageError) {
          console.error('Error deleting PDF from storage:', storageError);
        }
      }

      toast({
        title: 'PDF eliminado',
        description: 'El enlace publico del documento fue eliminado.',
      });

      fetchAdminData();
    } catch (error) {
      console.error('Error deleting PDF document:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el documento PDF.',
        variant: 'destructive',
      });
    }
  };

  const handlePdfFormSubmit = () => {
    setShowPdfForm(false);
    setEditingDocument(null);
    fetchAdminData();
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent">
            Dashboard Admin
          </h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesion
          </Button>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="pdfs">PDFs</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={handleCreateProject} className="hero-button">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Proyecto
              </Button>
            </div>
            <ProjectsTable
              projects={projects}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          </TabsContent>

          <TabsContent value="pdfs" className="space-y-4">
            <Card className="nebula-card border-border/70">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>PDFs publicos</CardTitle>
                  <CardDescription>
                    Sube un PDF, define el slug y publicalo en una ruta como
                    {' '}`interstellawebs.com/laoffi_propuesta`.
                  </CardDescription>
                </div>
                <Button onClick={handleCreateDocument} className="hero-button">
                  <FilePlus2 className="mr-2 h-4 w-4" />
                  Nuevo PDF
                </Button>
              </CardHeader>
              <CardContent>
                <PdfDocumentsTable
                  documents={documents}
                  onEdit={handleEditDocument}
                  onDelete={handleDeleteDocument}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSubmit={handleProjectFormSubmit}
              onCancel={() => setShowProjectForm(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={showPdfForm} onOpenChange={setShowPdfForm}>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDocument ? 'Editar PDF publico' : 'Publicar nuevo PDF'}
              </DialogTitle>
            </DialogHeader>
            <PdfDocumentForm
              document={editingDocument}
              onSubmit={handlePdfFormSubmit}
              onCancel={() => setShowPdfForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Admin;
