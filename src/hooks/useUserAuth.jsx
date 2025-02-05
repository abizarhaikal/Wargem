"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import useAlertDialogStore from "@/store/alertDialogStore";

export function useUserAuth() {
  const router = useRouter();
  const showDialog = useAlertDialogStore((state) => state.showDialog);

  useEffect(() => {
    const userToken = getCookie("userAuthToken");
    console.log("Ini cookie:", userToken);
    if (!userToken || userToken === undefined) {
      // Display dialog first, then redirect after confirmation
      showDialog(
        "Akses terbatas",
        "Anda perlu login untuk dapat mengakses menu.",
        () => {
          router.push("/loginsignup/login");
        }
      );
    }
  }, [router, showDialog]);

  return { isAuthenticated: !!getCookie("userAuthToken"), userToken: getCookie("userAuthToken") };
}