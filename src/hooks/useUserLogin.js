import { useState } from "react";
import { loginUser } from "@/repositories/menurepositories";

export default function useUserLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      // Authenticate with PocketBase
      const data = await loginUser(email, password);
      setUserData(data); // Save user data (e.g., token, user info)
      return data;
    } catch (err) {
      setError(err.message || "Failed to login. Please try again."); // Set readable error message
      throw err; // Rethrow error for further handling in form
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, userData };
}