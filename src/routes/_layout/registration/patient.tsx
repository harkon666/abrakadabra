import { Patient } from "@/features/registration/patient";
import { registrationPatientApi } from "@/services/api/registration/patient";
import { createFileRoute } from "@tanstack/react-router";

export type RegistrationPatientParams = {
  page: number;
  search?: string;
  limit: number;
  sort?: string;
  sortBy?: string;
  registered?: boolean;
};

export const Route = createFileRoute("/_layout/registration/patient")({
  component: Patient,
  validateSearch: (
    search: Record<string, unknown>
  ): RegistrationPatientParams => {
    const params = Object.entries(search).reduce((acc, [key, value]) => {
      if (value) {
        return {
          ...acc,
          [key]: value,
        };
      }
      return acc;
    }, {});

    return params as RegistrationPatientParams;
  },
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    return registrationPatientApi(deps as never);
  },
});
