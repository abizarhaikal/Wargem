"use client";
import React, { useEffect } from "react";
import CustomSidebar from "@/components/ui/sidebaradmin";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import AlertDialogCustom from "@/components/ui/AlertDialogCustom";
import useAlertDialogStore from "@/store/alertDialogStore";

export default function Dashboard() {
  // Gunakan isAuthenticated dari useAuth
  const { isAuthenticated } = useAuth();
  const showDialog = useAlertDialogStore((state) => state.showDialog);

  useEffect(() => {
    // Tampilkan welcome message hanya jika user terautentikasi
    if (isAuthenticated) {
      showDialog(
        "Selamat Datang",
        "Anda telah berhasil masuk ke Dashboard Admin.",
      );
    }
  }, [isAuthenticated, showDialog]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <CustomSidebar />

        {/* Konten Utama */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>
            Selamat datang di Dashboard Anda! Di sini Anda dapat mengelola
            aplikasi Anda.
          </p>
        </main>

        {/* Alert Dialog */}
        <AlertDialogCustom />
      </div>
    </SidebarProvider>
  );
}
