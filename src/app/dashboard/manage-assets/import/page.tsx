"use client";

import { useState } from 'react';
import Link from 'next/link';
import ImportAssets from "../../../components/SupperAdminModules/ManageAssets/ImportAssets";

export default function ImportAssetsPage() {
  const [showForm, setShowForm] = useState(true);

  if (!showForm) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Manage Assets</h1>
          <p className="text-gray-500">Dashboard / Manage Assets</p>
        </div>
        <div className="text-center py-8">
          <p className="text-green-600 mb-4">Assets imported successfully!</p>
          <Link 
            href="/dashboard/manage-assets" 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Back to Manage Assets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Import Assets</h1>
        <p className="text-gray-500">Dashboard / Manage Assets / Import</p>
      </div>
      <ImportAssets onBack={() => setShowForm(false)} />
    </div>
  );
}
