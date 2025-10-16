"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ThankYouPage = () => {
  const router = useRouter();

  const handleViewStatus = () => {
    // Navigate to projects page
    router.push('/company-admin/projects');
  };

  return (
    <div className="min-h-screen flex items-center  justify-center p-4">
      <div className="bg-white rounded-lg  p-12 w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl font-bold text-black text-center mb-4">
          Form Submitted Successfully!
        </h1>

        {/* Descriptive Text */}
        <p className="text-gray-600 text-center mb-8">
          We have received your information. Upon completion of your Project, you will receive the results in your email at{" "}
          <span className="font-medium">m.adams@gmail.com</span>
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleViewStatus}
            className="px-8 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            VIEW STATUS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
