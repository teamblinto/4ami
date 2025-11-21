"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CountUp from 'react-countup';
import { getApiUrl, getAuthHeaders } from '@/lib/config';
import { ShimmerCard, ShimmerTable } from '@/app/Animations/shimmereffect';



// --- MOCK DATA ---
const getStatsData = (userCount: number) => [
  {
    title: "Pending Requests",
    value: "10",
    change: "Requests awaiting approval",
    changeColor: "text-[#FF8800]",
    icon: "/Dashboard-Icons/survey_2512242 1.svg",
  },
  {
    title: "Users",
    value: userCount.toString(),
    change: "↑ 12.5% from last month",
    changeColor: "text-[#01AF76]",
    icon: "/Dashboard-Icons/survey_2512242 1 (1).svg",
  },
  {
    title: "Ongoing Projects",
    value: "20",
    change: "Services currently enabled",
    changeColor: "text-[#6F7482]",
    icon: "/Dashboard-Icons/survey_2512242 1 (2).svg",
  },
  {
    title: "Completed Project",
    value: "30",
    change: "↑ 5% from last month",
    changeColor: "text-[#01AF76]",
    icon: "/Dashboard-Icons/survey_2512242 1 (3).svg",
  },
];

// Project interfaces
interface Project {
  id: string;
  projectNumber: string;
  name: string;
  description: string;
  status: string;
  submitDate: string;
  startDate: string;
  endDate: string | null;
  metadata: {
    category: string;
    priority: string;
  };
  companyId: string;
  projectTypeId: string;
  projectType?: {
    name: string;
  };
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  company: {
    id: string;
    companyName: string;
  };
  assets: unknown[];
  reports: unknown[];
}

interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

const activityData = [
  {
    user: "Emma Johnson",
    action: "Created new analysis report",
    date: "28 April, 2025",
  },
  {
    user: "John Smith",
    action: "Updated service pricing",
    date: "18 April, 2025",
  },
  {
    user: "David Chen",
    action: "Added new role permissions",
    date: "15 April, 2025",
  },
  {
    user: "Sarah Wilson",
    action: "Created new user account",
    date: "12 April, 2025",
  },
];

const quickActionsData = [
  {
    title: "Add New User",
    subtitle: "Text need to change",
    icon: "/QuickAccess-Icons/Icon Container.svg",
  },
  {
    title: "Generate Test",
    subtitle: "Create a new service offering",
    icon: "/QuickAccess-Icons/Icon Container (1).svg",
  },
  {
    title: "Add New asset",
    subtitle: "",
    icon: "+",
    iconBg: "bg-red-500",
    isIconText: true,
  },
];

// --- HELPER FUNCTIONS & PROPS ---

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: string;
  icon: string;
}

interface QuickAction {
  title: string;
  subtitle: string;
  icon: string;
  iconBg?: string;
  isIconText?: boolean;
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return "text-[#ED272C]";
    case 'pending':
      return "text-[#FF8800]";
    case 'active':
      return "text-[#1890FF]";
    case 'approved':
      return "text-[#52C41A]";
    case 'cancelled':
      return "text-[#8C8C8C]";
    default:
      return "text-[#4B4F58]";
  }
};

const getActionClass = (status: string) => {
  if (status === 'approved' || status === 'cancelled' || status === 'completed') {
    return 'bg-gray-200 text-gray-800';
  }
  return 'bg-red-500 text-white';
};

// --- SUB-COMPONENTS ---

const StatCard = ({
  title,
  value,
  change,
  changeColor,
  icon,
  isAnimated = false,
  endValue = 0,
}: StatCardProps & { isAnimated?: boolean; endValue?: number }) => (
  <div className="bg-[#FFFFFF] py-3 px-[18px] rounded-lg relative" style={{ height: '104px' }}>
    <div className="flex flex-col gap-1 h-full">
      <div className="text-sm font-medium text-[#6C757D] flex items-center" style={{ height: '20px' }}>
        {title}{" "}
        {title === "Pending Requests" && (
          <span className="ml-1 text-xs">
            <Image
              className="pl-2"
              src="/arrow-two.svg"
              alt="arrow"
              width={10}
              height={10}
              style={{ width: "auto", height: "auto" }}
            />
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-[#080607] flex items-center" style={{ height: '36px' }}>
        {isAnimated ? (
          <CountUp
            end={endValue}
            duration={2.5}
            separator=","
            enableScrollSpy
            scrollSpyOnce
          />
        ) : (
          value
        )}
      </div>
      <div className={`text-xs font-regular ${changeColor} flex items-center`} style={{ height: '16px' }}>{change}</div>
    </div>
    <div className={`absolute top-3 right-[18px]`}>
      <Image
        src={icon}
        alt={title}
        width={38}
        height={38}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  </div>
);

const ProjectsTable = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const authToken = localStorage.getItem('authToken');
      const url = getApiUrl(`/projects/user/projects?page=1&limit=3`);

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProjectsResponse = await response.json();
      console.log('Dashboard Projects API Response:', result);
      setProjects(result.projects || []);
    } catch (err) {
      console.error('Error fetching dashboard projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-[#080607] font-semibold">Projects</h3>
        <Link href="/dashboard/manage-projects" className="text-[#ED272C]  text-sm font-medium">
          View All
        </Link>
      </div>
      {/* <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option value="all">Project ID All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option value="all">Status All</option>
          </select>
          <button className="h-8  px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-[5px]">
            <span className="text-[10px]">
              <Image
                src="/filter.svg"
                alt=""
                width={10}
                height={10}
                style={{ width: "auto", height: "auto" }}
              />
            </span>
            Add Filter{" "}
            <span>
              <Image
                src="/arrow-filter.svg"
                alt=""
                width={10}
                height={10}
                style={{ width: "auto", height: "auto" }}
              />
            </span>
          </button>
          <button className="h-8 px-3 border items-center border-gray-300 rounded-md text-xs bg-white text-red-600">
            Clear Filter
          </button>
        </div>
      </div> */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
        <thead className="bg-white">
            <tr>
              {/* <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD] w-12">
                Select
              </th> */}
              <th className="px-6 py-2 text-left w-[150px] text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between gap-1">
                  Project ID
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 w-[200px] text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between gap-1">
                  Project type
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 w-[400px] text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between gap-1">
                  Project Name
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 w-[150px] text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between gap-1">
                  Submit Date
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex w-[120px] items-center justify-between gap-1">
                  Status
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 w-[130px] text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ShimmerTable rows={3} cols={7} />
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-red-500 border border-[#D0D5DD]">
                  Error: {error}
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500 border border-[#D0D5DD]">
                  No projects found
                </td>
              </tr>
            ) : (
              projects.map((project, index) => {
                const isStriped = index % 2 === 0;
                const submissionDate = project.submitDate 
                  ? new Date(project.submitDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })
                  : 'N/A';
                return (
                  <tr
                    key={project.id}
                    className={isStriped ? "bg-gray-50" : "bg-white"}
                    style={{ height: '64px' }}
                  >
                    <td className="px-6 text-[#343A40] font-medium border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      {project.projectNumber || project.id}
                    </td>
                    <td className="px-6  text-[#343A40] border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      {project.projectType?.name || 'N/A'}
                    </td>
                    <td className="px-6  text-[#343A40] font-medium border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      {project.name}
                    </td>
                    <td className="px-6 text-[#343A40] border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      {submissionDate}
                    </td>
                    <td className={`px-6  text-sm font-medium border border-[#D0D5DD] align-middle ${getStatusClass(project.status)}`} style={{ height: '64px' }}>
                      {project.status}
                    </td>
                    <td className="px-6  w-[120px] border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      <button
                        onClick={() => {
                          router.push('/dashboard/manage-projects/project-report');
                        }}
                        className={`px-4 cursor-pointer py-2 rounded-md text-sm font-semibold ${getActionClass(project.status)}`}
                      >
                        {project.status === 'approved' || project.status === 'cancelled' || project.status === 'completed' ? 'View Report' : 'Review'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const RecentActivity = () => (
  <div className="lg:col-span-2 bg-white p-4 rounded-lg">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg text-[#080607] font-semibold">Recent Activity</h3>
      <Link href="#" className="text-[#ED272C] text-sm font-medium">
        View All
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border-separate border-spacing-0 border-t border-[#D0D5DD]">
        <thead>
          <tr className="bg-white">
            <th className="px-6 py-2 text-left text-xs font-medium text-[#6C757D] border-b border-[#D0D5DD] border-l border-r">
              User
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium text-[#6C757D] border-b border-[#D0D5DD] border-r">
              Action
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium text-[#6C757D] border-b border-[#D0D5DD] border-r">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((activity, index) => {
            const isStriped = index % 2 === 0;
            return (
              <tr key={index} className={isStriped ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium border-b border-[#D0D5DD] border-l border-r">
                  {activity.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 border-b border-[#D0D5DD] border-r">
                  {activity.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 border-b border-[#D0D5DD] border-r">
                  {activity.date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
  
);

const QuickActions = () => {
  const router = useRouter();

  const handleActionClick = (actionTitle: string) => {
    if (actionTitle === "Add New User") {
      router.push("/dashboard/manage-users/send-invitation");
    } else if (actionTitle === "Add New asset") {
      router.push("/dashboard/manage-assets/add-asset");
    }
    // Add more actions as needed
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg text-[#080607] font-bold mb-4">Quick Actions</h3>
      <ul className="divide-y divide-gray-200">
        {quickActionsData.map((action: QuickAction, index) => (
          <li key={index}>
            <button
              onClick={() => handleActionClick(action.title)}
              className="w-full flex cursor-pointer items-center py-3 hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${action.iconBg}`}
              >
                {action.isIconText ? (
                  <span className="text-white text-2xl">{action.icon}</span>
                ) : (
                  <Image
                    src={action.icon}
                    alt={action.title}
                    width={37}
                    height={37}
                    style={{ width: "auto", height: "auto" }}
                  />
                )}
              </div>
              <div className="text-left">
                <div
                  className={`font-semibold text-[#080607] ${action.title === "Add New asset" ? "text-red-500" : ""
                    }`}
                >
                  {action.title}
                </div>
                {action.subtitle && (
                  <div className="text-sm text-gray-500">{action.subtitle}</div>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function DashboardContent() {
  const [userCount, setUserCount] = useState<number>(0);
  const [userCountLoading, setUserCountLoading] = useState(true);
  const [, setUserCountError] = useState<string | null>(null);

  // Fetch user count
  const fetchUserCount = async () => {
    try {
      setUserCountLoading(true);
      setUserCountError(null);

      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const url = getApiUrl('/users/dashboard/stats');

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('User stats API Response:', result);

      if (typeof result.totalUsers === 'number') {
        setUserCount(result.totalUsers);
      } else {
        // Fallback for unexpected shapes
        const fallbackTotal = result.total || result.data?.length || result.users?.length || 0;
        setUserCount(fallbackTotal);
      }
    } catch (err) {
      console.error('Error fetching user count:', err);
      setUserCountError(err instanceof Error ? err.message : 'Failed to fetch user count');
      // Set fallback value
      setUserCount(0);
    } finally {
      setUserCountLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  const statsData = getStatsData(userCount);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-[#080607] font-bold">Dashboard</h1>
        <p className="text-[#6C757D]">
          Good Morning, John! Here&apos;s a quick overview of your
          platform&apos;s activity
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {userCountLoading ? (
          // Show shimmer cards while loading - use same grid structure
          Array.from({ length: 4 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))
        ) : (
          statsData.map((stat) => {
            const numericValue = Number(stat.value);
            const isNumeric = !Number.isNaN(numericValue);

            const valueForCard = stat.value;

            const isAnimated =
              (stat.title === "Users") ||
              (stat.title !== "Users" && isNumeric);

            const endValue = stat.title === "Users" ? userCount : (isNumeric ? numericValue : 0);

            return (
              <StatCard
                key={stat.title}
                {...stat}
                value={valueForCard}
                isAnimated={isAnimated}
                endValue={endValue}
              />
            );
          })
        )}
      </div>

      <ProjectsTable />


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}
