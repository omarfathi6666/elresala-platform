import { apiHandler } from "@/lib/api/api-handler";
import { success, fail } from "@/lib/api/api-response";
import { LectureService } from "@/services/lecture/lecture.service";

export async function GET() {
  return apiHandler(async () => {
    return success(await LectureService.getAll());
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    if (!body.title || !body.chapterId) {
      return fail("البيانات غير مكتملة", 400);
    }

    const lecture = await LectureService.create({
      title: body.title,
      description: body.description || "",
      videoUrl: body.videoUrl || "",
      pdfUrl: body.pdfUrl || "",
      duration: Number(body.duration) || 0,
      order: Number(body.order),
      chapterId: body.chapterId,
    });

    return success(lecture, "تم إنشاء المحاضرة");
  });
}