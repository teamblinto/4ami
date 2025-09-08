"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImportAssets from './ImportAssets';

export default function ManageAssets() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const assets = [
    { asset: "Excavator", industry: "Construction", make: "Caterpillar", model: "CAT 320" },
    { asset: "Freight Truck", industry: "Transportation", make: "Volvo", model: "VNL 760" },
    { asset: "MRI Machine", industry: "Healthcare", make: "Siemens", model: "Magnetom Spectra" },
    { asset: "Wind Turbine", industry: "Energy", make: "General Electric", model: "GE 2.8-127" },
    { asset: "Tractor", industry: "Agriculture", make: "John Deere", model: "BR 410" },
    { asset: "CNC Machine", industry: "Manufacturing", make: "Haas", model: "VF-4SS" },
    { asset: "Server Rack", industry: "IT", make: "Dell", model: "PowerEdge R750" },
    { asset: "Forklift", industry: "Logistics", make: "Toyota", model: "8FGCU25" },
    { asset: "Commercial Aircraft", industry: "Aviation", make: "Boeing", model: "737-800" },
    { asset: "Cargo Ship Engine", industry: "Marine", make: "Wärtsilä", model: "Wärtsilä 31" },
  ];

  const filteredAssets = assets.filter(a =>
    [a.asset, a.industry, a.make, a.model].some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Assets</h1>
          <p className="text-gray-500">Dashboard / Manage Assets</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => router.push('/dashboard/manage-assets/add-asset')}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">+ Import New Asset</button>
          <button 
            onClick={() => router.push('/dashboard/manage-assets/import')}
            className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import Asset Data
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3-3m0 0l3 3m-3-3v12" />
            </svg>
            Export Asset Data
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option>Industries All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option>Asset All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option>Make All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option>Model All</option>
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
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Rows per page:
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 ml-2">
            <option>10</option>
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
                  Asset
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center gap-1">
                  Industry
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center gap-1">
                  Make
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center gap-1">
                  Model
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, index) => {
              const isStriped = index % 2 === 0;
              return (
                <tr key={index} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap border border-[#D0D5DD]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium border border-[#D0D5DD]">{asset.asset}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{asset.industry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{asset.make}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{asset.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap border border-[#D0D5DD]">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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


