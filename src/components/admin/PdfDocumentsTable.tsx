import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, EyeOff, ExternalLink, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PdfDocument } from './PdfDocumentForm';

interface PdfDocumentsTableProps {
  documents: PdfDocument[];
  onEdit: (document: PdfDocument) => void;
  onDelete: (document: PdfDocument) => void;
}

const PdfDocumentsTable: React.FC<PdfDocumentsTableProps> = ({ documents, onEdit, onDelete }) => {
  return (
    <div className="nebula-card p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Documento</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                Aun no hay PDFs publicados.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold">{document.title}</div>
                    <div className="max-w-xs truncate text-sm text-muted-foreground">
                      {document.description || 'Sin descripcion'}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-mono text-sm">/{document.slug}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={document.is_published ? 'default' : 'secondary'}>
                    {document.is_published ? (
                      <>
                        <Eye className="mr-1 h-3 w-3" />
                        Publicado
                      </>
                    ) : (
                      <>
                        <EyeOff className="mr-1 h-3 w-3" />
                        Borrador
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(document.created_at).toLocaleDateString('es-CO')}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={`/${document.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Abrir ${document.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onEdit(document)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (window.confirm('¿Eliminar este documento PDF y su enlace publico?')) {
                          onDelete(document);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PdfDocumentsTable;
