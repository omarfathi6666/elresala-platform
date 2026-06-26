import { ExamRepository } from "@/repositories/exam";

export interface CreateExamDto {
  title: string;
  duration: number;
  totalMarks: number;
  lectureId: string;
  availabilityMode:
    | "IMMEDIATELY"
    | "AFTER_LECTURE_COMPLETION"
    | "SPECIFIC_DATE"
    | "HIDDEN";
  availableFrom?: Date | null;
}

export class ExamService {
  static async createExam(data: CreateExamDto) {
    return ExamRepository.create(data);
  }

  static async updateExam(
    examId: string,
    data: Omit<CreateExamDto, "lectureId">
  ) {
    return ExamRepository.update(examId, data);
  }

  static async deleteExam(examId: string) {
    return ExamRepository.delete(examId);
  }
}
