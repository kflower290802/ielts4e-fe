import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthMiddleware from "./middleware/auth-middleware";
import { RoutesComponent } from "./routes";
import { AudioRecorderProvider } from "./context/record";
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthMiddleware>
        <AudioRecorderProvider>
          <RoutesComponent />
        </AudioRecorderProvider>
      </AuthMiddleware>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
