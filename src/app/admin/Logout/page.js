"use client";
import React from "react";
import CustomSidebar from "@/components/ui/admin/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar */}
        <CustomSidebar />

        {/* Konten Utama */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4">Logout</h1>
        </main>
      </div>
    </SidebarProvider>
  );
}
