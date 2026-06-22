import DashboardLayout from "@/features/dashboard/layout";
import ChaptersPage from "@/features/dashboard/chapters/ChaptersPage";

export default function Page() {
  return (
    <DashboardLayout>
      <ChaptersPage />
    </DashboardLayout>
  );
}