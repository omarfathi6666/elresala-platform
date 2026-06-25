import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { QuestionService } from "@/services/question";

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    if (
      !body.examId ||
      !body.question ||
      !body.choiceA ||
      !body.choiceB ||
      !body.choiceC ||
      !body.choiceD ||
      !body.correctAnswer
    ) {
      return fail("البيانات غير مكتملة", 400);
    }

    const question = await QuestionService.create({
      examId: body.examId,
      question: body.question,
      image: body.image || "",
      choiceA: body.choiceA,
      choiceB: body.choiceB,
      choiceC: body.choiceC,
      choiceD: body.choiceD,
      correctAnswer: body.correctAnswer,
      explanation: body.explanation || "",
      order: Number(body.order) || 1,
    });

    return success(question, "تم إنشاء السؤال");
  });
}
