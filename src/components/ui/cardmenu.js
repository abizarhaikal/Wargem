"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useMenuCategories } from "@/hooks/use-menu-category";
import { Button } from "./button";

export default function CardMenu() {
  const pathname = usePathname();
  // Split the pathname and check if we're in a category
  const pathSegments = pathname.split("/");
  const isRoot = pathname === "/" || pathname === "/menu";
  const category = pathSegments.length > 2 ? pathSegments[2] : null;

  // Use the appropriate hook based on the path
  const { 
    menuItems: allMenuItems, 
    loading: allLoading, 
    error: allError 
  } = useMenuItems();

  const { 
    menuItems: categoryItems, 
    loading: categoryLoading, 
    error: categoryError 
  } = useMenuCategories(category);

  // Determine which data to use
  const menuItems = isRoot ? allMenuItems : categoryItems;
  const loading = isRoot ? allLoading : categoryLoading;
  const error = isRoot ? allError : categoryError;

  // Counter state for quantity selection
  const [counters, setCounters] = useState([]);

  // Initialize counters when menu items change
  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      setCounters(new Array(menuItems.length).fill(0));
    }
  }, [menuItems]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Loading menu items...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Error loading menu items: {error}</p>
      </div>
    );
  }

  // Empty state
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
    setCounters((prev) => {
      const newCounters = [...prev];
      newCounters[index] += 1;
      return newCounters;
    });
  };

  const decrement = (index) => {
    setCounters((prev) => {
      const newCounters = [...prev];
      newCounters[index] = Math.max(0, newCounters[index] - 1);
      return newCounters;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 p-4 mt-20 md:mt-0">
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
            Rp {parseInt(item.price).toLocaleString('id-ID')}
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
  );
}