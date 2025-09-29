"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CompanyAdminManageUsersPage() {
  const router = useRouter();

  const handleAddNewUser = () => {
    router.push("/company-admin/manage-users/add-user");
  };

  const handleImportUsers = () => {
    router.push("/company-admin/manage-users/import");
  };

  const handleExportUsers = () => {
    toast.success("Export Users functionality will be implemented");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-medium text-[#343A40] text-2xl">Manage Users</h1>
          <p className="text-[#6C757D] mt-2 font-normal ">
            Company Admin / Manage Users
          </p>
        </div>

        <div className="flex gap-3 space-x-2">
          <button
            onClick={handleAddNewUser}
            className="bg-red-500 text-white px-8 py-2 rounded-[8px] hover:bg-red-600 cursor-pointer"
          >
            + Add New User
          </button>
          <button
            onClick={handleImportUsers}
            className="bg-white px-8 py-2 rounded-[8px] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Import User Data
          </button>
          <button
            onClick={handleExportUsers}
            className="bg-white px-8 py-2 rounded-[8px] border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3-3m0 0l3 3m-3-3v12"
              />
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
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </span>
            Add Filter
            <span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 cursor-pointer">
            Clear Filter
          </button>
          <button className="h-8 px-3 border border-gray-300 rounded-md text-xs bg-white text-red-600 cursor-pointer">
            Edit Column
          </button>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          Rows per page:
          <select className="h-8 px-2 border border-gray-300 rounded-md text-xs bg-white text-gray-700 ml-2 cursor-pointer">
            <option>10</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD] w-12">
                Select
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                <div className="flex items-center justify-between">
                  <span>Username</span>
                  <img src="/Sort.svg" alt="" />
                </div>
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                First Name
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                Last Name
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                Role
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                E-Mail
              </th>
              <th className="px-6 pt-3 pb-3 text-left text-xs font-medium text-[#6C757D] border border-[#D0D5DD]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Data */}
            {[
              {
                username: "John_32@435",
                firstName: "John",
                lastName: "Doe",
                role: "Admin",
                email: "michael55@gmail.com",
              },
              {
                username: "Jaiden_Nixon@2025",
                firstName: "Jaiden",
                lastName: "Nixon",
                role: "Admin",
                email: "jaiden.n@gmail.com",
              },
              {
                username: "ace.fo",
                firstName: "Ace",
                lastName: "Foster",
                role: "User",
                email: "ace.fo@yahoo.com",
              },
              {
                username: "nikolai.schmidt",
                firstName: "Nikolai",
                lastName: "Schmidt",
                role: "Admin",
                email: "nikolai.schmidt1964@outlook.com",
              },
              {
                username: "me.cc2",
                firstName: "Clark",
                lastName: "Clayton",
                role: "Admin",
                email: "me@clayton.com",
              },
              {
                username: "Chen1997",
                firstName: "Prince",
                lastName: "Chen",
                role: "User",
                email: "prince.chen1997@gmail.com",
              },
              {
                username: "Duran",
                firstName: "Duran",
                lastName: "Reece",
                role: "User",
                email: "reece@yahoo.com",
              },
              {
                username: "anastasia.spring",
                firstName: "Anastasia",
                lastName: "Spring",
                role: "Admin",
                email: "anastasia.spring@mcdaniel12.com",
              },
              {
                username: "Me.boyle",
                firstName: "Matthew",
                lastName: "Boyle",
                role: "Admin",
                email: "Me.boyle@gmail.com",
              },
              {
                username: "Kailee.thomas",
                firstName: "Kailee",
                lastName: "Thomas",
                role: "User",
                email: "Kailee.thomas@gmail.com",
              },
            ].map((user, index) => {
              const isStriped = index % 2 === 0;
              return (
                <tr
                  key={index}
                  className={isStriped ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD] text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] font-medium border border-[#D0D5DD]">
                    {user.username}
                  </td>
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                    {user.firstName}
                  </td>
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                    {user.lastName}
                  </td>
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                    {user.role}
                  </td>
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap text-[#343A40] border border-[#D0D5DD]">
                    {user.email}
                  </td>
                  <td className="px-6 pt-4 pb-4 whitespace-nowrap border border-[#D0D5DD]">
                    <button className="p-3 border border-[#D0D5DD] rounded-md cursor-pointer">
                      <img src="/pencil.svg" alt="" />
                    </button>
                    <button className="p-3 ml-3 border border-[#D0D5DD] rounded-md cursor-pointer">
                      <img src="/bin.svg" alt="" />
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
        <div className="text-sm text-[#343A40]">1-10 of 120 items</div>
        <div className="flex items-center space-x-2">
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="border border-gray-300 rounded-md px-4 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer">
            1
          </button>
          <button className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-gray-700 cursor-pointer">
            2
          </button>
          <button className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-gray-700 cursor-pointer">
            3
          </button>
          <button className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-gray-700 cursor-pointer">
            4
          </button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-50 text-gray-700 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <input
            type="number"
            placeholder="10"
            className="w-16 px-2 text-black py-2 border border-[#343A40] rounded-md text-sm text-center cursor-pointer"
            min="1"
            max="10"
          />
          <div className="text-sm text-[#343A40] ml-2">/Page</div>
        </div>
      </div>
    </div>
  );
}
