"use client";

import React, { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import {
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAdminLogin from "../../hooks/useAdminLogin"; // Import useAdminLogin hook
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // ShadCN alert component
import { AlertCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function FormAdmin() {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login, isLoading, error, adminData } = useAdminLogin(); // Use the custom hook
  const [formError, setFormError] = useState(null); // Local state for form error
  const [isSuccess, setIsSuccess] = useState(false); // Local state for success message

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      const result = await login(username, password); // Call login function from useAdminLogin hook
      console.log("Admin logged in:", result.token);
      if (result != null) {
        const successMessage = "Login successful. Redirecting...";
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a 2-second delay
        router.push("/admin/Dashboard"); // Redirect to the dashboard page
        setIsSuccess(true); // Set success message
        setIsSuccess(successMessage); // Set success message
      }
      setFormError(null); // Reset error on successful login
    } catch (err) {
      console.error("Login error:", err);
      setIsSuccess(false); // Reset success message
      // Extract and set the error message
      const errorMessage =
        "Failed to authenticate. Please check your username and password.";

      setFormError(errorMessage);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with Restaurant Image */}
      <div className="hidden lg:flex w-1/2 relative filter grayscale hover:grayscale-0 transition duration-500 ease-in-out">
        <Image
          src="/assets/images/resto.jpg" // Path to your image
          alt="Restaurant Sidebar"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Welcome to Warung Gembira
          </h1>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

          {/* Show the success alert if login is successful */}
          {isSuccess && (
            <Alert variant="success" className="mb-4 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{isSuccess}</AlertDescription>
            </Alert>
          )}
          {/* Show the error alert if there's an error */}
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <FormItem>
                <FormLabel>Username</FormLabel>
                <Controller
                  name="username"
                  control={methods.control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter your username" />
                  )}
                />
                <FormDescription>
                  Must be at least 2 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem className="mt-4">
                <FormLabel>Password</FormLabel>
                <Controller
                  name="password"
                  control={methods.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  )}
                />
                <FormDescription>
                  Must be at least 6 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <div className="mt-6">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
