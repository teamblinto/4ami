"use client";

import Image from "next/image";

export default function SignupSuccessfullPage() {

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col">
      <header className="px-12 py-4">
        <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div
          className="rounded-lg"
          style={{ width: "1210px", maxWidth: "1210px" }}
        >
          <div className="flex gap-[64px] p-6 bg-white text-black min-h-[600px]">
                
            {/* Success Section */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center">
                {/* Success Icon - Red circle with white checkmark */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500 mb-6">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-black">Signed Up Successfully!</h1>
                <p className="text-gray-600 mb-8">
                  Your account has been successfully created. Register your company to start using the dashboard and get started!
                </p>

                {/* Go to Log In Button */}
                <button
                  type="button"
                  onClick={() => window.location.href = '/login'}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                  Go to Log In
                </button>
              </div>
            </div>


          </div>

        </div>
      </main>
    </div>
  
  );
}