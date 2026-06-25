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

  const chapters =
    await StudentAccessService.getAllowedChapters(
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
              <Link
                key={chapter.id}
                href={`/dashboard/chapters/${chapter.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-500"
              >
                <h2 className="font-bold text-slate-900">
                  {chapter.title}
                </h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}