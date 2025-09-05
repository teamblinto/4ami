"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "4ami@gmail.com" && password === "4ami") {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-[1146px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-gray-100">
          <div className="flex items-center cursor-pointer">
            <Image
              src="/logo.svg"
              alt="AMI Logo"
              width={230}
              height={35}
              style={{ width: "230px", height: "auto" }}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center bg-gray-100 pt-20 pb-20">
          <div className="bg-white shadow-md rounded-lg grid md:flex items-center justify-center w-full h-full m-10 gap-4">
            {/* Left Section - Login Form */}
            <div className="w-full md:w-2/5 p-6">
              <h2 className="text-2xl font-bold mb-2">Log In</h2>
              <p className="text-gray-600 mb-6">
                <span className="font-semibold text-red-500">Welcome back!</span>{" "}
                Log in to access AMI's full suite of services designed to support
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
                    className="shadow appearance-none border rounded border-gray-300 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      className="shadow appearance-none border rounded border-gray-300 w-full py-3 px-3 text-gray-700 mb-0 leading-tight focus:outline-none focus:shadow-outline pr-10"
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
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Log In
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
