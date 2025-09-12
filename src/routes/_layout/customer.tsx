import { Customer } from "@/features/customer";
import { customerApi } from "@/services/api/customer";
import type { SearchParams } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/customer")({
  component: Customer,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const params = Object.entries(search).reduce((acc, [key, value]) => {
      if (value) {
        return {
          ...acc,
          [key]: value,
        };
      }
      return acc;
    }, {});

    return params as SearchParams;
  },
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    return customerApi(deps as never);
  },
});
