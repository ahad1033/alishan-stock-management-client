import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function DeductStockDialog({
  isDeductStockOpen,
  invoiceNo,
  setInvoiceNo,
  selectedProduct,
  setSelectedProduct,
  products,
  quantity,
  setQuantity,
  handleDeductStock,
}) {
  // console.log("isDeductStockOpen: ", isDeductStockOpen);
  return (
    <Dialog
      open={isDeductStockOpen.value}
      onOpenChange={isDeductStockOpen.onToggle}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deduct Stock</DialogTitle>
          <DialogClose
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={isDeductStockOpen.onFalse}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Invoice Number</Label>
            <Input
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              placeholder="Enter invoice number"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.model}) - Available:{" "}
                    {product.currentStock}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantity to Deduct</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              min="1"
            />
          </div>

          <Button
            className="w-full bg-[#B38A2D] hover:bg-[#E1BE5D]"
            onClick={handleDeductStock}
          >
            Deduct Stock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
