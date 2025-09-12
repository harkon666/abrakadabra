import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, type Table } from "@tanstack/react-table";
import type { TReusableTable } from "./index";
import { Skeleton } from "../ui/skeleton";

type TTableBody<T> = Omit<TReusableTable<T>, "title"> & {
  table: Table<T>;
};

function ReusableTableBody<T>({
  table,
  loading,
  data = [],
  columns,
  column_width,
  column_center,
  column_right,
  setGlobalFilter,
}: TTableBody<T>) {
  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="text-xl font-bold text-neutral-400/30 text-center"
          >
            NO DATA FOUND
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody className="max-h-[50vh] overflow-y-auto">
      {table.getRowModel()?.rows?.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell
              onClick={() => {
                if (setGlobalFilter) {
                  setGlobalFilter(cell.getContext().getValue() as never);
                }
              }}
              key={cell.id}
              style={{
                width: column_width[cell.column.id],
                minWidth: column_width[cell.column.id],
                maxWidth: column_width[cell.column.id],
              }}
              className={`
                py-2 
                ${column_center?.includes(cell.column.id) ? "text-center" : ""}
                ${column_right?.includes(cell.column.id) ? "text-right" : ""}
              `}
            >
              {loading ? (
                <Skeleton className="h-[15px] rounded-full" />
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default ReusableTableBody;
