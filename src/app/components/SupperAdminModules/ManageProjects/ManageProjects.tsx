"use client";
import React from 'react';

const projectsData = [
  { serviceName: 'Residual Analysis', description: 'Asset residual value', status: 'Active' },
  { serviceName: 'Appraisal/Valuation', description: 'Asset worth assessment', status: 'Active' },
  { serviceName: 'Insurance Quotation', description: 'Policy cost estimate', status: 'Active' },
  { serviceName: 'Residual Insurance', description: 'Coverage for residuals', status: 'Active' },
  { serviceName: 'Maintenance Provision', description: 'Ongoing maintenance', status: 'Active' },
  { serviceName: 'Return Provisions', description: 'Asset return options', status: 'Approved' },
  { serviceName: 'Transportation Quotation', description: 'Transport cost estimate', status: 'Active' },
  { serviceName: 'Cost-Benefit Analysis', description: 'Financial comparison', status: 'Cancelled' },
  { serviceName: 'Extended Warranty Quotation', description: 'Extended service plan', status: 'Active' },
  { serviceName: 'Residual Insurance Quotation', description: 'Coverage estimate', status: 'Active' },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-red-600';
    case 'Approved':
      return 'text-gray-900';
    case 'Cancelled':
      return 'text-gray-400';
    default:
      return 'text-gray-700';
  }
};

const getActionClass = (status: string) => {
  if (status === 'Approved' || status === 'Cancelled') {
    return 'bg-gray-200 text-gray-800';
  }
  return 'bg-red-500 text-white';
};

export default function ManageProjects() {
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
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </span>
            Add Filter
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600">Clear Filter</button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600">Edit Column</button>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Rows per page:
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 ml-2">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>

      <div className="bg-white overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center gap-1">
                  Service Name
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">Description</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center gap-1">
                  Status
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">Action</th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project, index) => {
              const isStriped = index % 2 === 0;
              return (
                <tr key={index} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap border border-[#D0D5DD]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium border border-[#D0D5DD]">{project.serviceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{project.description}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium border border-[#D0D5DD] ${getStatusClass(project.status)}`}>{project.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-[#D0D5DD]">
                    <button className={`px-4 py-2 rounded-md text-sm font-semibold ${getActionClass(project.status)}`}>
                      {project.status === 'Approved' || project.status === 'Cancelled' ? 'View Report' : 'Review'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">1-10 of 20 items</div>
        <div className="flex items-center space-x-2">
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="border border-gray-300 rounded-md p-2 bg-red-500 text-white hover:bg-red-600">1</button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">2</button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="text-sm text-gray-700 ml-2">10 /Page</div>
        </div>
      </div>
    </div>
  );
}
