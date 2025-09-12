import { getRouteApi } from "@tanstack/react-router";
import { CustomerTable } from "./table";

const router = getRouteApi("/_layout/customer");

export const CustomerContent = () => {
  const data = router.useLoaderData();

  return <CustomerTable data={data?.result || []} loading={false} />;
};
