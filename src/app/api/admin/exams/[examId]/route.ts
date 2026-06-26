import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { ExamService } from "@/services/exam";

const AVAILABILITY_MODES = [
  "IMMEDIATELY",
  "AFTER_LECTURE_COMPLETION",
  "SPECIFIC_DATE",
  "HIDDEN",
] as const;

type ExamAvailabilityMode =
  (typeof AVAILABILITY_MODES)[number];

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
    const availabilityMode =
      body.availabilityMode as ExamAvailabilityMode;
    const availableFromRaw = body.availableFrom;

    if (!title) {
      return fail("البيانات غير مكتملة", 400);
    }

    if (Number.isNaN(duration) || Number.isNaN(totalMarks)) {
      return fail("قيم الامتحان غير صحيحة", 400);
    }

    if (!AVAILABILITY_MODES.includes(availabilityMode)) {
      return fail("Invalid exam availability mode.", 400);
    }

    const availableFrom =
      availabilityMode === "SPECIFIC_DATE"
        ? new Date(availableFromRaw)
        : null;

    if (
      availabilityMode === "SPECIFIC_DATE" &&
      (!availableFromRaw ||
        Number.isNaN(availableFrom.getTime()))
    ) {
      return fail(
        "A valid availability date and time is required.",
        400
      );
    }

    const exam = await ExamService.updateExam(
      examId,
      {
        title,
        duration,
        totalMarks,
        availabilityMode,
        availableFrom,
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
