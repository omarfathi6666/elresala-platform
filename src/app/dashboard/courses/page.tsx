import DashboardLayout from "@/features/dashboard/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import Breadcrumbs from "@/features/dashboard/shared/Breadcrumbs";
import ActivateCodeButton from "@/features/dashboard/home/ActivateCodeButton";

export default async function Page() {
  const session = await getStudentSession();

  if (!session) {
    notFound();
  }

  const courses =
    await StudentAccessService.getCoursesWithAccess(
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
              <div
                key={course.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  {course.title}
                </h2>

                <p className="mt-2 text-slate-500">
                  {course.description || "بدون وصف"}
                </p>

                {course.isLocked ? (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Lock size={16} />
                      <span className="font-semibold">
                        This content is locked.
                      </span>
                    </div>

                    <div className="mt-3">
                      <ActivateCodeButton label="Activate Code" />
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="mt-4 inline-block rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white"
                  >
                    فتح المادة
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}