import { prisma } from "@/lib/db/prisma";

export interface CreateChapterDto {
  title: string;
  order: number;
  courseId: string;
}

export class ChapterService {
  static async getAll() {
    return prisma.chapter.findMany({
      include: {
        course: true,
        lectures: true,
      },
      orderBy: {
        order: "asc",
      },
    });
  }

  static async create(data: CreateChapterDto) {
    return prisma.chapter.create({
      data,
    });
  }
}