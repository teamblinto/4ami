"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

function ThankYouContent() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL parameters
    const email = searchParams.get("email") || "john@gmail.com";
    setUserEmail(email);
  }, [searchParams]);

  const handleConfirmEmail = async () => {
    setIsLoading(true);
    
    try {
      // Simulate sending confirmation email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Confirmation email sent successfully!');
      
      // Redirect back to manage users after success
      setTimeout(() => {
        router.push('/company-admin/manage-users');
      }, 2000);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      toast.error('Failed to send confirmation email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col">
      {/* <header className="px-12 py-4">
        <img src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
        
      </header> */}

         <header className="px-12 py-4">
      <Image 
        src="/AMILogo.svg" 
        alt="AMI Logo" 
        width={230} 
        height={35} 
        priority  // optional: improves LCP for above-the-fold images
      />
    </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Main Content Card */}
          <div className="bg-white shadow-lg rounded-lg p-8 text-center border border-gray-200">
            {/* Main Title */}
            <h1 className="text-3xl font-bold text-black mb-4">
              Thank You for Signing Up!
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl text-black mb-6">
              Check Your Email to Activate Your Account
            </h2>
            
            {/* Body Text */}
            <div className="text-gray-600 mb-6 text-left">
              <p className="mb-4">
                We&apos;ve sent an email to <span className="text-red-500 font-semibold">[{userEmail}]</span>.
                Please click the link in that email to activate your account.
                If you don&apos;t see it, please check your <span className="font-bold">spam</span> or <span className="font-bold">junk folder</span>.
              </p>
            </div>
            
            {/* Action Button */}
            <button
              onClick={handleConfirmEmail}
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-md font-semibold text-white mb-6 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 cursor-pointer'
              }`}
            >
              {isLoading ? 'Sending...' : 'Confirm Email'}
            </button>
            
            {/* Support Information */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                Still having trouble? Contact <strong>Support</strong> for assistance.{" "}
                <span className="text-gray-500">(Support@4ami.com)</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
