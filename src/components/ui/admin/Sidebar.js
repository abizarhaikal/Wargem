import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar2";
  import { Home, User, ShoppingBag, PieChart, LogOut, ChevronDown } from "lucide-react";
  
  export default function CustomSidebar() {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center justify-center space-x-2">
              <div className="rounded-full bg-green-200 p-2">
                <img src="/greeve-logo.png" alt="Greeve Logo" className="h-6 w-6" />
              </div>
              <span className="font-semibold text-lg text-green-700">Wargem</span>
            </div>
          </SidebarHeader>
  
          <SidebarGroup>
            <div className="space-y-1">
              <div className="flex items-center p-2 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                <Home className="w-5 h-5 mr-3" />
                <span>Dasbor</span>
              </div>
              <div className="flex items-center p-2 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                <User className="w-5 h-5 mr-3" />
                <span>Pengguna</span>
              </div>
              <div className="flex items-center p-2 rounded-md text-sm font-medium bg-green-100 text-green-700">
                <ShoppingBag className="w-5 h-5 mr-3" />
                <span>Produk</span>
              </div>
              <div className="flex items-center p-2 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                <PieChart className="w-5 h-5 mr-3" />
                <span>Tantangan</span>
              </div>
              <div className="flex items-center p-2 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer">
                <PieChart className="w-5 h-5 mr-3" />
                <span>Dampak</span>
                <ChevronDown className="ml-auto text-gray-500" size={16} />
              </div>
            </div>
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter>
          <div className="flex items-center p-2 text-sm font-medium hover:bg-gray-100 cursor-pointer">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Keluar</span>
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }
  