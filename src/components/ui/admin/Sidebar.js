"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  ShoppingBag,
  PieChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CustomSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default kecil
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative h-screen flex">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r shadow-md transition-all duration-300 z-50 flex flex-col ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-2">
              {isSidebarOpen && (
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg text-green-700">
                    Wargem
                  </span>
                </div>
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

          <SidebarGroup>
            <div className="space-y-1">
              <div
                className={`flex items-center p-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive("/admin/Dashboard")
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => router.push("/admin/Dashboard")}
              >
                <Home className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </div>
              <div
                className={`flex items-center p-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive("/admin/Pemasukan")
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => router.push("/admin/Pemasukan")}
              >
                <PieChart className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Pemasukan</span>}
              </div>
              <div
                className={`flex items-center p-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive("/admin/HalamanProduk")
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => router.push("/admin/HalamanProduk")}
              >
                <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Produk</span>}
              </div>
              <div
                className={`flex items-center p-2 rounded-md text-sm font-medium cursor-pointer ${
                  isActive("/admin/Pengaturan")
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => router.push("/admin/Pengaturan")}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="ml-3">Pengaturan</span>}
              </div>
            </div>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="mt-auto">
          <div
            className={`flex items-center p-2 text-sm font-medium cursor-pointer ${
              isActive("/admin/Logout")
                ? "bg-green-100 text-green-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => router.push("/admin/Logout")}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-3">Keluar</span>}
          </div>
        </SidebarFooter>
      </div>
    </div>
  );
}
