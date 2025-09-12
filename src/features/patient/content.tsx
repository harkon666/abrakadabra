import { getRouteApi } from "@tanstack/react-router";
import { PatientTable } from "./table";

const router = getRouteApi("/_layout/patient");

export const PatientContent = () => {
  const data = router.useLoaderData();

  return <PatientTable data={data?.result || []} loading={false} />;
};
