import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { createToken } from "@/lib/auth/jwt";
import { setSession } from "@/lib/auth/session";
import { AuthService } from "@/services/auth/auth.service";

export async function GET() {
  return success({
    status: "Admin Login API Ready",
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const email = body.email?.trim();
    const password = body.password?.trim();

    if (!email || !password) {
      return fail("جميع الحقول مطلوبة", 400);
    }

    const admin = await AuthService.loginAdmin({
      email,
      password,
    });

    const token = createToken({
      id: admin.id,
      email: admin.email,
      role: "ADMIN",
    });

    await setSession(token);

    return success(
      {
        admin,
      },
      "تم تسجيل الدخول بنجاح"
    );
  });
}