import AdminLayout from "@/features/admin/layout";
import LectureDetailsPage from "@/features/admin/lectures/LectureDetailsPage";

interface PageProps {
  params: Promise<{
    lectureId: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { lectureId } = await params;

  return (
    <AdminLayout>
      <LectureDetailsPage lectureId={lectureId} />
    </AdminLayout>
  );
}