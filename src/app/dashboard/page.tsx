"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ManageUsers from "../components/SupperAdminModules/ManageUsers";
import ManageAssets from "../components/SupperAdminModules/ManageAssets";
import DashboardContent from "../components/SupperAdminModules/DashboardContent";
import ManageProjects from "../components/SupperAdminModules/ManageProjects";

export default function DashboardPage() {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


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
        className={`bg-white flex flex-col justify-between transition-all duration-300 min-h-screen dashboard-sidebar ${
          isSidebarCollapsed ? 'collapsed' : ''
        }`}
        style={{ 
          width: isSidebarCollapsed ? '64px' : '230px',
          minWidth: isSidebarCollapsed ? '64px' : '230px',
          maxWidth: isSidebarCollapsed ? '64px' : '230px'
        }}
      >
        <div>
          <div
            className={`pt-[35px] px-3 pb-[80px] flex gap-3 items-center ${
              isSidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!isSidebarCollapsed && (
              <div className="flex items-center">
                <Image
                  src="AMIlogo.svg"
                  alt="AMI Logo"
                  width={169}
                  height={30}
                />
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            >
              <Image src="/sidebar-left.svg" alt="" width={24} height={24} />
            </button>
          </div>

          <nav className="flex-grow p-3 ">
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
                    <Image src="/Module-Icons/home.svg" alt="dashboard" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/home-b.svg" alt="dashboard" width={20} height={20} />
                  )}

                  {!isSidebarCollapsed && (
                    <span className="ml-3">Dashboard</span>
                  )}
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
                    <Image src="/Module-Icons/manage-p.svg" alt="manage-projects" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/manage-projects.svg" alt="manage-projects" width={20} height={20} />
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
                    <Image src="/Module-Icons/manage-u.svg" alt="Active Manage Users" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/manage-users.svg" alt="Manage Users" width={20} height={20} />
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
                    <Image src="/Module-Icons/manage-a.svg" alt="Active Manage Users" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/manage-assets.svg" alt="Manage Users" width={20} height={20} />
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
            <Image src="/Module-Icons/settings.svg" alt="" width={20} height={20} />
            {!isSidebarCollapsed && <span className="ml-3">Settings</span>}
          </Link>
        </div>
        {/*  */}
      </aside>

      {/* Main Content Common */}
      <main className="flex-grow px-8 bg-[#FAFAFA] pt-[24px] pb-[24px] overflow-x-auto min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-[320px] ">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-12  rounded-lg border placeholder: text-[#ADB5BD] border-[#CED4DA] bg-[#FFFFFF] focus:outline-none "
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
              <Image src="/notification-bell.svg" alt="" width={20} height={20} />
            </button>
            <button className="relative text-gray-600 hover:text-gray-800">
              <Image src="/Display-Picture.svg" alt="" width={28} height={28} />
            </button>
            <Image src="/arrow.svg" alt="" width={16} height={16} />
          </div>
        </div>

        {renderMainContent()}
      </main>
    </div>
  );
}
