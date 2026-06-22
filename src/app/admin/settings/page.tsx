import AdminLayout from "@/features/admin/layout";
import SettingsPage from "@/features/admin/settings";

export default function Page() {
  return (
    <AdminLayout>
      <SettingsPage />
    </AdminLayout>
  );
}