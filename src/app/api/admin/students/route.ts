import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { getAdminSession } from "@/lib/auth/admin-session";
import { StudentManagementService } from "@/services/student-management";

export async function GET(request: Request) {
  return apiHandler(async () => {
    const session = await getAdminSession();

    if (!session) {
      return fail("Unauthorized.", 401);
    }

    const { searchParams } = new URL(request.url);

    const data = await StudentManagementService.getStudents({
      search: searchParams.get("search") ?? undefined,
      status:
        (searchParams.get("status") as
          | "all"
          | "active"
          | "suspended"
          | null) ?? undefined,
      codeStatus:
        (searchParams.get("codeStatus") as
          | "all"
          | "has-active-codes"
          | "no-active-codes"
          | null) ?? undefined,
      sort:
        (searchParams.get("sort") as
          | "newest"
          | "oldest"
          | "highest-progress"
          | "lowest-progress"
          | null) ?? undefined,
      page: Number(searchParams.get("page") ?? "1"),
      pageSize: Number(searchParams.get("pageSize") ?? "10"),
    });

    const stats = await StudentManagementService.getStudentStatistics();

    return success({
      ...data,
      stats,
    });
  });
}
