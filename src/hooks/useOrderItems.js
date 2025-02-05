// src/hooks/useOrderItems.js
'use client';

import { useState, useEffect } from "react";
import { fetchOrderItems } from "../repositories/getorder";

export const useOrderItems = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching order items..."); // Log untuk debugging
        const data = await fetchOrderItems();
        setOrderItems(data);
      } catch (err) {
        console.error("Error caught:", err);  // Log jika terjadi error
        setError("Failed to fetch order items");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { orderItems, loading, error };
};
