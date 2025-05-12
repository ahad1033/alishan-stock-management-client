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
import { useGetAllUserQuery } from "@/redux/features/user/userApi";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 4;

  // eslint-disable-next-line no-unused-vars
  const { data: userData, isLoading, isError, error } = useGetAllUserQuery();

  const filtered = userData?.data?.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered?.length / rowsPerPage) || 1;

  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (user) => {
    toast.error("Can't edit user at this moment!");
    console.log(user);
  };

  const handleDelete = (user) => {
    toast.success(`User deleted: ${user?.name}`);
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
