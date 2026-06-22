import AdminLayout from "@/features/admin/layout";
import StudentsPage from "@/features/admin/students";

export default function Page() {
  return (
    <AdminLayout>
      <StudentsPage />
    </AdminLayout>
  );
}