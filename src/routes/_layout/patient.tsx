import { Patient } from "@/features/patient";
import { registrationPatientApi } from "@/services/api/registration/patient";
import type { PatientParams } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/patient")({
  component: Patient,
  validateSearch: (search: Record<string, unknown>): PatientParams => {
    const params = Object.entries(search).reduce((acc, [key, value]) => {
      if (value) {
        return {
          ...acc,
          [key]: value,
        };
      }
      return acc;
    }, {});

    return params as PatientParams;
  },
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => registrationPatientApi(deps as never),
});
