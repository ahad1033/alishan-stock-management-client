/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

import {
  CustomTableBody,
  CustomTableRoot,
  CustomTableHeader,
  CustomTableSearch,
  CustomTablePagination,
} from "@/components/table";
import { Button } from "@/components/ui/button";

import ConfirmDialog from "@/components/shared/ConfirmDialog";
import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";

import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "@/redux/features/product/productApi";

const columns = [
  { key: "name", label: "Product Name" },
  { key: "sku", label: "SKU" },
  { key: "price", label: "Price" },
  { key: "stock", label: "Stock" },
];

export default function ProductsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const rowsPerPage = 20;

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useGetAllProductQuery();

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const filtered = productData?.data?.filter((d) =>
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
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = await deleteProduct(selectedProduct?.id).unwrap();

      console.log("DELETE RESULT: ", result);

      if (result?.success) {
        toast.success(result.message || "Product deleted successfully");
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      setConfirmOpen(false);

      setSelectedProduct(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete product");
    }
  };

  return (
    <>
      <CustomHeader
        title="Products"
        subtitle="Manage your products"
        actions={
          <Link to="/add-product">
            <Button className="custom-button">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
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
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        isLoading={deleteLoading}
      />
    </>
  );
}
