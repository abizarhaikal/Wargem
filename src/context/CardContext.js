// context/CardContext.js

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Membuat context untuk keranjang belanja
const CartContext = createContext();

// Membuat provider untuk konteks cart
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // State untuk item yang ada di keranjang
  const [queuedItem, setQueuedItem] = useState(null); // Untuk menampung item yang akan ditambahkan setelah render

  // Menyimpan total harga dan jumlah item
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Fungsi untuk menambah item ke keranjang
  const addToCart = (item) => {
    setQueuedItem(item); // Menyimpan item untuk ditambahkan setelah render
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      return updatedItems;
    });
  };

  // **Fungsi untuk memperbarui jumlah item**
  const updateItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Jumlah minimal 1
          : item
      )
    );
  };

  // Mengupdate total harga dan jumlah item
  useEffect(() => {
    if (cartItems.length > 0) {
      let newTotalPrice = 0;
      let newTotalItems = 0;

      // Menghitung total harga dan jumlah item
      cartItems.forEach((item) => {
        newTotalPrice += item.price * item.quantity;
        newTotalItems += item.quantity;
      });

      setTotalPrice(newTotalPrice);
      setTotalItems(newTotalItems);
    }
  }, [cartItems]); // Menghitung ulang setiap kali cartItems berubah

  // Menggunakan queuedItem untuk menambah item ke keranjang setelah render
  useEffect(() => {
    if (queuedItem) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === queuedItem.id);
        if (existingItem) {
          return prevItems.map((i) =>
            i.id === queuedItem.id
              ? { ...i, quantity: i.quantity + 1 } // Update jumlah jika item sudah ada
              : i
          );
        }
        return [...prevItems, { ...queuedItem, quantity: 1 }];
      });
    }
  }, [queuedItem]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity, // Fungsi baru untuk mengupdate jumlah item
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook untuk menggunakan context cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
