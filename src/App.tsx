import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthMiddleware from "./middleware/auth-middleware";
import { RoutesComponent } from "./routes";
import { useEffect } from "react";
import { pageVisit } from "./api/home";
import { useLocation } from "react-router-dom";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function App() {
  const location = useLocation();
  const currentURL = window.location.origin + location.pathname + location.search + location.hash;  
  useEffect(() => {
    pageVisit({url: currentURL})
      .then((response) => {
        console.log("Page visit recorded:", response);
      })
      .catch((error) => {
        console.error("Error recording page visit:", error);
      });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthMiddleware>
        <RoutesComponent />
      </AuthMiddleware>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
