"use client";

import React from "react";
import Sidebar from "./sidebar";
import useOrderHistory from "../../hooks/useOrderHistory";

const menuMapping = {
  "eyw3nh1w5iwz9pg": "Mie Rebus",
  "01u6d1q1za3r4po": "Kerupuk",
  "grm8nq5dz672apk": "Teh",
  "emgm6h9svm15452": "Ayam Geprek",
  "llves35w0f3imq9": "Es Cendol",
  "1votb3bhp61ronk": "Ceker Pedas",
  "447a99p6j5qo62d": "Bakso",
  "blnlb89c7s3s1b4": "Mie Goreng",
};

export default function OrderHistoryPage() {
  const { historyItems, isLoading, error } = useOrderHistory();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar className="hidden md:block" />

      {/* Konten Utama */}
      <div className="flex-1 p-4">
        {/* Header untuk tampilan mobile */}
        <div className="md:hidden flex items-center justify-between bg-nav-colors w-full p-4 text-white fixed top-0 left-0 z-50">
          {/* Sidebar hamburger */}
          <Sidebar />
          {/* Judul Header */}
          <h1 className="text-lg font-semibold text-center flex-1">
            History Pemesanan
          </h1>
        </div>

        {/* Konten History */}
        <div className="mt-12 p-4">
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && historyItems && (
            <div className="space-y-4">
              {historyItems.length > 0 ? (
                historyItems.map((order, index) => (
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

                    {/* Detail Menu */}
                    <div className="mt-4 text-sm text-gray-800">
                      <p>
                        <strong>No. Meja:</strong> {order.no_table || "N/A"}
                      </p>
                      <p className="mt-2 font-semibold">Detail Menu:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        {order.menu.map((menuId, idx) => (
                          <li key={idx}>
                            {menuMapping[menuId] || "Menu tidak diketahui"}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Total Harga */}
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-semibold">Total</span>
                      <span className="text-sm font-semibold text-gray-700">
                        Rp
                        {order.total_price
                          ? order.total_price.toLocaleString("id-ID")
                          : "0"}
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
                ))
              ) : (
                <p className="text-center text-gray-600">No orders found.</p>
              )}
            </div>
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
  if (typeof window !== "undefined") {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return dateString;
};
