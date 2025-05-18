import { useState } from "react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Plus, Minus, Filter } from "lucide-react";

import { useBoolean } from "@/hooks";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import CustomHeader from "@/components/page-heading/CustomHeader";
import AddStockDialog from "@/components/invoices/AddStockDialog";
import DeductStockDialog from "@/components/invoices/DeductStockDialog";

// Mock data for products with stock
const mockProducts = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    model: "IP14P-256",
    category: "Electronics",
    currentStock: 45,
    minStock: 10,
    status: "In Stock",
  },
  {
    id: "2",
    name: "MacBook Pro M2",
    model: "MBP-M2-512",
    category: "Electronics",
    currentStock: 23,
    minStock: 5,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "AirPods Pro",
    model: "APP-2ND",
    category: "Electronics",
    currentStock: 156,
    minStock: 20,
    status: "In Stock",
  },
];

// Mock data for stock history
const mockStockHistory = [
  {
    id: "1",
    productId: "1",
    type: "add",
    quantity: 50,
    date: "2024-03-20T10:30:00",
    reference: "PO-001",
  },
  {
    id: "2",
    productId: "1",
    type: "deduct",
    quantity: 5,
    date: "2024-03-20T14:15:00",
    reference: "INV-001",
  },
  {
    id: "3",
    productId: "2",
    type: "add",
    quantity: 25,
    date: "2024-03-19T09:00:00",
    reference: "PO-002",
  },
  // Add more history entries...
];

export default function StockPage() {
  const [products, setProducts] = useState(mockProducts);

  const [stockHistory] = useState(mockStockHistory);
  // eslint-disable-next-line no-unused-vars
  const [isDeductStockOpen, setIsDeductStockOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const stockInModal = useBoolean();

  const stockOutModal = useBoolean();

  const handleDeductStock = () => {
    if (!selectedProduct || !quantity || !invoiceNo) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedProducts = products.map((product) => {
      if (product.id === selectedProduct) {
        const newStock = Math.max(0, product.currentStock - parseInt(quantity));
        return {
          ...product,
          currentStock: newStock,
          status: newStock <= product.minStock ? "Low Stock" : "In Stock",
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    toast.success("Stock deducted successfully");
    setIsDeductStockOpen(false);
    setSelectedProduct(null);
    setQuantity("");
    setInvoiceNo("");
  };

  const filteredHistory = stockHistory.filter((entry) => {
    const entryDate = new Date(entry.date);
    const now = new Date();

    // Time filter
    if (timeFilter === "daily") {
      return entryDate.toDateString() === now.toDateString();
    } else if (timeFilter === "weekly") {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      return entryDate >= weekAgo;
    } else if (timeFilter === "monthly") {
      return (
        entryDate.getMonth() === now.getMonth() &&
        entryDate.getFullYear() === now.getFullYear()
      );
    } else if (timeFilter === "yearly") {
      return entryDate.getFullYear() === now.getFullYear();
    }

    // Type filter
    if (typeFilter !== "all") {
      return entry.type === typeFilter;
    }

    return true;
  });

  return (
    <>
      <CustomHeader
        title="Stock Management"
        subtitle="Manage your product inventory levels"
        actions={
          <div className="flex gap-2">
            <Button variant="destructive" onClick={stockOutModal.onTrue}>
              <Minus className="mr-2 h-4 w-4" />
              Deduct Stock
            </Button>
            <Button variant="success" onClick={stockInModal.onTrue}>
              <Plus className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              {timeFilter === "all"
                ? "All Time"
                : `${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTimeFilter("all")}
            >
              All Time
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTimeFilter("daily")}
            >
              Daily
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTimeFilter("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTimeFilter("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTimeFilter("yearly")}
            >
              Yearly
            </Button>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              {typeFilter === "all"
                ? "All Types"
                : `${
                    typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)
                  } Stock`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTypeFilter("all")}
            >
              All Types
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTypeFilter("add")}
            >
              Add Stock
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              onClick={() => setTypeFilter("deduct")}
            >
              Deduct Stock
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Stock History Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Date & Time</th>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Type</th>
                <th className="text-right p-4">Quantity</th>
                <th className="text-left p-4">Reference</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((entry) => {
                const product = products.find((p) => p.id === entry.productId);
                return (
                  <tr key={entry.id} className="border-b">
                    <td className="p-4">
                      {format(new Date(entry.date), "PPp")}
                    </td>
                    <td className="p-4">{product?.name}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          entry.type === "add"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {entry.type === "add" ? "Added" : "Deducted"}
                      </span>
                    </td>
                    <td className="p-4 text-right">{entry.quantity}</td>
                    <td className="p-4">{entry.reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Dialog */}
      <AddStockDialog stockInModal={stockInModal} />

      {/* Deduct Stock Dialog */}
      <DeductStockDialog
        isDeductStockOpen={stockOutModal}
        invoiceNo={invoiceNo}
        setInvoiceNo={setInvoiceNo}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        products={products}
        quantity={quantity}
        setQuantity={setQuantity}
        handleDeductStock={handleDeductStock}
      />
    </>
  );
}
