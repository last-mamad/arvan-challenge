import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Describes a single column. `cell` receives the row and its index, so each
 * column decides how to render its own content — text, a badge, a menu, etc.
 * This is what makes the table's cell rendering fully dynamic and reusable.
 */
type TableColumn<TData> = {
  /** Stable identifier, also used as the React key for the column. */
  id: string;
  /** Header content. Omit for action columns that have no label. */
  header?: React.ReactNode;
  /** Renders the cell for a given row. */
  cell: (row: TData, rowIndex: number) => React.ReactNode;
  /** Classes applied to both the header and body cells (e.g. width, alignment). */
  className?: string;
  /** Classes applied only to the header cell. */
  headerClassName?: string;
  /** Classes applied only to the body cells. */
  cellClassName?: string;
};

type DataTableProps<TData> = {
  columns: TableColumn<TData>[];
  data: TData[];
  /** Returns a stable key for each row. */
  getRowKey: (row: TData, index: number) => React.Key;
  /** Rendered in place of the rows when `data` is empty. */
  emptyState?: React.ReactNode;
  className?: string;
};

function DataTable<TData>({
  columns,
  data,
  getRowKey,
  emptyState = "No data to display.",
  className,
}: DataTableProps<TData>) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id} className={cn(column.className, column.headerClassName)}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="py-10 text-center text-body2 text-neutral-fg2"
            >
              {emptyState}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow key={getRowKey(row, rowIndex)}>
              {columns.map((column) => (
                <TableCell key={column.id} className={cn(column.className, column.cellClassName)}>
                  {column.cell(row, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export { DataTable };
export type { TableColumn, DataTableProps };
