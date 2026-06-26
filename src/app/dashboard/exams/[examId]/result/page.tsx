import DashboardLayout from "@/features/dashboard/layout";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
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

  let data = null;
  let accessError = "";

  try {
    data =
      await StudentAccessService.getExamResultPageData(
        session.studentId,
        examId
      );
  } catch (error) {
    accessError =
      error instanceof Error
        ? error.message
        : "Something went wrong.";
  }

  if (accessError) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl bg-white p-6 text-slate-700 shadow-sm">
          {accessError}
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    notFound();
  }

  if (!data.latestResult) {
    redirect(`/dashboard/exams/${data.exam.id}`);
  }

  const score = data.latestResult.score;
  const total = data.latestResult.total;
  const correctAnswers = score;
  const wrongAnswers = Math.max(0, total - score);
  const totalQuestions = total;
  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "الرئيسية", href: "/dashboard" },
            {
              label: data.exam.lecture.chapter.course.title,
              href: `/dashboard/courses/${data.exam.lecture.chapter.course.id}`,
            },
            {
              label: data.exam.lecture.chapter.title,
              href: `/dashboard/chapters/${data.exam.lecture.chapter.id}`,
            },
            {
              label: data.exam.lecture.title,
              href: `/dashboard/player/${data.exam.lecture.id}`,
            },
            {
              label: data.exam.title,
              href: `/dashboard/exams/${data.exam.id}`,
            },
            { label: "النتيجة" },
          ]}
        />

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            نتيجة: {data.exam.title}
          </h1>
          <p className="mt-2 text-slate-500">
            آخر نتيجة مسجلة للطالب في هذا الامتحان
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">الدرجة</p>
            <h2 className="mt-2 text-3xl font-black">
              {score}/{total}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">النسبة</p>
            <h2 className="mt-2 text-3xl font-black">
              {percentage}%
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">الإجابات الصحيحة</p>
            <h2 className="mt-2 text-3xl font-black">
              {correctAnswers}/{totalQuestions}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">الإجابات الخاطئة</p>
            <h2 className="mt-2 text-3xl font-black">
              {wrongAnswers}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-500">تاريخ التسليم</p>
            <h2 className="mt-2 text-lg font-black">
              {data.latestResult
                ? new Date(
                    data.latestResult.submittedAt
                  ).toLocaleDateString("ar-EG")
                : "-"}
            </h2>
          </div>
        </div>

        <div>
          <Link
            href={`/dashboard/exams/${data.exam.id}/review`}
            className="inline-block rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
          >
            Review Answers
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}