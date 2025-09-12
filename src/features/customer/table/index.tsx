import { type ColumnDef } from "@tanstack/react-table";
import { type ColumnWidths, type ICustomer } from "@/types";

import ReusableTable from "@/components/table";

export const approvedColumn: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "no",
    header: "No",
    enableSorting: false,
    cell: ({ row }) => <p>{row.index + 1}.</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "fax",
    header: "Fax",
  },
  {
    accessorKey: "zipCode",
    header: "Zip Code",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "address2",
    header: "Address 2",
  },
];

export const customerColumn: ColumnWidths = {
  no: "3%",
  name: "30%",
  city: "10%",
  phone: "10%",
  fax: "10%",
  zipCode: "10%",
  address: "10%",
  address2: "10%",
};

export const CustomerTable = ({
  data,
  loading = false,
}: {
  data: ICustomer[];
  loading?: boolean;
}) => {
  return (
    <ReusableTable
      title="Customer"
      data={data}
      columns={approvedColumn}
      column_width={customerColumn}
      column_center={["action"]}
      column_right={["address", "address2"]}
      loading={loading}
      isSorting
    />
  );
};
