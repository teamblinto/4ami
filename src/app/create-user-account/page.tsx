"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function CreateUserAccountContent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyName: "",
    role: "",
    username: "",
    invitationCode: "",
    sendNotification: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get data from URL parameters
    const firstName = searchParams.get("firstName") || "";
    const lastName = searchParams.get("lastName") || "";
    const email = searchParams.get("email") || "";
    const phoneNumber = searchParams.get("phoneNumber") || "";
    const companyName = searchParams.get("companyName") || "";
    const role = searchParams.get("role") || "";
    const username = searchParams.get("username") || "";
    const invitationCode = searchParams.get("invitationCode") || "";
    const sendNotification = searchParams.get("sendNotification") === "true";

    setUserData({
      firstName,
      lastName,
      phoneNumber,
      companyName,
      role,
      username,
      invitationCode,
      sendNotification,
    });

    setFormData(prev => ({
      ...prev,
      email: email
    }));
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength("");
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 3) {
      setPasswordStrength("Weak");
    } else if (strength < 5) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }
      if (!formData.password.trim()) {
        throw new Error('Password is required');
      }
      if (!formData.confirmPassword.trim()) {
        throw new Error('Please confirm your password');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (!formData.agreeTerms) {
        throw new Error('Please agree to the terms and conditions');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error('Please enter a valid email address');
      }

      // Prepare complete user data for API
      const completeUserData = {
        ...userData,
        email: formData.email.trim(),
        password: formData.password,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      console.log('Creating user account with data:', completeUserData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('User account created successfully!');
      
      // Redirect to thank you page with email parameter
      router.push(`/thank-you?email=${encodeURIComponent(formData.email)}`);
    } catch (error: unknown) {
      console.error('Error creating account:', error);
      
      let errorMessage = 'Failed to create account. ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please check your internet connection and try again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col">
      <header className="px-12 py-4">
        <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
      </header>
      <main className="flex-grow flex items-center mt-4 justify-center">
        <div
          className="rounded-lg"
          style={{ width: "1210px", maxWidth: "1210px" }}
        >
          <div className="flex gap-[64px] p-6 bg-white text-black min-h-[600px]">
            {/* Form Section */}
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-bold text-black mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600 mb-6">
                Please provide your details below to set up your new account.
                This will allow you to access all services and manage your
                profile securely.
              </p>

              {/* Step Progress */}
              <div className="mb-8">
                <div className="flex justify-end mb-1">
                  <p className="text-sm font-medium text-gray-600">
                    <span className="text-red-500">Step 2</span> of 2
                  </p>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-2 bg-red-500 rounded-full w-full"></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Email */}
                  <div>
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
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                    {passwordStrength && (
                      <p className="text-sm text-red-500 mt-1">
                        Password strength: {passwordStrength}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mt-6 mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 mr-2 h-4 w-4"
                    />
                    <span className="text-sm text-gray-600">
                      I acknowledge that I have read and agree to the{" "}
                      <a href="#" className="text-red-500 underline">
                        Terms of Use
                      </a>
                      ,{" "}
                      <a href="#" className="text-red-500 underline">
                        Privacy Policy
                      </a>
                      ,{" "}
                      <a href="#" className="text-red-500 underline">
                        Cookie Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-red-500 underline">
                        Anti Bribery Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="py-2 px-6 border border-gray-300 rounded-md text-gray-700 font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`font-semibold py-2 px-6 rounded-md ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-red-500 text-white cursor-pointer'
                    }`}
                  >
                    {isLoading ? 'Creating...' : 'Sign Up'}
                  </button>
                </div>
              </form>
            </div>

            {/* Image Section */}
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/banner.svg"
                alt="Dashboard Illustration"
                width={400}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Footer */}
          <footer className="p-6">
            <div className="flex justify-end space-x-6 text-sm text-gray-500">
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
  );
}

export default function CreateUserAccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateUserAccountContent />
    </Suspense>
  );
}