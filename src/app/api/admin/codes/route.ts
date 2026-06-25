import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { CodeService } from "@/services/code";

export async function GET() {
  return apiHandler(async () => {
    const codes = await CodeService.getAll();

    return success(codes);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const courseId = body.courseId;
    const chapterId =
      typeof body.chapterId === "string" && body.chapterId.trim()
        ? body.chapterId
        : undefined;
    const lectureId =
      typeof body.lectureId === "string" && body.lectureId.trim()
        ? body.lectureId
        : undefined;
    const quantity = Number(body.quantity);
    const maxDevices = Number(body.maxDevices ?? 1);
    const expiresAt = body.expiresAt
      ? new Date(body.expiresAt)
      : null;

    if (!courseId) {
      return fail("يجب اختيار الكورس", 400);
    }

    if (!quantity || quantity < 1) {
      return fail("عدد الأكواد غير صحيح", 400);
    }

    if (!maxDevices || maxDevices < 1) {
      return fail("عدد الأجهزة غير صحيح", 400);
    }

    const codes = await CodeService.create({
      courseId,
      chapterId,
      lectureId,
      quantity,
      maxDevices,
      expiresAt,
    });

    return success(
      codes,
      "تم إنشاء الأكواد بنجاح"
    );
  });
}