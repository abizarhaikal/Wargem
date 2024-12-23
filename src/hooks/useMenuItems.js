import { useState, useEffect } from "react";
import { fetchMenuItems } from "../repositories/menurepositories";

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMenuItems();
        setMenuItems(data);
      } catch (err) {
        setError("Failed to fetch menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { menuItems, loading, error };
};


