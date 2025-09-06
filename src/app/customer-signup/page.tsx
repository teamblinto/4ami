"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import SendInvitationForm from "../../components/SupperAdminModules/ManageUsers/SendInvitationForm";

export default function CustomerSignupPage() {
  const [email, setEmail] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Get email and code from URL parameters
    const emailParam = searchParams.get('email');
    const codeParam = searchParams.get('code');
    
    if (emailParam) setEmail(emailParam);
    if (codeParam) setInvitationCode(codeParam);
  }, [searchParams]);

  // static page content for customer signup

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
                            <span className="text-red-500 font-medium">Step 1</span> of 3
                        </p>
                    </div>
                    {/* <div className="h-3 bg-gray-200 rounded-full">
                        <div className="h-3 bg-red-500 rounded-full w-full"></div>
                        <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                    </div> */}

                    <div className="relative h-3 bg-gray-200 rounded-full">
                      <div className="absolute top-0 left-0 h-3 bg-red-500 rounded-full w-1/3"></div>
                    </div>

                    </div>
        
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // Validate that both fields are filled
                    if (!invitationCode.trim() || !email.trim()) {
                      alert('Please fill in both invitation code and email address');
                      return;
                    }
                    // Redirect to create account page with parameters
                    router.push(`/CompanySignUpProcess/create-account?email=${encodeURIComponent(email)}&code=${encodeURIComponent(invitationCode)}`);
                  }}>
                    
                    {/* Invitation Code */}
                    <div className="mb-6">
                      <label htmlFor="invitationCode" className="block text-gray-700 text-sm font-bold mb-2">
                        Invitation Code
                      </label>
                      <input 
                        type="text" 
                        id="invitationCode" 
                        name="invitationCode"
                        value={invitationCode}
                        onChange={(e) => setInvitationCode(e.target.value)}
                        className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                        placeholder="Enter your invitation code"
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                        placeholder="Enter your email address"
                      />
                    </div>
        

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                      <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                      >
                        Next
                      </button>
                      
                    </div>
                  </form>
                </div>
        
                {/* Image & Links */}
                <div className="w-full lg:w-2/5 flex flex-col items-center justify-end p-4">
                  <Image
                    src="/invitation-img.png"
                    alt="Dashboard Illustration"
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
