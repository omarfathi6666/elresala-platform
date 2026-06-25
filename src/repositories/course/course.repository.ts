import { prisma } from "@/lib/db/prisma";

class CourseRepository {
  async findAll() {
    return prisma.course.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        chapters: true,
      },
    });
  }

  async create(data: {
    title: string;
    description?: string;
    order: number;
  }) {
    return prisma.course.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          orderBy: {
            order: "asc",
          },
          include: {
            lectures: true,
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
      order: number;
    }
  ) {
    return prisma.course.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.course.delete({
      where: {
        id,
      },
    });
  }
}

export default new CourseRepository();