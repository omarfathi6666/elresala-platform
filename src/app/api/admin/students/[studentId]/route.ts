import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { getAdminSession } from "@/lib/auth/admin-session";
import { StudentManagementService } from "@/services/student-management";

interface Params {
  params: Promise<{
    studentId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const session = await getAdminSession();

    if (!session) {
      return fail("Unauthorized.", 401);
    }

    const { studentId } = await params;

    const [student, subscriptions, progress, exams] = await Promise.all([
      StudentManagementService.getStudentById(studentId),
      StudentManagementService.getStudentSubscriptions(studentId),
      StudentManagementService.getStudentProgress(studentId),
      StudentManagementService.getStudentExamHistory(studentId),
    ]);

    const activity = [
      {
        label: "Registered",
        at: student.createdAt,
      },
      ...(student.lastLoginAt
        ? [
            {
              label: "Latest login",
              at: student.lastLoginAt,
            },
          ]
        : []),
      ...subscriptions.map((item) => ({
        label: `Activated code ${item.code}`,
        at: item.activatedAt,
      })),
      ...exams.map((item) => ({
        label: `Completed exam ${item.examTitle}`,
        at: item.submittedAt,
      })),
    ].sort((a, b) => b.at.getTime() - a.at.getTime());

    return success({
      student,
      subscriptions,
      progress,
      exams,
      activity,
    });
  });
}
