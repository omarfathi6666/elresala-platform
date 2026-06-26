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

  const chapters =
    await StudentAccessService.getChaptersWithAccess(
      session.studentId
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", href: "/dashboard" },
            { label: "الفصول" },
          ]}
        />

        <h1 className="text-3xl font-black text-slate-900">
          فصولي
        </h1>

        {chapters.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
            لا توجد فصول متاحة حالياً.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="font-bold text-slate-900">
                  {chapter.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {chapter.course.title}
                </p>

                {chapter.isLocked ? (
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
                    href={`/dashboard/chapters/${chapter.id}`}
                    className="mt-4 inline-block rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white"
                  >
                    فتح الفصل
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