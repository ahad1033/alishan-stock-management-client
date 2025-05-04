import { Outlet } from "react-router";

import { Topbar } from "@/components/shared/Topbar";
import { Sidebar } from "@/components/shared/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";

export default function DashboardLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Topbar */}
        <Topbar />

        <main
          className={`lg:pl-${
            isCollapsed ? "20" : "64"
          } pt-16 transition-all duration-300`}
        >
          <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            {/* Routed content */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
