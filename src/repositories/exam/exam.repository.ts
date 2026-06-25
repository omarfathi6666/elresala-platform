import { prisma } from "@/lib/db/prisma";

class ExamRepository {
  async create(data: {
    title: string;
    duration: number;
    totalMarks: number;
    lectureId: string;
  }) {
    return prisma.exam.create({
      data,
    });
  }

  async update(
    examId: string,
    data: {
      title: string;
      duration: number;
      totalMarks: number;
    }
  ) {
    return prisma.exam.update({
      where: {
        id: examId,
      },
      data,
    });
  }

  async delete(examId: string) {
    return prisma.exam.delete({
      where: {
        id: examId,
      },
    });
  }
}

export default new ExamRepository();
