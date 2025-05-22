import React, { useState } from "react";
import { Circle, Download, Eye, X } from "lucide-react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useLocation, useParams } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CustomHeader from "@/components/page-heading/CustomHeader";

import InvoicePDF from "./InvoicePDF";

const InvoiceDetails = ({ currentInvoice }) => {
  const { id } = useParams();
  const location = useLocation();

  const invoice = location.state?.currentInvoice;
  const invoiceData = id ? currentInvoice : invoice || {};

  const {
    customerId,
    createdAt,
    products = [],
    invoiceNumber,
    totalAmount,
    paidAmount,
    dueAmount,
  } = invoiceData;

  const [showPdfViewer, setShowPdfViewer] = useState(false);

  return (
    <div className="space-y-6 relative">
      <CustomHeader
        title="Invoice Details"
        subtitle={`Here is the detailed invoice of ${customerId?.name}`}
      />

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => setShowPdfViewer(true)}>
          <Eye className="h-4 w-4" />
        </Button>

        <PDFDownloadLink
          document={<InvoicePDF invoiceData={invoiceData} />}
          fileName={`invoice-${invoiceData.invoiceNo}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <Button variant="outline" disabled>
                <Circle className="w-4 h-4" />
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
          <CardTitle className="text-xl">Invoice Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Customer & Invoice Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>Name:</strong> {customerId?.name}
              </p>
              <p>
                <strong>Phone:</strong> {customerId?.phone}
              </p>
              <p>
                <strong>Address:</strong> {customerId?.address || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Invoice Date:</strong> {createdAt}
              </p>
              <p>
                <strong>Invoice No:</strong> {invoiceNumber}
              </p>
            </div>
          </div>

          <hr className="border-gray-300" />

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Products</h3>
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
                    <TableCell>{item?.name || "product name"}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>৳{item.price}</TableCell>
                    <TableCell>৳{item.quantity * item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <hr className="border-gray-300" />

          {/* Payment Summary aligned right */}
          <div className="flex justify-end space-x-12 text-sm font-semibold">
            <div className="min-w-[150px]">
              <p className="mb-1">
                <span className="font-normal">Total Amount:</span> ৳
                {totalAmount}
              </p>
              <p className="mb-1">
                <span className="font-normal">Total Paid:</span> ৳{paidAmount}
              </p>
              <p className="mb-0">
                <span className="font-normal">Total Due:</span> ৳ {dueAmount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-3">
              <h3 className="text-lg font-semibold">Invoice PDF Preview</h3>
              <button
                onClick={() => setShowPdfViewer(false)}
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
