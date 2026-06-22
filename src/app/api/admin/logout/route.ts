import { success } from "@/lib/api/api-response";
import { removeSession } from "@/lib/auth/session";

export async function POST() {
  await removeSession();

  return success(null, "تم تسجيل الخروج بنجاح");
}