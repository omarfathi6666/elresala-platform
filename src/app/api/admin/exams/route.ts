import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { ExamService } from "@/services/exam";

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const title = body.title?.trim();
    const duration = Number(body.duration);
    const totalMarks = Number(body.totalMarks);
    const lectureId = body.lectureId;

    if (!title || !lectureId) {
      return fail("البيانات غير مكتملة", 400);
    }

    if (Number.isNaN(duration) || Number.isNaN(totalMarks)) {
      return fail("قيم الامتحان غير صحيحة", 400);
    }

    const exam = await ExamService.createExam({
      title,
      duration,
      totalMarks,
      lectureId,
    });

    return success(exam, "تم إنشاء الامتحان", 201);
  });
}
