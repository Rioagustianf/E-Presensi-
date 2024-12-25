import {
  CalendarCheck,
  ChevronUp,
  FileText,
  LayoutDashboard,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/userContext";

// Menu items.
const items = [
  { url: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
  { url: "/dashboard/absensi", title: "Presensi", icon: CalendarCheck },
  { url: "/dashboard/permission", title: "Izin", icon: FileText },
];

export function AppSidebar() {
  const user = useUser(); // Mengambil data user dari context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/auth/login");
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-[#071952] text-white flex flex-col h-full">
        {/* Bagian atas sidebar */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-2xl">
            E-Presensi
          </SidebarGroupLabel>
          <SidebarGroupContent className="my-2">
            <SidebarMenu className="my-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer sidebar */}
        <SidebarFooter className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />
                    {user || "User"} {/* Menampilkan nama user langsung */}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Link to={"/profile/account"}>Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span onClick={handleLogout}>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
