import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />

      <main className="lg:pl-64 pt-16 transition-all duration-300">
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
