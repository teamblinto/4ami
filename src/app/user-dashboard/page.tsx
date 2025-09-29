"use client";

import React from "react";
import Image from "next/image";

export default function UserDashboardPage() {
  const statsData = [
    { title: "Total Projects", value: "0", icon: "/sv1.svg" },
    { title: "In Progress", value: "0", icon: "/sv2.svg" },
    { title: "Token Left", value: "10", icon: "/sv4.svg" },
  ];

  return (
    <div>
      {/* Welcome Section */}
<div>
      <div
        className="flex justify-between items-center "
   
      >
        <div>
          <h1 className=" font-bold  text-[#343A40] text-2xl ">Dashboard</h1>
          <p className="text-[#6C757D] mt-2">
            👋 Welcome to your dashboard Michael, let’s get started
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center mb-5">
        <button className="bg-red-500 text-white px-8 py-2 cursor-pointer rounded-lg hover:bg-red-600 flex items-center space-x-2 ml-5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Create New Project</span>
        </button>
      </div>
</div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-[0_6px_25px_0_rgba(219,220,222,0.20)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#6C757D]">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div>
                <Image
                  src={stat.icon}
                  alt={stat.title}
                  width={40}
                  height={40}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 text-center mb-11">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-left">
          Projects
        </h2>
        <div className="flex flex-col items-center justify-center py-16">
          <button className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <p className="text-gray-600">Start by creating your first project</p>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Coming Soon
          </h2>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded w-24"></div>
              <div className="h-2 bg-gray-200 rounded w-20"></div>
              <div className="h-2 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>

        {/* Popular Services by Category */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Popular Services by Category
          </h2>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-center text-sm">
              Popular services by category distribution pie chart/bar graph will
              appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
