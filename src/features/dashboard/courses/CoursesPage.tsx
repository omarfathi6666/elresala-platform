import CourseCard from "./CourseCard";

const courses = [
  {
    title: "الأحياء - الصف الثالث الثانوي",
    description:
      "المنهج كامل مع الامتحانات والتدريبات.",
    lessons: 42,
    progress: 68,
  },
  {
    title: "العلوم المتكاملة - الصف الأول الثانوي",
    description:
      "شرح المنهج بالكامل بطريقة سهلة ومبسطة.",
    lessons: 28,
    progress: 25,
  },
];

export default function CoursesPage() {
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

      <div className="grid gap-8 lg:grid-cols-2">
        {courses.map((course) => (
          <CourseCard
            key={course.title}
            {...course}
          />
        ))}
      </div>
    </div>
  );
}