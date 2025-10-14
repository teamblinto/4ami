"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      // TODO: integrate with backend endpoint if available
      // await fetch("/api/auth/forgot-password", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      // Navigate to verification page with email
      router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-2 bg-gray-100">
      <div className="w-full max-w-[1200px] mx-auto ">
        <header className="px-12 py-4">
          <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
        </header>

        <main className="flex-grow flex max-w-[1000px] mx-auto items-center justify-center bg-gray-100 pt-6 pb-6">
          <div className="bg-white  rounded-lg grid md:flex items-center justify-center w-full h-full m-10 gap-4">
            {/* Left Section - Form */}
            <div className="w-full md:w-2/5 p-6">
              <h1 className="text-[24px] font-medium text-[#080607] mb-2">Forgot Password</h1>
              <p className="text-[#6C757D] mb-6">
                Enter your sign-up email address to receive a password reset link
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[8px] border-[1.4px] border-[#CED4DA] bg-[#FBFBFB]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-[32px] py-[10px] rounded-md text-white font-medium text-[14px] cursor-pointer ${
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Code"}
                </button>
              </form>
            </div>

            {/* Right Section - Illustration */}
            <div className="w-full md:w-3/5 flex items-center justify-end p-6">
              <Image
                src="/forget.png.svg"
                alt="Forgot Password Illustration"
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


