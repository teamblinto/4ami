"use client";

export default function SignupSuccessfullPage() {

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6">
        {/* Top Bar */}
        <div className="flex-grow p-4 sm:p-6 w-full">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col lg:flex-row w-full gap-20">
                
                {/* Success Section */}
                <div className="w-full lg:w-3/5 mx-auto">
                  <div className="text-center">
                    {/* Success Icon - Red circle with white checkmark */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500 mb-6">
                      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Signed Up Successfully!</h1>
                    <p className="text-gray-600 mb-8 text-sm sm:text-base">
                      Your account has been successfully created. Register your company to start using the dashboard and get started!
                    </p>

                    {/* Go to Log In Button */}
                    <button
                      type="button"
                      onClick={() => window.location.href = '/login'}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                    >
                      Go to Log In
                    </button>
                  </div>
                </div>
        
                {/* Image & Links
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
                </div> */}
        
              </div>
            </div>

      </main>
    </div>
  );
}