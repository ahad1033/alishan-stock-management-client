import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";

import {
  CustomTableBody,
  CustomTableHeader,
  CustomTablePagination,
  CustomTableRoot,
  CustomTableSearch,
} from "@/components/table";
import { Button } from "@/components/ui/button";

// Mock data for customers
const mockCustomers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    orders: 12,
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 891",
    orders: 8,
    status: "Active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 234 567 892",
    orders: 5,
    status: "Inactive",
  },
];

const columns = [
  { key: "name", label: "Customer Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "orders", label: "Total Orders" },
  { key: "status", label: "Status" },
];

export default function CustomersPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 20;

  const isLoading = false;

  const filtered = mockCustomers?.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered?.length / rowsPerPage) || 1;

  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (customer) => {
    navigate(`/edit-customer/${customer.id}`, { state: { customer } });
  };

  const handleDelete = (customer) => {
    toast.success(`Customer deleted: ${customer.name}`);
  };

  return (
    <>
      <CustomHeader
        title="Customers"
        subtitle="Manage your customer base"
        actions={
          <Link to="/add-customer">
            <Button className="custom-button">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <CircularLoading />
      ) : (
        <>
          {/* CUSTOMER TABLE */}
          <CustomTableSearch value={search} onChange={setSearch} />

          <CustomTableRoot>
            <CustomTableHeader columns={columns} />

            <CustomTableBody
              data={paginated}
              columns={columns}
              onEdit={(row) => handleEdit(row)}
              onDelete={(row) => handleDelete(row)}
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
