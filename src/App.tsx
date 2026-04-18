import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import UtmTracker from "./components/UtmTracker";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Lots from "./pages/Lots";
import LotDetail from "./pages/LotDetail";
import HowItWorks from "./pages/HowItWorks";
import Venue from "./pages/Venue";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Program from "./pages/Program";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Unsubscribe from "./pages/Unsubscribe";
import Privacy from "./pages/Privacy";
import Oferta from "./pages/Oferta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <UtmTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lots" element={<Lots />} />
            <Route path="/lots/:id" element={<LotDetail />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/program" element={<Program />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/oferta" element={<Oferta />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
