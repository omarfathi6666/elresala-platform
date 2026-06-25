import { QuestionRepository } from "@/repositories/question";

export interface CreateQuestionDto {
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
}

export interface UpdateQuestionDto {
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

export class QuestionService {
  static async create(data: CreateQuestionDto) {
    return QuestionRepository.create(data);
  }

  static async update(
    id: string,
    data: UpdateQuestionDto
  ) {
    return QuestionRepository.update(id, data);
  }

  static async delete(id: string) {
    return QuestionRepository.delete(id);
  }
}
