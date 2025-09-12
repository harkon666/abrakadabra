import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/homepage")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>ini homepage</div>;
}
