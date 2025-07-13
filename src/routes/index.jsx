import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

import Login from "@/pages/Login";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";

// ANALYTICS PAGES
const Analytics = lazy(() => import("@/pages/Analytics"));

// PRODUCT PAGES
const ProductForm = lazy(() => import("@/pages/product/ProductForm"));
const ProductsPage = lazy(() => import("@/pages/product/ProductsPage"));

// CUSTOMER PAGES
const CustomerForm = lazy(() => import("@/pages/customer/CustomerForm"));
const CustomersPage = lazy(() => import("@/pages/customer/CustomersPage"));
const CustomerDetails = lazy(() => import("@/pages/customer/CustomerDetails"));

// INVOICE PAGES
const InvoiceForm = lazy(() => import("@/pages/invoice/InvoiceForm"));
const InvoicePage = lazy(() => import("@/pages/invoice/InvoicePage"));
const InvoiceDetails = lazy(() => import("@/pages/invoice/InvoiceDetails"));

// STOCK PAGE
const StockPage = lazy(() => import("@/pages/stock/StockPage"));

// COLLECTION PAGE
const CollectionPage = lazy(() => import("@/pages/collection/CollectionPage"));

// EMPLOYEE PAGES
const EmployeePage = lazy(() => import("@/pages/employee/EmployeePage"));
const EmployeeForm = lazy(() => import("@/pages/employee/EmployeeForm"));
const EmployeeDetails = lazy(() => import("@/pages/employee/EmployeeDetails"));

// EXPENSE PAGES
const ExpenseForm = lazy(() => import("@/pages/expense/ExpenseForm"));
const ExpensePage = lazy(() => import("@/pages/expense/ExpensePage"));

// USER PAGES
const UserForm = lazy(() => import("@/pages/user/UserForm"));
const UsersPage = lazy(() => import("@/pages/user/UsersPage"));

// UNAUTHORIZED PAGE
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));

// PROFILE PAGE
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <Analytics />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      //  PRODUCT ROUTES
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={[
                "admin",
                "super_admin",
                "accountant",
                "stock_manager",
              ]}
            >
              <ProductsPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <ProductForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <ProductForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      //  USER ROUTES
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <UsersPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-user",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <UserForm mode="create" />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-user/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <UserForm mode="edit" />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      //  CUSTOMER ROUTES
      {
        path: "customers",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <CustomersPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-customer",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <CustomerForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-customer/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <CustomerForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "customer-details/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <CustomerDetails />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      //  EXPENSE ROUTES
      {
        path: "expenses",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <ExpensePage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-expense",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <ExpenseForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      //  EMPLOYEE ROUTES
      {
        path: "employees",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <EmployeePage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-employee",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <EmployeeForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-employee/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <EmployeeForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "employee-details/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <EmployeeDetails />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // INVOICE ROUTES
      {
        path: "invoices",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <InvoicePage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-invoice",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <InvoiceForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // STOCK ROUTES
      {
        path: "stocks",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "stock_manager"]}
            >
              <StockPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // INVOICE ROUTES
      {
        path: "invoice-details",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <InvoiceDetails />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "invoice-details/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <InvoiceDetails />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // COLLECTION ROUTES
      {
        path: "collections",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={["admin", "super_admin", "accountant"]}
            >
              <CollectionPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // PROFILE ROUTES
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute
              allowedRoles={[
                "admin",
                "super_admin",
                "accountant",
                "stock_manager",
              ]}
            >
              <ProfilePage />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      // UNAUTHORIZED ROUTE
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <Login />,
  },
]);
