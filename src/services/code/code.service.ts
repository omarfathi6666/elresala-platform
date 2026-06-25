import { CodeRepository } from "@/repositories/code";

export interface CreateCodesDto {
  courseId: string;
  quantity: number;
  maxDevices: number;
  expiresAt?: Date | null;
  chapterId?: string;
  lectureId?: string;
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
}