import { prisma } from "@/lib/db/prisma";

class QuestionRepository {
  async create(data: {
    question: string;
    image?: string;
    choiceA: string;
    choiceB: string;
    choiceC: string;
    choiceD: string;
    correctAnswer: string;
    explanation?: string;
    order: number;
    examId: string;
  }) {
    return prisma.question.create({
      data,
    });
  }

  async update(
    id: string,
    data: {
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
  ) {
    return prisma.question.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.question.delete({
      where: {
        id,
      },
    });
  }
}

export default new QuestionRepository();
