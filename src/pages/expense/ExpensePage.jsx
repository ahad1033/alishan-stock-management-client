import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  CustomTableBody,
  CustomTableRoot,
  CustomTableSearch,
  CustomTableHeader,
  CustomTablePagination,
} from "@/components/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";

import { useGetAllExpenseQuery } from "@/redux/features/expense/expenseApi";

import { EXPENSE_OPTIONS } from "@/constants";

const columns = [
  { key: "date", label: "Date" },
  { key: "category", label: "Category" },
  { key: "description", label: "Description" },
  {
    key: "issuedBy",
    label: "Issued By",
    render: (row) => row.issuedBy?.name || "N/A",
  },
  {
    key: "amount",
    label: "Amount",
    render: (row) => `${row.amount?.toFixed(0) ?? "N/A"} Tk`,
  },
];

export default function ExpensePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 20;

  const { data: expenseHistory, isLoading } = useGetAllExpenseQuery();

  const filtered = expenseHistory?.data?.filter((d) =>
    d.date.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered?.length / rowsPerPage) || 1;

  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (expense) => {
    navigate(`/edit-expense/${expense?.id}`);
  };

  const handleSelect = (category) => {
    navigate(`/add-expense?category=${category}`);
  };

  return (
    <>
      <CustomHeader
        title="Expenses"
        subtitle="Track and manage your business expenses"
        actions={
          <Popover>
            <PopoverTrigger asChild>
              <Button className="custom-button">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                {EXPENSE_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        }
      />

      {isLoading ? (
        <CircularLoading />
      ) : (
        <>
          {/* EXPENSE TABLE */}
          <CustomTableSearch value={search} onChange={setSearch} />

          <CustomTableRoot>
            <CustomTableHeader columns={columns} />

            <CustomTableBody
              data={paginated}
              columns={columns}
              // onEdit={(row) => handleEdit(row)}
            />
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
