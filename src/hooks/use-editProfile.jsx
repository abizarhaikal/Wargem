"use client";

import { useState, useEffect } from "react";
import {
  fetchDataAdmin,
  updateAdminProfile,
} from "@/repositories/menurepositories";

export function useAdminData(adminId) {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDataAdmin(adminId);
        console.log("Data Admin:", data);
        setAdminData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (adminId) {
      fetchData();
    }
  }, [adminId]);

  const updateAdmin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Jika password kosong, hapus dari data yang akan diupdate
      const updateData = { ...data };
      if (!updateData.password) {
        delete updateData.password;
      }
      // Hapus confirmPassword karena tidak perlu dikirim ke server
      delete updateData.confirmPassword;

      const updatedData = await updateAdminProfile(adminId, updateData);
      setAdminData(updatedData);
      return updatedData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { adminData, loading, error, updateAdmin };
}
