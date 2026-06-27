import { getStudentSession } from "@/lib/auth/student-session";
import { StudentAccessService } from "@/services/student-access";
import CourseCard from "./CourseCard";
import ActivateCodeButton from "@/features/dashboard/home/ActivateCodeButton";

type CourseCardProps = React.ComponentProps<typeof CourseCard>;

export default async function CoursesPage() {
  const session = await getStudentSession();

  if (!session) {
    return null;
  }

  const coursesData = await StudentAccessService.getCoursesWithProgress(
    session.studentId
  );

  // Map service response to CourseCard props
  const courses: CourseCardProps[] = coursesData.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    isLocked: course.isLocked,
    chaptersCount: course.chaptersCount,
    lecturesCount: course.lecturesCount,
    completedLecturesCount: course.completedLecturesCount,
    progress: course.progress,
    status: course.status,
    firstLectureId: course.firstLectureId,
    lastWatchedLecture: course.lastWatchedLecture
      ? {
          id: course.lastWatchedLecture.id,
          title: course.lastWatchedLecture.title,
        }
      : null,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          الكورسات
        </h1>

        <p className="mt-2 text-slate-500">
          جميع الكورسات المشترك بها.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <p className="text-2xl font-semibold text-slate-900">
              لا توجد كورسات متاحة حالياً
            </p>
            <p className="mt-2 text-slate-500">
              يرجى تفعيل كود الوصول للبدء
            </p>
            <div className="mt-6">
              <ActivateCodeButton
                label="تفعيل كود"
                className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
            />
          ))}
        </div>
      )}
    </div>
  );
}