"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { config, getAuthHeaders } from '@/lib/config';
import SendInvitationForm from './SendInvitationForm';

interface ManageUsersProps {
  autoShowInvitation?: boolean;
}

// Interface for user data
interface UserData {
  companyName: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

// Interface for API user data (what comes from backend)
interface ApiUserData {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role?: string;
  email?: string;
  username?: string;
}

// Interface for API response
interface ApiResponse {
  data?: ApiUserData[];
  users?: ApiUserData[];
  total?: number;
  page?: number;
  limit?: number;
}


export default function ManageUsers({ autoShowInvitation = false }: ManageUsersProps) {
  const [showSendInvitation, setShowSendInvitation] = useState(autoShowInvitation);
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  // Fetch data from API
  const fetchUsers = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get auth token from localStorage or sessionStorage
      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      const url = `${config.API_BASE_URL}/users?page=${page}&limit=${limit}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(authToken || undefined),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        } else if (response.status === 403) {
          throw new Error('Forbidden - You do not have permission to view users');
        } else if (response.status === 404) {
          throw new Error('Users endpoint not found - Please check API configuration');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const result: ApiResponse = await response.json();
      console.log('API Response:', result); // Debug log to see actual response structure
      
      // Handle different possible response structures
      let usersArray: ApiUserData[] = [];
      let total = 0;
      let currentPageNum = 1;
      
      if (result.data && Array.isArray(result.data)) {
        // Standard paginated response
        usersArray = result.data;
        total = result.total || result.data.length;
        currentPageNum = result.page || 1;
      } else if (Array.isArray(result)) {
        // Direct array response
        usersArray = result as ApiUserData[];
        total = result.length;
        currentPageNum = 1;
      } else if (result.users && Array.isArray(result.users)) {
        // Alternative structure with 'users' key
        usersArray = result.users;
        total = result.total || result.users.length;
        currentPageNum = result.page || 1;
      } else {
        throw new Error('Unexpected API response format');
      }
      
      // Transform the API data to match our frontend structure
      const transformedData: UserData[] = usersArray.map((user: ApiUserData) => ({
        companyName: user.companyName || user.email || 'Unknown User',
        firstName: user.firstName || user.name?.split(' ')[0] || 'Unknown',
        lastName: user.lastName || user.name?.split(' ')[1] || 'User',
        role: user.role || 'Customer User',
        email: user.email || 'No email'
      }));

      setUsersData(transformedData);
      setTotalItems(total);
      setCurrentPage(currentPageNum);
    } catch (err) {
      console.error('Error fetching users:', err);
      let errorMessage = 'Failed to fetch users data';
      
      if (err instanceof Error) {
        if (err.message.includes('fetch')) {
          errorMessage = 'Network error - Please check your connection';
        } else if (err.message.includes('Unexpected API response format')) {
          errorMessage = 'Invalid response format from server';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      
      // Don't use fallback data - show empty state instead
      setUsersData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (!showSendInvitation) {
      fetchUsers(currentPage, itemsPerPage);
    }
  }, [currentPage, itemsPerPage, showSendInvitation]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (showSendInvitation) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Send an Invitation</h1>
          <p className="text-gray-500">Dashboard / Manage User / Send Invitation</p>
        </div>
        <SendInvitationForm onInvitationSent={() => setShowSendInvitation(false)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-500">Dashboard / Manage User</p>
        </div>
        <div className="flex gap-3 space-x-2">
          <button onClick={() => router.push('/dashboard/manage-users/send-invitation')} className="bg-red-500 text-white px-8 py-2 rounded-[8px] hover:bg-red-600 cursor-pointer">
            + Add New User
          </button>
          <button 
            onClick={() => router.push('/dashboard/manage-users/import')}
            className="bg-white px-8 py-2 rounded-[8px] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import User Data
          </button>
          <button className="bg-white px-8 py-2 rounded-[8px] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3-3m0 0l3 3m-3-3v12" />
            </svg>
            Export User Data
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 cursor-pointer">
            <option>Role All</option>
          </select>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-[5px] cursor-pointer">
            <span className="text-[10px]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </span>
            Add Filter
            <span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 cursor-pointer">Clear Filter</button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 cursor-pointer">Edit Column</button>
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

      {/* Users Table */}
      <div className="bg-white overflow-x-auto">
        {usersData.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No users found</div>
            <div className="text-gray-400 text-sm">
              {error ? 'Unable to load users from the server.' : 'Start by adding your first user.'}
            </div>
            {!error && (
              <button 
                onClick={() => router.push('/dashboard/manage-users/send-invitation')}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 cursor-pointer"
              >
                Add First User
              </button>
            )}
          </div>
        ) : (
          <table className="min-w-full border-collapse">
            <thead className="bg-white">
              <tr>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD] w-12">
                  Select
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                  <div className="flex items-center justify-between">
                    <span>companyName</span>
                    <Image src="/Sort.svg" alt="Sort" width={16} height={16} />
                  </div>
                </th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">First Name</th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">Last Name</th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">Role</th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">E-Mail</th>
                <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => {
                const isStriped = index % 2 === 0;
                return (
                  <tr key={index} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD] text-center">
                      <input type="checkbox" className="rounded border-gray-300 w-4 h-4 cursor-pointer" />
                    </td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] font-medium border border-[#D0D5DD]">{user.companyName}</td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">{user.firstName}</td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">{user.lastName}</td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">{user.role}</td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">{user.email}</td>
                    <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD]">
                      <button className="p-3 border border-[#D0D5DD] rounded-md cursor-pointer">
                        <Image src="/pencil.svg" alt="Edit" width={16} height={16} />
                      </button>
                      <button className="p-3 ml-3 border border-[#D0D5DD] rounded-md cursor-pointer">
                        <Image src="/bin.svg" alt="Delete" width={16} height={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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
            onClick={() => fetchUsers(currentPage, itemsPerPage)}
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
              currentPage === 1 ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-gray-50 text-gray-700'
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
            type="number" 
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
