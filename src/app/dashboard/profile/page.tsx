import DashboardLayout from "@/features/dashboard/layout";
import ProfilePage from "@/features/dashboard/profile";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";

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
      <ProfilePage />
    </DashboardLayout>
  );
}