import DashboardLayout from "@/features/dashboard/layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import Breadcrumbs from "@/features/dashboard/shared/Breadcrumbs";

interface PageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { examId } = await params;
  const session = await getStudentSession();

  if (!session) {
    notFound();
  }

  const exam =
    await StudentAccessService.getExamPageData(
      session.studentId,
      examId
    );

  if (!exam) {
    notFound();
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", href: "/dashboard" },
            {
              label: exam.lecture.chapter.course.title,
              href: `/dashboard/courses/${exam.lecture.chapter.course.id}`,
            },
            {
              label: exam.lecture.chapter.title,
              href: `/dashboard/chapters/${exam.lecture.chapter.id}`,
            },
            {
              label: exam.lecture.title,
              href: `/dashboard/player/${exam.lecture.id}`,
            },
            { label: exam.title },
          ]}
        />

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            {exam.title}
          </h1>
          <p className="mt-2 text-slate-500">
            {exam.lecture.chapter.title}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">المدة</p>
            <h2 className="mt-2 text-2xl font-black">
              {exam.duration} دقيقة
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">الدرجة الكلية</p>
            <h2 className="mt-2 text-2xl font-black">
              {exam.totalMarks}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">عدد الأسئلة</p>
            <h2 className="mt-2 text-2xl font-black">
              {exam.questions.length}
            </h2>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black">الأسئلة</h2>
          <div className="mt-5 space-y-3">
            {exam.questions.map((question) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <p className="font-bold text-slate-900">
                  {question.question}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href={`/dashboard/exams/${exam.id}/result`}
              className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white"
            >
              صفحة النتيجة
            </Link>

            <Link
              href={`/dashboard/exams/${exam.id}/review`}
              className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700"
            >
              صفحة المراجعة
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}