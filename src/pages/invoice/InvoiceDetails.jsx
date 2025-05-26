import { useMemo } from "react";
import { useLocation, useParams } from "react-router";
import { CircleDashed, Download, Eye, X } from "lucide-react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { useBoolean } from "@/hooks";
import { useThemeContext } from "@/components/theme/ThemeProvider";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SelectSeparator } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetInvoiceByIdQuery } from "@/redux/features/invoice/invoiceApi";

import InvoicePDF from "./InvoicePDF";
import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";

const InvoiceDetails = () => {
  const { id } = useParams();

  const { primaryColor } = useThemeContext();

  const location = useLocation();

  const showPdf = useBoolean();

  const invoice = location.state?.currentInvoice;

  const { data: currentInvoice, isLoading } = useGetInvoiceByIdQuery(id, {
    skip: !id,
  });

  const invoiceData = useMemo(() => {
    if (currentInvoice) return currentInvoice?.data;
    if (invoice) return invoice;
    return {};
  }, [currentInvoice, invoice]);

  const {
    customerId,
    issuedBy,
    createdAt,
    products = [],
    invoiceNumber,
    totalAmount,
    paidAmount,
    dueAmount,
  } = invoiceData;

  return (
    <div className="space-y-6 relative">
      <CustomHeader
        title="Invoice Details"
        subtitle={`Here is the detailed invoice of ${customerId?.name}`}
      />

      {isLoading ? (
        <CircularLoading />
      ) : (
        <>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={showPdf.onTrue}>
              <Eye className="h-4 w-4" />
            </Button>

            <PDFDownloadLink
              document={<InvoicePDF invoiceData={invoiceData} />}
              fileName={`invoice-${invoiceData.invoiceNo}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <Button variant="outline" disabled>
                    <CircleDashed className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>

          {/* SINGLE CARD with all invoice details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl" style={{ color: primaryColor }}>
                Invoice Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Customer & Invoice Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <DetailRow label="Name" value={`: ${customerId?.name}`} />

                  <DetailRow label="Phone" value={`: ${customerId?.phone}`} />

                  <DetailRow
                    label="Address"
                    value={`: ${customerId?.address}`}
                  />
                </div>
                <div>
                  <DetailRow label="Invoice No" value={invoiceNumber} />

                  <DetailRow
                    label="Invoice Date"
                    value={new Date(createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  />

                  <DetailRow label="Issued By" value={issuedBy?.name} />
                </div>
              </div>

              <SelectSeparator className="mb-4" />

              {/* Product Details */}
              <div>
                <h3
                  style={{ color: primaryColor }}
                  className="text-lg font-semibold mb-3"
                >
                  Products
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item?.productId.name || "N/A"}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{`${item.price} Tk`}</TableCell>
                        <TableCell>{`${
                          item.quantity * item.price
                        } Tk`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <SelectSeparator className="mb-4" />

              {/* Payment Summary aligned right */}
              <div className="flex justify-end space-x-12 text-base font-semibold">
                <div className="min-w-[150px]">
                  <p className="mb-1">
                    <span className="font-normal">Total:</span>
                    {`${totalAmount} Tk`}
                  </p>
                  <p className="mb-1">
                    <span className="font-normal">Paid:</span>
                    {`${paidAmount} Tk`}
                  </p>
                  <p className="mb-0">
                    <span className="font-normal">Due:</span>
                    {`${dueAmount} Tk`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* PDF Viewer Modal */}
      {showPdf.value && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-3">
              <h3 className="text-lg font-semibold">Invoice PDF Preview</h3>
              <button
                onClick={showPdf.onFalse}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Close PDF viewer"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <PDFViewer width="100%" height="100%">
                <InvoicePDF invoiceData={invoiceData} />
              </PDFViewer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;

// Reusable detail row component
function DetailRow({ label, value }) {
  return (
    <div className="flex mb-2">
      <div className="min-w-[100px] text-base font-medium text-muted-foreground">
        {label}:
      </div>
      <div className="text-primary text-base">{value || "—"}</div>
    </div>
  );
}
