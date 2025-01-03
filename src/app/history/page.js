"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import pb from "../../services/pocketbaseservice";

export default function OrderHistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Mendapatkan userId dari sesi PocketBase
        const userId = pb.authStore.model?.id;
  
        if (!userId) {
          setError("User not logged in");
          setIsLoading(false);
          return;
        }
  
        // Query pesanan berdasarkan relasi `customer`
        const orders = await pb.collection("orders").getFullList({
          filter: `customer="${userId}"`, // Filter berdasarkan customer (user_id)
          expand: "items,menu", // Ekspansi relasi ke items dan menu
        });
  
        // Format data
        const formattedOrders = orders.map((order) => ({
          id: order.id,
          no_table: order.no_table,
          total_price: order.total_price,
          created: order.created,
          status_order: order.status_order,
          items: (order.expand?.items || []).map((item, idx) => ({
            menu_name: order.expand.menu?.[idx]?.name || "Menu tidak diketahui",
            quantity: item?.quantity || 0,
            total_price: item?.total_price || 0,
          })),
        }));
  
        setHistoryItems(formattedOrders);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="hidden md:block" />

      {/* Konten Utama */}
      <div className="flex-1 p-4">
        {/* Header untuk tampilan mobile */}
        <div className="md:hidden flex items-center justify-between bg-nav-colors w-full p-4 text-white fixed top-0 left-0 z-50">
          <Sidebar />
          <h1 className="text-lg font-semibold text-center flex-1">
            History Pemesanan
          </h1>
        </div>

        {/* Konten History */}
        <div className="mt-12 p-4">
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && historyItems.length > 0 ? (
            <div className="space-y-4">
              {historyItems.map((order, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* ID Pesanan */}
                  <div className="flex justify-center">
                    <p className="text-sm font-medium text-gray-700">
                      {order.id}
                    </p>
                  </div>

                  {/* Detail Pesanan */}
                  <div className="mt-4 text-sm text-gray-800">
                    <p>
                      <strong>No. Meja:</strong> {order.no_table || "N/A"}
                    </p>
                    <p className="mt-2 font-semibold">Detail Menu:</p>
                    <ul className="divide-y divide-gray-200">
                      {order.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center py-2 text-gray-700"
                        >
                          {/* Quantity di sebelah kiri dan dibuat bold */}
                          <span className="font-bold">{item.quantity}x</span>
                          
                          {/* Nama menu di tengah */}
                          <span className="flex-1 px-2 truncate">{item.menu_name}</span>
                          
                          {/* Harga di sebelah kanan */}
                          <span className="text-right">
                            Rp {item.total_price.toLocaleString("id-ID")}
                          </span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  {/* Total Harga */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-sm font-semibold text-gray-700">
                      Rp {order.total_price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* Tanggal dan Status */}
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                    <span>Dipesan tanggal {formatDate(order.created)}</span>
                    <span
                      className={`font-semibold ${
                        order.status_order === "success"
                          ? "text-green-500"
                          : "text-orange-500"
                      }`}
                    >
                      {mapStatus(order.status_order)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStatus = (status) => {
  switch (status) {
    case "success":
      return "Done";
    case "pending":
      return "Pending";
    case "processing":
      return "Ongoing";
    default:
      return "Unknown";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
