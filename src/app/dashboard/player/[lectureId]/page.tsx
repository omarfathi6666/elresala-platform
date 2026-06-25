import DashboardLayout from "@/features/dashboard/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import Breadcrumbs from "@/features/dashboard/shared/Breadcrumbs";

interface PageProps {
  params: Promise<{
    lectureId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { lectureId } = await params;
  const session = await getStudentSession();

  if (!session) {
    notFound();
  }

  const lecture =
    await StudentAccessService.getLecturePageData(
      session.studentId,
      lectureId
    );

  if (!lecture) {
    notFound();
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", href: "/dashboard" },
            {
              label: lecture.chapter.course.title,
              href: `/dashboard/courses/${lecture.chapter.course.id}`,
            },
            {
              label: lecture.chapter.title,
              href: `/dashboard/chapters/${lecture.chapter.id}`,
            },
            { label: lecture.title },
          ]}
        />

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            {lecture.title}
          </h1>
          <p className="mt-2 text-slate-500">
            {lecture.chapter.course.title} - {lecture.chapter.title}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black">بيانات المحاضرة</h2>

          <p className="mt-4 text-slate-600">
            {lecture.description || "لا يوجد وصف لهذه المحاضرة."}
          </p>

          {lecture.videoUrl ? (
            <a
              href={lecture.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
            >
              فتح الفيديو
            </a>
          ) : null}

          {lecture.pdfUrl ? (
            <a
              href={lecture.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded-2xl border border-slate-300 px-6 py-3 font-bold text-slate-700"
            >
              فتح ملف PDF
            </a>
          ) : null}
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black">الامتحانات المرتبطة</h2>

          <div className="mt-4 space-y-3">
            {lecture.exams.map((exam) => (
              <Link
                key={exam.id}
                href={`/dashboard/exams/${exam.id}`}
                className="block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-500"
              >
                <h3 className="font-bold text-slate-900">
                  {exam.title}
                </h3>
              </Link>
            ))}

            {lecture.exams.length === 0 ? (
              <p className="text-slate-500">
                لا توجد امتحانات لهذه المحاضرة.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}