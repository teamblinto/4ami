"use client";

import { useEffect, useState } from "react";
import AddFilterDropDown from "../components/CompanyAdminModules/DashboardContent/AddFilterDropDown";
import UserFilterDropdown from "../user-dashboard/UserFilterDropdown";
import UserFilterProjectStatus from "../user-dashboard/UserFilterProjectStatus";
import { useRouter } from "next/navigation";
import { getApiUrl, getAuthHeaders } from "@/lib/config";
import { ShimmerEffect } from "@/app/Animations/shimmereffect";

export default function AfterSubmitProjectTable() {
  const router = useRouter();
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : undefined;

        // Fetch all projects for the user using /projects/user/projects
        const url = getApiUrl(`/projects/user/projects`);
        console.log('[UserAfterSubmitProjectTable] Fetching projects from:', url);
        
        const response = await fetch(url, {
          method: "GET",
          headers: getAuthHeaders(authToken || undefined),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('[UserAfterSubmitProjectTable] Projects data received:', result);
        
        // Handle response - could be array or object with projects array
        let projectsList = [];
        if (Array.isArray(result)) {
          projectsList = result;
        } else if (result.projects && Array.isArray(result.projects)) {
          projectsList = result.projects;
        } else if (result.data && Array.isArray(result.data)) {
          projectsList = result.data;
        }
        
        setProjects(projectsList);
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
      <h2 className="text-lg font-semibold text-[#080607] mb-6 text-left">Projects</h2>
      {/* Table */}
      <div className="overflow-x-auto bg-white">
        <table className="w-full text-sm text-left border border-gray-200 text-black">
          <thead className="bg-gray-50">
            <tr >
              <th className="px-6 py-2 w-[160px]  border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Project ID</span>
                </div>
              </th>
              <th className="px-6 py-2  w-[200px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Asset Class</span>
                </div>
              </th>
              <th className="px-6 py-2  w-[200px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Start Date</span>
                </div>
              </th>
              <th className="px-6 py-2  w-[200px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <span>Submit Date</span>
                </div>
              </th>
              <th className="px-6 py-2  w-[200px] border border-gray-200">
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
                    <td colSpan={5} className="px-4 py-4 align-middle border border-gray-200" style={{ height: '64px' }}>
                      <ShimmerEffect className="h-5 w-full" />
                    </td>
                  </tr>
                ))}
              </>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-red-600 text-sm border border-gray-200">
                  {error}
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500 border border-gray-200">
                  No projects found
                </td>
              </tr>
            ) : (
              projects.slice(0, 3).map((project, i) => {
              
                const statusKey = (project.status || "").toLowerCase();
                return (
                  <tr
                    key={project.id || i}
                    className="odd:bg-white even:bg-gray-50"
                    style={{ height: '64px' }}
                  >
                    
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>{project.projectNumber || project.id}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>
                      {project.equipments && project.equipments.length > 0 
                        ? project.equipments[0]?.assetClass || 'N/A'
                        : project.metadata?.category || 'N/A'}
                    </td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>{new Date(project.startDate).toLocaleDateString()}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>{project.submitDate ? new Date(project.submitDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-4 py-4 border border-gray-200 cursor-pointer align-middle" style={{ height: '64px' }}>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[statusKey] || 'bg-gray-100 text-gray-800'}`}>{project.status}</span>
                    </td>
                  </tr>
                );
              })
            )}
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
