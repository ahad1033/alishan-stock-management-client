import DashboardLayout from "@/layouts/DashboardLayout";
import Analytics from "@/pages/Analytics";
import { createBrowserRouter } from "react-router";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Analytics />,
        }
        // { path: "products", element: <Products /> },
        // { path: "customers", element: <Customers /> },
      ],
    },
  ]);