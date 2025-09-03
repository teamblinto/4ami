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
      return 'text-green-600';
    case 'Approved':
      return 'text-blue-600';
    case 'Cancelled':
      return 'text-gray-500';
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <p className="text-sm text-gray-500">Dashboard / Manage Projects</p>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <select className="border rounded-md p-2">
            <option>Status All</option>
            <option>Active</option>
            <option>Approved</option>
            <option>Cancelled</option>
          </select>
          <button className="border border-gray-300 rounded-md p-2 text-sm flex items-center gap-1">
            <span className="text-red-500">+</span> Add Filter
          </button>
          <button className="border border-gray-300 rounded-md p-2 text-sm">Clear Filter</button>
          <button className="border border-gray-300 rounded-md p-2 text-sm">Edit Column</button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select className="border rounded-md p-2">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left w-10"><input type="checkbox" /></th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Service Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Description</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4"><input type="checkbox" /></td>
                <td className="p-4 text-sm text-gray-800">{project.serviceName}</td>
                <td className="p-4 text-sm text-gray-600">{project.description}</td>
                <td className={`p-4 text-sm font-medium ${getStatusClass(project.status)}`}>{project.status}</td>
                <td className="p-4">
                  <button className={`px-4 py-2 rounded-md text-sm font-semibold ${getActionClass(project.status)}`}>
                    {project.status === 'Approved' || project.status === 'Cancelled' ? 'View Report' : 'Review'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <p className="text-sm text-gray-600">1-10 of 20 items</p>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-md text-sm"></button>
          <button className="p-2 border rounded-md text-sm bg-gray-200">1</button>
          <button className="p-2 border rounded-md text-sm">2</button>
          <button className="p-2 border rounded-md text-sm"></button>
          <select className="border rounded-md p-2">
            <option>10</option>
            <option>20</option>
          </select>
          <span className="text-sm text-gray-600">/Page</span>
        </div>
      </div>
    </div>
  );
}
