import { createBrowserRouter } from "react-router";

import Login from "@/pages/Login";
import Analytics from "@/pages/Analytics";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { StockPage } from "@/pages/stock";
import { UserForm, UsersPage } from "@/pages/user";
import { CollectionPage } from "@/pages/collection";
import { InvoiceForm, InvoicePage } from "@/pages/invoice";
import { ExpenseForm, ExpensePage } from "@/pages/expense";
import { ProductForm, ProductsPage } from "@/pages/product";
import { EmployeeDetails, EmployeeForm, EmployeePage } from "@/pages/employee";
import { CustomerDetails, CustomerForm, CustomersPage } from "@/pages/customer";

import Unauthorized from "@/pages/Unauthorized";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import InvoiceDetails from "@/pages/invoice/InvoiceDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
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
              <UserForm />
            </RoleBasedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-user/:id",
        element: (
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "super_admin"]}>
              <UserForm />
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
