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

export interface StudentDashboardSummary {
  studentName: string;
  watchedLectures: number;
  examsCount: number;
  progress: number;
}

export interface StudentProfileSummary {
  name: string;
  phone: string;
  parentPhone: string;
  governorate: string;
  grade: string;
  email: string;
  watchedLectures: number;
  examsCount: number;
  averageResult: number;
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

  static async getDashboardSummary(
    studentId: string
  ): Promise<StudentDashboardSummary> {
    const student = await StudentRepository.findById(studentId);

    if (!student) {
      throw new Error("الطالب غير موجود");
    }

    const examsCount =
      await StudentRepository.countExamResultsByStudentId(
        studentId
      );

    return {
      studentName: student.name,
      watchedLectures: 0,
      examsCount,
      progress: 0,
    };
  }

  static async getProfileSummary(
    studentId: string
  ): Promise<StudentProfileSummary> {
    const profile =
      await StudentRepository.findProfileById(
        studentId
      );

    if (!profile) {
      throw new Error("الطالب غير موجود");
    }

    const examsCount =
      await StudentRepository.countExamResultsByStudentId(
        studentId
      );

    const results =
      await StudentRepository.findExamResultsByStudentId(
        studentId
      );

    const averageResult =
      results.length === 0
        ? 0
        : Math.round(
            results.reduce((sum, item) => {
              if (!item.total || item.total <= 0) {
                return sum;
              }

              return (
                sum +
                (item.score / item.total) * 100
              );
            }, 0) / results.length
          );

    return {
      name: profile.name,
      phone: profile.phone,
      parentPhone: profile.parentPhone ?? "غير مضاف",
      governorate: profile.governorate,
      grade: profile.grade,
      email: profile.email ?? "غير مضاف",
      watchedLectures: 0,
      examsCount,
      averageResult,
    };
  }
}
