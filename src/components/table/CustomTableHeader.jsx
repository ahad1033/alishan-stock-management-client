import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export function CustomTableHeader({ columns }) {
  return (
    <TableHeader>
      <TableRow>
        {[...columns, { key: "actions", label: "" }].map((col) => (
          <TableHead key={col.key}>{col.label}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
