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

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const title = body.title?.trim();
    const duration = Number(body.duration);
    const totalMarks = Number(body.totalMarks);
    const lectureId = body.lectureId;
    const availabilityMode =
      body.availabilityMode as ExamAvailabilityMode;
    const availableFromRaw = body.availableFrom;

    if (!title || !lectureId) {
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
    const isInvalidSpecificDate =
      availabilityMode === "SPECIFIC_DATE" &&
      (!availableFromRaw ||
        !availableFrom ||
        Number.isNaN(availableFrom.getTime()));

    if (isInvalidSpecificDate) {
      return fail(
        "A valid availability date and time is required.",
        400
      );
    }

    const exam = await ExamService.createExam({
      title,
      duration,
      totalMarks,
      lectureId,
      availabilityMode,
      availableFrom,
    });

    return success(exam, "تم إنشاء الامتحان", 201);
  });
}
