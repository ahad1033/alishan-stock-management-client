import {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useThemeContext } from "@/components/theme/ThemeProvider";

import { StatCard } from "../components/analytics/StatCard";
import { ChartCard } from "@/components/analytics/ChartCard";
import { RecentActivityCard } from "@/components/analytics/RecentActivityCard";
import CustomHeader from "@/components/page-heading/CustomHeader";

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

  console.log("primaryColor: ", primaryColor);

  return (
    <>
      {/* Dashboard Header */}
      <CustomHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening with your store today."
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value="$148,280"
          icon={
            <DollarSign className="h-5 w-5" style={{ color: primaryColor }} />
          }
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Total Products"
          value="2,580"
          icon={
            <ShoppingBag className="h-5 w-5" style={{ color: primaryColor }} />
          }
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Total Customers"
          value="12,786"
          icon={<Users className="h-5 w-5" style={{ color: primaryColor }} />}
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Growth Rate"
          value="8.5%"
          icon={
            <TrendingUp className="h-5 w-5" style={{ color: primaryColor }} />
          }
          trend={{ value: 3, positive: true }}
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
  );
}
