import { Metadata } from "next";
import UserDashboardContent from "./UserdashboardContent";
export const metadata: Metadata = {
  title: "4ami International",
};
export default function UserDashboardPage() {
  return <UserDashboardContent />;
} 