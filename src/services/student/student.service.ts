import StudentRepository from "@/repositories/student/student.repository";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export interface StudentRegisterDto {
  name: string;
  phone: string;
  email?: string;
  password: string;
  confirmPassword?: string;
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
  private static normalizePhone(phone?: string) {
    return phone?.trim();
  }

  private static isValidPhone(phone: string) {
    return /^01\d{9}$/.test(phone);
  }

  static async register(data: StudentRegisterDto) {
    const phone = this.normalizePhone(data.phone);
    const parentPhone = this.normalizePhone(data.parentPhone);

    if (!phone || !this.isValidPhone(phone)) {
      throw new Error("Invalid phone number.");
    }

    if (
      parentPhone &&
      !this.isValidPhone(parentPhone)
    ) {
      throw new Error("Invalid phone number.");
    }

    if (
      data.confirmPassword !== undefined &&
      data.password !== data.confirmPassword
    ) {
      throw new Error("Passwords do not match.");
    }

    const existingByPhone =
      await StudentRepository.findByPhone(phone);

    if (existingByPhone) {
      throw new Error("Student already exists.");
    }

    if (data.email) {
      const existingStudent = await StudentRepository.findByEmail(
        data.email
      );

      if (existingStudent) {
        throw new Error("Student already exists.");
      }
    }

    const hashedPassword = await hashPassword(data.password);

    return StudentRepository.create({
      name: data.name,
      phone,
      email: data.email,
      parentPhone,
      governorate: data.governorate,
      grade: data.grade,
      password: hashedPassword,
    });
  }

  static async login(data: StudentLoginDto) {
    const phone = data.phone?.trim();
    const password = data.password;

    if (!phone || !password) {
      throw new Error("Invalid phone or password.");
    }

    if (!this.isValidPhone(phone)) {
      throw new Error("Invalid phone number.");
    }

    const student = await StudentRepository.findByPhone(phone);

    if (!student) {
      throw new Error("Invalid phone or password.");
    }

    const validPassword = await verifyPassword(
      password,
      student.password
    );

    if (!validPassword) {
      throw new Error("Invalid phone or password.");
    }

    return student;
  }

  static async getDashboardSummary(
    studentId: string
  ): Promise<StudentDashboardSummary> {
    const student = await StudentRepository.findById(studentId);

    if (!student) {
      throw new Error("Student not found.");
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
      throw new Error("Student not found.");
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
