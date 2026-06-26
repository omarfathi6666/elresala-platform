import { prisma } from "@/lib/db/prisma";

type ExamAvailabilityMode =
  | "IMMEDIATELY"
  | "AFTER_LECTURE_COMPLETION"
  | "SPECIFIC_DATE"
  | "HIDDEN";

class ExamRepository {
  async create(data: {
    title: string;
    duration: number;
    totalMarks: number;
    lectureId: string;
    availabilityMode: ExamAvailabilityMode;
    availableFrom?: Date | null;
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
      availabilityMode: ExamAvailabilityMode;
      availableFrom?: Date | null;
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
