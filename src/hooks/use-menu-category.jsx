import { useEffect, useState } from "react";
import { menuCategories } from "@/repositories/menurepositories";

export const useMenuCategories = (menuCategory) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!menuCategory) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await menuCategories(menuCategory);
        if (isMounted) {
          setData(result || []); // Ensure we always set an array
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch menu items");
          setData([]); // Reset data on error
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [menuCategory]);

  return { menuItems: data, loading, error }; // Return menuItems instead of data
};