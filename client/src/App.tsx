import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import TimelinePage from "@/pages/timeline";
import ComposersPage from "@/pages/composers";
import ComposerDetailPage from "@/pages/composer-detail";
import MusicUploadPage from "@/pages/music-upload";
import MarchesPage from "@/pages/marches";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/timeline" component={TimelinePage} />
      <Route path="/composers" component={ComposersPage} />
      <Route path="/composers/:id" component={ComposerDetailPage} />
      <Route path="/music" component={MusicUploadPage} />
      <Route path="/marches" component={MarchesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;