import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

import { Plus } from "lucide-react";

import {
  CustomTableBody,
  CustomTableHeader,
  CustomTablePagination,
  CustomTableRoot,
  CustomTableSearch,
} from "@/components/table";
import { Button } from "@/components/ui/button";
import CustomHeader from "@/components/page-heading/CustomHeader";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@stockglass.com",
    phone: "+1 234 567 890",
    role: "Admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@stockglass.com",
    phone: "+1 234 567 891",
    role: "Manager",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@stockglass.com",
    phone: "+1 234 567 892",
    role: "Staff",
  },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role" },
];

export default function Users() {
  const [users, setUsers] = useState(mockUsers);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 4;

  const filtered = mockUsers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (product) => {
    console.log(product);
  };

  const handleDelete = (product) => {
    setUsers(users.filter((p) => p.id !== product.id));
    toast.success(`Product deleted: ${product.name}`);
  };

  return (
    <>
      <CustomHeader
        title="Users"
        subtitle="Manage system users and their roles"
        actions={
          <Link to="/add-user">
            <Button className="custom-button">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        }
      />

      {/* USER TABLE */}
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
  );
}
