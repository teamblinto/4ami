"use client";

import { useState } from 'react';
import SendInvitationForm from '../SendInvitationForm';
import Link from 'next/link';

export default function ManageUsers() {
  const [showSendInvitation, setShowSendInvitation] = useState(false);

  if (showSendInvitation) {
    return <SendInvitationForm onInvitationSent={() => setShowSendInvitation(false)} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-gray-500">Dashboard / Manage User</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setShowSendInvitation(true)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            + Add New User
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
            Import User Data
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
            Export User Data
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md p-2">
            <option>Role All</option>
          </select>
          <button className="border border-gray-300 rounded-md p-2">Add Filter</button>
          <button className="border border-gray-300 rounded-md p-2">Clear Filter</button>
          <button className="border border-gray-300 rounded-md p-2">Edit Column</button>
        </div>
        <div className="text-sm text-gray-500">
          Rows per page:
          <select className="border-gray-300 rounded-md p-1 ml-2">
            <option>10</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><input type="checkbox" /></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-Mail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Dummy Data */}
            {[
              { username: 'John_32@435', firstName: 'John', lastName: 'Doe', role: 'Admin', email: 'michael55@gmail.com' },
              { username: 'Jaiden_Nixon@2025', firstName: 'Jaiden', lastName: 'Nixon', role: 'Company Admin', email: 'jaiden.n@gmail.com' },
              { username: 'ace.lo', firstName: 'Ace', lastName: 'Foster', role: 'Company User', email: 'ace.fn@yahoo.com' },
              { username: 'nikolai.schmidt', firstName: 'Nikolai', lastName: 'Schmidt', role: 'Appraiser', email: 'nikolai.schmidt1964@outlook.com' },
              { username: 'me.cc2', firstName: 'Clark', lastName: 'Clayton', role: 'Appraiser', email: 'me@clayton.com' },
              { username: 'Chen1997', firstName: 'Prince', lastName: 'Chen', role: 'Company User', email: 'prince.chen1997@gmail.com' },
              { username: 'Duran', firstName: 'Duran', lastName: 'Reece', role: 'Company User', email: 'reece@yahoo.com' },
              { username: 'anastasia.spring', firstName: 'Anastasia', lastName: 'Spring', role: 'Company Admin', email: 'anastasia.spring@mcdaniel2.com' },
              { username: 'Me.boyle', firstName: 'Matthew', lastName: 'Boyle', role: 'Appraiser', email: 'Me.boyle@gmail.com' },
              { username: 'Kailee.thomas', firstName: 'Kailee', lastName: 'Thomas', role: 'Appraiser', email: 'kailee.thomas@gmail.com' },
            ].map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap"><input type="checkbox" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button className="bg-[#ED272C] hover:text-red-900 ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">1-10 of 120 items</div>
        <div className="flex items-center space-x-2">
          <button className="border rounded-md p-2">{'<'}</button>
          <button className="border rounded-md p-2 bg-red-500 text-white">1</button>
          <button className="border rounded-md p-2">2</button>
          <button className="border rounded-md p-2">3</button>
          <button className="border rounded-md p-2">4</button>
          <button className="border rounded-md p-2">{'>'}</button>
          <div className="text-sm text-gray-500">/ Page</div>
        </div>
      </div>
    </div>
  );
}
