import { apiHandler } from "@/lib/api/api-handler";
import { success, fail } from "@/lib/api/api-response";
import { CourseService } from "@/services/course/course.service";

interface Params {
  params: Promise<{
    courseId: string;
  }>;
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { courseId } = await params;
    const body = await request.json();

    const title = body.title?.trim();
    const description = body.description?.trim() || "";
    const order = Number(body.order);

    if (!title) {
      return fail("عنوان الكورس مطلوب", 400);
    }

    const course = await CourseService.updateCourse(
      courseId,
      {
        title,
        description,
        order,
      }
    );

    return success(course, "تم تعديل الكورس");
  });
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  return apiHandler(async () => {
    const { courseId } = await params;

    await CourseService.deleteCourse(courseId);

    return success(null, "تم حذف الكورس");
  });
}