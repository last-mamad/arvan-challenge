import * as React from "react";

import type { TableColumn } from "@/components/design-system/table";
import { cn } from "@/lib/utils";

type DataCardsProps<TData> = {
  /** Reuses the same column definitions as the table. */
  columns: TableColumn<TData>[];
  data: TData[];
  getRowKey: (row: TData, index: number) => React.Key;
  /** Column rendered as the card heading instead of a label/value row. */
  titleColumnId?: string;
  /** Column ids to omit from the card (e.g. the row number or table-only actions). */
  hiddenColumnIds?: string[];
  /** Rendered in the card's top-right corner (e.g. an actions trigger). */
  action?: (row: TData, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
};

/**
 * The mobile counterpart of `DataTable`: renders each row as a card, reusing
 * the column definitions (`header` becomes the field label, `cell` its value).
 */
function DataCards<TData>({
  columns,
  data,
  getRowKey,
  titleColumnId,
  hiddenColumnIds = [],
  action,
  emptyState = "No data to display.",
  className,
}: DataCardsProps<TData>) {
  const titleColumn = titleColumnId
    ? columns.find((column) => column.id === titleColumnId)
    : undefined;

  const fieldColumns = columns.filter(
    (column) =>
      column.id !== titleColumnId &&
      !hiddenColumnIds.includes(column.id) &&
      column.header != null,
  );

  if (data.length === 0) {
    return (
      <div className={cn("py-10 text-center text-body2 text-neutral-fg2", className)}>
        {emptyState}
      </div>
    );
  }

  return (
    <ul className={cn("flex w-full flex-col gap-3", className)}>
      {data.map((row, index) => (
        <li
          key={getRowKey(row, index)}
          className="flex flex-col gap-3 rounded-md border border-neutral-st3 bg-neutral-bg1 p-4"
        >
          {(titleColumn || action) && (
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">{titleColumn?.cell(row, index)}</div>
              {action && <div className="shrink-0">{action(row, index)}</div>}
            </div>
          )}
          {fieldColumns.length > 0 && (
            <dl className="flex flex-col gap-2">
              {fieldColumns.map((column) => (
                <div key={column.id} className="flex items-center justify-between gap-3">
                  <dt className="shrink-0 text-caption1 text-neutral-fg2">{column.header}</dt>
                  <dd className="min-w-0 truncate text-right text-body2 text-neutral-fg1">
                    {column.cell(row, index)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </li>
      ))}
    </ul>
  );
}

export { DataCards };
export type { DataCardsProps };
