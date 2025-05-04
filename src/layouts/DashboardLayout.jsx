import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";
import { Outlet } from "react-router";
import { useSidebar } from "@/contexts/SidebarContext"; // Import the hook to access the sidebar state

export default function DashboardLayout() {
  const { isCollapsed } = useSidebar(); // Access sidebar collapse state

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Topbar */}
        <Topbar />

        <main
          className={`lg:pl-${isCollapsed ? "20" : "64"} pt-16 transition-all duration-300`}
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
