"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Home,
  Utensils,
  Coffee,
  Cookie,
  Menu,
  ShoppingBag,
  History,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

export function Sidebar({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/makanan":
        return "Makanan";
      case "/minuman":
        return "Minuman";
      case "/cemilan":
        return "Cemilan";
      case "/history":
        return "History Pemesanan";
      default:
        return "Home";
    }
  };

  return (
    <>
      {/* Sidebar untuk layar besar */}
      <div
        className={cn(
          "hidden md:flex h-screen w-[250px] bg-white border-r p-4 flex-col",
          className
        )}
      >
        <SidebarContent />
        
        {/* Tombol Keranjang Belanja untuk Desktop */}
        <div className="mt-auto">
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 left-10 z-50 p-4 flex justify-center"
            onClick={() => alert("Keranjang Belanja")}
            style={{
              justifyContent: "space-between", 
            }}
          >
            <ShoppingBag size={24} />
            <span className="ml-2 text-sm font-medium">Keranjang Belanja</span>
          </Button>
        </div>
      </div>

      {/* Sidebar untuk layar mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-3 pr-5 pl-3 z-50 pb-2 md:hidden"
          >
            <Menu />
          </Button>
        </SheetTrigger>

        <Button
            variant="ghost"
            size="icon"
            className="fixed right-4 bottom-8 md:hidden z-50 rounded-full shadow-lg"
            onClick={() => alert("Keranjang Belanja")}
          >
            <ShoppingBag size={24}/>
          </Button>

        <SheetContent side="left" className="w-[80vw] p-4">
          <DialogTitle className="sr-only">Mobile Sidebar Navigation</DialogTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

function SidebarContent() {
  return (
    <>
      <div className="relative w-full h-[150px] mb-4">
        <Image
          src="/assets/images/sidebar-image.jpg"
          alt="Header Image"
          fill
          className="rounded-md object-cover"
        />
      </div>
      <h3 className="text-md font-semibold text-red-500 mb-2">Kategori</h3>
      <nav className="space-y-2">
        <NavItem href="/" icon={<Home size={20} />} label="Home" />
        <NavItem href="/makanan" icon={<Utensils size={20} />} label="Makanan" />
        <NavItem href="/minuman" icon={<Coffee size={20} />} label="Minuman" />
        <NavItem href="/cemilan" icon={<Cookie size={20} />} label="Cemilan" />
        <NavItem href="/history" icon={<History size={20} />} label="History Pemesanan" />
      </nav>
    </>
  );
}

function NavItem({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-gray-700 hover:text-black transition-all duration-200"
    >
      <div>{icon}</div>
      <span>{label}</span>
    </Link>
  );
}

export default Sidebar;
