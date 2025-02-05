"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import useAlertDialogStore from "@/store/alertDialogStore";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Home,
  List,
  PieChart,
  Settings,
  ShoppingBag,
  User2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdminData } from "@/hooks/use-editProfile";
import Cookies from "js-cookie";

export default function CustomSidebar() {
  const ADMIN_ID = localStorage.getItem("adminUserId");
  const { adminData, loading, error } = useAdminData(ADMIN_ID);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
    setShowLogoutDialog(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
    // Refresh halaman saat ini
    window.location.reload();
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminUserId");
    localStorage.removeItem("welcomeShown");
    Cookies.remove("adminAuthToken");
    router.push("/admin/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: Home, path: "/admin/Dashboard" },
    { label: "Pesanan", icon: List, path: "/admin/orders" },
    { label: "Produk", icon: ShoppingBag, path: "/admin/HalamanProduk" },
  ];

  return (
    <>
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
                <span className="font-semibold text-lg text-green-700">
                  Wargem
                </span>
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
                    isActive(path)
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100"
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
                      {isSidebarOpen && (
                        <span className="ml-3">
                          {loading
                            ? "Loading..."
                            : error
                            ? "Error"
                            : adminData?.username || "Admin"}
                        </span>
                      )}
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

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar dari akun ini?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelLogout}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout}>
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
