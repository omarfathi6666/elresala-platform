import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";

export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface AdminSession {
  id: string;
  name: string;
  email: string;
}

export class AuthService {
  static async loginAdmin(
    data: AdminLoginDto
  ): Promise<AdminSession> {
    const admin = await prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!admin) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const passwordValid = await verifyPassword(
      data.password,
      admin.password
    );

    if (!passwordValid) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  }
}