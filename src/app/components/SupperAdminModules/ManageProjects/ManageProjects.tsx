"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApiUrl, getAuthHeaders } from '@/lib/config';
import { ShimmerTable } from '@/app/Animations/shimmereffect';

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

export default function ManageProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProjects = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const authToken = localStorage.getItem('authToken');
      const url = getApiUrl(`/projects/user/projects?page=${page}&limit=${limit}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });
     
      

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProjectsResponse = await response.json();
      console.log('API Response:', result);
      console.log('Projects array:', result.projects);
      setProjects(result.projects || []);
      setTotalItems(result.total || 0);
      setCurrentPage(result.page || 1);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage, limit);
  }, [currentPage, limit]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchProjects(newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
    fetchProjects(1, newLimit);
  };

  const totalPages = Math.ceil(totalItems / limit);
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
          <p className="text-gray-500">Dashboard / Manage Projects</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option>Status All</option>
            <option>Active</option>
            <option>Approved</option>
            <option>Cancelled</option>
          </select>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-[5px]">
            <span className="text-[10px]">
              <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3122_5489)">
              <path d="M3.95396 4.9359C4.11109 5.16328 4.06412 4.97381 4.06412 9.50615C4.06412 9.91174 4.52686 10.1439 4.85299 9.90127C6.2466 8.85055 6.52504 8.75955 6.52504 8.26809C6.52504 4.96527 6.48654 5.15102 6.63519 4.9359L8.89826 1.85547H1.69092L3.95396 4.9359Z" fill="#ED272C"/>
              <path d="M9.7533 0.251172C9.67244 0.0962891 9.51385 0 9.33926 0H1.25027C0.873223 0 0.651367 0.425332 0.867656 0.734375C0.869434 0.737344 0.843105 0.701309 1.26063 1.26953H9.32889C9.68469 0.785293 9.92252 0.576074 9.7533 0.251172Z" fill="#ED272C"/>
              </g>
              <defs>
              <clipPath id="clip0_3122_5489">
              <rect width="10" height="10" fill="white" transform="translate(0.295898)"/>
              </clipPath>
              </defs>
              </svg>
            </span>
            Add Filter
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600">Clear Filter</button>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Rows per page:
          <select 
            className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 ml-2"
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="bg-white overflow-x-auto">
        <table className="min-w-full border-collapse">
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
              <th className="px-6 py-2 w-[250px] text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
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
                <div className="flex w-[100px] items-center justify-between gap-1">
                  Status
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 w-[120px] text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ShimmerTable rows={Math.min(limit, 10)} cols={6} />
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-red-500 border border-[#D0D5DD]">
                  Error: {error}
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 border border-[#D0D5DD]">
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
                  <tr key={project.id || index} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                    {/* <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD] text-center align-middle">
                      <input type="checkbox" className="rounded accent-[#ED272C] border-gray-300 w-4 h-4 cursor-pointer" />
                    </td> */}
                    <td className="px-6 py-3 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                      {project.projectNumber || project.id}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                      {project.projectType?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-[#343A40] font-medium border border-[#D0D5DD]">
                      {project.name}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                      {submissionDate}
                    </td>
                    <td className={`px-6 py-3 whitespace-nowrap text-sm font-medium border border-[#D0D5DD] ${getStatusClass(project.status)}`}>
                      {project.status}
                    </td>
                    <td className="px-6 w-[120px] whitespace-nowrap border border-[#D0D5DD]">
                      <button
                        onClick={() => {
                          router.push('/dashboard/manage-projects/project-report');
                        }}
                        className={`px-4 cursor-pointer py-1 rounded-md text-sm font-semibold ${getActionClass(project.status)}`}
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

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          {totalItems > 0 ? `${startItem}-${endItem} of ${totalItems} items` : '0 items'}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="border border-gray-300 rounded-md pt-3 pb-3 pl-3 pr-3 hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Generate page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            if (pageNum > totalPages) return null;
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`border border-gray-300 rounded-md pt-2 pb-2 pl-4 pr-4 ${
                  pageNum === currentPage 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="border border-gray-300 rounded-md pt-3 pb-3 pl-3 pr-3 hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <input 
            type="number" 
            placeholder={currentPage.toString()}
            className="w-16 px-2 text-black py-2 border border-[#343A40] rounded-md text-sm text-center cursor-pointer"
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
          <span className="text-sm text-gray-600">/Page</span>
        </div>
      </div>

    </div>
  );
}
