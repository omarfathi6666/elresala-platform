import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { verifyToken } from "@/lib/auth/jwt";
import { getSession } from "@/lib/auth/session";
import { CodeService } from "@/services/code";

export async function POST(request: Request) {
  return apiHandler(async () => {
    const token = await getSession();

    if (!token) {
      return fail("Unauthorized.", 401);
    }

    const payload = await verifyToken(token);

    if (payload.role !== "STUDENT") {
      return fail("Access denied.", 403);
    }

    const body = await request.json();
    const code = body.code?.trim();

    if (!code) {
      return fail("Invalid activation code.", 400);
    }

    const activation =
      await CodeService.activateForStudent({
        studentId: payload.id,
        code,
      });

    return success(
      activation,
      "Activation successful."
    );
  });
}
