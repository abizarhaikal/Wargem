import { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase("https://exciting-spell.pockethost.io");

export function useProductData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const records = await pb.collection("foods").getFullList({
        sort: "-created",
        $autoCancel: false,
      });
      setProducts(records);
      setError(null);
    } catch (error) {
      setError(error);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      // Cleanup if needed
    };
  }, []);

  return { products, loading, error, refetchProducts: fetchProducts };
}