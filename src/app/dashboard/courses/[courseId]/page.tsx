import DashboardLayout from "@/features/dashboard/layout";
import CoursesPage from "@/features/dashboard/courses/CoursesPage";

export default function Page() {
  return (
    <DashboardLayout>
      <CoursesPage />
    </DashboardLayout>
  );
}