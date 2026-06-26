import { CodeRepository } from "@/repositories/code";

export interface CreateCodesDto {
  courseId: string;
  quantity: number;
  maxDevices: number;
  expiresAt?: Date | null;
  chapterId?: string;
  lectureId?: string;
}

export interface ActivateCodeDto {
  studentId: string;
  code: string;
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const part = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

  return `RS-${part()}-${part()}`;
}

export class CodeService {
  static async getAll() {
    return CodeRepository.findAll();
  }

  static async create(data: CreateCodesDto) {
    const uniqueCodes = new Set<string>();

    while (uniqueCodes.size < data.quantity) {
      const candidate = generateCode();

      if (uniqueCodes.has(candidate)) {
        continue;
      }

      const exists = await CodeRepository.isCodeExists(
        candidate
      );

      if (!exists) {
        uniqueCodes.add(candidate);
      }
    }

    const codes = Array.from(uniqueCodes).map((code) => ({
      code,
      courseId: data.courseId,
      chapterId: data.chapterId,
      lectureId: data.lectureId,
      maxDevices: data.maxDevices,
      expiresAt: data.expiresAt ?? null,
    }));

    await CodeRepository.createMany(codes);

    return codes;
  }

  static async hasActiveSubscription(
    studentId: string
  ) {
    const count =
      await CodeRepository.countActiveSubscriptionsByStudentId(
        studentId,
        new Date()
      );

    return count > 0;
  }

  static async activateForStudent({
    studentId,
    code,
  }: ActivateCodeDto) {
    const normalizedCode = code.trim().toUpperCase();

    const subscriptionCode =
      await CodeRepository.findByCodeForActivation(
        normalizedCode
      );

    if (!subscriptionCode) {
      throw new Error("Invalid activation code.");
    }

    const now = new Date();

    if (
      subscriptionCode.expiresAt &&
      subscriptionCode.expiresAt < now
    ) {
      throw new Error("Code has expired.");
    }

    if (
      subscriptionCode.studentId &&
      subscriptionCode.studentId !== studentId
    ) {
      throw new Error("Code has already been used.");
    }

    if (
      subscriptionCode.usedCount >=
      subscriptionCode.maxDevices
    ) {
      throw new Error("Code has already been used.");
    }

    const activated = await CodeRepository.activateCodeById(
      subscriptionCode.id,
      studentId,
      subscriptionCode.usedAt ? null : now
    );

    const activationScope = subscriptionCode as unknown as {
      courseId: string;
      chapterId?: string | null;
      lectureId?: string | null;
    };

    return {
      id: activated.id,
      code: activated.code,
      scope: {
        courseId: activationScope.courseId,
        chapterId: activationScope.chapterId ?? null,
        lectureId: activationScope.lectureId ?? null,
      },
    };
  }
}