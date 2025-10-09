"use client";

import { useRouter } from 'next/navigation';
import ImportUsers from "../../../components/SupperAdminModules/ManageUsers/ImportUsers";

export default function ImportUsersPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Import User Data</h1>
        <p className="text-gray-500">Dashboard / Manage Users / Import</p>
      </div>
      <ImportUsers onBack={handleBack} />
    </div>
  );
}
