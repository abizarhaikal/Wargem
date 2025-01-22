"use client";

import React, { createContext, useContext, useState } from "react";

// Membuat context untuk keranjang belanja
const CartContext = createContext();

// Membuat provider untuk konteks cart
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // State untuk item yang ada di keranjang

  // Fungsi untuk menambah item ke keranjang
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex !== -1) {
        // Jika item sudah ada di keranjang, tambahkan jumlahnya
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      }
      // Jika item belum ada, tambahkan item baru dengan quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Fungsi untuk memperbarui jumlah item
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Validasi untuk memastikan quantity tidak kurang dari 1
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
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