import { ChapterRepository } from "@/repositories/chapter";

export interface CreateChapterDto {
  title: string;
  order: number;
  courseId: string;
}

export class ChapterService {
  static async getAll() {
    return ChapterRepository.findAll();
  }

  static async create(data: CreateChapterDto) {
    return ChapterRepository.create(data);
  }

  static async getById(id: string) {
    return ChapterRepository.findById(id);
  }

  static async update(
    id: string,
    data: CreateChapterDto
  ) {
    return ChapterRepository.update(id, data);
  }

  static async delete(id: string) {
    return ChapterRepository.delete(id);
  }
}