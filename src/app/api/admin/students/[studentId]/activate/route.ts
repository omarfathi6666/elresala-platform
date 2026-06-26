import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { getAdminSession } from "@/lib/auth/admin-session";
import { StudentManagementService } from "@/services/student-management";

interface Params {
  params: Promise<{
    studentId: string;
  }>;
}

export async function PATCH(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const session = await getAdminSession();

    if (!session) {
      return fail("Unauthorized.", 401);
    }

    const { studentId } = await params;

    await StudentManagementService.activateStudent(studentId);

    return success(null, "Student activated.");
  });
}
