import { Users, Banknote, BanknoteX, BanknoteArrowDown } from "lucide-react";
import { useThemeContext } from "@/components/theme/ThemeProvider";

import { StatCard } from "../components/analytics/StatCard";
import { ChartCard } from "@/components/analytics/ChartCard";

import { useGetBalanceQuery } from "@/redux/features/balance/balanceApi";
import { RecentActivityCard } from "@/components/analytics/RecentActivityCard";
import { useGetAllCustomerQuery } from "@/redux/features/customer/customerApi";

import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";

// Mock data for the dashboard
const mockSalesData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 19000 },
  { name: "Mar", value: 15000 },
  { name: "Apr", value: 22000 },
  { name: "May", value: 28000 },
  { name: "Jun", value: 24000 },
  { name: "Jul", value: 30000 },
];

const mockProductData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Food", value: 20 },
  { name: "Books", value: 15 },
  { name: "Other", value: 5 },
];

const mockCustomerData = [
  { name: "Week 1", value: 120 },
  { name: "Week 2", value: 180 },
  { name: "Week 3", value: 220 },
  { name: "Week 4", value: 260 },
];

const mockActivities = [
  {
    id: "1",
    title: "New order received",
    description: "Order #12345 for $1,250.00 received from John Doe",
    timestamp: "2 mins ago",
    status: "pending",
  },
  {
    id: "2",
    title: "Product stock low",
    description:
      "iPhone 14 Pro Max (Black) is running low on stock (5 items left)",
    timestamp: "1 hour ago",
    status: "pending",
  },
  {
    id: "3",
    title: "Invoice paid",
    description: "Invoice #INV-2023-004 has been paid by ABC Corp.",
    timestamp: "3 hours ago",
    status: "completed",
  },
  {
    id: "4",
    title: "New customer registered",
    description: "Jane Smith has created a new account",
    timestamp: "5 hours ago",
  },
  {
    id: "5",
    title: "Shipment delayed",
    description: "Shipment to Tokyo, Japan has been delayed by 2 days",
    timestamp: "1 day ago",
    status: "failed",
  },
  {
    id: "6",
    title: "Product returned",
    description:
      "Samsung Galaxy S23 returned by Mark Johnson (Reason: Defective)",
    timestamp: "2 days ago",
  },
];

export default function Analytics() {
  const { primaryColor } = useThemeContext();

  const { data: balanceData, isLoading: balanceLoadingState } =
    useGetBalanceQuery();

  const { data: customerData, isLoading: customerLoadingState } =
    useGetAllCustomerQuery();

  const loadingState = balanceLoadingState && customerLoadingState;

  console.log("getBalance :", balanceData);

  return (
    <>
      {/* Dashboard Header */}
      <CustomHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening with your store today."
      />

      {loadingState ? (
        <CircularLoading />
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Revenue"
              value={
                balanceData?.data
                  ? `${balanceData?.data[0]?.totalPaid} Tk`
                  : "0 Tk"
              }
              icon={<Banknote className="h-5 w-5" style={{ color: "green" }} />}
              // trend={{ value: 12, positive: true }}
            />

            <StatCard
              title="Total expense"
              value={
                balanceData?.data
                  ? `${balanceData?.data[0]?.totalExpense} Tk`
                  : "0 Tk"
              }
              icon={
                <BanknoteArrowDown
                  className="h-5 w-5"
                  style={{ color: "red" }}
                />
              }
              // trend={{ value: 8, positive: true }}
            />

            <StatCard
              title={
                customerData?.data && customerData?.data?.length > 1
                  ? "Total customers"
                  : "Total customer"
              }
              value={customerData?.data ? customerData?.data.length : 0}
              icon={
                <Users className="h-5 w-5" style={{ color: primaryColor }} />
              }
              // trend={{ value: 15, positive: true }}
            />

            <StatCard
              title="Total Due"
              value={
                balanceData?.data
                  ? `${balanceData?.data[0]?.totalUnPaid} Tk`
                  : "0 Tk"
              }
              icon={
                <BanknoteX
                  className="h-5 w-5"
                  style={{ color: "yellowgreen" }}
                />
              }
              // trend={{ value: 3, positive: true }}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <ChartCard
              title="Monthly Sales"
              description="Revenue breakdown by month"
              data={mockSalesData}
              type="line"
              className="lg:col-span-2"
            />
            <ChartCard
              title="Product Categories"
              description="Distribution by product type"
              data={mockProductData}
              type="pie"
            />
          </div>

          {/* Activity + Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentActivityCard
              activities={mockActivities}
              className="lg:col-span-2"
            />
            <ChartCard
              title="New Customers"
              description="Customer acquisition by week"
              data={mockCustomerData}
              type="bar"
            />
          </div>
        </>
      )}
    </>
  );
}
