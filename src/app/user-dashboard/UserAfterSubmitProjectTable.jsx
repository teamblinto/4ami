"use client";

import { useState } from "react";
import AddFilterDropDown from "../components/CompanyAdminModules/DashboardContent/AddFilterDropDown";
import UserFilterDropdown from "../user-dashboard/UserFilterDropdown";
import UserFilterProjectStatus from "../user-dashboard/UserFilterProjectStatus";
import { useRouter } from "next/navigation";

export default function AfterSubmitProjectTable() {
  const router = useRouter();
  const [projects] = useState([
    {
      id: "P101",
      type: "Residual Analysis",
      time: "12 June - 25 June",
      status: "Completed",
    },
    {
      id: "P101",
      type: "Comparative Analysis",
      time: "11 June - 22 June",
      status: "Completed",
    },
    {
      id: "P101",
      type: "Transportation Quotation",
      time: "25 July - 12 August",
      status: "In Process",
    },
  ]);

  const statusColors = {
    Completed: "bg-red-100 text-red-600",
    "In Process": "bg-gray-200 text-gray-700",
  };

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <select className="border border-gray-300 text-black rounded-lg px-4 py-2 text-sm">
          <option>Project ID All</option>
          <option>P101</option>
          <option>P102</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black ">
          <option>Status All</option>
          <option>Completed</option>
          <option>In Process</option>
        </select>

        <div className="relative inline-flex items-center">
          {/* Icon */}
          <svg
            className="absolute left-1 w-4 h-4 text-red-500 pointer-events-none"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3122_5489)">
              <path
                d="M3.95396 4.9359C4.11109 5.16328 4.06412 4.97381 4.06412 9.50615C4.06412 9.91174 4.52686 10.1439 4.85299 9.90127C6.2466 8.85055 6.52504 8.75955 6.52504 8.26809C6.52504 4.96527 6.48654 5.15102 6.63519 4.9359L8.89826 1.85547H1.69092L3.95396 4.9359Z"
                fill="#ED272C"
              />
              <path
                d="M9.7533 0.251172C9.67244 0.0962891 9.51385 0 9.33926 0H1.25027C0.873223 0 0.651367 0.425332 0.867656 0.734375C0.869434 0.737344 0.843105 0.701309 1.26063 1.26953H9.32889C9.68469 0.785293 9.92252 0.576074 9.7533 0.251172Z"
                fill="#ED272C"
              />
            </g>
            <defs>
              <clipPath id="clip0_3122_5489">
                <rect
                  width="10"
                  height="10"
                  fill="white"
                  transform="translate(0.295898)"
                />
              </clipPath>
            </defs>
          </svg>

          <AddFilterDropDown />

          {/* <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-red-500">
          
          <option>Add Filter</option>
          <option><AddFilterDropDown /></option>
        </select> */}
        </div>

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-red-500">
          <option>Clear Filter</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white">
        <table className="w-full text-sm text-left border border-gray-200 text-black">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Project ID</span>
                  <img
                    src="/Sort.svg"
                    alt=""
                    className="w-5 h-5 cursor-pointer "
                  />
                </div>
              </th>
              <th className="px-4 py-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Project Type</span>
                  <img
                    src="/Sort.svg"
                    alt=""
                    className="w-5 h-5 cursor-pointer "
                  />
                </div>
              </th>
              <th className="px-4 py-4 border border-gray-200">
                <div className="">
                  <span>
                    <UserFilterDropdown />
                  </span>
                </div>
              </th>
              <th className="px-4 py-4 border border-gray-200">
                <div className="">
                  {/* <span>Status</span> */}
                  <span>
                    <UserFilterProjectStatus />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="px-4 py-4 border border-gray-200 cursor-pointer">
                  {p.id}
                </td>
                <td className="px-4 py-4 border border-gray-200 cursor-pointer">
                  {p.type}
                </td>
                <td className="px-4 py-4 border border-gray-200 cursor-pointer">
                  {p.time}
                </td>
                <td className="px-4 py-4 border border-gray-200 cursor-pointer">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[p.status]
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-right">
        <button
          onClick={() => router.push("/user-dashboard/projects")}
          className="text-red-500 text-sm hover:underline font-medium cursor-pointer mb-2 "
        >
          View All Projects
        </button>
      </div>
    </div>
  );
}
