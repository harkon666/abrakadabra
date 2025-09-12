import ReusableTable from "@/components/table";
import type { ColumnDef } from "@tanstack/react-table";

const PackageColumn: ColumnDef<{ name: string }>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => `${row.index + 1}.`,
  },
  {
    accessorKey: "name",
    header: "Package Item Name",
  },
];

export const DetailPackageTable = ({ data }: { data: any }) => {
  return (
    <ReusableTable
      data={data.packageItems || []}
      column_width={{
        no: "3%",
      }}
      column_center={["name"]}
      columns={PackageColumn}
      loading={false}
    />
  );
};
