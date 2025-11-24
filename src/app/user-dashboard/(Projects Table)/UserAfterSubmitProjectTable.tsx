"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getApiUrl, getAuthHeaders } from "@/lib/config";
import { ShimmerTable } from "@/app/Animations/shimmereffect";

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

export default function AfterSubmitProjectTable() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : undefined;

        // Fetch all projects for the user using /projects/user/projects
        const url = getApiUrl(`/projects/user/projects?page=1&limit=3`);
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
        let projectsList: Project[] = [];
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#080607]">Projects</h2>
        <Link href="/user-dashboard/projects" className="text-[#ED272C] text-sm font-medium">
          View All
        </Link>
      </div>
      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full text-sm border-collapse table-fixed" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '12%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Project ID</span>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '33%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Project Name</span>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '12%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Industry</span>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '13%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Submit Date</span>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '10%' }}>
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Status</span>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]" style={{ width: '10%' }}>
                <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ShimmerTable rows={3} cols={6} />
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
              projects.slice(0, 3).map((project, index) => {
                const isStriped = index % 2 === 0;
                const submissionDate = project.submitDate 
                  ? new Date(project.submitDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })
                  : 'N/A';
                
                // Extract industry from equipments or assets array
                const equipmentData = project.equipments?.[0] || project.assets?.[0];
                const industry = equipmentData?.industry || 'N/A';
                
                return (
                  <tr
                    key={project.id || index}
                    className={isStriped ? "bg-gray-50" : "bg-white"}
                    style={{ height: '64px' }}
                  >
                    <td className="px-4 py-3 text-[#343A40] font-medium border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{project.projectNumber || project.id}</div>
                    </td>
                    <td className="px-4 py-3 text-[#343A40] font-medium border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap max-w-full" title={project.name}>{project.name}</div>
                    </td>
                    <td className="px-4 py-3 text-[#343A40] border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{industry}</div>
                    </td>
                    <td className="px-4 py-3 text-[#343A40] border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{submissionDate}</div>
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium border border-[#D0D5DD] align-middle ${getStatusClass(project.status)}`} style={{ height: '64px' }}>
                      <div className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{project.status}</div>
                    </td>
                    <td className="px-4 py-3 border border-[#D0D5DD] align-middle" style={{ height: '64px' }}>
                      <button
                        onClick={() => router.push(`/user-dashboard/projects/project-report?projectId=${project.id}`)}
                        className={`px-2 cursor-pointer py-2 hover:bg-red-600 rounded-md text-xs font-semibold w-full truncate block overflow-hidden text-ellipsis whitespace-nowrap ${getActionClass(project.status)}`}
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
}

