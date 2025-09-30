"use client";

import React from "react";
import Image from "next/image";
import UserProjectDropdown from "./UserProjectDropdown";
import UserAfterSubmitProjectTable from "./UserAfterSubmitProjectTable";

export default function UserDashboardPage() {
  const statsData = [
    { title: "Total Projects", value: "0", icon: "/sv1.svg" },
    { title: "In Progress", value: "0", icon: "/sv2.svg" },
    { title: "Token Left", value: "10", icon: "/sv4.svg" },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="font-medium text-[#343A40] text-2xl">Dashboard</h1>
          <p className="text-[#6C757D] mt-2 font-normal ">
            👋 Welcome to your dashboard Michael, let’s get started
          </p>
        </div>
      </div>
      <div className="flex justify-end mb-5">
        <UserProjectDropdown />
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
                <p className="text-2xl font-medium text-[#080607] mt-2">
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

      <div>
        <UserAfterSubmitProjectTable />
      </div>

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
