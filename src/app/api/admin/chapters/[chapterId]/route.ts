import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { ChapterService } from "@/services/chapter/chapter.service";

interface Params {
  params: Promise<{
    chapterId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { chapterId } = await params;
    const chapter = await ChapterService.getById(chapterId);

    if (!chapter) {
      return fail("الفصل غير موجود", 404);
    }

    return success(chapter);
  });
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { chapterId } = await params;
    const body = await request.json();

    if (!body.title || !body.courseId) {
      return fail("البيانات غير مكتملة", 400);
    }

    const chapter = await ChapterService.update(
      chapterId,
      {
        title: body.title,
        order: Number(body.order),
        courseId: body.courseId,
      }
    );

    return success(chapter, "تم تعديل الفصل");
  });
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { chapterId } = await params;

    await ChapterService.delete(chapterId);

    return success(null, "تم حذف الفصل");
  });
}
