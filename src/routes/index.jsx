import { createBrowserRouter } from "react-router";

import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Analytics from "@/pages/Analytics";
import ProductForm from "@/pages/ProductForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import DashboardLayout from "@/layouts/DashboardLayout";
import Users from "@/pages/user/Users";

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
            <Products />
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
            <Users />
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
