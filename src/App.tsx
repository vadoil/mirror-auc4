import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./components/ScrollToTop";
import UtmTracker from "./components/UtmTracker";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
const Lots = lazy(() => import("./pages/Lots"));
const LotDetail = lazy(() => import("./pages/LotDetail"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Venue = lazy(() => import("./pages/Venue"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Program = lazy(() => import("./pages/Program"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Oferta = lazy(() => import("./pages/Oferta"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Partners = lazy(() => import("./pages/Partners"));
const Forum = lazy(() => import("./pages/Forum"));
const Upcoming = lazy(() => import("./pages/Upcoming"));

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
          <Suspense fallback={null}>
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
