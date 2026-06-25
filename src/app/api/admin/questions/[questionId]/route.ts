import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { QuestionService } from "@/services/question";

interface Params {
  params: Promise<{
    questionId: string;
  }>;
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { questionId } = await params;
    const body = await request.json();

    if (
      !body.question ||
      !body.choiceA ||
      !body.choiceB ||
      !body.choiceC ||
      !body.choiceD ||
      !body.correctAnswer
    ) {
      return fail("البيانات غير مكتملة", 400);
    }

    const question = await QuestionService.update(
      questionId,
      {
        question: body.question,
        image: body.image || "",
        choiceA: body.choiceA,
        choiceB: body.choiceB,
        choiceC: body.choiceC,
        choiceD: body.choiceD,
        correctAnswer: body.correctAnswer,
        explanation: body.explanation || "",
        order: Number(body.order) || 1,
      }
    );

    return success(question, "تم تعديل السؤال");
  });
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { questionId } = await params;

    await QuestionService.delete(questionId);

    return success(null, "تم حذف السؤال");
  });
}
