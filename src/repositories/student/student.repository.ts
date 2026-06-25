import { prisma } from "@/lib/db";

class StudentRepository {
  async findById(id: string) {
    return prisma.student.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findProfileById(id: string) {
    return prisma.student.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        parentPhone: true,
        governorate: true,
        grade: true,
        email: true,
      },
    });
  }

  async countExamResultsByStudentId(studentId: string) {
    return prisma.examResult.count({
      where: {
        studentId,
      },
    });
  }

  async findExamResultsByStudentId(studentId: string) {
    return prisma.examResult.findMany({
      where: {
        studentId,
      },
      select: {
        score: true,
        total: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.student.findUnique({
      where: {
        email,
      },
    });
  }

  async findByPhone(phone: string) {
    return prisma.student.findUnique({
      where: {
        phone,
      },
    });
  }

  async create(data: {
    name: string;
    phone: string;
    email?: string;
    password: string;
    governorate: string;
    grade: string;
    parentPhone?: string;
  }) {
    return prisma.student.create({
      data,
    });
  }
}

export default new StudentRepository();
