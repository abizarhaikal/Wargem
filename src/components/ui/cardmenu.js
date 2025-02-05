"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useMenuCategories } from "@/hooks/use-menu-category";
import { Button } from "./button";
import { useCart } from "@/context/CardContext";

export default function CardMenu() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const isRoot = pathname === "/" || pathname === "/menu";
  const category = pathSegments.length > 2 ? pathSegments[2] : null;

  const { menuItems: allMenuItems, loading: allLoading, error: allError } = useMenuItems();
  const { menuItems: categoryItems, loading: categoryLoading, error: categoryError } = useMenuCategories(category);

  // Filter item yang statusnya "Tersedia"
  const filteredAllMenuItems = allMenuItems.filter((item) => item.status === "Tersedia");
  const filteredCategoryItems = categoryItems.filter((item) => item.status === "Tersedia");

  const menuItems = isRoot ? filteredAllMenuItems : filteredCategoryItems;
  const loading = isRoot ? allLoading : categoryLoading;
  const error = isRoot ? allError : categoryError;

  const { cartItems, addToCart, removeFromCart } = useCart();

  const [counters, setCounters] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (menuItems && menuItems.length > 0 && counters.length === 0) {
      setCounters(new Array(menuItems.length).fill(0));
    }
  }, [menuItems]);

  useEffect(() => {
    const newTotalItems = counters.reduce((acc, count) => acc + count, 0);
    setTotalItems(newTotalItems);

    const newTotalPrice = counters.reduce(
      (acc, count, index) => acc + (menuItems[index]?.price || 0) * count,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [counters, menuItems]);

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
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    addToCart(menuItems[index]);
    setTotalPrice(totalPrice + (menuItems[index]?.price || 0));
    setTotalItems(totalItems + 1);
  };

  const decrement = (index) => {
    const newCounters = [...counters];
    if (newCounters[index] > 0) {
      newCounters[index] -= 1;
      setCounters(newCounters);
      removeFromCart(menuItems[index].id);
      setTotalPrice(totalPrice - (menuItems[index]?.price || 0));
      setTotalItems(totalItems - 1);
    }
  };

  const handleCheckout = () => {
    if (totalItems > 0) {
      router.push("/checkout");
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
        <div className="fixed bottom-4 left-4 right-4 md:left-1/4 md:right-1/4 flex justify-between items-center bg-secondary py-3 px-5 rounded-lg shadow-lg">
          <div>
            <p className="text-lg font-semibold text-red-500">Total</p>
            <p className="text-sm">
              {totalItems} item{totalItems > 1 && "s"} - Rp{" "}
              {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <Button
            className="bg-red-500 py-2 px-4 rounded-lg hover:opacity-90 text-white"
            onClick={handleCheckout}
          >
            CHECK OUT
          </Button>
        </div>
      )}
    </div>
  );
}
