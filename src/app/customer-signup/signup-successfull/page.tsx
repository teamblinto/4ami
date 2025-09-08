"use client";

import Image from "next/image";
import { useState } from "react";

export default function SignupSuccessfullPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md flex gap-56 flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-[230px]"
        }`}
      >
    <div>
          <div
          className={`p-4 flex gap-3 items-center ${
            isSidebarCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isSidebarCollapsed && (
            <div className="flex items-center">
              <Image src="/AMILogo.svg" alt="AMI Logo" width={169} height={30} />
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
          >
            <Image src="/sidebar-left.svg" alt="4AMI" width={24} height={24} />
          </button>
        </div>


        {/* <nav className="flex-grow p-4">
          <ul>

            
            <li className="mb-2">
              <button
                onClick={() => setActiveContent("dashboard")}
                className={`flex cursor-pointer items-center p-2 w-full text-left ${
                  activeContent === "dashboard"
                    ? "text-[#FFFFFF] bg-[#ED272C]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >

                {activeContent === "dashboard" ? (
                  <img
                    src="./Module-Icons/home.svg"
                    alt="dashboard"
                  />
                ) : (
                  <img src="./Module-Icons/home-b.svg" alt="dashboard" />
                )}



                {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </button>
            </li>


            <li className="mb-2">
              <button
                onClick={() => setActiveContent("manage-projects")}
                className={`flex cursor-pointer items-center p-2 w-full text-left ${
                  activeContent === "manage-projects"
                    ? "bg-[#ED272C] text-[#FFFFFF]"
                    : "text-[#080607] hover:bg-gray-100"
                }`}
              >
                {activeContent === "manage-projects" ? (
                  <img
                    src="./Module-Icons/manage-p.svg"
                    alt="manage-projects"
                  />
                ) : (
                  <img src="./Module-Icons/manage-projects.svg" alt="manage-projects" />
                )}



                {!isSidebarCollapsed && (
                  <span className="ml-3">Manage Projects</span>
                )}
              </button>
            </li>


            <li className="mb-2">
              <button
                onClick={() => setActiveContent("manage-users")}
                className={`flex cursor-pointer items-center p-2 w-full text-left ${
                  activeContent === "manage-users"
                    ? "bg-[#ED272C] text-[#FFFFFF]"
                    : "text-[#080607] hover:bg-gray-100"
                }`}
              >
                {activeContent === "manage-users" ? (
                  <img
                    src="./Module-Icons/manage-u.svg"
                    alt="Active Manage Users"
                  />
                ) : (
                  <img
                    src="./Module-Icons/manage-users.svg"
                    alt="Manage Users"
                  />
                )}

                {!isSidebarCollapsed && (
                  <span className="ml-3">Manage Users</span>
                )}
              </button>
            </li>


            <li className="mb-2">
              <button
                onClick={() => setActiveContent("manage-assets")}
                className={`flex cursor-pointer items-center p-2 w-full text-left ${
                  activeContent === "manage-assets"
                    ? "bg-[#ED272C] text-[#FFFFFF]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {activeContent === "manage-assets" ? (
                  <img
                    src="./Module-Icons/manage-a.svg"
                    alt="Active Manage Users"
                  />
                ) : (
                  <img src="./Module-Icons/manage-assets.svg" alt="Manage Users" />
                )}

                {!isSidebarCollapsed && (
                  <span className="ml-3">Manage Assets</span>
                )}
              </button>
            </li>
          </ul>
        </nav> */}
</div>


        {/* <div className="p-4 border-t">
          <Link
            href="#"
            className="flex items-center p-2 text-[#080607] hover:bg-gray-100"
          >
            <img src="./Module-Icons/settings.svg" alt="" />
            {!isSidebarCollapsed && <span className="ml-3">Settings</span>}
          </Link>
        </div> */}
 
      </aside>

      {/* Main Content Common */}
      <main className="flex-grow p-6">
        {/* Top Bar */}
        <div className="flex-grow p-4 sm:p-6 w-full mt-20">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex flex-col lg:flex-row w-full gap-20">
                
                {/* Success Section */}
                <div className="w-full">
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
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline mb-4"
                    >
                      Go to Log In
                    </button>
                  </div>
                </div>
        
                {/* Image & Links */}
                {/* <div className="w-full lg:w-2/5 flex flex-col items-center justify-end p-4">
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