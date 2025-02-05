"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Formatter untuk Rupiah
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

export default function OrderTableAdmin({
  orderItems,
  handleStatusUpdate,
  updateLoading,
}) {
  // Hitung total pendapatan
  const totalRevenue = orderItems.reduce(
    (total, order) =>
      total + order.items.reduce((sum, item) => sum + item.totalPrice, 0),
    0
  );

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white shadow-md rounded-lg border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-left font-semibold text-gray-600 uppercase">
              Order ID
            </TableHead>
            <TableHead className="text-left font-semibold text-gray-600 uppercase">
              Menu Items
            </TableHead>
            <TableHead className="text-left font-semibold text-gray-600 uppercase">
              Table Number
            </TableHead>
            <TableHead className="text-left font-semibold text-gray-600 uppercase">
              Total Quantity
            </TableHead>
            <TableHead className="text-left font-semibold text-gray-600 uppercase">
              Total Price
            </TableHead>
            <TableHead className="text-left font-semibold text-gray-600 uppercase">
              Status
            </TableHead>
            <TableHead className="text-left font-semibold text-gray-600 uppercase">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((order, index) => {
            const totalQuantity = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const totalPrice = order.items.reduce(
              (sum, item) => sum + item.totalPrice,
              0
            );

            return (
              <TableRow
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <TableCell className="p-4">{order.orderId}</TableCell>
                <TableCell className="p-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-sm text-gray-700">
                      {item.menuName} ({item.quantity}x)
                    </div>
                  ))}
                </TableCell>
                <TableCell className="p-4">{order.noTable}</TableCell>
                <TableCell className="p-4">{totalQuantity}</TableCell>
                <TableCell className="p-4">
                  {formatRupiah(totalPrice)}
                </TableCell>
                <TableCell className="p-4">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-medium ${
                      order.statusOrder === "success"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.statusOrder || "Pending"}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  {order.statusOrder === "success" ? (
                    <span className="text-green-500 text-lg">✔️</span>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handleStatusUpdate(order.orderId)}
                      disabled={updateLoading}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md disabled:bg-gray-300"
                    >
                      {updateLoading ? "Updating..." : "Mark as Success"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Total Revenue Section */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-700">
          Total Revenue:{" "}
          <span className="text-green-600">{formatRupiah(totalRevenue)}</span>
        </h2>
      </div>
    </div>
  );
}
