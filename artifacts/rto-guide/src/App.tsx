import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { SplashScreen } from "@/components/splash-screen";
import Dashboard from "@/pages/dashboard";
import StandardsList from "@/pages/standards-list";
import QualityAreaDetail from "@/pages/quality-area-detail";
import FavoritesList from "@/pages/favorites-list";
import StandardDetail from "@/pages/standard-detail";
import ReferencePage from "@/pages/glossary";
import PracticeDiary from "@/pages/reflect";
import TrainingPage from "@/pages/training";
import NotFound from "@/pages/not-found";
import {
  Redirect,
  Switch,
  Route,
  Router as WouterRouter,
  useLocation,
} from "wouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  const [location] = useLocation();

  return (
    <AppLayout>
      <div key={location} className="page-transition">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/standards" component={StandardsList} />
          <Route path="/quality-areas/:qualityAreaId" component={QualityAreaDetail} />
          <Route path="/standards/:standardId" component={StandardDetail} />
          <Route path="/favorites" component={FavoritesList} />
          <Route path="/practice" component={PracticeDiary} />
          <Route path="/record" component={PracticeDiary} />
          {/* Retain old bookmarks without restoring retired reference sections. */}
          <Route path="/assessment" component={PracticeDiary} />
          <Route path="/strategies" component={PracticeDiary} />
          <Route path="/reference" component={ReferencePage} />
          <Route path="/glossary">
            <Redirect to="/reference" replace />
          </Route>
          <Route path="/reflect" component={PracticeDiary} />
          <Route path="/training" component={TrainingPage} />
          {/* Keep retired quiz bookmarks pointed at the current Standards index. */}
          <Route path="/training/quiz/:moduleId">
            <Redirect to="/standards" replace />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="rto-guide-theme"
      >
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <SplashScreen />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
