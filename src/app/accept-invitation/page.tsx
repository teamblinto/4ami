"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ClientContent() {
  const [email, setEmail] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAutoPopulated, setIsAutoPopulated] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get email and code from URL parameters
    const emailParam = searchParams.get("email");
    const codeParam = searchParams.get("code");
    const token = searchParams.get("token");

    if (emailParam) setEmail(emailParam);
    if (codeParam) setInvitationCode(codeParam);

    // If token is present, fetch verification data
    if (token) {
      fetchVerificationData(token);
    }
  }, [searchParams]);

  const fetchVerificationData = async (token: string) => {
    setIsVerifying(true);
    try {
      console.log('Fetching verification data for token:', token);
      const response = await fetch(`/api/auth/verify-email?token=${token}`);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        await response.text();
        toast.error('Invalid response from verification service');
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        // Auto-populate fields based on the response data
        if (data.user) {
          // Map email from user object
          if (data.user.email) {
            setEmail(data.user.email);
          }
          
          // Map invitation code from emailVerificationToken
          if (data.user.emailVerificationToken) {
            setInvitationCode(data.user.emailVerificationToken);
          }
        }

        setIsAutoPopulated(true);
        toast.success('Email verification data loaded successfully!');
      } else {
        // Handle different error cases
        if (response.status === 400) {
          toast.error(data.message || 'Invalid verification token');
        } else if (response.status === 404) {
          toast.error('Verification token not found');
        } else {
          toast.error(data.message || `Failed to verify email (Status: ${response.status})`);
        }
      }
    } catch (error) {
      console.error('Error fetching verification data:', error);
      if (error instanceof SyntaxError) {
        toast.error('Invalid response format from server');
      } else {
        toast.error('Failed to load verification data. Please check your connection.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      {/* Header with Logo */}
      <header className="px-12 py-4">
        <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
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

              {/* Loading indicator for verification */}
              {isVerifying && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                    <span className="text-blue-700 text-sm">Loading verification data...</span>
                  </div>
                </div>
              )}

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
                  
                  // Get token from URL to pass to next page
                  const token = searchParams.get("token");
                  
                  // Build URL with all parameters
                  const params = new URLSearchParams({
                    email: email,
                    code: invitationCode
                  });
                  
                  // Add token if it exists
                  if (token) {
                    params.append('token', token);
                  }
                  
                  router.push(`/create-account?${params.toString()}`);
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
                    readOnly={isAutoPopulated}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:border-transparent ${
                      isAutoPopulated ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    }`}
                    placeholder=""
                  />
                  {isAutoPopulated && (
                    <p className="text-xs text-gray-500 mt-1">Auto-populated from verification link</p>
                  )}
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
                    readOnly={isAutoPopulated}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-1 focus:border-transparent ${
                      isAutoPopulated ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    }`}
                    placeholder=""
                  />
                  {isAutoPopulated && (
                    <p className="text-xs text-gray-500 mt-1">Auto-populated from verification link</p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  disabled={isVerifying}
                  className={`font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-1 transition-colors ${
                    isVerifying
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                  }`}
                >
                  {isVerifying ? 'Loading...' : 'Next'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex flex-col items-center justify-between">
            <div className="flex-grow flex items-center">
              <Image src="/Illustration Banner.svg" alt="Illustration" width={500} height={500} />
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
