// src/hooks/useAuth.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import useAlertDialogStore from "@/store/alertDialogStore";

export function useAuth() {
  const router = useRouter();
  const showDialog = useAlertDialogStore((state) => state.showDialog);

  useEffect(() => {
    const adminToken = getCookie("adminAuthToken");
    if (!adminToken) {
      // Tampilkan dialog dulu, setelah konfirmasi baru redirect
      showDialog(
        "Akses Terbatas",
        "Anda perlu login terlebih dahulu untuk mengakses halaman ini.",
        () => {
          router.push("/admin/login");
        }
      );
    }
  }, [router, showDialog]);

  return { isAuthenticated: !!getCookie("adminAuthToken") };
}
