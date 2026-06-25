import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { ExamService } from "@/services/exam";

interface Params {
  params: Promise<{
    examId: string;
  }>;
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { examId } = await params;
    const body = await request.json();

    const title = body.title?.trim();
    const duration = Number(body.duration);
    const totalMarks = Number(body.totalMarks);

    if (!title) {
      return fail("البيانات غير مكتملة", 400);
    }

    if (Number.isNaN(duration) || Number.isNaN(totalMarks)) {
      return fail("قيم الامتحان غير صحيحة", 400);
    }

    const exam = await ExamService.updateExam(
      examId,
      {
        title,
        duration,
        totalMarks,
      }
    );

    return success(exam, "تم تعديل الامتحان");
  });
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { examId } = await params;

    await ExamService.deleteExam(examId);

    return success(null, "تم حذف الامتحان");
  });
}
