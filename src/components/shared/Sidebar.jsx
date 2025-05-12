import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useThemeContext } from "../theme/ThemeProvider";
import {
  BarChart3,
  ShoppingBag,
  Users,
  FileText,
  DollarSign,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/SidebarContext";
import { useSelector } from "react-redux";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const navItems = [
  { label: "Analytics", icon: <BarChart3 className="h-5 w-5" />, path: "/" },
  {
    label: "Products",
    icon: <ShoppingBag className="h-5 w-5" />,
    path: "/products",
  },
  {
    label: "Customers",
    icon: <Users className="h-5 w-5" />,
    path: "/customers",
  },
  {
    label: "Users",
    icon: <Users className="h-5 w-5" />,
    path: "/users",
  },
  {
    label: "Invoice",
    icon: <FileText className="h-5 w-5" />,
    path: "/invoice",
  },
  { label: "Sales", icon: <DollarSign className="h-5 w-5" />, path: "/sales" },
];

export function Sidebar() {
  const { primaryColor } = useThemeContext();

  const { isCollapsed, setIsCollapsed } = useSidebar();

  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  const currentUser = useSelector(useCurrentUser);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )} */}

      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-background/50 backdrop-blur-lg border border-border/50"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out",
          "bg-black/10 dark:bg-white/5 backdrop-blur-lg",
          "border-r border-neutral-200/10 dark:border-neutral-800/20",
          isCollapsed ? "w-20" : "w-64",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full relative">
          {/* Logo */}
          <div className={cn("p-6", isCollapsed && "p-6")}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B38A2D] to-[#E1BE5D]" />
              {!isCollapsed && <h3 className="text-xl font-bold">Alishan</h3>}
            </div>
          </div>

          {/* Collapse Toggle Button */}
          <Button
            variant="collapse"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-5 top-12 rounded-full hidden lg:block"
          >
            {isCollapsed ? (
              <ChevronRight
                className="h-8 w-8"
                style={{ color: primaryColor }}
              />
            ) : (
              <ChevronLeft
                className="h-8 w-8"
                style={{ color: primaryColor }}
              />
            )}
          </Button>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label} className="">
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileOpen(false);
                    }}
                    className={cn(
                      "flex items-center w-full py-3 group",
                      "transition-all duration-200 ease-in-out",
                      isCollapsed
                        ? "justify-center px-4"
                        : "justify-start px-6",
                      location?.pathname === item.path
                        ? "bg-[#B38A2D]/20 text-[#E1BE5D]"
                        : "hover:bg-[#B38A2D]/10 text-foreground/80 hover:text-foreground"
                    )}
                    style={{
                      backgroundColor:
                        location?.pathname && location?.pathname === item.path
                          ? `${primaryColor}20`
                          : "transparent",
                      color:
                        location?.pathname && location?.pathname === item.path
                          ? primaryColor
                          : "",
                    }}
                  >
                    {item.icon}
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200/10 dark:border-neutral-800/20">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex-shrink-0" />
              {!isCollapsed && currentUser !== null && (
                <div>
                  <p className="font-medium text-foreground">
                    {currentUser?.user?.name}
                  </p>
                  <p className="text-xs">{currentUser?.user?.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
