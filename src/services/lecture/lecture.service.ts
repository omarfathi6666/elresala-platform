import { prisma } from "@/lib/db/prisma";

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
    return prisma.lecture.findMany({
      include: {
        chapter: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });
  }

  static async create(data: CreateLectureDto) {
    return prisma.lecture.create({
      data,
    });
  }
}