import { getRouteApi } from "@tanstack/react-router";
import { RegistrationPatientTable } from "./table";

const router = getRouteApi("/_layout/registration/patient");

export const RegistrationPatientContent = () => {
  const data = router.useLoaderData();

  return <RegistrationPatientTable data={data?.result || []} loading={false} />;
};
