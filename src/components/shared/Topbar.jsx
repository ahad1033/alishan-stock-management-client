import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { User, Settings, Bell, LogOut, Home, UserCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ModeToggle } from "../theme/ModeToggle";
import { useSidebar } from "@/contexts/SidebarContext";
import { ThemeSettings } from "../settings/ThemeSettings";

import { logout } from "@/redux/features/auth/authSlice";

export function Topbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isCollapsed } = useSidebar();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");

    toast.success("Logged out successfully");
  };

  return (
    <div
      className={cn(
        "fixed top-0 right-0 left-0 z-20 h-16",
        "bg-white/5 dark:bg-black/10 backdrop-blur-xl",
        "border-b border-neutral-200/10 dark:border-neutral-800/20",
        "px-4 sm:px-6",
        isCollapsed ? "lg:left-20" : "lg:left-64"
      )}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2 lg:hidden">
          {/* Empty div for flex spacing on mobile */}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => toast.success("Notifications viewed")}
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ThemeSettings onClose={() => setSettingsOpen(false)} />
            </DialogContent>
          </Dialog>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full bg-neutral-200 dark:bg-neutral-800"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
