import React from "react";
import SiedebarAdmin from "@/components/ui/sidebaradmin";
import { SidebarProvider } from "@/components/ui/sidebar";
import AddAdmin from "@/components/ui/addAdmin";
import { Toaster } from "sonner";

export default function Page() {
  return (
    <React.Fragment>
      <SidebarProvider className="flex h-screen w-full bg-gray-50">
        <SiedebarAdmin />
        <div className="flex flex-1 justify-center items-center">
          <AddAdmin />
          <Toaster position="bottom-right" />
        </div>
      </SidebarProvider>
    </React.Fragment>
  );
}
