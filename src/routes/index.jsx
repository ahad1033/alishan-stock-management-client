import { createBrowserRouter } from "react-router";

import Products from "@/pages/Products";
import Analytics from "@/pages/Analytics";
import DashboardLayout from "@/layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Analytics />,
      },
      { path: "products", element: <Products /> },
      // { path: "customers", element: <Customers /> },
    ],
  },
]);
