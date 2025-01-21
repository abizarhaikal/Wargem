"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";  // Pastikan mengimpor useRouter
import { useMenuItems } from "@/hooks/useMenuItems";
import { useMenuCategories } from "@/hooks/use-menu-category";
import { Button } from "./button";
import { useCart } from "@/context/CardContext";

export default function CardMenu() {
  const router = useRouter();  // Deklarasikan router
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const isRoot = pathname === "/" || pathname === "/menu";
  const category = pathSegments.length > 2 ? pathSegments[2] : null;

  const { menuItems: allMenuItems, loading: allLoading, error: allError } = useMenuItems();
  const { menuItems: categoryItems, loading: categoryLoading, error: categoryError } = useMenuCategories(category);

  const menuItems = isRoot ? allMenuItems : categoryItems;
  const loading = isRoot ? allLoading : categoryLoading;
  const error = isRoot ? allError : categoryError;

  const { addToCart, removeFromCart } = useCart();

  const [counters, setCounters] = useState([]);

  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      const initialCounters = menuItems.map(() => 0);
      setCounters(initialCounters);
    }
  }, [menuItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Error loading menu items: {error}</p>
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">
          {isRoot
            ? "No menu items available."
            : `No items available in ${category} category.`}
        </p>
      </div>
    );
  }

  const increment = (index) => {
    const updatedCounters = [...counters];
    updatedCounters[index] += 1;
    setCounters(updatedCounters);
    addToCart(menuItems[index]);
  };

  const decrement = (index) => {
    if (counters[index] > 0) {
      const updatedCounters = [...counters];
      updatedCounters[index] -= 1;
      setCounters(updatedCounters);
      removeFromCart(menuItems[index].id);
    }
  };

  const totalItems = counters.reduce((sum, count) => sum + count, 0);
  const totalPrice = counters.reduce(
    (sum, count, index) => sum + count * (menuItems[index]?.price || 0),
    0
  );

  const handleCheckout = () => {
    if (totalItems > 0) {
      router.push("/checkout"); // Navigasi ke halaman checkout
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 p-4 pb-32 mt-20 md:mt-0">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 bg-pink-50 flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={`https://exciting-spell.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image}`}
                alt={item.name}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 128px) 100vw, 128px"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">
              {item.name}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Rp {parseInt(item.price).toLocaleString("id-ID")}
            </p>

            <div className="flex items-center space-x-4 mt-auto">
              <Button
                onClick={() => decrement(index)}
                className="bg-pink-200 text-pink-600 hover:bg-pink-300 w-10 h-10"
              >
                -
              </Button>
              <span className="text-lg font-semibold min-w-[2ch] text-center">
                {counters[index] || 0}
              </span>
              <Button
                onClick={() => increment(index)}
                className="bg-pink-200 text-pink-600 hover:bg-pink-300 w-10 h-10"
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div
          className="fixed bottom-4 left-4 right-4 md:left-1/4 md:right-1/4 flex justify-between items-center bg-secondary py-3 px-5 rounded-lg shadow-lg"
          style={{
            backgroundColor: "#FDF2F8",
            color: "black",
          }}
        >
          <div>
            <p
              className="text-lg font-semibold"
              style={{
                color: "#EF4444",
              }}
            >
              Total
            </p>
            <p className="text-sm">
              {totalItems} item{totalItems > 1 && "s"} - Rp{" "}
              {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <Button
            className="bg-primary py-2 px-4 rounded-lg hover:opacity-90"
            style={{
              backgroundColor: "#EF4444",
              color: "white",
            }}
            onClick={handleCheckout}
          >
            CHECK OUT
          </Button>
        </div>
      )}
    </div>
  );
}