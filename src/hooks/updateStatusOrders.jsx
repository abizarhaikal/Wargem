import { useEffect, useState } from "react";
import { updateOrderStatus } from "@/repositories/menurepositories";

export default function useUpdateOrderStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateStatus = async (orderId, status) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await updateOrderStatus(orderId, status);
      setSuccess(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to update order status");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateStatus,
    isLoading,
    error,
    success,
  };
}
