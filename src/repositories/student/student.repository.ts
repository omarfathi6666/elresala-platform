import { prisma } from "@/lib/db";

class StudentRepository {
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
