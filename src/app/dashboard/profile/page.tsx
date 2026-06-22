import DashboardLayout from "@/features/dashboard/layout";
import ProfilePage from "@/features/dashboard/profile";

export default function Page() {
  return (
    <DashboardLayout>
      <ProfilePage />
    </DashboardLayout>
  );
}