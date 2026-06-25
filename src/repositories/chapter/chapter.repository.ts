import { prisma } from "@/lib/db/prisma";

class ChapterRepository {
  async findAll() {
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

  async create(data: {
    title: string;
    order: number;
    courseId: string;
  }) {
    return prisma.chapter.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.chapter.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
        lectures: {
          include: {
            exams: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      title: string;
      order: number;
      courseId: string;
    }
  ) {
    return prisma.chapter.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.chapter.delete({
      where: {
        id,
      },
    });
  }
}

export default new ChapterRepository();
