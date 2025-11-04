import { Metadata } from "next";
import DashboardContent from "../components/SupperAdminModules/DashboardContent/DashboardContent";
export const metadata: Metadata = {
  title: "4ami International",
};
export default function UserDashboardPage() {
  return <DashboardContent />;
} 