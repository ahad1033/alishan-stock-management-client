import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import {
  CustomTableBody,
  CustomTableRoot,
  CustomTableSearch,
  CustomTableHeader,
  CustomTablePagination,
} from "@/components/table";
import { Button } from "@/components/ui/button";

import { useBoolean } from "@/hooks";

import ConfirmDialog from "@/components/shared/ConfirmDialog";
import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";

// Mock data for workers
const mockEmployees = [
  {
    id: "1",
    name: "John Smith",
    position: "Senior Worker",
    joiningDate: "2023-01-15",
    phone: "+1 234 567 890",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Junior Worker",
    joiningDate: "2023-03-20",
    phone: "+1 234 567 891",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Wilson",
    position: "Senior Worker",
    joiningDate: "2023-02-10",
    phone: "+1 234 567 892",
    status: "On Leave",
  },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "position", label: "Position" },
  { key: "joiningDate", label: "Joining Date" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status" },
];

export default function EmployeePage() {
  const navigate = useNavigate();

  const isLoading = false;

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const confirm = useBoolean();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const rowsPerPage = 20;

  const filtered = mockEmployees?.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered?.length / rowsPerPage) || 1;

  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (product) => {
    navigate(`/edit-product/${product?.id}`);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    confirm.onTrue();
  };
  return (
    <>
      <CustomHeader
        title="Employees"
        subtitle="Manage your workforce and their details"
        actions={
          <Link to="/add-employee">
            <Button className="custom-button">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <CircularLoading />
      ) : (
        <>
          {/* EMPLOYEE TABLE */}
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

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        open={confirm.value}
        onOpenChange={confirm.onToggle}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"?`}
        onCancel={() => confirm.onFalse()}
        // onConfirm={confirmDelete}
        // isLoading={deleteLoading}
      />
    </>
  );
}
