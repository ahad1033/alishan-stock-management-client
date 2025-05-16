import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  CustomTableBody,
  CustomTableRoot,
  CustomTableHeader,
  CustomTablePagination,
} from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { mockInvoice } from "@/constants";

import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";
import CustomDateRangePicker from "@/components/date-picker/CustomDateRangePicker";

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

  const [filterDates, setFilterDates] = useState({ from: null, to: null });

  console.log("filterDates: ", filterDates);

  const handleDateRangeChange = (range) => {
    setFilterDates(range);
  };

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  console.log(fromDate);
  console.log(toDate);

  // Automatically reset dates if search is active
  useEffect(() => {
    if (search.trim() !== "") {
      setFromDate("");
      setToDate("");
    }
  }, [search]);

  useEffect(() => {
    setToDate("");
  }, [fromDate]);

  // Filter logic
  const filtered = mockInvoice.filter((invoice) => {
    const matchesSearch = invoice.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const invoiceDate = new Date(invoice.date.split("-").reverse().join("-"));

    if (search.trim() !== "") return matchesSearch;

    if (filterDates.from && filterDates.to) {
      const from = new Date(filterDates.from.split("-").reverse().join("-"));
      const to = new Date(filterDates.to.split("-").reverse().join("-"));

      console.log("hello1: ", from);
      console.log("hello2: ", to);
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
            <div className="col-span-12 md:col-span-6">
              <Input
                type="search"
                placeholder="Search by customer name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="col-span-12 md:col-span-4 flex items-center gap-2">
              <CustomDateRangePicker
                fromDate={filterDates.from}
                toDate={filterDates.to}
                onChange={handleDateRangeChange}
              />
            </div>

            {/* Clear Filters Button */}
            <div className="col-span-12 md:col-span-2">
              <Button
                variant="destructive"
                disabled={
                  search.trim() === "" &&
                  (!filterDates.from || filterDates.from === "") &&
                  (!filterDates.to || filterDates.to === "")
                }
                onClick={() => {
                  setPage(1);
                  setSearch("");
                  setFilterDates({ from: null, to: null });
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
