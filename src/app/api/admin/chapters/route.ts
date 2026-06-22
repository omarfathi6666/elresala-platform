import { apiHandler } from "@/lib/api/api-handler";
import { success, fail } from "@/lib/api/api-response";
import { ChapterService } from "@/services/chapter/chapter.service";

export async function GET() {
  return apiHandler(async () => {
    return success(await ChapterService.getAll());
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    if (!body.title || !body.courseId) {
      return fail("البيانات غير مكتملة", 400);
    }

    const chapter = await ChapterService.create({
      title: body.title,
      order: Number(body.order),
      courseId: body.courseId,
    });

    return success(chapter, "تم إنشاء الفصل");
  });
}