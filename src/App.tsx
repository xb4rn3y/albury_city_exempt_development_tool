import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import ZoneCheck from "./pages/ZoneCheck";
import LotSizeCheck from "./pages/LotSizeCheck";
import Properties from "./pages/Properties";
import StructureInput from "./pages/StructureInput";
import Results from "./pages/Results";
import FAQ from "./pages/FAQ";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/zone-check" element={<ZoneCheck />} />
          <Route path="/lot-size-check" element={<LotSizeCheck />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/structure/:propertyId" element={<StructureInput />} />
          <Route path="/results/:propertyId" element={<Results />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/chatbot" element={<Chatbot />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
