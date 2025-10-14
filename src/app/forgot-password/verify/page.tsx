"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

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

  const handleChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only single digit
    const next = [...code];
    next[idx] = value;
    setCode(next);
    if (value && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const enteredCode = useMemo(() => code.join(""), [code]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.length !== 6) return;
    setIsVerifying(true);
    try {
      // TODO: integrate with backend verification endpoint
      // await fetch('/api/auth/verify-reset-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, code: enteredCode }) })
      console.log("Verify code", enteredCode, "for", email);
      // Redirect to reset password page
      router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}&code=${enteredCode}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    setTimeLeft(120);
    // TODO: call resend endpoint
    // await fetch('/api/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-2 bg-gray-100">
      <div className="w-full max-w-[1200px] mx-auto ">
        <header className="px-12 py-4">
          <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
        </header>

        <main className="flex-grow flex max-w-[1000px] mx-auto items-center justify-center bg-gray-100 pt-6 pb-6">
          <div className="bg-white  rounded-lg grid md:flex items-center justify-center w-full h-full m-10 gap-4">
            {/* Left Section - Verification */}
            <div className="w-full md:w-2/5 p-6">
              <h1 className="text-2xl font-bold text-black mb-2">Please Check Your Email</h1>
              <p className="text-gray-600 mb-6">
                We have sent a code to <span className="font-semibold">{email}</span>
              </p>

              <form onSubmit={handleVerify}>
                <div className="flex gap-2 mb-4">
                  {code.map((d, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-10 h-10 text-center border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || enteredCode.length !== 6}
                  className={`px-5 py-2 rounded-md text-white font-medium cursor-pointer ${
                    isVerifying || enteredCode.length !== 6
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                Send code again in {formattedTime} {" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timeLeft > 0}
                  className={`underline ${timeLeft > 0 ? "text-gray-400" : "text-red-500"}`}
                >
                  send code
                </button>
              </p>
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


