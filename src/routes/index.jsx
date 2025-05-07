import { createBrowserRouter } from "react-router";

import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Analytics from "@/pages/Analytics";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

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
      // { path: "customers", element: <Customers /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
