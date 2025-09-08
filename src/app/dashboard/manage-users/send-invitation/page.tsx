"use client";

import { useState } from 'react';
import Link from 'next/link';
import SendInvitationForm from "../../../components/SupperAdminModules/ManageUsers/SendInvitationForm";

export default function SendInvitationPage() {
  const [showForm, setShowForm] = useState(true);

  if (!showForm) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-gray-500">Dashboard / Manage User</p>
        </div>
        <div className="text-center py-8">
          <p className="text-green-600 mb-4">Invitation sent successfully!</p>
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
        <h1 className="text-3xl font-bold">Send an Invitation</h1>
        <p className="text-gray-500">Dashboard / Manage User / Send Invitation</p>
      </div>
      <SendInvitationForm onInvitationSent={() => setShowForm(false)} />
    </div>
  );
}
