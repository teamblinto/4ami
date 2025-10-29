"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CountUp from 'react-countup';
import ProjectDropdown from "./ProjectDropdown";
import AfterSubmitProjectTable from "./AfterSubmitProjectTable";
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export default function CompanyAdminContent() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [onGoingProjects, setOnGoingProjects] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch projects data for this company admin
  const fetchProjects = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      // Get user data to ensure we're filtering by company
      const userDataString = localStorage.getItem('userData');
      let userProfile: Record<string, unknown> = {};

      if (userDataString) {
        try {
          userProfile = JSON.parse(userDataString);
        } catch (e) {
          console.error('Failed to parse userData:', e);
        }
      }

      const userId = userProfile.id as string;
      if (!userId) {
        console.error('User ID not found in user profile');
        return;
      }

      // The backend should automatically filter projects by the authenticated user's company
      const response = await fetch(getApiUrl('/projects'), {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (response.ok) {
        const data = await response.json();
        const projects = data.projects || data.data || [];

        // Filter projects created by this company admin (if needed)
        // The backend should already filter by company, but we can add additional filtering here
        const companyProjects = projects.filter((project: { createdById?: string; companyId?: string }) =>
          project.createdById === userId || project.companyId === userProfile.companyId
        );

        setTotalProjects(companyProjects.length);

        // Count ongoing projects (active status)
        const ongoingCount = companyProjects.filter((project: { status: string }) =>
          project.status === 'active' || project.status === 'in_progress'
        ).length;
        setOnGoingProjects(ongoingCount);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Fetch users data for this company admin
  const fetchUsers = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      // Get user data to ensure we're filtering by company
      const userDataString = localStorage.getItem('userData');
      let userProfile: Record<string, unknown> = {};

      if (userDataString) {
        try {
          userProfile = JSON.parse(userDataString);
        } catch (e) {
          console.error('Failed to parse userData:', e);
        }
      }

      const response = await fetch(getApiUrl('/users'), {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (response.ok) {
        const data = await response.json();
        const users = data.users || data.data || [];

        // Filter users by role (Customer User role only) and by company
        // The backend should already filter by company, but we can add additional filtering here
        const filteredUsers = users.filter((user: { role?: string; companyId?: string; invitedBy?: string }) => {
          const userRole = user.role?.toLowerCase();
          const isCustomerUser = userRole === 'customer user' ||
            userRole === 'customer_user' ||
            userRole === 'customer' ||
            userRole === 'user';

          // Additional company filtering if needed
          const isFromSameCompany = !userProfile.companyId || user.companyId === userProfile.companyId;

          return isCustomerUser && isFromSameCompany;
        });

        setTotalUsers(filteredUsers.length);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProjects(), fetchUsers()]);
      setLoading(false);
    };

    fetchData();
  }, [setLoading]);

  const statsData = [
    { title: "Total Projects", value: totalProjects, icon: "/sv1.svg" },
    { title: "On Going Projects", value: onGoingProjects, icon: "/sv2.svg" },
    { title: "Total Users", value: totalUsers, icon: "/sv3.svg", hasDropdown: true },
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
                  {stat.title === "Total Projects" || stat.title === "Total Users" ? (
                    <CountUp
                      end={stat.value as number}
                      duration={2.5}
                      separator=","
                      enableScrollSpy
                      scrollSpyOnce
                    />
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

      {loading ? (
        <div className="bg-white rounded-lg shadow-[0_6px_25px_0_rgba(219,220,222,0.20)] text-center flex flex-col items-center self-stretch pt-[60px] pb-[60px]">
          <div className="text-[#6C757D] text-[14px]">Loading projects...</div>
        </div>
      ) : totalProjects === 0 ? (
        <div className="bg-white rounded-lg shadow-[0_6px_25px_0_rgba(219,220,222,0.20)] flex flex-col  self-stretch pt:[75px] pb:[75px] gap:[21px]">
          <h1 className="text-lg font-semibold text-start p-4 mb-4 text-[#080607] ">Projects</h1>
          <div className="flex flex-col pb-14  items-center justify-center w-full h-full">

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
      ) : (
        <AfterSubmitProjectTable />
      )}

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
