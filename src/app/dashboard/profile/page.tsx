import DashboardLayout from "@/features/dashboard/layout";
import ProfilePage from "@/features/dashboard/profile";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import Breadcrumbs from "@/features/dashboard/shared/Breadcrumbs";

export default async function Page() {
  const session = await getStudentSession();

  if (!session) {
    notFound();
  }

  const hasAccess =
    await StudentAccessService.hasAnyAccess(
      session.studentId
    );

  if (!hasAccess) {
    notFound();
  }

  return (
    <DashboardLayout>
      <Breadcrumbs
        items={[
          { label: "الرئيسية", href: "/dashboard" },
          { label: "حسابي" },
        ]}
      />

      <ProfilePage />
    </DashboardLayout>
  );
}