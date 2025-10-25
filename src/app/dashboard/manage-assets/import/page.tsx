"use client";

import { useRouter } from 'next/navigation';
import ImportAssets from "../../../components/SupperAdminModules/ManageAssets/ImportAssets";

export default function ImportAssetsPage() {
  const router = useRouter();

  const handleImportComplete = () => {
    // Redirect to Dashboard / Manage Assets when import is completed
    router.push('/dashboard/manage-assets');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black ">Import Assets</h1>
        <p className="text-gray-500">Dashboard / Manage Assets / Import</p>
      </div>
      <ImportAssets onBack={handleImportComplete} />
    </div>
  );
}
