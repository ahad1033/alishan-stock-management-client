import { createBrowserRouter } from "react-router";

import Login from "@/pages/Login";
import Analytics from "@/pages/Analytics";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { UserForm, UsersPage } from "@/pages/user";
import { ProductForm, ProductsPage } from "@/pages/product";

import DashboardLayout from "@/layouts/DashboardLayout";
import { CustomersPage } from "@/pages/customer";

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
      {
        path: "customers",
        element: (
          <ProtectedRoute>
            <CustomersPage />
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
