"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getApiUrl, getAuthHeaders } from '@/lib/config';
import { ShimmerEffect } from '@/app/Animations/shimmereffect';

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
  projectType?: {
    name: string;
  };
  assets?: Array<{
    id: string;
    industry?: string;
    assetClass?: string;
  }>;
  equipments?: Array<{
    id: string;
    industry?: string;
    assetClass?: string;
  }>;
  reports: unknown[];
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600';
    case 'active':
      return 'text-red-600';
    case 'approved':
      return 'text-green-600';
    case 'cancelled':
      return 'text-gray-400';
    case 'completed':
      return 'text-blue-600';
    default:
      return 'text-gray-700';
  }
};

const getActionClass = (status: string) => {
  if (status === 'approved' || status === 'cancelled' || status === 'completed') {
    return 'bg-gray-200 text-gray-800';
  }
  return 'bg-red-500 text-white';
};

export default function CompanyAdminManageProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch projects with pagination
  const fetchProjects = useCallback(async (page: number = currentPage, limit: number = itemsPerPage) => {
    try {
      setLoading(true);
      setError(null);
      
      const authToken = localStorage.getItem('authToken');
      
      // Fetch projects with pagination
      const url = getApiUrl(`/projects/user/projects?page=${page}&limit=${limit}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle response - could be array or object with projects array
      let projectsList: Project[] = [];
      let totalCount = 0;
      
      if (Array.isArray(result)) {
        projectsList = result;
        totalCount = result.length;
      } else if (result.projects && Array.isArray(result.projects)) {
        projectsList = result.projects;
        totalCount = result.total || result.projects.length;
      } else if (result.data && Array.isArray(result.data)) {
        projectsList = result.data;
        totalCount = result.total || result.data.length;
      }
      
      setProjects(projectsList);
      setTotalItems(totalCount);
    } catch (err) {
      console.error('Error fetching company projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-medium text-[#343A40] text-2xl">Manage Projects</h1>
          <p className="text-[#6C757D] mt-2 font-normal">
            Company Admin / Manage Projects
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Status All</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Pending</option>
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
      <div className="bg-white overflow-hidden">
        <table className="w-full border-collapse table-fixed" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-white">
            <tr>
              {/* <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD] w-12">
                Select
              </th> */}
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '9%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Project ID</span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '13%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Project type</span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '18%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Project Name</span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '9%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Industry</span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '11%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Asset Type</span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '10%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Submit Date</span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '8%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Status</span>
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '12%' }}>
                <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                {Array.from({ length: Math.min(itemsPerPage, 10) }).map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                     
                  >
                    <td colSpan={8} className="px-6 pt-4 pb-4 align-middle border border-[#D0D5DD]"  >
                      <ShimmerEffect className="h-5 w-full" />
                    </td>
                  </tr>
                ))}
              </>
            ) : error ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-red-500 border border-[#D0D5DD]">
                  Error: {error}
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500 border border-[#D0D5DD]">
                  <div className="text-gray-500 text-lg mb-2">No projects found</div>
                  <div className="text-gray-400 text-sm">
                    Start by creating your first project.
                  </div>
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
                
                // Extract industry and assetClass from equipments or assets array
                const equipmentData = project.equipments?.[0] || project.assets?.[0];
                const industry = equipmentData?.industry || 'N/A';
                const assetType = equipmentData?.assetClass || 'N/A';
            
                return (
                  <tr
                    key={project.id}
                    className={isStriped ? "bg-gray-50" : "bg-white"}
                     
                  >
                    {/* <td className="px-6 whitespace-nowrap border border-[#D0D5DD] text-center align-middle"  >
                      <input
                        type="checkbox"
                        className="rounded accent-[#ED272C] border-gray-300 w-4 h-4 cursor-pointer"
                      />
                    </td> */}
                    <td className="px-4 py-3 text-[14px] text-[#343A40] font-medium border border-[#D0D5DD] align-middle"  >
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{project.projectNumber || project.id}</div>
                    </td>
                    <td className="px-4 py-3 text-[14px] text-[#343A40] border border-[#D0D5DD] align-middle"  >
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{project.projectType?.name || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3 text-[14px] text-[#343A40] font-medium border border-[#D0D5DD] align-middle"  >
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap max-w-full" title={project.name}>{project.name}</div>
                    </td>
                    <td className="px-4 py-3 text-[14px] text-[#343A40] border border-[#D0D5DD] align-middle"  >
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{industry}</div>
                    </td>
                    <td className="px-4 py-3 text-[14px] text-[#343A40] border border-[#D0D5DD] align-middle"  >
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{assetType}</div>
                    </td>
                    <td className="px-4 py-3 text-[14px] text-[#343A40] border border-[#D0D5DD] align-middle"  >
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{submissionDate}</div>
                    </td>
                    <td className={`px-4 py-3 text-[14px] font-medium border border-[#D0D5DD] align-middle ${getStatusClass(project.status)}`}  >
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{project.status}</div>
                    </td>
                    <td className="px-4 py-3 text-[14px] font-medium  border border-[#D0D5DD] align-middle"  >
                      <button
                        onClick={() => router.push(`/company-admin/manage-projects/project-report?projectId=${project.id}`)}
                        className={`px-2 cursor-pointer py-2 rounded-md text-xs font-semibold w-full truncate block overflow-hidden text-ellipsis whitespace-nowrap ${getActionClass(project.status)}`}
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
            className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${
              currentPage === 1 ? 'bg-red-500 text:white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {totalItems > itemsPerPage && (
            <button 
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${
                currentPage === 2 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
          )}
          {totalItems > itemsPerPage * 2 && (
            <button 
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${
                currentPage === 3 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
              onClick={() => handlePageChange(3)}
            >
              3
            </button>
          )}
          {totalItems > itemsPerPage * 3 && (
            <button 
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${
                currentPage === 4 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
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
}
