"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";


import { Suspense } from "react";

function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = (() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score >= 3 ? "Strong" : score === 2 ? "Medium" : "Weak";
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== confirmPassword || !token) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/forgot-password/success");
      } else {
        // Handle error - you might want to show an error message to the user
        console.error("Reset password error:", data);
        alert(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-2 bg-gray-100">
      <div className="w-full max-w-[1200px] mx-auto ">
        <header className="px-12 py-4" style={{ height: '60px' }}>
          <Image 
            src="/AMILogo.svg" 
            alt="AMI Logo" 
            width={230} 
            height={35}
            priority
            style={{ width: "230px", height: "35px", display: "block" }}
          />
        </header>

        <main className="flex-grow flex max-w-[1000px] mx-auto items-center justify-center bg-gray-100 pt-6 pb-6">
          <div className="bg-white  rounded-lg grid md:flex items-center justify-center w-full h-full m-14 p-6">
            {/* Left Section - Reset Form */}
            <div className="w-full md:w-2/5">
              <h1 className="text-[24px] font-medium text-[#080607] mb-2">Reset Password</h1>
              <p className="text-[#6C757D] mb-6">Please enter your new password below</p>
              {!token && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">Invalid or missing reset token. Please use the link from your email.</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 rounded-[8px] border-[1.4px] border-[#CED4DA] bg-[#FBFBFB]"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    >
                      {showPassword ? (
                        // Eye OFF icon

                        <svg
                          className="h-5 w-5 text-gray-500 cursor-pointer "
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
                      ) : (
                        // Eye ON icon
                        <svg
                          className="h-5 w-5 text-gray-500 cursor-pointer "
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
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#6C757D] mt-1">
                    Password strength: <span className="text-red-500 font-medium">{passwordStrength}</span>
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10 rounded-[8px] border-[1.4px] border-[#CED4DA] bg-[#FBFBFB]"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    >
                      {showConfirm ? (
                        // Eye with slash (hide icon)

                        <svg
                          className="h-5 w-5 text-gray-500 cursor-pointer "
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
                      ) : (
                        // Eye without slash (show icon)
                        <svg
                          className="h-5 w-5 text-gray-500 cursor-pointer "
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
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !password || password !== confirmPassword || !token}
                  className={`px-5 py-2 rounded-md text-white font-medium cursor-pointer ${isSubmitting || !password || password !== confirmPassword || !token
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>

            {/* Right Section - Illustration */}
            <div className="w-full md:w-3/5 flex items-center justify-end">
              <div style={{ width: '420px', maxHeight: '600px', position: 'relative', aspectRatio: '1/1' }}>
                <Image
                  src="/forget.png.svg"
                  alt="Reset Password Illustration"
                  fill
                  priority
                  className="object-contain"
                  sizes="420px"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordPageContent />
    </Suspense>
  );
}


