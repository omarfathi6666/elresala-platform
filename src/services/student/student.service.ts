import StudentRepository from "@/repositories/student/student.repository";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export interface StudentRegisterDto {
  name: string;
  phone: string;
  email?: string;
  password: string;
  governorate: string;
  grade: string;
  parentPhone?: string;
}

export interface StudentLoginDto {
  phone: string;
  password: string;
}

export class StudentService {
  static async register(data: StudentRegisterDto) {
    if (data.email) {
      const existingStudent = await StudentRepository.findByEmail(
        data.email
      );

      if (existingStudent) {
        throw new Error("البريد الإلكتروني مستخدم بالفعل");
      }
    }

    const hashedPassword = await hashPassword(data.password);

    return StudentRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  static async login(data: StudentLoginDto) {
    const phone = data.phone?.trim();
    const password = data.password;

    if (!phone || !password) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const student = await StudentRepository.findByPhone(phone);

    if (!student) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const validPassword = await verifyPassword(
      password,
      student.password
    );

    if (!validPassword) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    return student;
  }
}
