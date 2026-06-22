import { apiHandler } from "@/lib/api/api-handler";
import { success, fail } from "@/lib/api/api-response";
import { CourseService } from "@/services/course/course.service";

export async function GET() {
  return apiHandler(async () => {
    const courses = await CourseService.getAllCourses();

    return success(courses);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const body = await request.json();

    const title = body.title?.trim();
    const description = body.description?.trim() || "";
    const order = Number(body.order);

    if (!title) {
      return fail("عنوان الكورس مطلوب", 400);
    }

    if (Number.isNaN(order)) {
      return fail("ترتيب الكورس مطلوب", 400);
    }

    const course = await CourseService.createCourse({
      title,
      description,
      order,
    });

    return success(course, "تم إنشاء الكورس بنجاح", 201);
  });
}