import AdminLayout from "@/features/admin/layout";
import AdminDashboard from "@/features/admin/dashboard/AdminDashboard";

export default function Page() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}