/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  CustomTableBody,
  CustomTableRoot,
  CustomTableHeader,
  CustomTableSearch,
  CustomTablePagination,
} from "@/components/table";
import { Button } from "@/components/ui/button";

import CustomHeader from "@/components/page-heading/CustomHeader";

import { useGetAllProductQuery } from "@/redux/features/product/productApi";

const columns = [
  { key: "name", label: "Product Name" },
  { key: "sku", label: "SKU" },
  { key: "price", label: "Price" },
  { key: "stock", label: "Stock" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 4;

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useGetAllProductQuery();

  const filtered = productData?.data?.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered?.length / rowsPerPage) || 1;

  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEdit = (product) => {
    console.log(product);
  };

  const handleDelete = (product) => {
    toast.success(`Product deleted: ${product.name}`);
  };

  return (
    <>
      <CustomHeader
        title="Products"
        subtitle="Manage your product inventory"
        actions={
          <Link to="/add-product">
            <Button className="custom-button">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        }
      />

      {/* PRODUCT TABLE */}
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
