"use client";

import { useRouter } from 'next/navigation';
import SendInvitationForm from "../../../components/SupperAdminModules/ManageUsers/SendInvitationForm";

export default function SendInvitationPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <SendInvitationForm onInvitationSent={handleBack} />
    </div>
  );
}
