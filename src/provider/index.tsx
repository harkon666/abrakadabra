import { SidebarProvider } from "@/components/ui/sidebar";
import { store } from "@/lib/store";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a client
const queryClient = new QueryClient();

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SidebarProvider>
          <Toaster />
          <RouterProvider router={router} />
        </SidebarProvider>
      </Provider>
    </QueryClientProvider>
  );
};
