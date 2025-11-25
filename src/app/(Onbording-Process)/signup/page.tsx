"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ClientContent() {
  // Form state for signup
  const [userInfo, setUserInfo] = useState({
    email: '',
    invitationCode: '',
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    phone: '',
    source: '',
    role: ''
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Password requirements validation
  const passwordRequirements = {
    has8Chars: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(req => req);

  useEffect(() => {
    // Get user info from URL parameters
    const email = searchParams.get('email') || '';
    const code = searchParams.get('code') || '';
    const firstName = searchParams.get('firstName') || '';
    const lastName = searchParams.get('lastName') || '';
    const title = searchParams.get('title') || '';
    const company = searchParams.get('company') || '';
    const phone = searchParams.get('phone') || '';
    const source = searchParams.get('source') || '';
    const role = searchParams.get('role') || '';

    setUserInfo({
      email,
      invitationCode: code,
      firstName,
      lastName,
      title,
      company,
      phone,
      source,
      role
    });
  }, [searchParams]);


  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col">
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
                    <span className="text-red-500">Step 3</span> of 3
                  </p>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-2 bg-red-500 rounded-full w-full"></div>
                </div>
              </div>

              <form onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);

                try {
                  // Validate passwords
                  if (!password || !confirmPassword) {
                    toast.error('Please fill in both password fields');
                    return;
                  }
                  if (password !== confirmPassword) {
                    toast.error('Passwords do not match');
                    return;
                  }
                  if (!isPasswordValid) {
                    toast.error('Password must meet all requirements: 8 characters, uppercase, lowercase, and number');
                    return;
                  }

                  // Map role values to API expected values
                  const roleMapping: Record<string, string> = {
                    'Admin': 'ADMIN',
                    'Customer Admin': 'CUSTOMER_ADMIN',
                    'Company User': 'CUSTOMER_USER',
                    'Appraiser': 'APPRAISER'
                  };

                  // Prepare signup data with all required fields
                  const signupData = {
                    email: userInfo.email,
                    password: password,
                    confirmPassword: confirmPassword,
                    invitationCode: userInfo.invitationCode,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    title: userInfo.title,
                    company: userInfo.company,
                    phone: userInfo.phone,
                    source: userInfo.source,
                    role: roleMapping[userInfo.role] || userInfo.role,
                    agreeToTerms: 'true' // API expects string
                  };

                  // Call the customer admin signup API
                  const response = await fetch('/api/auth/customer-admin-signup', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupData),
                  });

                  const result = await response.json();

                  if (!response.ok) {
                    throw new Error(result.message || `HTTP error! status: ${response.status}`);
                  }

                  toast.success('Account created successfully!');

                  // Redirect to success page
                  router.push('/signup-completed');

                } catch (error: unknown) {
                  console.error('Error during signup:', error);

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
              }}>


                {/* Password */}
                <div className="mb-6">
                  <h2 className="text-base font-semibold text-gray-700 mb-3">Password must include at least:</h2>

                  {/* Password Requirements List */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2">
                      {passwordRequirements.has8Chars ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-700">8 Characters</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {passwordRequirements.hasUppercase ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-700">1 uppercase letter</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {passwordRequirements.hasLowercase ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-700">1 lowercase letter</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {passwordRequirements.hasNumber ? (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-[#8B4513]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-700">1 Number</span>
                    </div>
                  </div>

                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 pr-10 text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? (
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

                {/* Confirm Password */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 pr-10 text-gray-700 focus:outline-none focus:shadow-outline"
                    />
                    <button
                      type="button"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {showConfirmPassword ? (

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
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-sm mt-1 text-red-600">Passwords do not match</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="py-3 px-8 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading || !password || password !== confirmPassword || !isPasswordValid}
                    className={`font-bold py-3 px-8 border rounded-lg focus:outline-none focus:shadow-outline w-full sm:w-auto flex items-center justify-center ${isLoading || !password || password !== confirmPassword || !isPasswordValid
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-red-500 hover:bg-red-700 text-white cursor-pointer'
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </button>

                </div>
              </form>
            </div>

            {/* Right Side - Illustration */}
            <div className="flex flex-col items-center justify-between">
              <div className="flex-grow flex items-center">
                {/* Image & Links */}
                <div className="flex flex-col items-center justify-center">
                  <div style={{ width: '400px', height: '600px', position: 'relative' }}>
                    <Image
                      src="/banner.svg"
                      alt="Dashboard Illustration"
                      fill
                      priority
                      className="object-cover"
                      sizes="400px"
                    />
                  </div>
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading signup form...</div>}>
      <ClientContent />
    </Suspense>
  );
}
