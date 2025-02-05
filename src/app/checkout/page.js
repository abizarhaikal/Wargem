"use client";
import { generateOrderId } from "@/utils/generateorder";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CardContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PaymentButton } from "@/components/ui/PaymentButton";

export default function CheckoutPage() {
  const { cartItems, updateItemQuantity, removeFromCart, totalPrice } = useCart();
  const [tableNumber, setTableNumber] = useState("");
  const [tableNumberError, setTableNumberError] = useState(""); // Tambahkan state untuk pesan kesalahan
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  const handleQuantityChange = (itemId, type) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      const newQuantity =
        type === "increment" ? item.quantity + 1 : item.quantity - 1;
      if (newQuantity > 0) {
        updateItemQuantity(itemId, newQuantity);
      }
    }
  };

  const handleTableNumberChange = (e) => {
    const value = e.target.value;
    setTableNumber(value);

    // Validasi nomor meja langsung
    if (value === "" || parseInt(value) <= 0) {
      setTableNumberError("Nomor meja harus lebih besar dari 0.");
    } else {
      setTableNumberError(""); // Reset pesan kesalahan
    }
  };

  const handleConfirmOrder = async () => {
    if (!tableNumber || parseInt(tableNumber) <= 0) {
      setTableNumberError("Nomor meja harus valid sebelum konfirmasi.");
      return;
    }
    if (!userId) {
      alert("Silakan login terlebih dahulu");
      return;
    }
  
    try {
      setIsProcessing(true);
  
      // Calculate total amount
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      console.log(totalAmount)
  
      // Prepare item details for Midtrans
      const itemDetails = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
  
      // Simpan item IDs ke localStorage
      const itemIds = cartItems.map(item => item.id);
      localStorage.setItem('orderItems', JSON.stringify(itemIds));
  
      // Create payment request
      const paymentRequest = {
        userId: userId,
        orderId: generateOrderId(), // Gunakan generateOrderId sesuai implementasi Anda
        amount: totalAmount,
        customerName: `${tableNumber}`,
        customerEmail: "guest@example.com",
        itemDetails: itemDetails, // Guna itemDetails untuk Midtrans
        tableNumber: tableNumber
      };
  
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment');
      }
  
      // Redirect to Midtrans payment page
      window.location.href = data.paymentUrl;
  
    } catch (error) {
      console.error('Payment error:', error);
      alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };
  

  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Menghitung total harga pesanan jika totalPrice tidak valid
  const totalOrderPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className="p-6"
      style={{
        backgroundColor: "#FDF2F8",
        minHeight: "100vh",
        paddingBottom: "100px",
      }}
    >
      <button
        onClick={() => router.push("/")}
        className="text-red-500 mb-4 font-medium"
      >
        &larr; Kembali ke Menu
      </button>

      <h1 className="text-2xl font-semibold mb-6" style={{ color: "#EF4444" }}>
        Checkout
      </h1>

      {/* Input Nomor Meja */}
      <div
        className="mb-4 p-4 bg-white rounded-lg shadow-md"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <label
          htmlFor="tableNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Nomor Meja
        </label>
        <input
          type="number"
          id="tableNumber"
          value={tableNumber}
          onChange={handleTableNumberChange}
          placeholder="Masukkan nomor meja"
          min="0"
          className={`mt-1 block w-full p-2 border ${
            tableNumberError ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm`}
        />
        {tableNumberError && (
          <p className="text-sm text-red-500 mt-2">{tableNumberError}</p>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Keranjang belanja Anda kosong.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md"
                style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              >
                <Image
                  src={`https://exciting-spell.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.image}`}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">Rp {item.price}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
                      onClick={() => handleQuantityChange(item.id, "decrement")}
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
                      onClick={() => handleQuantityChange(item.id, "increment")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  Rp {item.price * item.quantity}
                </p>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Hapus
                </button>
              </div>
            ))}

            {/* Spacer */}
            <div style={{ height: "100px" }}></div>
          </div>

          {/* Footer */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t border-gray-300"
            style={{ backgroundColor: "#FDF2F8" }}
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium">
                Total Pesanan:{" "}
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item
              </div>
              <div className="text-lg font-semibold text-right">
                Rp {totalOrderPrice.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="primary"
                size="lg"
                className={`py-2 px-6 rounded-md text-white ${
                  !tableNumber || tableNumberError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500"
                } w-full`}
                onClick={handleConfirmOrder}
                disabled={!tableNumber || tableNumberError}
              >
                Konfirmasi Pesanan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}