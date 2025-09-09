"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ClientContent() {
  // Form state for signup
  const [userInfo, setUserInfo] = useState({
    email: '',
    invitationCode: '',
    firstName: '',
    lastName: ''
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    // Get user info from URL parameters
    const email = searchParams.get('email') || '';
    const code = searchParams.get('code') || '';
    const firstName = searchParams.get('firstName') || '';
    const lastName = searchParams.get('lastName') || '';
    
    setUserInfo({
      email,
      invitationCode: code,
      firstName,
      lastName
    });
  }, [searchParams]);
  console.log(userInfo)


  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col">
      <header className="px-12 py-4">
        <img src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
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
        
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // Validate passwords
                    if (!password || !confirmPassword) {
                      alert('Please fill in both password fields');
                      return;
                    }
                    if (password !== confirmPassword) {
                      alert('Passwords do not match');
                      return;
                    }
                    if (password.length < 6) {
                      alert('Password must be at least 6 characters long');
                      return;
                    }
                    
                    // Here you would typically send the complete user data to your backend
                    console.log('Complete signup data:', {
                      ...userInfo,
                      password
                    });
                    
                    // Redirect to success page
                    router.push('/signup-completed');
                  }}>
                    

                    {/* Password */}
                    <div className="mb-6">
                      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                      <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                      />
                      <p className="text-sm text-[#6C757D] mt-1">
                        Password strength: <span className={password.length >= 8 ? "text-green-600" : password.length >= 6 ? "text-yellow-600" : "text-red-600"}>
                          {password.length >= 8 ? "Strong" : password.length >= 6 ? "Medium" : "Weak"}
                        </span>
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm Password
                      </label>
                      <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                      />
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-sm mt-1 text-red-600">Passwords do not match</p>
                      )}
                    </div>
        
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                        <button
                        type="button"
                        onClick={() => router.back()}
                        className="py-3 px-8 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 border rounded-lg focus:outline-none focus:shadow-outline w-full sm:w-auto"
                      >
                        Sign Up
                      </button>
                      
                    </div>
                  </form>
                </div>
        
            {/* Image & Links */}
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading signup form...</div>}>
      <ClientContent />
    </Suspense>
  );
}
