import { Table } from "../ui/table";

export function CustomTableRoot({ children }) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="border-separate border-spacing-y-2 px-3">
        {children}
      </Table>
    </div>
  );
}
