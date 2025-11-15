"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthHeaders } from '@/lib/config';
import { ShimmerTable } from '@/app/Animations/shimmereffect';

type Equipment = {
  id: number;
  industryId: number;
  assetClassId: number;
  makeId: number;
  modelId: number;
  industryName: string;
  assetClassName: string;
  makeName: string;
  modelName: string;
  yearOfManufacture: number;
  length: string;
  width: string;
  height: string;
  weight: string;
  specialTransportationConsideration: string | null;
  value: number | null;
  residualValue: number | null;
  status: string;
  metadata: { notes?: string } | null;
  projectId: string | null;
  createdAt: string;
  updatedAt: string;
  industry?: { id: number; name: string; description: string };
  assetClass?: { id: number; name: string; description: string };
  make?: { id: number; name: string; description: string };
  model?: { id: number; name: string; description: string };
};

type EquipmentsResponse = {
  equipments?: Equipment[];
  data?: Equipment[];
  total?: number;
  page?: number;
  limit?: number;
};

export default function ManageAssets() {
  const [searchQuery] = useState("");
  const [assets, setAssets] = useState<Equipment[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchAssets = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      const response = await fetch(`/api/equipments?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        } else if (response.status === 403) {
          throw new Error('Forbidden - You do not have permission to view equipments');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const result: EquipmentsResponse | Equipment[] = await response.json();
      
      // Handle different possible response structures
      let equipmentsArray: Equipment[] = [];
      let total = 0;
      
      if (Array.isArray(result)) {
        // If response is directly an array
        equipmentsArray = result;
        total = result.length;
      } else if (result.equipments && Array.isArray(result.equipments)) {
        // If response has equipments array
        equipmentsArray = result.equipments;
        total = result.total || result.equipments.length;
      } else if (result.data && Array.isArray(result.data)) {
        // If response has data array
        equipmentsArray = result.data;
        total = result.total || result.data.length;
      }

      setAssets(equipmentsArray);
      setTotalItems(total);
      if (result && typeof result === 'object' && 'page' in result) {
        setCurrentPage(result.page || page);
      }
    } catch (err) {
      console.error('Error fetching equipments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch equipments');
      setAssets([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const filteredAssets = assets.filter(a =>
    [a.assetClassName, a.industryName, a.makeName, a.modelName].some(v => 
      v && v.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  const handlePageChange = (page: number) => {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
  };

  const handleLimitChange = (newLimit: number) => {
    setRowsPerPage(newLimit);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Assets</h1>
          <p className="text-gray-500">Dashboard / Manage Assets</p>
        </div>
        <div className="flex gap-3 space-x-2">
          <button
            onClick={() => router.push('/dashboard/manage-assets/add-asset')}
            className="bg-red-500 text-white px-8 py-2 rounded-[8px] hover:bg-red-600 cursor-pointer">+ Import New Asset</button>
          <button
            onClick={() => router.push('/dashboard/manage-assets/import')}
            className="bg-white px-8 py-2 rounded-[8px] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import Asset Data
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Industries All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Asset All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Make All</option>
          </select>
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Model All</option>
          </select>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-[5px] cursor-pointer">
            <span className="text-[10px]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </span>
            Add Filter
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 cursor-pointer">Clear Filter</button>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Rows per page:
          <select
            className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 ml-2 cursor-pointer"
            value={rowsPerPage}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Inline error banner */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="text-red-800 text-sm">{error}</div>
        </div>
      )}

      <div className="bg-white overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-white">
            <tr className=''>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD] w-12">
                Select
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between">
                  <span>Asset</span>
                  <Image src="/Sort.svg" alt="Sort" width={16} height={16} />
                </div>
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between">
                  <span>Industry</span>
                  <Image src="/Sort.svg" alt="Sort" width={16} height={16} />
                </div>
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between">
                  <span>Make</span>
                  <Image src="/Sort.svg" alt="Sort" width={16} height={16} />
                </div>
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between">
                  <span>Model</span>
                  <Image src="/Sort.svg" alt="Sort" width={16} height={16} />
                </div>
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ShimmerTable rows={Math.min(rowsPerPage, 10)} cols={6} />
            ) : filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 border border-[#D0D5DD]">
                  No equipments found
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset, index) => {
                const isStriped = index % 2 === 0;
                return (
                  <tr key={asset.id} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD] text-center">
                      <input type="checkbox" className="rounded border-gray-300 w-4 h-4 cursor-pointer" />
                    </td>
                    <td className="px-6  whitespace-nowrap text-[#343A40] font-medium border border-[#D0D5DD]">{asset.assetClassName || 'N/A'}</td>
                    <td className="px-6  whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">{asset.industryName || 'N/A'}</td>
                    <td className="px-6 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">{asset.makeName || 'N/A'}</td>
                    <td className="px-6  whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">{asset.modelName || 'N/A'}</td>
                    <td className="px-6  whitespace-nowrap border border-[#D0D5DD]">
                      <button className="p-3 border border-[#D0D5DD] rounded-md cursor-pointer">
                        <Image src="/pencil.svg" alt="Edit" width={12} height={12} />
                      </button>
                      <button className="p-3 ml-3 border border-[#D0D5DD] rounded-md cursor-pointer">
                        <Image src="/bin.svg" alt="Delete" width={12} height={12} />
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
        <div className="text-sm text-[#343A40]">{totalItems === 0 ? '0-0 of 0 items' : `${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalItems)} of ${totalItems} items`}</div>
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
              currentPage === 1 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {totalPages > 1 && (
            <button 
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${
                currentPage === 2 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
          )}
          {totalPages > 2 && (
            <button 
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer ${
                currentPage === 3 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
              }`}
              onClick={() => handlePageChange(3)}
            >
              3
            </button>
          )}
          {totalPages > 3 && (
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
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
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
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (!Number.isNaN(page)) {
                if (page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                }
              }
            }}
          />
          <div className="text-sm text-[#343A40] ml-2">/Page</div>
        </div>
      </div>
      
    </div>
  );
}
