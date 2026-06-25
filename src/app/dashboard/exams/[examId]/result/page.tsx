import DashboardLayout from "@/features/dashboard/layout";
import { notFound } from "next/navigation";
import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";

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

  const data =
    await StudentAccessService.getExamResultPageData(
      session.studentId,
      examId
    );

  if (!data) {
    notFound();
  }

  const score = data.latestResult?.score ?? 0;
  const total = data.latestResult?.total ?? data.exam.totalMarks;
  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">
            نتيجة: {data.exam.title}
          </h1>
          <p className="mt-2 text-slate-500">
            آخر نتيجة مسجلة للطالب في هذا الامتحان
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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
            <p className="text-slate-500">تاريخ التسليم</p>
            <h2 className="mt-2 text-lg font-black">
              {data.latestResult
                ? new Date(
                    data.latestResult.submittedAt
                  ).toLocaleDateString("ar-EG")
                : "لا توجد محاولة بعد"}
            </h2>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}