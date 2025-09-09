"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CompanyAdminLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const sidebarItems = [
    { name: 'Dashboard', href: '/company-admin', icon: '/Module-Icons/home.svg', activeIcon: '/Module-Icons/home-b.svg' },
    { name: 'Manage Projects', href: '/company-admin/manage-projects', icon: '/Module-Icons/manage-p.svg', activeIcon: '/Module-Icons/manage-projects.svg' },
    { name: 'Manage Users', href: '/company-admin/manage-users', icon: '/Module-Icons/manage-u.svg', activeIcon: '/Module-Icons/manage-users.svg' },
    { name: 'Manage Profile', href: '/company-admin/manage-profile', icon: '/Module-Icons/manage-a.svg', activeIcon: '/Module-Icons/manage-assets.svg' },
    { name: 'Settings', href: '/company-admin/settings', icon: '/Module-Icons/settings.svg', activeIcon: '/Module-Icons/settings.svg' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-[#343A40] text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
        <div className="p-4">
          <div className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}>
            <div className="flex items-center">
              {isSidebarCollapsed ? (
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    <span className="text-black">A</span>
                    <span className="text-red-500">M</span>
                    <span className="text-red-500">I</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Image src="/AMILogo.svg" alt="AMI Logo" width={169} height={30} />
                </div>
              )}
            </div>
            <div className="relative group">
              <button onClick={toggleSidebar} className="text-gray-500 cursor-pointer hover:text-[#E9E9E9]">
                {isSidebarCollapsed ? (
                  <Image src="/closeSidebar.svg" alt="Close sidebar" width={24} height={24} />
                ) : (
                  <Image src="/sidebar-left.svg" alt="Open sidebar" width={24} height={24} />
                )}
              </button>
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                {isSidebarCollapsed ? "Close sidebar" : "Open sidebar"}
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Image
                      src={isActive ? item.activeIcon : item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="mr-3"
                    />
                    {!isSidebarCollapsed && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Create New Project Button */}
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create New Project</span>
              </button>

              {/* Notification Bell */}
              <button className="relative text-gray-600 hover:text-gray-800">
                <Image src="/notification-bell.svg" alt="" width={20} height={20} style={{ width: "auto", height: "auto" }} />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center space-x-2">
                <button className="relative text-gray-600 hover:text-gray-800">
                  <Image src="/Display-Picture.svg" alt="" width={28} height={28} style={{ width: "auto", height: "auto" }} />
                </button>
                <Image src="/arrow.svg" alt="" width={16} height={16} style={{ width: "auto", height: "auto" }} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
