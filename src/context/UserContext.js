// src/context/UserContext.js

"use client"; 

import React, { createContext, useContext, useState } from 'react';

// Membuat context untuk pengguna
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan informasi pengguna

  const login = (userData) => {
    setUser(userData); // Fungsi untuk login
  };

  const logout = () => {
    setUser(null); // Fungsi untuk logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan context pengguna
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
