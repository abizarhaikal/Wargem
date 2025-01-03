"use client";
import React from "react";
import CustomSidebar from "@/components/ui/sidebaradmin";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <CustomSidebar />

        {/* Konten Utama */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>Selamat datang di Dashboard Anda! Di sini Anda dapat mengelola aplikasi Anda.</p>
        </main>
      </div>
    </SidebarProvider>
  );
}
