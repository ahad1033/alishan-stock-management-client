import { useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";
import {
  CustomTableBody,
  CustomTableHeader,
  CustomTablePagination,
  CustomTableRoot,
  CustomTableSearch,
} from "@/components/table";

// Mock data
const mockInvoice = [
  {
    customerName: "Acme Corp",
    totalAmount: 1250.0,
    totalPaidAmount: 1000.0,
    totalDue: 250.0,
    invoiceNo: "INV-2023-001",
    date: "01-01-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Beta Industries",
    totalAmount: 875.5,
    totalPaidAmount: 875.5,
    totalDue: 0.0,
    invoiceNo: "INV-2023-002",
    date: "05-02-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Gamma Co",
    totalAmount: 2100.0,
    totalPaidAmount: 1500.0,
    totalDue: 600.0,
    invoiceNo: "INV-2023-003",
    date: "10-03-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Delta Ltd",
    totalAmount: 540.0,
    totalPaidAmount: 0.0,
    totalDue: 540.0,
    invoiceNo: "INV-2023-004",
    date: "15-04-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Epsilon Group",
    totalAmount: 1780.25,
    totalPaidAmount: 1780.25,
    totalDue: 0.0,
    invoiceNo: "INV-2023-005",
    date: "20-05-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Zeta Systems",
    totalAmount: 920.0,
    totalPaidAmount: 500.0,
    totalDue: 420.0,
    invoiceNo: "INV-2023-006",
    date: "25-06-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Eta Solutions",
    totalAmount: 3200.0,
    totalPaidAmount: 3200.0,
    totalDue: 0.0,
    invoiceNo: "INV-2023-007",
    date: "30-07-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Theta Corp",
    totalAmount: 765.8,
    totalPaidAmount: 765.8,
    totalDue: 0.0,
    invoiceNo: "INV-2023-008",
    date: "03-08-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Iota Industries",
    totalAmount: 1450.0,
    totalPaidAmount: 1000.0,
    totalDue: 450.0,
    invoiceNo: "INV-2023-009",
    date: "08-09-2025",
    createdBy: "Zahid Emo",
  },
  {
    customerName: "Kappa Co",
    totalAmount: 2800.0,
    totalPaidAmount: 2000.0,
    totalDue: 800.0,
    invoiceNo: "INV-2023-010",
    date: "12-10-2025",
    createdBy: "Zahid Emo",
  },
];

const columns = [
  { key: "customerName", label: "Customer name" },
  { key: "invoiceNo", label: "Invoice number" },
  { key: "date", label: "Date" },
  { key: "createdBy", label: "Created by" },
  {
    key: "totalAmount",
    label: "Total amount",
    render: (row) => `${row.totalAmount?.toFixed(0) ?? "N/A"} Tk`,
  },
  {
    key: "totalPaidAmount",
    label: "Total paid",
    render: (row) => `${row.totalPaidAmount?.toFixed(0) ?? "N/A"} Tk`,
  },
  {
    key: "totalDue",
    label: "Total due",
    render: (row) => `${row.totalDue?.toFixed(0) ?? "N/A"} Tk`,
  },
];

export default function InvoicePage() {
  const isLoading = false;

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 20;

  const filtered = mockInvoice?.filter((d) =>
    d.customerName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered?.length / rowsPerPage) || 1;

  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <CustomHeader
        title="Invoices"
        subtitle="Manage your invoices"
        actions={
          <Link to="/add-invoice">
            <Button className="custom-button">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </Link>
        }
      />
      {isLoading ? (
        <CircularLoading />
      ) : (
        <>
          {/* PRODUCT TABLE */}
          <CustomTableSearch value={search} onChange={setSearch} />

          <CustomTableRoot>
            <CustomTableHeader columns={columns} />

            <CustomTableBody data={paginated} columns={columns} />
          </CustomTableRoot>

          <CustomTablePagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}
