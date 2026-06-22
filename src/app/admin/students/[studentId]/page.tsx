import AdminLayout from "@/features/admin/layout";
import StudentDetailsPage from "@/features/admin/students/StudentDetailsPage";

export default function Page() {
  return (
    <AdminLayout>
      <StudentDetailsPage />
    </AdminLayout>
  );
}