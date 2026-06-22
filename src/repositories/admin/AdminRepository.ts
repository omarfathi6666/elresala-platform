import { prisma } from "@/lib/db";

class AdminRepository {
  async findByEmail(email: string) {
    return prisma.admin.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.admin.create({
      data,
    });
  }
}

export default new AdminRepository();