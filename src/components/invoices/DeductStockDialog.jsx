import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
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

export default function DeductStockDialog({
  isDeductStockOpen,
  setIsDeductStockOpen,
  invoiceNo,
  setInvoiceNo,
  selectedProduct,
  setSelectedProduct,
  products,
  quantity,
  setQuantity,
  handleDeductStock,
}) {
  return (
    <Dialog open={isDeductStockOpen} onOpenChange={setIsDeductStockOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deduct Stock</DialogTitle>
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
