"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CountUp from 'react-countup';
import ProjectDropdown from "./ProjectDropdown";
import AfterSubmitProjectTable from "./(Projects Tables)/AfterSubmitProjectTable";
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export default function CompanyAdminContent() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [onGoingProjects, setOnGoingProjects] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [, setLoading] = useState(true);

  const fetchCompanyStats = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(getApiUrl('/users/customer-admin/stats'), {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (response.ok) {
        const data = await response.json();
        const totalProjectsValue =
          data.totalCompanyProjects ??
          data.totalProjects ??
          data.total ??
          (data.projects?.length || data.data?.length || 0);
        setTotalProjects(typeof totalProjectsValue === 'number' ? totalProjectsValue : 0);

        const ongoingCount =
          data.onGoingProjects ??
          data.activeProjects ??
          0;
        if (typeof ongoingCount === 'number') {
          setOnGoingProjects(ongoingCount);
        } else {
          setOnGoingProjects(0);
        }
        const totalUsersValue =
          data.totalCompanyUsers ??
          data.totalUsers ??
          data.total ??
          (data.users?.length || data.data?.length || 0);
        setTotalUsers(typeof totalUsersValue === 'number' ? totalUsersValue : 0);
      }
    } catch (error) {
      console.error('Error fetching company stats:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCompanyStats();
      setLoading(false);
    };

    fetchData();
  }, [setLoading]);

  const statsData = [
    { title: "Total Projects", value: totalProjects, icon: "/sv1.svg" },
    { title: "On Going Projects", value: onGoingProjects, icon: "/sv2.svg" },
    { title: "Total Users", value: totalUsers, icon: "/sv3.svg"},
    { title: "Token Left", value: 10, icon: "/sv4.svg" },
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
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.title === "Total Projects" || stat.title === "Total Users" ? (
                    <>
                      <CountUp
                        end={Number(stat.value) || 0}
                        duration={2.5}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </>
                  ) : (
                    stat.value
                  )}
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
