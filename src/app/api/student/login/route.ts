import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { StudentService } from "@/services/student/student.service";

export async function GET() {
  return success({
    status: "Student Login API Ready",
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const phone = body.phone?.trim();
    const password = body.password?.trim();

    if (!phone || !password) {
      return fail("جميع الحقول مطلوبة", 400);
    }

    const student = await StudentService.login({
      phone,
      password,
    });

    return success(
      {
        student,
      },
      "تم تسجيل الدخول بنجاح"
    );
  });
}
