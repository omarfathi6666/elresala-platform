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

  const lectures =
    await StudentAccessService.getLecturesWithAccess(
      session.studentId
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", href: "/dashboard" },
            { label: "المحاضرات" },
          ]}
        />

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
              <div
                key={lecture.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="font-bold text-slate-900">
                  {lecture.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {lecture.chapter.title} - {lecture.chapter.course.title}
                </p>

                {lecture.isLocked ? (
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
                    href={`/dashboard/player/${lecture.id}`}
                    className="mt-4 inline-block rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white"
                  >
                    فتح المحاضرة
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