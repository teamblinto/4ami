"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ClientPageRoot } from "next/dist/client/components/client-page";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log(data)
      if (response.ok) {
        // Store token and user data in localStorage
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        
        // Store user data including role
        if (data.user) {
          localStorage.setItem("userData", JSON.stringify(data.user));
        }
        
        toast.success("Login successful!");
        
        // Check user role and redirect accordingly
        if (data.user && data.user.role === "ADMIN") {
          router.push("/dashboard");
        } else if (data.user && data.user.role === "CUSTOMER_ADMIN") {
          router.push("/company-admin");
        } else if (data.user && data.user.role === "USER") {
          router.push("/user-dashboard");
        } else {
          toast.error("Access denied. Valid role required.");
        }
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-[1146px] mx-auto">
      <header className="px-12 py-4">
        <img src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
      </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center bg-gray-100 pt-20 pb-20">
          <div className="bg-white shadow-md rounded-lg grid md:flex items-center justify-center w-full h-full m-10 gap-4">
            {/* Left Section - Login Form */}
            <div className="w-full md:w-2/5 p-6">
              <h2 className="text-2xl text-[#080607] font-bold mb-2">Log In</h2>
              <p className="text-gray-600 mb-6">
                <span className="font-semibold text-red-500">Welcome back!</span>{" "}
                Log in to access AMI&apos;s full suite of services designed to support
                your physical asset management needs.
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="shadow appearance-none border rounded border-gray-300 w-full py-2 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:shadow-outline pr-10"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        // Eye OFF icon
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.963 9.963 0 012.052-3.368m3.1-2.433A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.958 9.958 0 01-4.338 5.409M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        // Eye ON icon
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-2">
                    <label className="flex items-center text-gray-600">
                      <input type="checkbox" className="form-checkbox mr-2" />
                      Remember Password
                    </label>
                    <Link href="#" className="text-red-500 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`${
                      isLoading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-red-500 hover:bg-red-700"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors`}
                  >
                    {isLoading ? "Signing In..." : "Log In"}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section - Image */}
            <div className="w-full md:w-3/5 flex items-center justify-end p-6">
              <Image
                src="/login-img.jpg"
                alt="Dashboard Illustration"
                width={600}
                height={1000}
                style={{ width: "600px", height: "auto" }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
