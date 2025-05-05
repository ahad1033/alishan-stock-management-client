import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export function CustomTableBody({ data, columns, onEdit, onDelete }) {
  return (
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          {columns.map((column) => (
            <TableCell key={`${row.id}-${column.key}`}>
              {row[column.key]}
            </TableCell>
          ))}
          <TableCell className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(row)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(row)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
