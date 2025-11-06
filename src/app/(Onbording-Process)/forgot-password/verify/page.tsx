"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


import { Suspense } from "react";

function VerifyCodePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    const m = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const s = (timeLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [timeLeft]);

  const handleResend = async () => {
    if (timeLeft > 0 || !email) return;
    setIsResending(true);
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setTimeLeft(120);
        alert("Reset link sent successfully!");
      } else {
        console.error("Resend link error:", data);
        alert(data.message || "Failed to resend link. Please try again.");
      }
    } catch (error) {
      console.error("Resend link error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsResending(false);
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
            {/* Left Section - Check Email */}
            <div className="w-full md:w-2/5 p-6">
              <h1 className="text-[24px] font-medium text-[#080607] mb-2">Check Your Email</h1>
              <p className="text-[#6C757D] mb-6">
                We have sent a password reset link to <span className="font-semibold">{email}</span>
              </p>
              <p className="text-sm text-[#6C757D] mb-6">
                Please click on the link in the email to reset your password. The link will expire after a certain period.
              </p>

              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-2">
                  Didn&#39;t receive the email?
                </p>
                <p className="text-xs text-gray-500">
                  {timeLeft > 0 ? (
                    <>You can resend the link in {formattedTime}</>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending || !email}
                      className={`underline ${isResending || !email ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-600"}`}
                    >
                      {isResending ? "Sending..." : "Resend reset link"}
                    </button>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="px-5 py-2 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-50"
              >
                Back to Login
              </button>
            </div>

            {/* Right Section - Illustration */}
            <div className="w-full md:w-3/5 flex items-center justify-end p-6">
              <Image
                src="/forget.png.svg"
                alt="Verification Illustration"
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

export default function VerifyCodePage() {
  return (
    <Suspense>
      <VerifyCodePageContent />
    </Suspense>
  );
}


