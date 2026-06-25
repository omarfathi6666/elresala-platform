import AdminLayout from "@/features/admin/layout";
import ExamDetailsPage from "@/features/admin/exams/ExamDetailsPage";

interface PageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { examId } = await params;

  return (
    <AdminLayout>
      <ExamDetailsPage lectureId={examId} />
    </AdminLayout>
  );
}