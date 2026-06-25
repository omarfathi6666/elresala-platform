import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { LectureService } from "@/services/lecture/lecture.service";

interface Params {
  params: Promise<{
    lectureId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { lectureId } = await params;
    const lecture = await LectureService.getById(lectureId);

    if (!lecture) {
      return fail("المحاضرة غير موجودة", 404);
    }

    return success(lecture);
  });
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { lectureId } = await params;
    const body = await request.json();

    if (!body.title || !body.chapterId) {
      return fail("البيانات غير مكتملة", 400);
    }

    const lecture = await LectureService.update(
      lectureId,
      {
        title: body.title,
        description: body.description || "",
        videoUrl: body.videoUrl || "",
        pdfUrl: body.pdfUrl || "",
        duration: Number(body.duration) || 0,
        order: Number(body.order),
        chapterId: body.chapterId,
      }
    );

    return success(lecture, "تم تعديل المحاضرة");
  });
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { lectureId } = await params;

    await LectureService.delete(lectureId);

    return success(null, "تم حذف المحاضرة");
  });
}
