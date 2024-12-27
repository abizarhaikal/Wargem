"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useMenuItems } from "@/hooks/useMenuItems";
import { Button } from "./button";

export default function CardMenu() {
  const { menuItems, loading, error } = useMenuItems();

  // Inisialisasi state counter
  const [counters, setCounters] = useState([]);

  // Update counters jika menuItems berubah
  useEffect(() => {
    if (menuItems.length > 0) {
      setCounters(menuItems.map(() => 0));
    }
  }, [menuItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Handler untuk increment dan decrement
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
          className="border rounded-lg shadow-md p-4 bg-pink-50 flex flex-col items-center"
        >
          <Image
            src={`https://exciting-spell.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image}`}
            alt={item.name}
            width={128}
            height={128}
            className="w-32 h-32 object-contain mb-4 rounded-md"
          />
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">Rp {item.price}</p>

          <div className="flex space-x-4 mt-4 items-center">
            <Button
              onClick={() => decrement(index)}
              className="bg-pink-200 text-pink-600 hover:bg-pink-300"
            >
              -
            </Button>
            <span className="text-lg font-semibold">{counters[index]}</span>
            <Button
              onClick={() => increment(index)}
              className="bg-pink-200 text-pink-600 hover:bg-pink-300"
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}