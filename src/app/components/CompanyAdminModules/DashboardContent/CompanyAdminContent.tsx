"use client";

import React from "react";
import Image from "next/image";
import ProjectDropdown from "./ProjectDropdown";
import AfterSubmitProjectTable from "./AfterSubmitProjectTable";

export default function CompanyAdminContent() {
  const statsData = [
    { title: "Total Projects", value: "0", icon: "/sv1.svg" },
    { title: "On Going Projects", value: "0", icon: "/sv2.svg" },
    { title: "Total Users", value: "0", icon: "/sv3.svg", hasDropdown: true },
    { title: "Token Left", value: "10", icon: "/sv4.svg" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}

      <div>
        <h1 className="font-medium text-[#343A40] text-2xl">Dashboard</h1>
        <p className="text-[#6C757D] mt-2 font-normal ">
          👋Welcome to your dashboard Michael, let’s get started
        </p>
      </div>

      {/* Create New Project Button */}
      <div className="flex justify-end">
        <ProjectDropdown />
        {/* <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2">

        </button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-medium text-[#6C757D]">
                    {stat.title}
                  </p>
                  {stat.hasDropdown && (
                    <Image
                      className="ml-3"
                      src="/arrow.svg"
                      alt="dropdown"
                      width={12}
                      height={12}
                      style={{ width: "auto", height: "auto" }}
                    />
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div>
                <Image
                  src={stat.icon}
                  alt={stat.title}
                  width={24}
                  height={24}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="mb-6 mt-6">
        <h2 className="text-lg font-semibold text-[#080607] mb-6 text-left">
          Projects
        </h2>
        <div className="bg-white rounded-lg shadow-[0_6px_25px_0_rgba(219,220,222,0.20)] text-center flex flex-col items-center self-stretch pt-[75px] pb-[75px] gap-[21px]">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Image
              src="/majesticons_plus-line.svg"
              alt="majesticons_plus-line"
              width={80}
              height={80}
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-[#6C757D] text-[14px] font-medium text-center mt-3">
              Start by creating your first project
            </p>
          </div>
        </div>
      </div>
      <AfterSubmitProjectTable />

      {/* Bottom Sections */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-[0_6px_25px_0_rgba(219,220,222,0.20)] flex flex-col justify-center p-5 gap-2 flex-shrink-0 h-[386px]">
          <h2 className="text-lg font-semibold text-[#080607] ">Coming Soon</h2>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Image
              src="/ComingSoon.svg"
              alt="majesticons_plus-line"
              width={80}
              height={80}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        {/* Popular Services by Category */}
        <div className="bg-white rounded-lg shadow-[0_6px_25px_0_rgba(219,220,222,0.20)] flex flex-col justify-center p-5 gap-2 flex-shrink-0 h-[386px]">
          <h2 className="text-lg font-semibold text-[#080607] ">
            Popular Services by Category
          </h2>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div>
              <Image
                src="/pie-chart.svg"
                alt="/pie-chart"
                width={80}
                height={80}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <p className="text-[#ADB5BD] text-[12px] w-[320px] text-center mt-[27px]">
              Popular services by category distribution pie chart/bar graph will
              appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
