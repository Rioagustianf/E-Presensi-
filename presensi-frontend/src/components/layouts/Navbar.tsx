import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getHomeroomTeachers } from "@/service/api-service/authService";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<any>([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await getHomeroomTeachers();
          setTeacher(response[0]);
          console.log("Teacher data:", response);
        } else {
          console.log("No token found in localStorage.");
        }
      } catch (error) {
        console.log("Error fetching teacher data:", error);
      }
    };

    fetchTeacher();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    navigate("/auth/login");
  };

  return (
    <nav className="bg-[#071952] shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Dashboard Rekap</span>
            </div>
          </div>
          <div className="flex items-center text-black">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>
                      {teacher.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal text-black">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {teacher.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {teacher.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
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
    </nav>
  );
};

export default Navbar;
