import AdminLayout from "@/features/admin/layout";
import StudentDetailsPage from "@/features/admin/students/StudentDetailsPage";

interface PageProps {
  params: Promise<{
    studentId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { studentId } = await params;

  return (
    <AdminLayout>
      <StudentDetailsPage studentId={studentId} />
    </AdminLayout>
  );
}