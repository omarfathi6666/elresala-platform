import DashboardLayout from "@/features/dashboard/layout";
import LecturesPage from "@/features/dashboard/lectures";

export default function Page() {
  return (
    <DashboardLayout>
      <LecturesPage />
    </DashboardLayout>
  );
}