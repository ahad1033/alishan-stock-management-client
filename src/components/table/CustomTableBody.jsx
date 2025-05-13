import { Pencil, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

export function CustomTableBody({ data, columns, onEdit, onDelete }) {
  if (!data?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length + 1} className="text-center py-20">
            <p className="text-amber-500 dark:text-amber-400 font-medium">
              No data found!
            </p>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  const renderCell = (row, column) => {
    if (column.render) return column.render(row);
    const value = row[column.key];
    return value !== undefined && value !== null && value !== ""
      ? value
      : "N/A";
  };

  return (
    <TableBody>
      {data?.map((row) => (
        <TableRow key={row.id}>
          {columns.map((column) => (
            <TableCell
              key={`${row.id}-${column.key}`}
              style={{ width: column.width }}
              className={cn(
                "text-base",
                column.align === "center" && "text-center",
                column.align === "right" && "text-right",
                column.align === "left" && "text-left"
              )}
            >
              {renderCell(row, column)}
            </TableCell>
          ))}

          {/* Action Buttons Column */}
          <TableCell className="text-right w-[140px]">
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(row)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
