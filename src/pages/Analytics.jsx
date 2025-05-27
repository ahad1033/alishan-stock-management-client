import { useEffect } from "react";
import { useThemeContext } from "@/components/theme/ThemeProvider";
import { Users, Banknote, BanknoteX, BanknoteArrowDown } from "lucide-react";

import { useBoolean } from "@/hooks";

import { StatCard } from "../components/analytics/StatCard";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SalesSummaryChart } from "@/components/analytics/SalesSummaryChart";

import { useGetBalanceQuery } from "@/redux/features/balance/balanceApi";
import { RecentExpenseCard } from "@/components/analytics/RecentExpenseCard";
import { useGetAllCustomerQuery } from "@/redux/features/customer/customerApi";
import {
  useGetSalesSummaryQuery,
  useGetRecentExpensesQuery,
} from "@/redux/features/analytics/analyticsApi";

import CustomHeader from "@/components/page-heading/CustomHeader";
import CircularLoading from "@/components/shared/CircularLoading";

const mockCustomerData = [
  { name: "Week 1", value: 120 },
  { name: "Week 2", value: 180 },
  { name: "Week 3", value: 220 },
  { name: "Week 4", value: 260 },
];

export default function Analytics() {
  const { primaryColor } = useThemeContext();

  const mount = useBoolean();

  // SALES SUMMARY
  const { data: salesSummary } = useGetSalesSummaryQuery();

  // BALANCE DATA
  const { data: balanceData, isLoading: balanceLoadingState } =
    useGetBalanceQuery();

  // CUSTOMER DATA
  const { data: customerData, isLoading: customerLoadingState } =
    useGetAllCustomerQuery();

  // EXPENSE DATA
  const { data: expenseHistory, isLoading: expenseLoadingState } =
    useGetRecentExpensesQuery();

  const loadingState =
    balanceLoadingState && customerLoadingState && expenseLoadingState;

  const mockSalesData = [];

  for (let i = 1; i <= 15; i++) {
    mockSalesData.push({
      name: String("June " + i),
      value: Math.floor(Math.random() * (1500 - 500 + 1)) + 500,
    });
  }

  useEffect(() => {
    mount.onTrue();
  }, [mount]);

  if (!mount.value) return null;

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
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"> */}
          <div className="grid grid-cols-1 mb-6">
            <SalesSummaryChart
              title="Daily sales"
              description="Last 15 days sell"
              data={salesSummary ? salesSummary?.data : []}
              type="line"
              className="lg:col-span-2"
            />

            {/* <ChartCard
              title="Product Categories"
              description="Distribution by product type"
              data={mockProductData}
              type="pie"
            /> */}
          </div>

          {/* Activity + Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentExpenseCard
              activities={expenseHistory}
              primaryColor={primaryColor}
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
