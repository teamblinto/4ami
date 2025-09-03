"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ManageUsers from "../components/SupperAdminModules/ManageUsers";
import ManageAssets from "../components/SupperAdminModules/ManageAssets";
import SendInvitationForm from "../components/SendInvitationForm";
import DashboardContent from "../components/SupperAdminModules/DashboardContent";
import ManageProjects from "../components/SupperAdminModules/ManageProjects";

export default function DashboardPage() {
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
          className={`p-4 border-b flex gap-3 items-center ${
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
            <img src="sidebar-left.svg" alt="" />
          </button>
        </div>


        <nav className="flex-grow p-4">
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
        </nav>
</div>


        <div className="p-4 border-t">
          <Link
            href="#"
            className="flex items-center p-2 text-[#080607] hover:bg-gray-100"
          >
<img src="./Module-Icons/settings.svg" alt="" />
            {!isSidebarCollapsed && <span className="ml-3">Settings</span>}
          </Link>
        </div>
        {/*  */}
      </aside>

      {/* Main Content Common */}
      <main className="flex-grow p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-gray-800">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <button className="relative text-gray-600 hover:text-gray-800">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <Image
              src="/next.svg"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />{" "}
            {/* Replace with actual user avatar */}
          </div>
        </div>

        {renderMainContent()}
      </main>
    </div>
  );
}
