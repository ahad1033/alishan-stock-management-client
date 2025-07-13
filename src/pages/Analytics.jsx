import { lazy, Suspense, useEffect } from "react";
import { Banknote, BanknoteX, BanknoteArrowDown, Loader2 } from "lucide-react";

import { useBoolean } from "@/hooks";
import { useThemeContext } from "@/components/theme/ThemeProvider";

import { StatCard } from "../components/analytics/StatCard";

import {
  useGetSalesSummaryQuery,
  useGetRecentExpensesQuery,
  useGetMonthlySalesSummaryQuery,
} from "@/redux/features/analytics/analyticsApi";
import { useGetBalanceQuery } from "@/redux/features/balance/balanceApi";

import CustomHeader from "@/components/page-heading/CustomHeader";
import AnalyticsSkeleton from "@/components/skeleton/analytics-skeleton";

// LAZY IMPORTS
const SalesSummaryChart = lazy(() =>
  import("@/components/analytics/SalesSummaryChart")
);
const RecentExpenseCard = lazy(() =>
  import("@/components/analytics/RecentExpenseCard")
);
const MonthlySellSummary = lazy(() =>
  import("@/components/analytics/MonthlySellSummary")
);

export default function Analytics() {
  const { primaryColor } = useThemeContext();

  const mount = useBoolean();

  // SALES SUMMARY
  const { data: salesSummary, isLoading: salesLoadingState } =
    useGetSalesSummaryQuery();
  // SALES SUMMARY
  const { data: monthlySalesSummary, isLoading: monthlySalesLoadingState } =
    useGetMonthlySalesSummaryQuery();

  // BALANCE DATA
  const { data: balanceData, isLoading: balanceLoadingState } =
    useGetBalanceQuery();

  // EXPENSE DATA
  const { data: expenseHistory, isLoading: expenseLoadingState } =
    useGetRecentExpensesQuery();

  const loadingState =
    balanceLoadingState &&
    expenseLoadingState &&
    monthlySalesLoadingState &&
    salesLoadingState;

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
        <AnalyticsSkeleton />
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
              title="Current balance"
              value={
                balanceData?.data
                  ? `${balanceData?.data[0]?.currentBalance} Tk`
                  : "0 Tk"
              }
              icon={<Banknote className="h-5 w-5" style={{ color: "green" }} />}
            />

            {/* <StatCard
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
            /> */}

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
            <Suspense
              fallback={
                <div className="w-full mx-auto">
                  <Loader2
                    className="w-12 h-12 animate-spin"
                    style={{ color: primaryColor }}
                  />
                </div>
              }
            >
              <SalesSummaryChart
                title="Daily sales"
                description="Last 15 days sell"
                data={salesSummary ? salesSummary?.data : []}
                type="line"
                className="lg:col-span-2"
              />
            </Suspense>

            {/* <ChartCard
              title="Product Categories"
              description="Distribution by product type"
              data={mockProductData}
              type="pie"
            /> */}
          </div>

          {/* Activity + Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Suspense
              fallback={
                <div className="w-full mx-auto">
                  <Loader2
                    className="w-12 h-12 animate-spin"
                    style={{ color: primaryColor }}
                  />
                </div>
              }
            >
              <RecentExpenseCard
                activities={expenseHistory}
                primaryColor={primaryColor}
                className="lg:col-span-2"
              />
            </Suspense>

            <Suspense
              fallback={
                <div className="w-full mx-auto">
                  <Loader2
                    className="w-12 h-12 animate-spin"
                    style={{ color: primaryColor }}
                  />
                </div>
              }
            >
              <MonthlySellSummary
                title="Monthly Sell"
                description="Last 4 monts sell summary"
                data={monthlySalesSummary ? monthlySalesSummary?.data : []}
                type="bar"
              />
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
