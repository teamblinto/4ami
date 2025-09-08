"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SendInvitationForm from './SendInvitationForm';

interface ManageUsersProps {
  autoShowInvitation?: boolean;
}

export default function ManageUsers({ autoShowInvitation = false }: ManageUsersProps) {
  const [showSendInvitation, setShowSendInvitation] = useState(autoShowInvitation);
  const router = useRouter();

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-500">Dashboard / Manage User</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => router.push('/dashboard/manage-users/send-invitation')} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            + Add New User
          </button>
          <button 
            onClick={() => router.push('/dashboard/manage-users/import')}
            className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import User Data
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700">
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
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700">
            <option>Role All</option>
          </select>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 flex items-center gap-[5px]">
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
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600">Clear Filter</button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600">Edit Column</button>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Rows per page:
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 ml-2">
            <option>10</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">
                <div className="flex items-center gap-1">
                  Username
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">First Name</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">Last Name</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">Role</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">E-Mail</th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-600 border border-[#D0D5DD]">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Data */}
            {[
              { username: 'John_32@435', firstName: 'John', lastName: 'Doe', role: 'Customer Admin', email: 'michael55@gmail.com' },
              { username: 'Jaiden_Nixon@2025', firstName: 'Jaiden', lastName: 'Nixon', role: 'Customer User', email: 'jaiden.n@gmail.com' },
              { username: 'ace.fo', firstName: 'Ace', lastName: 'Foster', role: 'Customer User', email: 'ace.fo@yahoo.com' },
              { username: 'nikolai.schmidt', firstName: 'Nikolai', lastName: 'Schmidt', role: 'Customer Admin', email: 'nikolai.schmidt1964@outlook.com' },
              { username: 'me.cc2', firstName: 'Clark', lastName: 'Clayton', role: 'Customer User', email: 'me@clayton.com' },
              { username: 'Chen1997', firstName: 'Prince', lastName: 'Chen', role: 'Customer User', email: 'prince.chen1997@gmail.com' },
              { username: 'Duran', firstName: 'Duran', lastName: 'Reece', role: 'Customer User', email: 'reece@yahoo.com' },
              { username: 'anastasia.spring', firstName: 'Anastasia', lastName: 'Spring', role: 'Customer Admin', email: 'anastasia.spring@mcdaniel2.com' },
              { username: 'Me.boyle', firstName: 'Matthew', lastName: 'Boyle', role: 'Customer User', email: 'Me.boyle@gmail.com' },
              { username: 'Kailee.thomas', firstName: 'Kailee', lastName: 'Thomas', role: 'Customer User', email: 'kailee.thomas@gmail.com' },
            ].map((user, index) => {
              const isStriped = index % 2 === 0;
              return (
                <tr key={index} className={isStriped ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap border border-[#D0D5DD]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium border border-[#D0D5DD]">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{user.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 border border-[#D0D5DD]">{user.email}</td>
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">1-10 of 120 items</div>
        <div className="flex items-center space-x-2">
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="border border-gray-300 rounded-md p-2 bg-red-500 text-white hover:bg-red-600">1</button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">2</button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">3</button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">4</button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="text-sm text-gray-700 ml-2">10 / Page</div>
        </div>
      </div>
    </div>
  );
}
