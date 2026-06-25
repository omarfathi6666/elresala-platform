import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { verifyToken } from "@/lib/auth/jwt";
import { getSession } from "@/lib/auth/session";
import { CodeService } from "@/services/code";

export async function POST(request: Request) {
  return apiHandler(async () => {
    const token = await getSession();

    if (!token) {
      return fail("يجب تسجيل الدخول أولاً", 401);
    }

    const payload = await verifyToken(token);

    if (payload.role !== "STUDENT") {
      return fail("غير مصرح", 403);
    }

    const body = await request.json();
    const code = body.code?.trim();

    if (!code) {
      return fail("يرجى إدخال كود الاشتراك", 400);
    }

    const activation =
      await CodeService.activateForStudent({
        studentId: payload.id,
        code,
      });

    return success(
      activation,
      "تم تفعيل الكود بنجاح"
    );
  });
}
