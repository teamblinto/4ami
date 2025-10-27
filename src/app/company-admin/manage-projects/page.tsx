"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getApiUrl, getAuthHeaders } from '@/lib/config';

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

export default function CompanyAdminManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState("All");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch projects for company admin
  const fetchProjects = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const authToken = localStorage.getItem('authToken');
      
      // Check all localStorage keys to see what's available
      console.log('All localStorage keys:', Object.keys(localStorage));
      console.log('Auth token:', authToken);
      
      // Get user data from localStorage (the app uses 'userData' key)
      const userDataString = localStorage.getItem('userData');
      let userProfile: Record<string, unknown> = {};
      
      if (userDataString) {
        try {
          userProfile = JSON.parse(userDataString);
          console.log('User Data:', userProfile);
          console.log('Available keys:', Object.keys(userProfile));
        } catch (e) {
          console.error('Failed to parse userData:', e);
        }
      } else {
        console.log('No userData found in localStorage');
      }
      
      // Since the user data doesn't have companyId, we'll use the user's ID
      // The backend should filter projects by the authenticated user's company
      const userId = userProfile.id as string;
      
      if (!userId) {
        console.error('User ID not found. Available profile data:', userProfile);
        throw new Error('User ID not found in user profile. Please ensure you are logged in.');
      }
      
      // Try different API approaches - the backend should filter by authenticated user's company
      const url = getApiUrl(`/projects?page=${page}&limit=${limit}`);
      console.log('Fetching projects from:', url);
      console.log('User ID:', userId);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProjectsResponse = await response.json();
      console.log('Company Admin Projects Response:', result);
      setProjects(result.projects || []);
      setTotalItems(result.total || 0);
      setCurrentPage(result.page || 1);
    } catch (err) {
      console.error('Error fetching company projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  // Calculate pagination
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  // Handle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProjects(projects.map((project) => project.id));
    } else {
      setSelectedProjects([]);
    }
  };

  // Handle individual select
  const handleSelectProject = (projectId: string) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchProjects(newPage, rowsPerPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    fetchProjects(1, newRowsPerPage);
  };

  return (
    <div>
      <div>
        <h1 className="font-medium text-[#343A40] text-2xl">Manage Projects</h1>
        <p className="text-[#6C757D] mt-2 font-normal">
          Dashboard / Manage Projects
        </p>
      </div>


      <div className="bg-white mt-6 rounded-lg shadow">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#DC3545] text-white rounded-md flex items-center gap-2 hover:bg-[#c82333] transition-colors">
                <Image src="/majesticons_plus-line.svg" alt="Add" width={16} height={16} />
                Add New Project
              </button>
              <button className="px-4 py-2 border text-black border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Image src="/import.svg" alt="Import" width={16} height={16} />
                Import Project Data
              </button>
              <button className="px-4 py-2 text-black border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Image src="/import.svg" alt="Export" width={16} height={16} />
                Export Project Data
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#6C757D]">Rows per page:</span>
              <div className="relative">
                <button
                  onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                  className="px-3 py-1 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  {rowsPerPage}
                  <Image src="/mingcute_down-fill.svg" alt="Down" width={12} height={12} />
                </button>
                {showRowsDropdown && (
                  <div className="absolute right-0 mt-2 w-20 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {[10, 25, 50, 100].map((rows) => (
                      <button
                        key={rows}
                        onClick={() => {
                          handleRowsPerPageChange(rows);
                          setShowRowsDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        {rows}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="px-4 py-2 text-black border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                Status {roleFilter !== "All" ? roleFilter : "All"}
                <Image src="/mingcute_down-fill.svg" alt="Down" width={12} height={12} />
              </button>
              {showRoleDropdown && (
                <div className="absolute text-black left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {["All", "Active", "Completed", "Pending"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setRoleFilter(status);
                        setShowRoleDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="px-4 py-2 text-[#DC3545] border border-[#DC3545] rounded-md flex items-center gap-2 hover:bg-red-50 transition-colors">
              <Image src="/majesticons_plus-line.svg" alt="Add" width={16} height={16} />
              Add Filter
            </button>
            <button className="px-4 text-black py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Clear Filter
            </button>
            <button className="px-4 text-black py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Edit Column
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProjects.length === projects.length && projects.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Project Name
                    <Image src="/Sort.svg" alt="Sort" width={12} height={12} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Description
                    <Image src="/Sort.svg" alt="Sort" width={12} height={12} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Status
                    <Image src="/Sort.svg" alt="Sort" width={12} height={12} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Start Date
                    <Image src="/Sort.svg" alt="Sort" width={12} height={12} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    End Date
                    <Image src="/Sort.svg" alt="Sort" width={12} height={12} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6C757D] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading projects...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-red-500">
                    Error: {error}
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No projects found
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => handleSelectProject(project.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#343A40]">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#343A40]">
                      {project.description || 'No description'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#343A40]">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        project.status === 'active' ? 'bg-red-100 text-red-800' :
                        project.status === 'approved' ? 'bg-green-100 text-green-800' :
                        project.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#343A40]">
                      {new Date(project.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#343A40]">
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Image src="/pencil.svg" alt="Edit" width={16} height={16} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Image src="/bin.svg" alt="Delete" width={16} height={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-[#6C757D]">
              {totalItems > 0 ? `${startItem}-${endItem} of ${totalItems} items` : '0 items'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === pageNum
                        ? "bg-[#DC3545] text-white border-[#DC3545]"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
              <input 
                type="number" 
                placeholder={currentPage.toString()}
                className="w-16 px-2 text-black py-1 border border-[#343A40] rounded-md text-sm text-center cursor-pointer"
                min="1"
                max={totalPages}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement;
                    const page = parseInt(target.value);
                    if (page >= 1 && page <= totalPages) {
                      handlePageChange(page);
                    }
                  }
                }}
              />
              <span className="px-3 py-1 text-sm text-[#6C757D]">/page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
