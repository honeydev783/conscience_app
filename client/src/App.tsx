import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ExaminationProvider } from "@/context/examination-context";
import Home from "@/pages/Home";
import Examination from "@/pages/Examination";
import AdditionalSins from "@/pages/AdditionalSins";
import SinReview from "@/pages/SinReview";
import Confession from "@/pages/Confession";
import PostConfession from "@/pages/PostConfession";
import Journal from "@/pages/Journal";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/examination" component={Examination} />
      <Route path="/additional-sins" component={AdditionalSins} />
      <Route path="/sin-review" component={SinReview} />
      <Route path="/confession" component={Confession} />
      <Route path="/post-confession" component={PostConfession} />
      <Route path="/journal" component={Journal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ExaminationProvider>
          <Toaster />
          <Router />
        </ExaminationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
