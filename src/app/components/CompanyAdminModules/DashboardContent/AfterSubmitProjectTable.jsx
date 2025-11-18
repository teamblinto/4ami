"use client";

import { useEffect, useState } from "react";
import AddFilterDropDown from "./AddFilterDropDown";
import { getApiUrl, getAuthHeaders } from "@/lib/config";
import Link from "next/link";
import { ShimmerEffect } from "@/app/Animations/shimmereffect";


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
  console.log(projects);

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

      {/* Table */}
      <div className="overflow-x-auto bg-white">
        <table className="w-full text-sm text-left border border-gray-200 text-black">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 w-1/7  py-2 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Project ID</span>
                </div>
              </th>
              <th className="px-4 py-2 w-1/3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Project Name</span>

                </div>
              </th>
              <th className="px-4 py-2 w-1/5 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Submit Date</span>
                </div>
              </th>
              <th className="px-4 py-2 w-1/5 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    style={{ height: '64px' }}
                  >
                    <td colSpan={4} className="px-4 py-4 align-middle border border-gray-200" style={{ height: '64px' }}>
                      <ShimmerEffect className="h-5 w-full" />
                    </td>
                  </tr>
                ))}
              </>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-red-600 text-sm border border-gray-200">
                  {error}
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500 border border-[#D0D5DD]">
                  <div className="text-gray-500 text-lg mb-2">No projects found</div>
                  <div className="text-gray-400 text-sm">
                    Start by creating your first project.
                  </div>
                </td>
                
              </tr>
            ) : (
              projects.slice(0, 3).map((p, i) => {
                const type = (p.metadata && p.metadata.category) || p.projectTypeId || "N/A";
                const time = `${formatDate(p.startDate)} - ${p.endDate ? formatDate(p.endDate) : "—"}`;
                const status = (p.status || "").toLowerCase();
                return (
                  <tr
                    key={p.id || i}
                    className="odd:bg-white even:bg-gray-50"
                    style={{ height: '64px' }}
                  >
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>{p.projectNumber || p.id}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>{p.name}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>{p.submitDate ? new Date(p.submitDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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
