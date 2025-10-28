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

  // Fetch projects data
  const fetchProjects = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(getApiUrl('/projects'), {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (response.ok) {
        const data = await response.json();
        const projects = data.projects || data.data || [];
        setTotalProjects(projects.length);
        
        // Count ongoing projects (active status)
        const ongoingCount = projects.filter((project) => 
          project.status === 'active' || project.status === 'in_progress'
        ).length;
        setOnGoingProjects(ongoingCount);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Fetch users data
  const fetchUsers = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(getApiUrl('/users'), {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (response.ok) {
        const data = await response.json();
        const users = data.users || data.data || [];
        setTotalUsers(users.length);
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
  }, []);

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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
      👋 Welcome to your dashboard <span className="italic">Michael, let's get started</span>
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
                    <Image src="/arrow.svg" alt="dropdown" width={12} height={12} style={{ width: "auto", height: "auto" }} />
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.title === "Total Projects" || stat.title === "Total Users" ? (
                    <CountUp
                      end={Number(stat.value)}
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

      {/* Projects Section */}
      <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Projects</h2>
      {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <svg
              className="w-8 h-8 text-red-500"
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
          </div>
          <p className="text-[#6C757D] text-lg">
            Start by creating your first project
          </p>
        </div>
      </div> */}
      <AfterSubmitProjectTable />

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Coming Soon
          </h2>
          <div className="flex flex-col items-center justify-center pt-18 pb-8">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <svg width="122" height="148" viewBox="0 0 122 148" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M108.487 96.1641H12.8792C11.236 96.1641 9.90381 97.4962 9.90381 99.1394C9.90381 100.783 11.236 102.115 12.8792 102.115H108.487C110.131 102.115 111.463 100.783 111.463 99.1394C111.463 97.4962 110.131 96.1641 108.487 96.1641Z" fill="#CED4DA"/>
              <path d="M19.0286 46.5742C17.3854 46.5742 16.0532 47.9064 16.0532 49.5496V85.2539C16.0532 86.8971 17.3854 88.2293 19.0286 88.2293C20.6718 88.2293 22.0039 86.8971 22.0039 85.2539V49.5496C22.0039 47.9064 20.6718 46.5742 19.0286 46.5742Z" fill="#CED4DA"/>
              <path d="M30.93 58.4766C29.2868 58.4766 27.9546 59.8087 27.9546 61.4519V85.2548C27.9546 86.898 29.2868 88.2302 30.93 88.2302C32.5731 88.2302 33.9053 86.898 33.9053 85.2548V61.4519C33.9053 59.8087 32.5731 58.4766 30.93 58.4766Z" fill="#CED4DA"/>
              <path d="M42.8313 66.4102C41.1881 66.4102 39.856 67.7423 39.856 69.3855V85.2541C39.856 86.8973 41.1881 88.2295 42.8313 88.2295C44.4745 88.2295 45.8067 86.8973 45.8067 85.2541V69.3855C45.8067 67.7423 44.4745 66.4102 42.8313 66.4102Z" fill="#CED4DA"/>
              <path d="M54.7327 66.4102C53.0895 66.4102 51.7573 67.7423 51.7573 69.3855V85.2541C51.7573 86.8973 53.0895 88.2295 54.7327 88.2295C56.3759 88.2295 57.708 86.8973 57.708 85.2541V69.3855C57.708 67.7423 56.3759 66.4102 54.7327 66.4102Z" fill="#CED4DA"/>
              <path d="M66.6341 52.5254C64.9909 52.5254 63.6587 53.8576 63.6587 55.5008V85.2544C63.6587 86.8976 64.9909 88.2297 66.6341 88.2297C68.2772 88.2297 69.6094 86.8976 69.6094 85.2544V55.5008C69.6094 53.8576 68.2772 52.5254 66.6341 52.5254Z" fill="#CED4DA"/>
              <path d="M78.5359 38.6406C76.8927 38.6406 75.5605 39.9728 75.5605 41.616V85.2546C75.5605 86.8978 76.8927 88.23 78.5359 88.23C80.1791 88.23 81.5113 86.8978 81.5113 85.2546V41.616C81.5113 39.9728 80.1791 38.6406 78.5359 38.6406Z" fill="#CED4DA"/>
              <path d="M90.4373 52.5254C88.7941 52.5254 87.4619 53.8576 87.4619 55.5008V85.2544C87.4619 86.8976 88.7941 88.2297 90.4373 88.2297C92.0805 88.2297 93.4126 86.8976 93.4126 85.2544V55.5008C93.4126 53.8576 92.0805 52.5254 90.4373 52.5254Z" fill="#CED4DA"/>
              <path d="M102.339 26.7383C100.695 26.7383 99.3633 28.0704 99.3633 29.7136V85.2537C99.3633 86.8969 100.695 88.2291 102.339 88.2291C103.982 88.2291 105.314 86.8969 105.314 85.2537V29.7136C105.314 28.0704 103.982 26.7383 102.339 26.7383Z" fill="#CED4DA"/>
              <path d="M60.6836 30.3092H45.8068V15.4324C45.8068 13.7892 44.4746 12.457 42.8314 12.457C31.3471 12.457 22.0039 21.8003 22.0039 33.2846C22.0039 44.7689 31.3471 54.1121 42.8314 54.1121C54.3157 54.1121 63.659 44.7689 63.659 33.2846C63.659 31.6414 62.3268 30.3092 60.6836 30.3092Z" fill="#CED4DA"/>
              <path d="M54.7327 0.556641C53.0895 0.556641 51.7573 1.88881 51.7573 3.532V21.3842C51.7573 23.0274 53.0895 24.3595 54.7327 24.3595H72.5849C74.2281 24.3595 75.5602 23.0274 75.5602 21.3842C75.5602 9.89987 66.217 0.556641 54.7327 0.556641Z" fill="#CED4DA"/>
              <path d="M108.487 129.197H12.8787C11.2355 129.197 9.90332 130.529 9.90332 132.173C9.90332 133.816 11.2355 135.148 12.8787 135.148H108.487C110.13 135.148 111.462 133.816 111.462 132.173C111.462 130.529 110.13 129.197 108.487 129.197Z" fill="#CED4DA"/>
              <path d="M117.65 141.918H3.71654C1.7584 141.918 0.170898 143.244 0.170898 144.88C0.170898 146.516 1.7584 147.842 3.71654 147.842H117.65C119.608 147.842 121.195 146.516 121.195 144.88C121.195 143.244 119.608 141.918 117.65 141.918Z" fill="#CED4DA"/>
              </svg>

            </div>
          </div>
        </div>

        {/* Popular Services by Category */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Popular Services by Category
          </h2>
          <div className="flex flex-col items-center justify-center pt-18 pb-8">
            <div className="w-16 h-16 flex items-center justify-center mb-4">
              <svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1630_5224)">
              <path d="M86.9177 54.9104H50.9663C49.4927 54.9104 48.2978 53.7155 48.2978 52.2419V15.883C48.2978 14.2336 46.9671 12.8817 45.3177 12.8809C20.5159 12.8691 0.329363 33.0082 0.264317 57.7922C0.199072 82.6422 20.4459 102.944 45.2959 102.944C70.1278 102.944 90.3273 82.7443 90.3273 57.9125V57.8568C90.3243 56.0568 88.6504 54.6466 86.9177 54.9104Z" fill="#CED4DA"/>
              <path d="M57.7043 0.472656C56.0449 0.472656 54.7021 1.8154 54.7021 3.47476V45.5043C54.7021 47.1636 56.0449 48.5064 57.7043 48.5064H99.7337C101.393 48.5064 102.736 47.1636 102.736 45.5043C102.736 20.6724 82.5361 0.472656 57.7043 0.472656Z" fill="#CED4DA"/>
              </g>
              <defs>
              <clipPath id="clip0_1630_5224">
              <rect width="102.472" height="102.472" fill="white" transform="translate(0.26416 0.472656)"/>
              </clipPath>
              </defs>
              </svg>

            </div>
            <p className="text-[#ADB5BD] text-center text-sm">
              Popular services by category distribution pie chart/bar graph <br/>
              will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
