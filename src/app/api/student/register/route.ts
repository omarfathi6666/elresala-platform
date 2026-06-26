import { apiHandler } from "@/lib/api/api-handler";
import { fail, success } from "@/lib/api/api-response";
import { StudentService } from "@/services/student/student.service";

export async function GET() {
  return success({
    status: "Student Register API Ready",
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const name = body.name?.trim();
    let email = body.email?.trim();
    const password = body.password?.trim();
    const confirmPassword = body.confirmPassword?.trim();
    const phone = body.phone?.trim();
    const governorate = body.governorate?.trim();
    const grade = body.grade?.trim();
    const parentPhone = body.parentPhone?.trim();

    // Treat empty email string as undefined (email is optional)
    if (email === "") {
      email = undefined;
    }

    if (!name || !password || !phone || !governorate || !grade) {
      return fail("Registration failed.", 400);
    }

    const student = await StudentService.register({
      name,
      email,
      password,
      confirmPassword,
      phone,
      governorate,
      grade,
      parentPhone,
    });

    return success(
      {
        student,
      },
      "Registration successful."
    );
  });
}
