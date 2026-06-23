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

    // Treat empty email string as undefined (email is optional)
    if (email === "") {
      email = undefined;
    }

    if (!name || !password) {
      return fail("جميع الحقول مطلوبة", 400);
    }

    const student = await StudentService.register({
      name,
      email,
      password,
      phone: body.phone,
      governorate: body.governorate,
      grade: body.grade,
      parentPhone: body.parentPhone,
    });

    return success(
      {
        student,
      },
      "تم إنشاء الحساب بنجاح"
    );
  });
}
