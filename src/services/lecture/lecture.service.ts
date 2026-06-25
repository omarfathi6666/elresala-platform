import { LectureRepository } from "@/repositories/lecture";

export interface CreateLectureDto {
  title: string;
  description?: string;
  videoUrl?: string;
  pdfUrl?: string;
  duration?: number;
  order: number;
  chapterId: string;
}

export class LectureService {
  static async getAll() {
    return LectureRepository.findAll();
  }

  static async create(data: CreateLectureDto) {
    return LectureRepository.create(data);
  }

  static async getById(id: string) {
    return LectureRepository.findById(id);
  }

  static async update(
    id: string,
    data: CreateLectureDto
  ) {
    return LectureRepository.update(id, data);
  }

  static async delete(id: string) {
    return LectureRepository.delete(id);
  }
}