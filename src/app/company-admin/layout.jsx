"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContext";
import ProtectedRoute from "../components/ProtectedRoute";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function CompanyAdminLayout({
  children,
}) {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const isActive = (path) => {
    if (path === "/company-admin") {
      return pathname === "/company-admin";
    }
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
     toast.success('Logged out successfully',{
       position: 'top-center',
       icon: null,
       style: {
         background: 'black',
         color: 'white',
         borderRadius: '4px',
         
       }
     })
    router.push('/login');
  };

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        setUserData(JSON.parse(userDataString));
      } catch {}
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <ProtectedRoute requiredRole="CUSTOMER_ADMIN">
      <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white flex flex-col gap-[222px] transition-all duration-300 min-h-screen dashboard-sidebar ${
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
                  src="/AMILogo.svg"
                  alt="AMI Logo"
                  width={169}
                  height={30}
                />
              </div>
            )}
            <div className="relative group">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 cursor-pointer hover:text-[#E9E9E9]"
              >
                {isSidebarCollapsed ? (
                  <Image src="/closeSidebar.svg" alt="Close sidebar" width={24} height={24} />
                ) : (
                  <Image src="/sidebar-left.svg" alt="Open sidebar" width={24} height={24} />
                )}
              </button>
              
              {/* Hover tooltip */}
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                {isSidebarCollapsed ? "Open sidebar" : "Close sidebar"}
              </div>
            </div>
            
          </div>

          <nav className="flex-grow p-3 ">
            <ul>
              <li className="mb-2">
                <Link
                  href="/company-admin"
                  className={`flex cursor-pointer items-center p-2 w-full text-left ${
                    isActive("/company-admin")
                      ? "text-[#FFFFFF] bg-[#ED272C]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {isActive("/company-admin") ? (
                    <Image src="/Module-Icons/home.svg" alt="dashboard" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/home-b.svg" alt="dashboard" width={20} height={20} />
                  )}

                  {!isSidebarCollapsed && (
                    <span className="ml-3">Dashboard</span>
                  )}
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  href="/company-admin/manage-projects"
                  className={`flex cursor-pointer items-center p-2 w-full text-left ${
                    isActive("/company-admin/manage-projects")
                      ? "bg-[#ED272C] text-[#FFFFFF]"
                      : "text-[#080607] hover:bg-gray-100"
                  }`}
                >
                  {isActive("/company-admin/manage-projects") ? (
                    <Image src="/Module-Icons/manage-p.svg" alt="manage-projects" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/manage-projects.svg" alt="manage-projects" width={20} height={20} />
                  )}

                  {!isSidebarCollapsed && (
                    <span className="ml-3">Manage Projects</span>
                  )}
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  href="/company-admin/manage-users"
                  className={`flex cursor-pointer items-center p-2 w-full text-left ${
                    isActive("/company-admin/manage-users")
                      ? "bg-[#ED272C] text-[#FFFFFF]"
                      : "text-[#080607] hover:bg-gray-100"
                  }`}
                >
                  {isActive("/company-admin/manage-users") ? (
                    <Image src="/Module-Icons/manage-u.svg" alt="Active Manage Users" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/manage-users.svg" alt="Manage Users" width={20} height={20} />
                  )}

                  {!isSidebarCollapsed && (
                    <span className="ml-3">Manage Users</span>
                  )}
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  href="/company-admin/manage-profile"
                  className={`flex cursor-pointer items-center p-2 w-full text-left ${
                    isActive("/company-admin/manage-profile")
                      ? "bg-[#ED272C] text-[#FFFFFF]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {isActive("/company-admin/manage-profile") ? (
                    <Image src="/Module-Icons/manage-a.svg" alt="Active Manage Profile" width={20} height={20} />
                  ) : (
                    <Image src="/Module-Icons/manage-assets.svg" alt="Manage Profile" width={20} height={20} />
                  )}

                  {!isSidebarCollapsed && (
                    <span className="ml-3">Manage Profile</span>
                  )}
                </Link>
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
          </button>
            <Image src="/notification-bell.svg" alt="Notifications" width={20} height={20} style={{ width: "auto", height: "auto" }} />

          {/* User Profile Dropdown */}
          <div className="relative dropdown-container">
            <button 
              onClick={toggleDropdown}
              className="relative  flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-800"
              title="User Menu"
            >
            <Image src="/Display-Picture.svg" alt="User Profile" width={28} height={28} style={{ width: "auto", height: "auto" }} />
              {isDropdownOpen ? (
                <Image src="/arrow-up.svg"  alt="Close dropdown" width={16} height={16} style={{ width: "auto", height: "auto" }} />
              ) : (
                <Image src="/arrow.svg"  alt="Open dropdown" width={16} height={16} style={{ width: "auto", height: "auto" }} />
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Image src="/Display-Picture.svg" alt="User Profile" width={40} height={40} style={{ width: "auto", height: "auto" }} />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {userData?.firstName && userData?.lastName 
                          ? `${userData.firstName} ${userData.lastName}` 
                          : 'John Doe'}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {userData?.email || 'johndoe@gmail.com'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="w-full cursor-pointer px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View profile
                  </button>
                  <button className="w-full cursor-pointer px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756.426-1.756 2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 cursor-pointer py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>

        {children}
      </main>
    </div>
    </ProtectedRoute>
  );
}
