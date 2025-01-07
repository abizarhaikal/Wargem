"use client";
import React, { useState } from "react";
import CustomSidebar from "@/components/ui/sidebaradmin";
import { SidebarProvider } from "@/components/ui/sidebar";
import AlertDialogCustom from "@/components/ui/alertDialogCustom";
import MenubarAdmin from "@/components/ui/menubaradmin";

export default function App() {
  const [active, setActiveContent] = useState("profile");
  const renderContent = () => {
    switch (active) {
      case "profile":
        return <h1>Halo Profile</h1>;
      case "addAdmin":
        return <h1>Add Admin</h1>;
      default:
        return <h1>Selamat Datang di Pengaturan</h1>;
    }
  };
  return (
    <SidebarProvider className="flex h-screen w-full">
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <CustomSidebar />

        {/* Konten Utama */}
        <main className="flex-1 p-6 bg-gray-50 ml-12">
          <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
          <MenubarAdmin onMenuClick={setActiveContent} />
        </main>
      </div>
      <AlertDialogCustom />
    </SidebarProvider>
  );
}
