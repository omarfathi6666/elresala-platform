import DashboardLayout from "@/features/dashboard/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import Breadcrumbs from "@/features/dashboard/shared/Breadcrumbs";

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

  const courses =
    await StudentAccessService.getAllowedCourses(
      session.studentId
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", href: "/dashboard" },
            { label: "موادي" },
          ]}
        />

        <h1 className="text-3xl font-black text-slate-900">
          موادي
        </h1>

        {courses.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
            لا توجد مواد متاحة حالياً.
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/dashboard/courses/${course.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-500"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  {course.title}
                </h2>

                <p className="mt-2 text-slate-500">
                  {course.description || "بدون وصف"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}