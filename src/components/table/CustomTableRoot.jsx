import { Table } from "../ui/table";

export function CustomTableRoot({ children }) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="border-separate border-spacing-y-2">{children}</Table>
    </div>
  );
}
