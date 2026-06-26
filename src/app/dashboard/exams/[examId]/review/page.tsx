import DashboardLayout from "@/features/dashboard/layout";
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

  let exam = null;
  let accessError = "";

  try {
    exam = await StudentAccessService.getExamPageData(
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
            {
              label: exam.title,
              href: `/dashboard/exams/${exam.id}`,
            },
            { label: "المراجعة" },
          ]}
        />

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            مراجعة: {exam.title}
          </h1>
          <p className="mt-2 text-slate-500">
            جميع الأسئلة المتاحة في هذا الامتحان
          </p>
        </div>

        <div className="space-y-4">
          {exam.questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-black text-slate-900">
                السؤال {index + 1}
              </h2>

              <p className="mt-3 text-slate-700">
                {question.question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}