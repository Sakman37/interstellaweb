import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import PageWrapper from "@/components/PageWrapper";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Portafolio from "./pages/Portafolio";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PdfDocumentPage from "./pages/PdfDocumentPage";
import DesarrolloWeb from "./pages/services/DesarrolloWeb";
import DisenoWeb from "./pages/services/DisenoWeb";
import SoftwarePersonalizado from "./pages/services/SoftwarePersonalizado";
import ChatbotsAutomatizacion from "./pages/services/ChatbotsAutomatizacion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/servicios/desarrollo-web" element={<DesarrolloWeb />} />
              <Route path="/servicios/diseno-web" element={<DisenoWeb />} />
              <Route path="/servicios/software-personalizado" element={<SoftwarePersonalizado />} />
              <Route path="/servicios/chatbots-automatizacion" element={<ChatbotsAutomatizacion />} />
              <Route path="/portafolio" element={<Portafolio />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/:slug" element={<PdfDocumentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
