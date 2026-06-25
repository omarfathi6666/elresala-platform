import DashboardLayout from "@/features/dashboard/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import Breadcrumbs from "@/features/dashboard/shared/Breadcrumbs";

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { courseId } = await params;
  const session = await getStudentSession();

  if (!session) {
    notFound();
  }

  const data =
    await StudentAccessService.getCoursePageData(
      session.studentId,
      courseId
    );

  if (!data) {
    notFound();
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", href: "/dashboard" },
            { label: data.course.title },
          ]}
        />

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            {data.course.title}
          </h1>
          <p className="mt-2 text-slate-500">
            {data.course.description || "بدون وصف"}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="font-black">المحاضرات</h2>
            <p className="mt-2 text-2xl font-black text-blue-700">
              {data.lectures.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="font-black">الامتحانات</h2>
            <p className="mt-2 text-2xl font-black text-blue-700">
              {data.exams.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="font-black">التقدم</h2>
            <p className="mt-2 text-2xl font-black text-blue-700">
              {data.progress}%
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-100 px-5 py-2 font-bold text-blue-700">
              المحاضرات
            </span>
            <span className="rounded-full bg-slate-100 px-5 py-2 font-bold text-slate-700">
              الامتحانات
            </span>
            <span className="rounded-full bg-slate-100 px-5 py-2 font-bold text-slate-700">
              التقدم
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {data.lectures.map((lecture) => (
              <Link
                key={lecture.id}
                href={`/dashboard/player/${lecture.id}`}
                className="block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-500"
              >
                <h3 className="font-bold text-slate-900">
                  {lecture.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {lecture.chapter.title}
                </p>
              </Link>
            ))}

            {data.lectures.length === 0 ? (
              <p className="text-slate-500">
                لا توجد محاضرات متاحة في هذا الكورس.
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">
            الامتحانات
          </h2>

          <div className="mt-5 space-y-3">
            {data.exams.map((exam) => (
              <Link
                key={exam.id}
                href={`/dashboard/exams/${exam.id}`}
                className="block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-500"
              >
                <h3 className="font-bold text-slate-900">
                  {exam.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {exam.lecture.title}
                </p>
              </Link>
            ))}

            {data.exams.length === 0 ? (
              <p className="text-slate-500">
                لا توجد امتحانات متاحة الآن.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}