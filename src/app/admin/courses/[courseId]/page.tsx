import AdminLayout from "@/features/admin/layout";
import CourseDetailsPage from "@/features/admin/courses/CourseDetailsPage";

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { courseId } = await params;

  return (
    <AdminLayout>
      <CourseDetailsPage courseId={courseId} />
    </AdminLayout>
  );
}
