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
        className={`bg-gray-50 shadow-md flex gap-56 flex-col transition-all duration-300 ${
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
      <main className="flex-grow bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-12 mr-20 w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/checked.svg"
            alt="Checked Icon"
            width={75}
            height={75}
            className=""
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Signed Up Successfully!
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Your account has been successfully created. Register your company to
          start using the dashboard and get started!
        </p>

        {/* Button */}
        <Link
          href="/login"
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium shadow transition"
        >
          Go to Log In
        </Link>
      </div>
    </div>
        

      </main>
    </div>
  );
}
