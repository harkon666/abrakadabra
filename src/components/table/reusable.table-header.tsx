import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, type Column, type Table } from "@tanstack/react-table";
import { memo, type Dispatch, type JSX, type SetStateAction } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import type { ColumnWidths } from "@/types";
import { DebouncedInput } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

// Definisi type untuk TableHeader
type TTableHeader<T> = {
  table: Table<T>;
  title?: string;
  isSorting?: boolean;
  column_filter?: boolean;
  column_width: ColumnWidths;
  column_center?: string[];
  column_right?: string[];
  setGlobalFilter?: Dispatch<SetStateAction<string>> | undefined;
};

// Definisi interface untuk props Filter
interface FilterProps<T> {
  column: Column<T, unknown>;
}

function Filter<T>({ column }: FilterProps<T>): JSX.Element {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      className="w-full shadow rounded dark:bg-transparentmy-1 max-h-[20px] border-none bg-neutral-50/20 dark:bg-neutral-100/5 mx-auto"
      onChange={(value: string | number) => column.setFilterValue(value)}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}

// Definisi tipe untuk objek sortLogo
interface SortLogoMap {
  [key: string]: JSX.Element;
}

export const ReusableTableHeader = memo(
  <T,>({
    table,
    title,
    isSorting = false,
    column_filter,
    column_width,
    column_center,
    column_right,
    setGlobalFilter,
  }: TTableHeader<T>): JSX.Element => {
    const sortLogo: SortLogoMap = {
      asc: <ChevronUp size={14} />,
      desc: <ChevronDown size={14} />,
    };

    return (
      <TableHeader className="sticky top-0">
        {title ? (
          <TableRow className="border-none">
            <TableHead
              onClick={() => {
                if (setGlobalFilter) {
                  setGlobalFilter("");
                }
              }}
              colSpan={13}
              className="text-center py-2 text-muted-foreground"
            >
              <div className="w-full flex">
                <div className="w-full items-center text-center justify-center">
                  <hr className="mt-[10px]" />
                </div>
                <div className="px-6 bg-muted-foreground/10 rounded-3xl mx-6">
                  {title}
                </div>
                <div className="w-full">
                  <hr className="mt-[10px]" />
                </div>
              </div>
            </TableHead>
          </TableRow>
        ) : null}
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                style={{
                  width: column_width[header.column.id],
                  minWidth: column_width[header.column.id],
                  maxWidth: column_width[header.column.id],
                }}
              >
                {header.isPlaceholder ? null : (
                  <div
                    key={header.id}
                    className={cn(
                      "flex font-bold text-xs text-muted-foreground",
                      !column_filter && "gap-1",
                      column_center?.includes(header.column.id) &&
                        "justify-center",
                      column_right?.includes(header.column.id) && "justify-end"
                    )}
                    onClick={
                      isSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.columnDef.enableSorting
                      ? (sortLogo[header.column.getIsSorted() as string] ?? (
                          <ChevronsUpDown size={14} />
                        ))
                      : null}
                    {column_filter && <Filter<T> column={header.column} />}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
    );
  }
);

ReusableTableHeader.displayName = "ReusableTableHeader";
