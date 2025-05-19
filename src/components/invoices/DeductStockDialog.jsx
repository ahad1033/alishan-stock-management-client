import { X } from "lucide-react";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { useState, useCallback } from "react";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useDeductStockMutation } from "@/redux/features/stock/stockApi";
import { useGetAllInvoiceQuery } from "@/redux/features/invoice/invoiceApi";
import { useGetAllProductQuery } from "@/redux/features/product/productApi";

export default function DeductStockDialog({ isDeductStockOpen }) {
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [submittedInvoiceNumber, setSubmittedInvoiceNumber] = useState("");

  const [isConfirmedView, setIsConfirmedView] = useState(false);

  const [deductStock] = useDeductStockMutation();

  // Debounced invoice number set
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetInvoice = useCallback(
    debounce((val) => {
      setSubmittedInvoiceNumber(val);
    }, 400),
    []
  );

  // Trigger invoice fetch on form submit
  const handleSubmit = () => {
    if (!invoiceNumber.trim()) {
      toast.error("Please enter an invoice number.");
      return;
    }
    debouncedSetInvoice(invoiceNumber.trim());
  };

  // Fetch invoice
  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    isError: isInvoiceError,
    error: invoiceError,
  } = useGetAllInvoiceQuery(
    { invoiceNumber: submittedInvoiceNumber },
    {
      skip: !submittedInvoiceNumber || !isDeductStockOpen.value,
    }
  );

  const invoice = invoiceData?.data?.[0];

  // Fetch products only if we have a valid invoice
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useGetAllProductQuery(undefined, {
    skip: !invoice || !invoice?.products?.length,
  });

  // Confirm deduct action
  const handleConfirmDeduction = async () => {
    try {
      const res = await deductStock({
        invoiceNumber: submittedInvoiceNumber,
      }).unwrap();

      console.log("result", res);

      toast.success("Stock deducted successfully.");
      closeDialog();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to deduct stock.");
    }
  };

  const closeDialog = () => {
    setInvoiceNumber("");
    setSubmittedInvoiceNumber("");
    setIsConfirmedView(false);
    isDeductStockOpen.onFalse();
  };

  // Error UI (robust feedback)
  const renderErrors = () => {
    if (isInvoiceError) {
      return (
        <p className="text-sm text-red-500">
          {invoiceError?.data?.message || "Failed to fetch invoice"}
        </p>
      );
    }
    if (isProductError) {
      return (
        <p className="text-sm text-red-500">
          {productError?.data?.message || "Failed to fetch product data"}
        </p>
      );
    }
    return null;
  };

  return (
    <Dialog
      open={isDeductStockOpen.value}
      onOpenChange={isDeductStockOpen.onToggle}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deduct Stock</DialogTitle>
          <DialogClose
            onClick={closeDialog}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:ring-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        {!invoice || !invoice?.products || !productData || !isConfirmedView ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2 mb-5">
              <Label>Invoice Number</Label>
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="e.g. 00001"
              />
            </div>
            {renderErrors()}
            <Button
              disabled={isInvoiceLoading}
              className="w-full bg-[#B38A2D] hover:bg-[#E1BE5D]"
              onClick={() => {
                handleSubmit();
                setIsConfirmedView(true);
              }}
            >
              {isInvoiceLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <h4 className="text-lg font-semibold">Invoice Products</h4>
            <div className="border rounded-md">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted text-left">
                    <th className="p-2">Product</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.products?.map((prod, index) => {
                    const productInfo = productData?.data?.find(
                      (p) => p._id === prod.productId
                    );
                    return (
                      <tr key={index} className="border-t">
                        <td className="p-2">
                          {productInfo?.name || "Unknown"}
                        </td>
                        <td className="p-2">{prod.quantity}</td>
                        <td className="p-2">
                          {/* ৳  */}
                          {prod.price} Tk
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Button
              disabled={isProductLoading}
              onClick={handleConfirmDeduction}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isProductLoading
                ? "Loading Products..."
                : "Confirm Stock Deduction"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// import { useState } from "react";
// import { X } from "lucide-react";
// import toast from "react-hot-toast";

// import {
//   Dialog,
//   DialogTitle,
//   DialogHeader,
//   DialogContent,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// import { useGetAllInvoiceQuery } from "@/redux/features/invoice/invoiceApi";
// import { useGetAllProductQuery } from "@/redux/features/product/productApi";
// import { useDeductStockMutation } from "@/redux/features/stock/stockApi";

// export default function DeductStockDialog({ isDeductStockOpen }) {
//   const [invoiceNumber, setInvoiceNumber] = useState("");

//   const [debouncedInvoice, setDebouncedInvoice] = useState("");

//   const [selectedProducts, setSelectedProducts] = useState([]);

//   console.log("selectedProducts: ", selectedProducts);

//   const { data: invoiceData, isSuccess } = useGetAllInvoiceQuery(
//     {
//       invoiceNumber: debouncedInvoice,
//     },
//     { skip: !invoiceNumber && isDeductStockOpen.value }
//   );

//   const { data: productData } = useGetAllProductQuery({
//     skip: invoiceData?.data?.length > 1 || invoiceData?.data?.length === 0,
//   });

//   const [deductStock] = useDeductStockMutation()

//   console.log("productData: ", productData);

//   console.log("invoiceData: ", invoiceData);

//   const handleDeductStock = () => {
//     if (!invoiceNumber) {
//       toast.error("Please enter invoice number!");
//       return;
//     }

//     setDebouncedInvoice(invoiceNumber);
//     if (invoiceNumber && isSuccess && invoiceData?.data.length === 1) {
//       setSelectedProducts(invoiceData?.data);
//     }

//     toast.success("Stock deducted successfully");

//     isDeductStockOpen.onFalse();

//     setInvoiceNumber("");
//   };
//   return (
//     <Dialog
//       open={isDeductStockOpen.value}
//       onOpenChange={isDeductStockOpen.onToggle}
//     >
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Deduct Stock</DialogTitle>
//           <DialogClose
//             className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
//             onClick={isDeductStockOpen.onFalse}
//           >
//             <X className="h-4 w-4" />
//             <span className="sr-only">Close</span>
//           </DialogClose>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="space-y-2 mb-5">
//             <Label className="mb-2">Invoice Number</Label>
//             <Input
//               value={invoiceNumber}
//               onChange={(e) => setInvoiceNumber(e.target.value)}
//               placeholder="Enter invoice number"
//             />
//           </div>

//           <Button
//             className="w-full bg-[#B38A2D] hover:bg-[#E1BE5D]"
//             onClick={handleDeductStock}
//           >
//             Submit
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
