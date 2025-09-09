"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ClientContent() {
  const [email, setEmail] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get email and code from URL parameters
    const emailParam = searchParams.get("email");
    const codeParam = searchParams.get("code");

    if (emailParam) setEmail(emailParam);
    if (codeParam) setInvitationCode(codeParam);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      {/* Header with Logo */}
      <header className="px-12 py-4">
        <img src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
      </header>

      {/* Main Content */}
      <div className="">
        <main className="flex justify-center w-6xl mx-auto bg-[#FFFFFF] p-4 gap-[64px] ">
          {/* Left Side - Form */}
          <div className="bg-white align-top flex flex-col">
            <div className="max-w-md mx-auto w-full mt-20">
              <h1 className="text-3xl font-bold text-black mb-4">
                Create Your Account
              </h1>
              <p className="text-black text-base mb-8 leading-relaxed">
                Please provide your details below to set up your new account.
                This will allow you to access all services and manage your
                profile securely
              </p>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-end mb-2">
                  <span className="text-sm text-gray-500 font-medium">
                  <span className="text-[#ED272C]" >Step 1</span> of 3
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full w-1/3"></div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!invitationCode.trim() || !email.trim()) {
                    alert(
                      "Please fill in both invitation code and email address"
                    );
                    return;
                  }
                  router.push(
                    `/CompanySignUpProcess/create-account?email=${encodeURIComponent(
                      email
                    )}&code=${encodeURIComponent(invitationCode)}`
                  );
                }}
              >
                {/* Invitation Code */}
                <div className="mb-6">
                  <label
                    htmlFor="invitationCode"
                    className="block text-black text-sm font-medium mb-2"
                  >
                    Invitation Code
                  </label>
                  <input
                    type="text"
                    id="invitationCode"
                    name="invitationCode"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2  focus:border-transparent"
                    placeholder=""
                  />
                </div>

                {/* Email */}
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="block text-black text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2  focus:border-transparent"
                    placeholder=""
                  />
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  className=" bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 transition-colors"
                >
                  Next
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex flex-col items-center justify-between">
            <div className="flex-grow flex items-center">
              <img src="Illustration Banner.svg" alt="" />
            </div>
            {/* Footer */}
            <footer className="p-6">
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-700">
                  Terms of Use
                </a>
                <a href="#" className="hover:text-gray-700">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-gray-700">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-gray-700">
                  Anti Bribery Policy
                </a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function CustomerSignupPage() {
  return (
    <Suspense fallback={<div>Loading customer signup form...</div>}>
      <ClientContent />
    </Suspense>
  );
}
