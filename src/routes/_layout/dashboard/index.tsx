import { Dashboard } from "@/features/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: Dashboard,
});
