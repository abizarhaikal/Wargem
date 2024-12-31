import { useState } from "react";
import { loginAdmin } from "../repositories/menurepositories";

export default function useAdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminData, setAdminData] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const data = await loginAdmin(username, password); // Call API
      setAdminData(data); // Set data
      return data;
    } catch (err) {
      setError(err.message || "Failed to login. Please try again."); // Set readable error message
      throw err; // Rethrow error for further handling in form
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, adminData };
}
