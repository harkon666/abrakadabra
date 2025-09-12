import ReusableTable from "@/components/table";
import { useAppDispatch } from "@/lib/store";
import { setDialogDetailPackage } from "@/reducers/database";
import { getRouteApi } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

const router = getRouteApi("/_layout/database/package");

const PackageColumn: ColumnDef<{ name: string }>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => `${row.index + 1}.`,
  },
  {
    accessorKey: "name",
    header: "Package Name",
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      const onClick = () => {
        dispatch(setDialogDetailPackage(row.original));
      };
      return <p onClick={onClick}>{row.original.name}</p>;
    },
  },
];

export const PackageTable = () => {
  const data = router.useLoaderData();

  return (
    <ReusableTable
      data={data.result || []}
      title="Pakcage List"
      column_width={{
        no: "3%",
      }}
      column_center={["name"]}
      columns={PackageColumn}
      loading={false}
    />
  );
};
