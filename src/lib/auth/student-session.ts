import { verifyToken } from "@/lib/auth/jwt";
import { getSession } from "@/lib/auth/session";

export interface StudentSession {
  studentId: string;
}

export async function getStudentSession(): Promise<StudentSession | null> {
  const token = await getSession();

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);

    if (payload.role !== "STUDENT") {
      return null;
    }

    return {
      studentId: payload.id,
    };
  } catch {
    return null;
  }
}
