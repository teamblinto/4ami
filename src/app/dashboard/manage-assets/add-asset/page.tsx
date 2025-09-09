"use client";

import { useState } from 'react';
import Link from 'next/link';
import AddAssets from "../../../AddAssets/AddAssets";

export default function AddAssetPage() {
  const [showForm, setShowForm] = useState(true);



  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black ">Add New Asset</h1>
        <p className="text-gray-500">Dashboard / Manage Assets / Add Asset</p>
      </div>
      <AddAssets onBack={() => setShowForm(false)} />
    </div>
  );
}
