"use client"

import { useEffect } from "react";
import MySidebar from "@/components/ui/mysidebar";
import CardMenu from "@/components/ui/cardmenu";
import { useUserAuth } from "@/hooks/useUserAuth";
import useAlertDialogStore from "@/store/alertDialogStore";
import AlertDialogCustom from "@/components/ui/AlertDialogCustom";
import { useRouter } from "next/navigation";


export default function Cemilan() {
  const { isAuthenticated, userToken } = useUserAuth();
  console.log("Token user: ", userToken);
  console.log("Autentikasi User: ", isAuthenticated);
  const showDialog = useAlertDialogStore((state) => state.showDialog);
  const router = useRouter();

  useEffect(() =>{
    if (!isAuthenticated) {
      showDialog(
        "Akses terbatas",
        "Anda perlu login untuk dapat mengakses menu.",
      );
      setTimeout(() => {
        router.push("/loginsignup/login")}, 2000);
    }
  }, [userToken, showDialog]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <MySidebar />
      <CardMenu />
      <AlertDialogCustom />
    </div>
  );
}