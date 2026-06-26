import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { verifyToken } from "@/lib/auth/jwt";
import { getSession } from "@/lib/auth/session";
import { StudentAccessService } from "@/services/student-access";

interface Params {
  params: Promise<{
    examId: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const token = await getSession();

    if (!token) {
      return fail("Unauthorized.", 401);
    }

    const payload = await verifyToken(token);

    if (payload.role !== "STUDENT") {
      return fail("Access denied.", 403);
    }

    const { examId } = await params;
    const body = await request.json();
    const answers = body.answers;

    if (!answers || typeof answers !== "object") {
      return fail("Invalid exam submission.", 400);
    }

    const result = await StudentAccessService.submitExam(
      payload.id,
      {
        examId,
        answers,
      }
    );

    return success(
      {
        id: result.id,
      },
      "Exam submitted successfully."
    );
  });
}
