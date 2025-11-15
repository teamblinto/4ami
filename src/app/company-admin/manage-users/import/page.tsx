"use client";

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import ImportUsers from "../../../components/CompanyAdminModules/ImportUsers/ImportUsers";

export default function ImportUsersPage() {
  const router = useRouter();

  const handleImportComplete = () => {
    // Redirect to Company Admin / Manage Users when import is completed
    router.push('/company-admin/manage-users');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">Add User</h1>
        <p className="text-gray-500">Dashboard / Manage User / Add User</p>
      </div>
      <ImportUsers onBack={handleImportComplete} />
    </div>
  );
}
