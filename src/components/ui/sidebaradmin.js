// src/components/CustomSidebar.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  ShoppingBag,
  PieChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  List,
  User2,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import useAlertDialogStore from "@/store/alertDialogStore";

export default function CustomSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const showDialog = useAlertDialogStore((state) => state.showDialog);

  useEffect(() => {
    const shouldShowWelcome =
      pathname === "/admin/Dashboard" &&
      isAuthenticated &&
      !localStorage.getItem("welcomeShown");

    if (shouldShowWelcome) {
      showDialog(
        "Selamat Datang",
        "Anda telah berhasil masuk ke Dashboard Admin.",
        () => {
          localStorage.setItem("welcomeShown", "true");
        }
      );
    }
  }, [pathname, isAuthenticated, showDialog]);

  const isActive = (path) => pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleAccountClick = () => {
    router.push("/admin/Account");
  };

  const handleAddAdminClick = () => {
    router.push("/admin/AddAdmin");
  };

  const handleLogoutClick = () => {
    // Add your logout logic here
    router.push("/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: Home, path: "/admin/Dashboard" },
    { label: "Pemasukan", icon: PieChart, path: "/admin/Pemasukan" },
    { label: "Pesanan", icon: List, path: "/admin/orders" },
    { label: "Produk", icon: ShoppingBag, path: "/admin/HalamanProduk" },
    { label: "Pengaturan", icon: Settings, path: "/admin/Pengaturan" },
  ];

  return (
    <div className="relative h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-md transition-all duration-300 z-50 flex flex-col sidebar ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <SidebarHeader>
          <div className="flex items-center justify-between px-4 py-2">
            {isSidebarOpen && (
              <span className="font-semibold text-lg text-green-700">Wargem</span>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarGroup>
            {menuItems.map(({ label, icon: Icon, path }) => (
              <div
                key={label}
                className={`flex items-center p-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive(path) ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
                }`}
                onClick={() => router.push(path)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">{label}</span>}
              </div>
            ))}
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />
                    {isSidebarOpen && <span className="ml-3">Admin</span>}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem onClick={handleAccountClick}>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAddAdminClick}>
                    <span>Add Admin</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogoutClick}>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </div>
  );
}