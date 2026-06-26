import { verifyToken } from "@/lib/auth/jwt";
import { getSession } from "@/lib/auth/session";

export interface AdminSession {
  adminId: string;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = await getSession();

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);

    if (payload.role !== "ADMIN") {
      return null;
    }

    return {
      adminId: payload.id,
    };
  } catch {
    return null;
  }
}
