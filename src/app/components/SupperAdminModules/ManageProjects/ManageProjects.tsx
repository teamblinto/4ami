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
              <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3122_5489)">
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
            <tr className=''>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD] w-12">
                Select
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center justify-between gap-1">
                  Service Name
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">Description</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center justify-between gap-1">
                  Status
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.7334 5.16602H13.4001M4.40007 7.83268H11.7334M5.7334 10.4993H10.4001" stroke="#6C757D" stroke-width="1.5" stroke-linecap="round"/>
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
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD] text-center">
                    <input type="checkbox" className="rounded border-gray-300 w-4 h-4 cursor-pointer" />
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
          <button className="border border-gray-300 rounded-md pt-3 pb-3 pl-3 pr-3 hover:bg-gray-50 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="border border-gray-300 rounded-md pt-2 pb-2 pl-4 pr-4 bg-red-500 text-white hover:bg-red-600">1</button>
          <button className="border border-gray-300 rounded-md pt-2 pb-2 pl-4 pr-4 hover:bg-gray-50 text-gray-700">2</button>
          <button className="border border-gray-300 rounded-md pt-3 pb-3 pl-3 pr-3 hover:bg-gray-50 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <input 
            type="number" 
            placeholder="10" 
            className="w-16 px-2 text-black py-2 border border-[#343A40] rounded-md text-sm text-center cursor-pointer"
            min="1"
            max="10"
          />
          <span className="text-sm text-gray-600">/Page</span>
        </div>
      </div>

    </div>
  );
}
