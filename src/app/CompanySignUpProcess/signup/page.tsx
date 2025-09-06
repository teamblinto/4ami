"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// These imports are not needed for the signup page
// import ManageUsers from "../../components/SupperAdminModules/ManageUsers/ManageUsers";
// import ManageAssets from "../../components/SupperAdminModules/ManageAssets/ManageAssets";
// import SendInvitationForm from "../../components/SupperAdminModules/ManageUsers/SendInvitationForm";
// import DashboardContent from "../../components/SupperAdminModules/DashboardContent/DashboardContent";
// import ManageProjects from "../../components/SupperAdminModules/ManageProjects/ManageProjects";

export default function SignupPage() {
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


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6">
        {/* Top Bar */}
        <div className="flex-grow p-4 sm:p-6 w-full">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col lg:flex-row w-full gap-20">
                
                {/* Form Section */}
                <div className="w-full lg:w-3/5">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create Your Account</h1>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    Please provide your details below to set up your new account. This will allow you to access all services and manage your profile securely
                  </p>

                  {/* Step Progress */}
                    <div className="mb-6">
                    <div className="flex justify-end mb-2">
                        <p className="text-sm font-medium">
                            <span className="text-red-500 font-medium">Step 3</span> of 3
                        </p>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                        <div className="h-3 bg-red-500 rounded-full w-full"></div>
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
                    router.push('/CompanySignUpProcess/signup-successfull');
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
                      <p className="text-sm mt-1">
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
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                      >
                        Sign Up
                      </button>
                      
                    </div>
                  </form>
                </div>
        
                {/* Image & Links */}
                <div className="w-full lg:w-2/5 flex flex-col items-center justify-end p-4">
                  <Image
                    src="/invitation-img.png"
                    alt="Dashboard "
                    width={600}
                    height={800}
                    className="max-w-full max-h-[800px]"
                  />
        
                  <div className="w-full mt-6 text-sm text-end flex flex-wrap justify-end gap-4">
                    <a href="#" className="underline hover:text-gray-600">Terms of Use</a>{' '}
                    <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>{' '}
                    <a href="#" className="underline hover:text-gray-600">Cookie Policy</a>{' '}
                    <a href="#" className="underline hover:text-gray-600">Anti Bribery Policy</a>
                  </div>
                </div>
        
              </div>
            </div>

      </main>
    </div>
  );
}
