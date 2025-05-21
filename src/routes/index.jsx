import { createBrowserRouter } from "react-router";

import Login from "@/pages/Login";
import Analytics from "@/pages/Analytics";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { UserForm, UsersPage } from "@/pages/user";
import { ProductForm, ProductsPage } from "@/pages/product";
import { CustomerForm, CustomersPage } from "@/pages/customer";

import DashboardLayout from "@/layouts/DashboardLayout";
import { ExpenseForm, ExpensePage } from "@/pages/expense";
import { EmployeeDetails, EmployeeForm, EmployeePage } from "@/pages/employee";
import { InvoiceForm, InvoicePage } from "@/pages/invoice";
import { StockPage } from "@/pages/stock";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      //  PRODUCT ROUTES
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        ),
      },
      //  USER ROUTES
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-user",
        element: (
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        ),
      },
      //  CUSTOMER ROUTES
      {
        path: "customers",
        element: (
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-customer",
        element: (
          <ProtectedRoute>
            <CustomerForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-customer/:id",
        element: (
          <ProtectedRoute>
            <CustomerForm />
          </ProtectedRoute>
        ),
      },
      //  EXPENSE ROUTES
      {
        path: "expenses",
        element: (
          <ProtectedRoute>
            <ExpensePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-expense",
        element: (
          <ProtectedRoute>
            <ExpenseForm />
          </ProtectedRoute>
        ),
      },
      //  EMPLOYEE ROUTES
      {
        path: "employees",
        element: (
          <ProtectedRoute>
            <EmployeePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-employee",
        element: (
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-employee/:id",
        element: (
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee-details/:id",
        element: (
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        ),
      },
      // INVOICE ROUTES
      {
        path: "invoices",
        element: (
          <ProtectedRoute>
            <InvoicePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-invoice",
        element: (
          <ProtectedRoute>
            <InvoiceForm />
          </ProtectedRoute>
        ),
      },
      // STOCK ROUTES
      {
        path: "stocks",
        element: (
          <ProtectedRoute>
            <StockPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
