import { useState, useEffect } from "react";
import { fetchOrdersItems, updateOrderStatus } from "@/repositories/menurepositories";

export default function useAdminOrderStatus() {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fetch all orders
  useEffect(() => {
    const fetchAllOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrdersItems();
        setOrderItems(data);
      } catch (err) {
        setError("Failed to fetch order items");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, status) => {
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      setUpdateSuccess(true);

      // Update local state with new status
      setOrderItems((prevItems) =>
        prevItems.map((order) =>
          order.orderId === orderId ? { ...order, status_order: status } : order
        )
      );

      return updatedOrder;
    } catch (err) {
      setUpdateError(err.message || "Failed to update order status");
      throw err;
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    orderItems,
    loading,
    error,
    updateStatus,
    updateLoading,
    updateError,
    updateSuccess,
  };
}
