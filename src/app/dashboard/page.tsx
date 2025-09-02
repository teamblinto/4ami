"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ManageUsers from '../components/ManageUsers';
import ManageAssets from '../components/ManageAssets';

export default function DashboardPage() {
  const [activeContent, setActiveContent] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderMainContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return (
          <>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600 mb-6">Good Morning, John! Here's a quick overview of your platform's activity</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Pending Requests</div>
                  <div className="text-2xl font-bold">10</div>
                  <div className="text-xs text-gray-400">Requests awaiting approval</div>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Users</div>
                  <div className="text-2xl font-bold">52</div>
                  <div className="text-xs text-green-500">↑ 12.5% from last month</div>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Open Projects</div>
                  <div className="text-2xl font-bold">20</div>
                  <div className="text-xs text-gray-400">Services currently enabled</div>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1H7zM7 7a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1H7zM7 11a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1H7zM7 15a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1H7zM11 3a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM11 7a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1h-2zM11 11a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2zM11 15a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2zM15 3a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM15 7a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Sales by Service</div>
                  <div className="text-2xl font-bold">30</div>
                  <div className="text-xs text-red-500">↓ 1.5% from last month</div>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Select Responsible Party */}
            <div className="mb-6">
              <label htmlFor="responsibleParty" className="block text-gray-700 text-sm font-bold mb-2">
                Select Responsible Party
              </label>
              <div className="relative">
                <select
                  id="responsibleParty"
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Select a party</option>
                  <option>Party A</option>
                  <option>Party B</option>
                  <option>Party C</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Recent Activity and Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Recent Activity</h3>
                  <Link href="#" className="text-red-500 hover:underline text-sm">View All</Link>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Emma Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Created new analysis report</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28 April, 2025</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Updated service pricing</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18 April, 2025</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">David Chen</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Added new role permissions</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 April, 2025</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sarah Wilson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Created new user account</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 April, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <ul>
                  <li className="mb-3">
                    <button onClick={() => setActiveContent('manage-users')} className="w-full flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Add New Client</div>
                        <div className="text-sm text-gray-500">Send an Invitation</div>
                      </div>
                    </button>
                  </li>
                  <li className="mb-3">
                    <Link href="#" className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Add New Project</div>
                        <div className="text-sm text-gray-500">Create a new service offering</div>
                      </div>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="#" className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Create a Report</div>
                        <div className="text-sm text-gray-500">Text need to change</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="flex items-center p-3 bg-red-50 rounded-md hover:bg-red-100">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="font-semibold text-red-600">Add New</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        );
      case 'manage-users':
        return <ManageUsers />;
      case 'manage-assets':
        return <ManageAssets />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className={`p-4 border-b flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center">
              <Image src="/next.svg" alt="AMI Logo" width={100} height={40} /> {/* Replace with actual AMI logo */}
              <span className="ml-2 text-lg font-semibold">ASSET MANAGEMENT</span>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <nav className="flex-grow p-4">
          <ul>
            <li className="mb-2">
              <button onClick={() => setActiveContent('dashboard')} className={`flex items-center p-2 w-full text-left ${activeContent === 'dashboard' ? 'text-red-600 bg-red-100' : 'text-gray-700 hover:bg-gray-100'} rounded-md`}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li className="mb-2">
              <Link href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
                {!isSidebarCollapsed && <span className="ml-3">Manage Services</span>}
              </Link>
            </li>
            <li className="mb-2">
              <button onClick={() => setActiveContent('manage-users')} className={`flex items-center p-2 w-full text-left ${activeContent === 'manage-users' ? 'text-red-600 bg-red-100' : 'text-gray-700 hover:bg-gray-100'} rounded-md`}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                {!isSidebarCollapsed && <span className="ml-3">Manage Users</span>}
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => setActiveContent('manage-assets')} className={`flex items-center p-2 w-full text-left ${activeContent === 'manage-assets' ? 'text-red-600 bg-red-100' : 'text-gray-700 hover:bg-gray-100'} rounded-md`}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1H7zM7 7a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1H7zM7 11a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1H7zM7 15a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2zM11 3a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM11 7a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1h-2zM11 11a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2zM11 15a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2zM15 3a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM15 7a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1h-2z" />
                </svg>
                {!isSidebarCollapsed && <span className="ml-3">Manage Assets</span>}
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Link href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.16-1.47-1.16-1.85 0L9 6.17a1 1 0 00-.7.3l-2.83 2.83a1 1 0 00-.3.7l-2.83 2.83c-.38 1.16.7 2.25 1.85 1.85l2.83-.3a1 1 0 00.7-.3l2.83-2.83a1 1 0 00.3-.7l.3-2.83c.38-1.16-1.47-1.16-1.85 0z" clipRule="evenodd" />
            </svg>
            {!isSidebarCollapsed && <span className="ml-3">Settings</span>}
          </Link>
        </div>
        <div className={`p-4 border-t flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center">
            <Image src="/next.svg" alt="User Avatar" width={32} height={32} className="rounded-full" /> {/* Replace with actual user avatar */}
            {!isSidebarCollapsed && (
              <div className="ml-2">
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
            )}
          </div>
          {!isSidebarCollapsed && (
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <button className="relative text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <Image src="/next.svg" alt="User Avatar" width={32} height={32} className="rounded-full" /> {/* Replace with actual user avatar */}
          </div>
        </div>

        {renderMainContent()}
      </main>
    </div>
  );
}
