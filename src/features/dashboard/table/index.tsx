import ReusableTable from "@/components/table";
import type { ColumnDef } from "@tanstack/react-table";

const dashboardTableColumn: ColumnDef<any>[] = [
  {
    accessorKey: "",
    header: "Awa1",
  },
  {
    accessorKey: "",
    header: "Awa2",
  },
  {
    accessorKey: "",
    header: "Awa3",
  },
];

export const DashboardTable = () => {
  const dummy = Array.from({ length: 50 }).map(() => {
    "lol";
  });
  return (
    <ReusableTable
      data={dummy}
      columns={dashboardTableColumn}
      column_width={{}}
      loading={true}
    />
  );
};
