import React from "react";
import UserLoginForm from "@/components/ui/loginuser"; // Import the login form component
import Link from "next/link"; // Import Link for navigation

export default function LoginPage() {
  return (
    <React.Fragment>
        <UserLoginForm />
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
    </React.Fragment>
  );
}