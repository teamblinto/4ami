"use client";

import { useState } from 'react';
import Link from 'next/link';
import ImportUsers from "../../../components/SupperAdminModules/ManageUsers/ImportUsers";

export default function ImportUsersPage() {
  const [showForm, setShowForm] = useState(true);

  if (!showForm) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-gray-500">Dashboard / Manage Users</p>
        </div>
        <div className="text-center py-8">
          <p className="text-green-600 mb-4">Users imported successfully!</p>
          <Link 
            href="/dashboard/manage-users" 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Back to Manage Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Import User Data</h1>
        <p className="text-gray-500">Dashboard / Manage Users / Import</p>
      </div>
      <ImportUsers onBack={() => setShowForm(false)} />
    </div>
  );
}
