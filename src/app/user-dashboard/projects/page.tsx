"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl, getAuthHeaders } from '@/lib/config';
import Image from "next/image";

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

const ProjectsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects for user dashboard
  const fetchProjects = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      const authToken = localStorage.getItem('authToken');

      // Get user data from localStorage
      const userDataString = localStorage.getItem('userData');
      let userProfile: Record<string, unknown> = {};

      if (userDataString) {
        try {
          userProfile = JSON.parse(userDataString);
          console.log('User Data:', userProfile);
        } catch (e) {
          console.error('Failed to parse userData:', e);
        }
      }

      const userId = userProfile.id as string;

      if (!userId) {
        throw new Error('User ID not found in user profile. Please ensure you are logged in.');
      }

      // The backend should filter projects by the authenticated user
      const url = getApiUrl(`/projects?page=${page}&limit=${limit}`);
      console.log('Fetching user projects from:', url);
      console.log('User ID:', userId);

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProjectsResponse = await response.json();
      console.log('User Projects Response:', result);
      setProjects(result.projects || []);
      setTotalItems(result.total || 0);
      setCurrentPage(result.page || 1);
    } catch (err) {
      console.error('Error fetching user projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-medium text-[#343A40] text-2xl">All Projects</h1>
          <p className="text-[#6C757D] mt-2 font-normal">
            Dashboard / Analysis and Reports / All Projects
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Project ID All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Asset Type All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Status All</option>
          </select>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-[5px] cursor-pointer">
            <span className="text-[10px]">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </span>
            Add Filter
            <span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 cursor-pointer">
            Clear Filter
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 cursor-pointer">
            Edit Column
          </button>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Rows per page:
          <select
            className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 ml-2 cursor-pointer"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white overflow-x-auto">
        {projects.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No projects found</div>
            <div className="text-gray-400 text-sm">
              {error ? 'Unable to load projects from the server.' : 'No residual analysis projects available.'}
            </div>
          </div>
        ) : (
          <table className="min-w-full border-collapse">
            <thead className="bg-white">
              <tr>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD] w-12">
                  Select
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                  <div className="flex items-center justify-between">
                    <span>Project ID</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                  Asset Type
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                  Start Date
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                  Submit Date
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                  Status
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => {
                const isStriped = index % 2 === 0;
                console.log(project);
                return (
                  <tr
                    key={project.id}
                    className={isStriped ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD] text-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] font-medium border border-[#D0D5DD]">
                      {project.projectNumber || project.id}
                    </td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                      {project.metadata?.category || 'N/A'}
                    </td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                      {new Date(project.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                      {project.submitDate ? new Date(project.submitDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                      <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          project.status === 'active' ? 'bg-red-100 text-red-800' :
                            project.status === 'approved' ? 'bg-green-100 text-green-800' :
                              project.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                                project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                        }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD]">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/user-dashboard/projects/project-report?projectId=${project.id}`)}
                          className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 cursor-pointer"
                        >
                          View Report
                        </button>
                        <button className="p-2 border border-[#D0D5DD] rounded-md cursor-pointer hover:bg-gray-50">
                          <Image src="/pencil.svg" alt="Edit" width={16} height={16} />
                        </button>
                        <button className="p-2 border border-[#D0D5DD] rounded-md cursor-pointer hover:bg-gray-50">
                          <Image src="/bin.svg" alt="Delete" width={16} height={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="text-red-800 text-sm">
            {error}
          </div>
          <div className="text-red-600 text-xs mt-2">
            Please check your connection and try again. If the problem persists, contact your administrator.
          </div>
          <button
            onClick={() => fetchProjects(currentPage, itemsPerPage)}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-[#343A40]">
          {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700 cursor-pointer disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${currentPage === 1 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {totalItems > itemsPerPage && (
            <button
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${currentPage === 2 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
                }`}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
          )}
          {totalItems > itemsPerPage * 2 && (
            <button
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${currentPage === 3 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
                }`}
              onClick={() => handlePageChange(3)}
            >
              3
            </button>
          )}
          {totalItems > itemsPerPage * 3 && (
            <button
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${currentPage === 4 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
                }`}
              onClick={() => handlePageChange(4)}
            >
              4
            </button>
          )}
          <button
            className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700 cursor-pointer disabled:opacity-50"
            disabled={currentPage * itemsPerPage >= totalItems}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <input
            placeholder={itemsPerPage.toString()}
            className="w-16 px-2 text-black py-2 border border-[#343A40] rounded-md text-sm text-center cursor-pointer"
            min="1"
            max={Math.ceil(totalItems / itemsPerPage)}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
                handlePageChange(page);
              }
            }}
          />
          <div className="text-sm text-[#343A40] ml-2">/Page</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
