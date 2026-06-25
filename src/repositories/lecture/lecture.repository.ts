import { prisma } from "@/lib/db/prisma";

class LectureRepository {
  async findAll() {
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

  async create(data: {
    title: string;
    description?: string;
    videoUrl?: string;
    pdfUrl?: string;
    duration?: number;
    order: number;
    chapterId: string;
  }) {
    return prisma.lecture.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.lecture.findUnique({
      where: {
        id,
      },
      include: {
        chapter: {
          include: {
            course: true,
          },
        },
        exams: {
          include: {
            questions: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      title: string;
      description?: string;
      videoUrl?: string;
      pdfUrl?: string;
      duration?: number;
      order: number;
      chapterId: string;
    }
  ) {
    return prisma.lecture.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.lecture.delete({
      where: {
        id,
      },
    });
  }
}

export default new LectureRepository();
