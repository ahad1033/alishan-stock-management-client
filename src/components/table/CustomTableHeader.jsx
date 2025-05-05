import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export function CustomTableHeader({ columns }) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((col) => (
          <TableHead key={col.key}>{col.label}</TableHead>
        ))}
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
