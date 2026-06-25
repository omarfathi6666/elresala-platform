import AdminLayout from "@/features/admin/layout";
import ChapterDetailsPage from "@/features/admin/chapters/ChapterDetailsPage";

interface PageProps {
  params: Promise<{
    chapterId: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { chapterId } = await params;

  return (
    <AdminLayout>
      <ChapterDetailsPage chapterId={chapterId} />
    </AdminLayout>
  );
}
