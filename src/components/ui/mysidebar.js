"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Home,
  Utensils,
  Coffee,
  Cookie,
  Menu,
  ShoppingBag,
  History,
} from "lucide-react";

export default function MySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");  
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    {
      path: "/",
      icon: <Home size={20} />,
      label: "Menu Favorite",
    },
    {
      path: "/menu/makanan",
      icon: <Utensils size={20} />,
      label: "Makanan",
    },
    {
      path: "/menu/minuman",
      icon: <Coffee size={20} />,
      label: "Minuman",
    },
    {
      path: "/menu/cemilan",
      icon: <Cookie size={20} />,
      label: "Cemilan",
    },
    {
      path: "/history",
      icon: <History size={20} />,
      label: "History Pemesanan",
    },
  ];

  React.useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleNavigate = (path) => {
    router.push(path);
    setActivePath(path);
    setIsOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-red-500 min-h-screen md:bg-white">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Placeholder Gambar Header */}
          <div className="p-4">
            <div className="w-full h-full bg-white rounded-lg shadow-sm">
              <Image
                src="/assets/images/sidebar-image.jpg"
                alt="logo"
                width={400}
                height={200}
              />
            </div>
          </div>

          {/* Navigasi */}
          <div className="flex-1 flex flex-col px-3 py-4">
            <h3 className="px-3 text-sm font-semibold text-black mb-2">
              Kategori
            </h3>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.path}
                  variant={activePath === item.path ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-2 text-black hover:bg-red-400 ${
                    activePath === item.path ? "bg-red-600" : "hover:bg-red-400"
                  }`}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-black-400 flex-none">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 bg-white hover:bg-gray-100 text-red-500"
              onClick={() => alert("Keranjang Belanja")}
            >
              <ShoppingBag size={20} />
              <span>Keranjang Belanja</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Header & Navigasi Mobile */}
      <div className="md:hidden fixed inset-x-0 top-0 z-50">
        <div className="h-16 bg-red-500 border-b border-red-400 flex items-center justify-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-red-400"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] p-0 bg-red-500">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Gambar Header Mobile */}
                <div className="p-4">
                  <div className="w-full h-32 bg-white rounded-lg shadow-sm">
                    <Image
                      src="/assets/images/sidebar-image.jpg"
                      alt="logo"
                      width={400}
                      height={200}
                    />
                  </div>
                </div>

                {/* Navigasi Mobile */}
                <div className="flex-1 px-3 py-4">
                  <h3 className="px-3 text-sm font-semibold text-white mb-2">
                    Kategori
                  </h3>
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                      <Button
                        key={item.path}
                        variant={activePath === item.path ? "secondary" : "ghost"}
                        className={`w-full justify-start gap-2 text-white hover:bg-red-400 ${
                          activePath === item.path ? "bg-red-600" : "hover:bg-red-400"
                        }`}
                        onClick={() => handleNavigate(item.path)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Button>
                    ))}
                  </nav>
                </div>

                {/* Footer Mobile */}
                <div className="p-4 border-t border-red-400">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 bg-white hover:bg-gray-100 text-red-500"
                    onClick={() => alert("Keranjang Belanja")}
                  >
                    <ShoppingBag size={20} />
                    <span>Keranjang Belanja</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-lg font-semibold text-white">
            {navigation.find((item) => item.path === activePath)?.label}
          </h1>
        </div>
      </div>
    </div>
  );
}
