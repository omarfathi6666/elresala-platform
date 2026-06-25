import Link from "next/link";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import ActivationWelcome from "./ActivationWelcome";
import Breadcrumbs from "../shared/Breadcrumbs";

export default async function DashboardHome() {
  const session = await getStudentSession();

  if (!session) {
    return null;
  }

  const homeData = await StudentAccessService.getHomeData(
    session.studentId
  );

  if (!homeData.hasAccess) {
    return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
        <ActivationWelcome
          studentName={homeData.studentName}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: "الرئيسية" }]}
      />

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">
          أهلاً {homeData.studentName}
        </h1>

        <p className="mt-3 text-slate-600">
          اختر من الاختصارات السريعة للوصول إلى محتواك الدراسي.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {homeData.quickCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center font-bold text-slate-800 shadow-sm transition hover:border-blue-500 hover:text-blue-700"
          >
            {card.title}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">المحاضرات المكتملة</p>
          <h2 className="mt-2 text-3xl font-black">
            {homeData.stats.completedLectures}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">الاختبارات المكتملة</p>
          <h2 className="mt-2 text-3xl font-black">
            {homeData.stats.completedExams}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">متوسط الدرجات</p>
          <h2 className="mt-2 text-3xl font-black">
            {homeData.stats.averageScore}%
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">تقدمي</p>
          <h2 className="mt-2 text-3xl font-black">
            {homeData.stats.progress}%
          </h2>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-slate-500">آخر محاضرة</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">
          {homeData.stats.latestLecture ? (
            <Link
              href={`/dashboard/player/${homeData.stats.latestLecture.id}`}
              className="text-blue-700 hover:underline"
            >
              {homeData.stats.latestLecture.title}
            </Link>
          ) : (
            "لا توجد محاضرة مكتملة بعد"
          )}
        </h2>
      </div>
    </div>
  );
}