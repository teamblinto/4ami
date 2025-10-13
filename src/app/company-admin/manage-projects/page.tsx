"use client";

import { useState } from "react";
import Image from "next/image";

interface Project {
  id: string;
  projectName: string;
  location: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: string;
}

export default function CompanyAdminManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      projectName: "Building Construction",
      location: "New York",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      budget: "$500,000",
    },
    {
      id: "2",
      projectName: "Road Development",
      location: "Los Angeles",
      status: "Active",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      budget: "$750,000",
    },
    {
      id: "3",
      projectName: "Bridge Repair",
      location: "Chicago",
      status: "Completed",
      startDate: "2023-06-01",
      endDate: "2024-03-31",
      budget: "$300,000",
    },
    {
      id: "4",
      projectName: "Park Renovation",
      location: "Houston",
      status: "Active",
      startDate: "2024-03-15",
      endDate: "2024-09-30",
      budget: "$150,000",
    },
    {
      id: "5",
      projectName: "School Building",
      location: "Phoenix",
      status: "Pending",
      startDate: "2024-05-01",
      endDate: "2025-04-30",
      budget: "$1,200,000",
    },
    {
      id: "6",
      projectName: "Mall Construction",
      location: "Philadelphia",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      budget: "$2,500,000",
    },
    {
      id: "7",
      projectName: "Office Complex",
      location: "San Antonio",
      status: "Active",
      startDate: "2024-04-01",
      endDate: "2025-03-31",
      budget: "$1,800,000",
    },
    {
      id: "8",
      projectName: "Hospital Wing",
      location: "San Diego",
      status: "Completed",
      startDate: "2023-01-01",
      endDate: "2024-01-31",
      budget: "$3,000,000",
    },
    {
      id: "9",
      projectName: "Parking Structure",
      location: "Dallas",
      status: "Active",
      startDate: "2024-02-15",
      endDate: "2024-08-31",
      budget: "$400,000",
    },
    {
      id: "10",
      projectName: "Warehouse Facility",
      location: "San Jose",
      status: "Pending",
      startDate: "2024-06-01",
      endDate: "2024-12-31",
      budget: "$900,000",
    },
  ]);

  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState("All");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);

  // Calculate pagination
  const indexOfLastProject = currentPage * rowsPerPage;
  const indexOfFirstProject = indexOfLastProject - rowsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / rowsPerPage);

  // Handle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProjects(currentProjects.map((project) => project.id));
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

  // Handle delete
  const handleDelete = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId));
    setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
  };

  return (
    <div>
      <div>
        <h1 className="font-medium text-[#343A40] text-2xl">Manage Projects</h1>
        <p className="text-[#6C757D] mt-2 font-normal">
          Dashboard / Manage Projects
        </p>
      </div>

      {/* Project Information Section */}
      <div className="bg-white mt-6 px-4 py-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Project Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="project-id"
              className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
            >
              Project ID
            </label>
            <input
              type="text"
              id="project-id"
              defaultValue="P1013492"
              className="w-full h-10 px-3 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="start-date"
              className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
            >
              Start Date
            </label>
            <input
              type="text"
              id="start-date"
              defaultValue="21/08/2025"
              className="w-full h-10 px-3 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="submitted-date"
              className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
            >
              Submitted Date
            </label>
            <input
              type="text"
              id="submitted-date"
              placeholder="N/A"
              className="w-full h-10 px-3 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="project-name"
            className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
          >
            Project Name
          </label>
          <input
            type="text"
            id="project-name"
            defaultValue="Burleson Sand Volvo A40G Water Truck"
            className="w-full h-10 px-3 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="project-note"
            className="block mb-2 text-[#6C757D] font-medium text-sm leading-6"
          >
            Project Note
          </label>
          <textarea
            id="project-note"
            rows={4}
            placeholder="Type here...."
            className="w-full px-3 py-2 rounded-lg border border-[#CED4DA] bg-[#FBFBFB] text-[#343A40] text-sm font-normal leading-6 placeholder:text-[#ADB5BD] placeholder:font-normal placeholder:text-sm placeholder:leading-6 focus:outline-none focus:ring-1   focus:border-transparent resize-none"
          />
        </div>
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
              <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Image src="/import.svg" alt="Import" width={16} height={16} />
                Import Project Data
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
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
                          setRowsPerPage(rows);
                          setCurrentPage(1);
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
                className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                Status {roleFilter !== "All" ? roleFilter : "All"}
                <Image src="/mingcute_down-fill.svg" alt="Down" width={12} height={12} />
              </button>
              {showRoleDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Clear Filter
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
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
                    checked={selectedProjects.length === currentProjects.length && currentProjects.length > 0}
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
                    Location
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
              {currentProjects.map((project) => (
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
                    {project.projectName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#343A40]">
                    {project.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#343A40]">
                    {project.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#343A40]">
                    {project.startDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#343A40]">
                    {project.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Image src="/pencil.svg" alt="Edit" width={16} height={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Image src="/bin.svg" alt="Delete" width={16} height={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-[#6C757D]">
              1-{Math.min(rowsPerPage, projects.length)} of {projects.length} items
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === page
                      ? "bg-[#DC3545] text-white border-[#DC3545]"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                {totalPages}
              </button>
              <span className="px-3 py-1 text-sm text-[#6C757D]">/page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
