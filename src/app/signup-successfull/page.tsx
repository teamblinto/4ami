"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ManageUsers from "../components/SupperAdminModules/ManageUsers";
import ManageAssets from "../components/SupperAdminModules/ManageAssets";
import SendInvitationForm from "../components/SendInvitationForm";
import DashboardContent from "../components/SupperAdminModules/DashboardContent";
import ManageProjects from "../components/SupperAdminModules/ManageProjects";

export default function SignupSuccessfullPage() {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [showSendInvitation, setShowSendInvitation] = useState(false);

  if (showSendInvitation) {
    return (
      <SendInvitationForm
        onInvitationSent={() => setShowSendInvitation(false)}
      />
    );
  }

  const renderMainContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <DashboardContent setActiveContent={setActiveContent} />;
      case "manage-users":
        return <ManageUsers />;
      case "manage-assets":
        return <ManageAssets />;
      case "manage-projects":
        return <ManageProjects />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md flex gap-56 flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-58"
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
              <Image src="AMIlogo.svg" alt="AMI Logo" width={169} height={30} />
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
          >
            <img src="sidebar-left.svg" alt="4AMI" />
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
        
                  <form>
                    
                    {/* Password */}
                    <div className="mb-6">
                      <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
                        Invitation Code
                      </label>
                      <input type="text" id="text" className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
                      {/* <p className="text-sm mt-1">
                        Password strength:<span className="text-red-700"> Strong</span>
                      </p> */}
                    </div>


                    {/* Confirm Password */}
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input type="email" id="email" className="shadow appearance-none border border-gray-300 bg-gray-50 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
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
