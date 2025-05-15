import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";
import {
  CustomTableBody,
  CustomTableHeader,
  CustomTablePagination,
  CustomTableRoot,
} from "@/components/table";
import { mockInvoice } from "@/constants";

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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  // Automatically reset dates if search is active
  useEffect(() => {
    if (search.trim() !== "") {
      setFromDate("");
      setToDate("");
    }
  }, [search]);

  // Filter logic
  const filtered = mockInvoice.filter((invoice) => {
    const matchesSearch = invoice.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const invoiceDate = new Date(invoice.date.split("-").reverse().join("-")); // from "DD-MM-YYYY"

    if (search.trim() !== "") return matchesSearch;

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return invoiceDate >= from && invoiceDate <= to;
    }

    return true;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const paginated = filtered.slice(
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
          {/* TOP FILTER BAR */}
          <div className="grid grid-cols-12 gap-4 mb-6 px-1 items-center">
            {/* Search Input */}
            <div className="col-span-12 md:col-span-4">
              <Input
                type="search"
                placeholder="Search by customer name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            {/* From Date */}
            <div className="col-span-12 md:col-span-3 flex items-center gap-2">
              <label className="text-sm min-w-[50px] text-muted-foreground whitespace-nowrap">
                From:
              </label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full"
                disabled={search.trim() !== ""}
              />
            </div>

            {/* To Date */}
            <div className="col-span-12 md:col-span-3 flex items-center gap-2">
              <label className="text-sm min-w-[50px] text-muted-foreground whitespace-nowrap">
                To:
              </label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full"
                disabled={search.trim() !== ""}
              />
            </div>

            {/* Clear Filters Button */}
            <div className="col-span-12 md:col-span-2">
              <Button
                variant="destructive"
                disabled={!fromDate && !toDate && !search}
                onClick={() => {
                  setSearch("");
                  setFromDate("");
                  setToDate("");
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* TABLE */}
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
