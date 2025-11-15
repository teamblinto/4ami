"use client";

import AddAssets from "../../../components/SupperAdminModules/ManageAssets/AddAssets/AddAssets";

export default function AddAssetPage() {



  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black ">Add New Asset</h1>
        <p className="text-gray-500">Dashboard / Manage Assets / Add Asset</p>
      </div>
      <AddAssets />
    </div>
  );
}
