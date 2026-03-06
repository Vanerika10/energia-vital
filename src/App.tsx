import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Journey from "./pages/Journey";
import Plan from "./pages/Plan";
import Library from "./pages/Library";
import Auth from "./pages/Auth";
import Subscribe from "./pages/Subscribe";
import PaymentSuccess from "./pages/PaymentSuccess";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/assinar" element={<Subscribe />} />
              <Route path="/pagamento-sucesso" element={<PaymentSuccess />} />
              <Route path="/jornada" element={<ProtectedRoute><Journey /></ProtectedRoute>} />
              <Route path="/plano" element={<ProtectedRoute><Plan /></ProtectedRoute>} />
              <Route path="/biblioteca" element={<ProtectedRoute><Library /></ProtectedRoute>} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
