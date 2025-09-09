"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SendInvitationForm from "../../../components/SupperAdminModules/ManageUsers/SendInvitationForm";

export default function SendInvitationPage() {
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black ">Send an Invitation</h1>
        <p className="text-gray-500">Dashboard / Manage User / Send Invitation</p>
      </div>
      <SendInvitationForm onInvitationSent={handleBack} />
    </div>
  );
}
