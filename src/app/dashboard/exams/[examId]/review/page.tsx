import DashboardLayout from "@/features/dashboard/layout";
import { notFound, redirect } from "next/navigation";
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
    data = await StudentAccessService.getExamReviewPageData(
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
    redirect(`/dashboard/exams/${examId}`);
  }

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
            { label: "المراجعة" },
          ]}
        />

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            مراجعة: {data.exam.title}
          </h1>
          <p className="mt-2 text-slate-500">
            إجابات الطالب مقابل الإجابات الصحيحة
          </p>
        </div>

        <div className="space-y-4">
          {data.reviewItems.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-black text-slate-900">
                السؤال {index + 1}
                </h2>
                <span className="font-bold text-slate-700">
                  {item.isCorrect ? "✅ Correct" : "❌ Wrong"}
                </span>
              </div>

              <p className="mt-3 text-slate-700">
                {item.question}
              </p>

              <p className="mt-3 text-sm text-slate-600">
                Student answer: {item.studentAnswer}
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                Correct answer: {item.correctAnswer}
              </p>

              {item.explanation ? (
                <p className="mt-2 text-sm text-slate-500">
                  Explanation: {item.explanation}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}