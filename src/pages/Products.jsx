import { useState } from "react";

import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  CustomTableBody,
  CustomTableRoot,
  CustomTableHeader,
  CustomTableSearch,
  CustomTablePagination,
} from "@/components/table";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    category: "Electronics",
    price: "$999",
    stock: 45,
    status: "In Stock",
  },
  {
    id: "2",
    name: "MacBook Pro M2",
    category: "Electronics",
    price: "$1999",
    stock: 23,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "AirPods Pro",
    category: "Electronics",
    price: "$249",
    stock: 156,
    status: "In Stock",
  },
];

const columns = [
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "stock", label: "Stock" },
  { key: "status", label: "Status" },
];

export default function Products() {
  const [products, setProducts] = useState(mockProducts);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const rowsPerPage = 4;

  const filtered = mockProducts.filter((d) =>
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
    setProducts(products.filter((p) => p.id !== product.id));
    toast.success(`Product deleted: ${product.name}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product inventory
          </p>
        </div>
        <Button className="bg-[#B38A2D] hover:bg-[#E1BE5D]">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* TABLE */}
      <CustomTableSearch value={search} onChange={setSearch} />

      <CustomTableRoot>
        <Table className='border-separate border-spacing-y-2'>
          <CustomTableHeader columns={columns} />

          <CustomTableBody
            data={paginated}
            columns={columns}
            onEdit={(row) => handleEdit(row)}
            onDelete={(row) => handleDelete(row)}
          />
        </Table>
      </CustomTableRoot>

      <CustomTablePagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
