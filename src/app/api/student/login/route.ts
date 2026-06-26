import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { createToken } from "@/lib/auth/jwt";
import { setSession } from "@/lib/auth/session";
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
      return fail("Invalid phone or password.", 400);
    }

    const student = await StudentService.login({
      phone,
      password,
    });

    const token = await createToken({
      id: student.id,
      phone: student.phone,
      role: "STUDENT",
    });

    await setSession(token);

    return success(
      {
        student,
      },
      "Login successful."
    );
  });
}
