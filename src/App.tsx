import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import browserRouter from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={browserRouter} />
      </QueryClientProvider>
    </TooltipProvider>
  );
};

export default App;
