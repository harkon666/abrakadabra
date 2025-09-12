import { DatabasePackage } from "@/features/database/package";
import { getPackageApi } from "@/services/api/database/package";
import type { SearchParams } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/database/package")({
  component: DatabasePackage,
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
    return getPackageApi(deps);
  },
});
