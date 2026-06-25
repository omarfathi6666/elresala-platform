import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { QuestionService } from "@/services/question";

interface ImportQuestionInput {
  question: string;
  image?: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: string;
  explanation?: string;
  order: number;
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const examId = body.examId as string;
    const questions =
      (body.questions as ImportQuestionInput[]) || [];

    if (!examId || questions.length === 0) {
      return fail("بيانات الاستيراد غير مكتملة", 400);
    }

    const created = [];

    for (const [index, item] of questions.entries()) {
      if (
        !item.question ||
        !item.choiceA ||
        !item.choiceB ||
        !item.choiceC ||
        !item.choiceD
      ) {
        continue;
      }

      const question = await QuestionService.create({
        examId,
        question: item.question,
        image: item.image || "",
        choiceA: item.choiceA,
        choiceB: item.choiceB,
        choiceC: item.choiceC,
        choiceD: item.choiceD,
        correctAnswer:
          (item.correctAnswer || "A").toUpperCase(),
        explanation: item.explanation || "",
        order: Number(item.order) || index + 1,
      });

      created.push(question);
    }

    return success(created, "تم استيراد الأسئلة");
  });
}
