import { notFound } from "next/navigation";
import { CourseService } from "@/services/course/course.service";
import ChapterCard from "@/features/admin/chapters/ChapterCard";

interface CourseDetailsPageProps {
  courseId: string;
}

export default async function CourseDetailsPage({
  courseId,
}: CourseDetailsPageProps) {
  const course = await CourseService.getCourse(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">
          {course.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {course.description || "لا يوجد وصف"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {course.chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            course={course.title}
            lectures={chapter.lectures.length}
          />
        ))}
      </div>
    </div>
  );
}
