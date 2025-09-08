"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImportAssets from './ImportAssets';

export default function ManageAssets() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const assets = [
    { id: "AST-001", name: "Excavator ZX200", category: "Heavy Equipment", location: "Yard A", status: "Active", lastService: "2025-03-02" },
    { id: "AST-002", name: "Forklift H25", category: "Material Handling", location: "Warehouse 3", status: "In Repair", lastService: "2025-04-12" },
    { id: "AST-003", name: "Generator G7", category: "Power", location: "Site 14", status: "Active", lastService: "2025-02-20" },
    { id: "AST-004", name: "Truck T460", category: "Transport", location: "Depot 2", status: "Inactive", lastService: "2024-12-11" },
  ];

  const filteredAssets = assets.filter(a =>
    [a.id, a.name, a.category, a.location, a.status].some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Assets</h1>
          <p className="text-gray-500">Dashboard / Manage Assets</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => router.push('/dashboard/manage-assets/add-asset')}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">+ Add Asset</button>
          <button 
            onClick={() => router.push('/dashboard/manage-assets/import')}
            className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">Import</button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">Export</button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md p-2">
            <option>Category: All</option>
          </select>
          <select className="border border-gray-300 rounded-md p-2">
            <option>Status: All</option>
          </select>
          <button className="border border-gray-300 rounded-md p-2">Add Filter</button>
          <button className="border border-gray-300 rounded-md p-2">Clear</button>
          <button className="border border-gray-300 rounded-md p-2">Edit Columns</button>
        </div>
        <div className="relative w-64">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search assets..."
            className="w-full p-2 pl-9 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><input type="checkbox" /></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssets.map(asset => (
              <tr key={asset.id}>
                <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs ${asset.status === 'Active' ? 'bg-green-100 text-green-700' : asset.status === 'In Repair' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{asset.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.lastService}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">View</button>
                  <button className="text-gray-600 hover:text-gray-900 ml-4">Edit</button>
                  <button className="bg-[#ED272C] hover:text-red-900 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">1-{filteredAssets.length} of {assets.length} items</div>
        <div className="flex items-center space-x-2">
          <button className="border rounded-md p-2">{'<'}</button>
          <button className="border rounded-md p-2 bg-red-500 text-white">1</button>
          <button className="border rounded-md p-2">2</button>
          <button className="border rounded-md p-2">3</button>
          <button className="border rounded-md p-2">{'>'}</button>
          <div className="text-sm text-gray-500">/ Page</div>
        </div>
      </div>
    </div>
  );
}


