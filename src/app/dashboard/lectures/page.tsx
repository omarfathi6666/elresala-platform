import DashboardLayout from "@/features/dashboard/layout";
import Link from "next/link";
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

  const lectures =
    await StudentAccessService.getAllowedLectures(
      session.studentId
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-black text-slate-900">
          محاضراتي
        </h1>

        {lectures.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
            لا توجد محاضرات متاحة حالياً.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {lectures.map((lecture) => (
              <Link
                key={lecture.id}
                href={`/dashboard/player/${lecture.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-500"
              >
                <h2 className="font-bold text-slate-900">
                  {lecture.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {lecture.chapter.title} - {lecture.chapter.course.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}