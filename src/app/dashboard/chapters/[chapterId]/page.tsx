import DashboardLayout from "@/features/dashboard/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";

interface PageProps {
  params: Promise<{
    chapterId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { chapterId } = await params;
  const session = await getStudentSession();

  if (!session) {
    notFound();
  }

  const data =
    await StudentAccessService.getChapterPageData(
      session.studentId,
      chapterId
    );

  if (!data) {
    notFound();
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            {data.chapter.title}
          </h1>
          <p className="mt-2 text-slate-500">
            {data.chapter.course.title}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {data.lectures.map((lecture) => (
            <Link
              key={lecture.id}
              href={`/dashboard/player/${lecture.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-500"
            >
              <h2 className="font-bold text-slate-900">
                {lecture.title}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                مدة المحاضرة: {lecture.duration ?? 0} دقيقة
              </p>
            </Link>
          ))}
        </div>

        {data.lectures.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
            لا توجد محاضرات متاحة في هذا الفصل.
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}