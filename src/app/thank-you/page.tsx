"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ThankYouPage() {
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-100">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-black mb-4">
            Thank You for Signing Up!
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl text-black mb-6">
            Check Your Email to Activate Your Account
          </h2>
          
          {/* Body Text */}
          <div className="text-gray-600 mb-8 text-left">
            <p className="mb-4 leading-relaxed">
              To complete your sign-up, please check your email and follow the confirmation link we just sent to{" "}
              <span className="text-red-500 font-semibold">[{userEmail}]</span>. 
              Your response is required to activate your account.
            </p>
            <p className="leading-relaxed">
              If you don't see the email within a few minutes, please check your{" "}
              <strong className="font-bold">spam</strong> or <strong className="font-bold">junk folder</strong>.
            </p>
          </div>
          
          {/* Action Button */}
          <button
            onClick={handleConfirmEmail}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-md font-semibold text-white mb-6 transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isLoading ? 'Sending...' : 'Confirm Email'}
          </button>
          
          {/* Support Information */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Still having trouble? Contact <strong className="font-bold">Support</strong> for assistance.{" "}
              <span className="text-gray-500">(Support@4ami.com)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
