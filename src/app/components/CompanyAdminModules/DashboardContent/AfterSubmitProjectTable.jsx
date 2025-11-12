"use client";

import { useEffect, useState } from "react";
import AddFilterDropDown from "./AddFilterDropDown";
import { getApiUrl, getAuthHeaders } from "@/lib/config";
import Link from "next/link";


export default function AfterSubmitProjectTable() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    active: "bg-red-100 text-red-800",
    approved: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-800",
    completed: "bg-blue-100 text-blue-800",
  };

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return "N/A";
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : undefined;

        const url = getApiUrl(`/projects?page=1&limit=3`);
        const response = await fetch(url, {
          method: "GET",
          headers: getAuthHeaders(authToken || undefined),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setProjects((result && result.projects) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-[0_6px_25px_0_rgba(219,220,222,0.20)] p-4">
      <h1 className="text-lg font-semibold mb-4 text-[#080607] ">Projects</h1>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <select className="border border-gray-300 text-black rounded-lg px-4 py-2 text-sm">
          <option>Project ID All</option>
          {projects.slice(0, 3).map((p) => (
            <option key={p.id}>{p.projectNumber || p.id}</option>
          ))}
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black ">
          <option>Status All</option>
          <option>pending</option>
          <option>active</option>
          <option>approved</option>
          <option>cancelled</option>
          <option>completed</option>
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
                <rect width="10" height="10" fill="white" transform="translate(0.295898)" />
              </clipPath>
            </defs>
          </svg>

          <AddFilterDropDown />

        </div>


        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-red-500">
          <option>Clear Filter</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white">
        {loading ? (
          <div className="text-center py-6 text-gray-600">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-6 text-red-600 text-sm">{error}</div>
        ) : (
          <table className="w-full text-sm text-left border border-gray-200 text-black">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Project ID</span>
                  </div>
                </th>
                <th className="px-4 py-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Project Name</span>

                  </div>
                </th>
                <th className="px-4 py-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Submit Date</span>
                  </div>
                </th>
                <th className="px-4 py-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 3).map((p, i) => {
                const type = (p.metadata && p.metadata.category) || p.projectTypeId || "N/A";
                const time = `${formatDate(p.startDate)} - ${p.endDate ? formatDate(p.endDate) : "—"}`;
                const status = (p.status || "").toLowerCase();
                return (
                  <tr
                    key={p.id || i}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer">{p.projectNumber || p.id}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer">{p.name}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer">{p.submitDate ? new Date(p.submitDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>


      {/* Footer Link */}
      <div className="mt-3 text-right">

        <Link href="/company-admin/manage-projects" className="text-[#ED272C]  text-sm font-medium">
          View All Projects
        </Link>


      </div>
    </div>
  );
}
