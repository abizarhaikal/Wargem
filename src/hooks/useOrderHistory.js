import { useState, useEffect } from "react";
import { fetchHistoryOrder } from "../repositories/menurepositories";

export default function useOrderHistory() {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHistoryOrder();
        setHistoryItems(data);
      } catch (err) {
        setError("Failed to fetch order history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { historyItems, isLoading, error };
}