"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import PocketBase from "pocketbase";

const pb = new PocketBase('https://exciting-spell.pockethost.io');

export default function CardMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Fetch data dari PocketBase
        
        const records = await pb.collection("foods").getFullList();
        const collection = pb.collection("foods")
        console.log("Fetched Records:", records); // Debugging log
        console.log("collection", collection); // Debugging log
        
        setMenuItems(records);
      } catch (err) {
        console.error("Error fetching menu items", err);
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg shadow-md p-4 bg-pink-50 flex flex-col items-center"
        >
          <Image
            src={`https://exciting-spell.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image}`} // Pastikan field image ada di koleksi PocketBase
            alt={item.name}
            width={128}
            height={128}
            className="w-32 h-32 object-contain mb-4 rounded-md"/>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">Rp {item.price}</p>
          <button className="mt-4 flex items-center justify-center w-full bg-pink-200 text-pink-600 rounded-md py-2 hover:bg-pink-300">
            <span>+</span>
          </button>
        </div>
      ))}
    </div>
  );
}