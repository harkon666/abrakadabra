import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/lib/store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  beforeLoad: () => {
    const state = store.getState();
    const user = state.auth.user;
    const token = localStorage.getItem("accessToken");

    if (!Object.keys(user).length) {
      if (token) {
        // verify token
      } else {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}
