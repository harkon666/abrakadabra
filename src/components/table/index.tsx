import { Table } from "@/components/ui/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type ColumnWidths } from "@/types";
import { cn } from "@/lib/utils";
import TableBody from "./reusable.table-body";
import { ReusableTableHeader } from "./reusable.table-header";

export type TReusableTable<T> = {
  data: T[];
  title?: string;
  loading: boolean;
  isSorting?: boolean;
  column_filter?: boolean;
  columns: ColumnDef<T>[];
  column_width: ColumnWidths;
  column_center?: string[];
  column_right?: string[];
  globalFilter?: string;
  setGlobalFilter?: Dispatch<SetStateAction<string>> | undefined;
  classNames?: string;
};

const globalFilterFn: FilterFn<unknown> = (row, columnId, value) => {
  const searchValue = String(value || "").toLowerCase();
  return String(row.getValue(columnId) || "")
    .toLowerCase()
    .includes(searchValue);
};

function ReusableTable<T>({
  data,
  title,
  loading,
  isSorting,
  column_filter,
  columns,
  column_width,
  column_center = [],
  column_right = [],
  globalFilter,
  setGlobalFilter,
  classNames,
}: TReusableTable<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: globalFilterFn as FilterFn<T>,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className={cn("rounded-md border overflow-auto  mt-3", classNames)}>
      <Table>
        <ReusableTableHeader
          table={table as never}
          title={title}
          isSorting={isSorting}
          column_filter={column_filter}
          column_width={column_width}
          column_center={column_center}
          column_right={column_right}
          setGlobalFilter={setGlobalFilter}
        />
        <TableBody
          table={table}
          loading={loading}
          data={data}
          columns={columns}
          column_width={column_width}
          column_center={column_center}
          column_right={column_right}
          setGlobalFilter={setGlobalFilter}
        />
      </Table>
    </div>
  );
}

export default ReusableTable;
