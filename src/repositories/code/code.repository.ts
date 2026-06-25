import { prisma } from "@/lib/db";

class CodeRepository {
  async findAll() {
    return prisma.code.findMany({
      include: {
        course: true,
        student: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createMany(data: {
    code: string;
    courseId: string;
    chapterId?: string;
    lectureId?: string;
    expiresAt?: Date | null;
    maxDevices: number;
  }[]) {
    return prisma.code.createMany({
      data: data as any,
    });
  }

  async findByCode(code: string) {
    return prisma.code.findUnique({
      where: {
        code,
      },
      include: {
        course: true,
        student: true,
      },
    });
  }

  async isCodeExists(code: string) {
    const existing = await prisma.code.findUnique({
      where: {
        code,
      },
      select: {
        id: true,
      },
    });

    return Boolean(existing);
  }

  async delete(id: string) {
    return prisma.code.delete({
      where: {
        id,
      },
    });
  }
}

export default new CodeRepository();