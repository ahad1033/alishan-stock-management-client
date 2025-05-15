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


export default function AddStockDialog(
  isAddStockOpen,
  setIsAddStockOpen,
  selectedProduct,
  setSelectedProduct,
  products,
  quantity,
  setQuantity,
  handleAddStock
) {
  return (
    <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.model}) - Current:{" "}
                    {product.currentStock}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantity to Add</Label>
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
            onClick={handleAddStock}
          >
            Add Stock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
