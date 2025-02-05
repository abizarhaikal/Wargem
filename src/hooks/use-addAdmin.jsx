import { useState } from "react";
import { addAdmin } from "@/repositories/menurepositories"; // Ensure this function is defined in your menurepositories

export default function addNewAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const data = await addAdmin(username, email, password); // Call the signup function from menurepositories
      setUserData(data); // Save user data returned from PocketBase
      return data;
    } catch (err) {
      setError(err.message || "Failed to sign up. Please try again."); // Set readable error message
      throw err; // Rethrow error for further handling in the form
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, userData };
}
