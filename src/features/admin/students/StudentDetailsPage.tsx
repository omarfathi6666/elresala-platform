import Link from "next/link";
import { notFound } from "next/navigation";
import { StudentManagementService } from "@/services/student-management";
import StudentInfoCard from "./StudentInfoCard";
import StudentAdminActions from "./StudentAdminActions";
import ActivationActions from "./ActivationActions";

interface StudentDetailsPageProps {
  studentId: string;
}

function formatDate(value: Date | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

export default async function StudentDetailsPage({
  studentId,
}: StudentDetailsPageProps) {
  let studentData: Awaited<
    ReturnType<typeof StudentManagementService.getStudentById>
  > | null = null;

  try {
    studentData = await StudentManagementService.getStudentById(studentId);
  } catch {
    notFound();
  }

  const [subscriptions, progress, examHistory] = await Promise.all([
    StudentManagementService.getStudentSubscriptions(studentId),
    StudentManagementService.getStudentProgress(studentId),
    StudentManagementService.getStudentExamHistory(studentId),
  ]);

  const activity = [
    {
      label: "Registered",
      at: studentData.createdAt,
    },
    ...(studentData.lastLoginAt
      ? [
          {
            label: "Latest login",
            at: studentData.lastLoginAt,
          },
        ]
      : []),
    ...subscriptions.map((item) => ({
      label: `Activated ${item.code}`,
      at: item.activatedAt,
    })),
    ...examHistory.map((item) => ({
      label: `Completed ${item.examTitle}`,
      at: item.submittedAt,
    })),
  ].sort((a, b) => b.at.getTime() - a.at.getTime());

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-sky-500 p-8 text-white">
        <h1 className="text-4xl font-black">
          {studentData.name}
        </h1>
        <p className="mt-2">
          Student profile and learning details
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StudentInfoCard
          label="Phone"
          value={studentData.phone}
        />
        <StudentInfoCard
          label="Parent Phone"
          value={studentData.parentPhone ?? "-"}
        />
        <StudentInfoCard
          label="Email"
          value={studentData.email ?? "-"}
        />
        <StudentInfoCard
          label="Registration Date"
          value={formatDate(studentData.createdAt)}
        />
        <StudentInfoCard
          label="Last Login"
          value={formatDate(studentData.lastLoginAt)}
        />
        <StudentInfoCard
          label="Status"
          value={studentData.isActive ? "Active" : "Suspended"}
        />
      </div>

      <StudentAdminActions
        studentId={studentId}
        isActive={studentData.isActive}
      />

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Subscriptions</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-right">
                <th className="p-3">Code</th>
                <th className="p-3">Course</th>
                <th className="p-3">Chapter</th>
                <th className="p-3">Lecture</th>
                <th className="p-3">Activated At</th>
                <th className="p-3">Expiration</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3 font-semibold">{item.code}</td>
                  <td className="p-3">{item.course}</td>
                  <td className="p-3">{item.chapter}</td>
                  <td className="p-3">{item.lecture}</td>
                  <td className="p-3">{formatDate(item.activatedAt)}</td>
                  <td className="p-3">{formatDate(item.expiresAt)}</td>
                  <td className="p-3">{item.status}</td>
                  <td className="p-3">
                    <ActivationActions studentId={studentId} codeId={item.id} />
                  </td>
                </tr>
              ))}
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-500">
                    No subscriptions yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Learning Progress</h2>
        <div className="space-y-4">
          {progress.courses.map((course) => (
            <div key={course.courseId} className="rounded-2xl border p-4">
              <h3 className="font-bold text-slate-900">{course.courseTitle}</h3>
              <div className="mt-3 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
                <p>Progress: {course.progress}%</p>
                <p>Chapters completed: {course.chaptersCompleted}</p>
                <p>Lectures watched: {course.lecturesWatched}</p>
                <p>Videos completed: {course.videosCompleted}</p>
                <p>Last lecture watched: {course.lastLectureWatched}</p>
                <p>Time spent learning: {course.timeSpentLearning} min</p>
              </div>
            </div>
          ))}
          {progress.courses.length === 0 ? (
            <p className="text-slate-500">No progress data yet.</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Exam History</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-right">
                <th className="p-3">Exam</th>
                <th className="p-3">Score</th>
                <th className="p-3">Correct</th>
                <th className="p-3">Wrong</th>
                <th className="p-3">Percentage</th>
                <th className="p-3">Submission Time</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {examHistory.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.examTitle}</td>
                  <td className="p-3">{item.score}</td>
                  <td className="p-3">{item.correct}</td>
                  <td className="p-3">{item.wrong}</td>
                  <td className="p-3">{item.percentage}%</td>
                  <td className="p-3">{formatDate(item.submittedAt)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/exams/${item.examId}/result`}
                        className="rounded-xl border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700"
                      >
                        View Result
                      </Link>
                      <Link
                        href={`/dashboard/exams/${item.examId}/review`}
                        className="rounded-xl border border-slate-300 px-3 py-1 text-xs font-bold text-slate-700"
                      >
                        Review Answers
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {examHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    No exam history yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Student Activity</h2>
        <div className="space-y-3">
          {activity.slice(0, 30).map((item, index) => (
            <div key={`${item.label}-${index}`} className="rounded-xl border p-4">
              <p className="font-semibold text-slate-900">{item.label}</p>
              <p className="text-sm text-slate-500 mt-1">{formatDate(item.at)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}