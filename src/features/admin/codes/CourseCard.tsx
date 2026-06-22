import { BookOpen } from "lucide-react";

interface CourseCardProps {
  title: string;
  grade: string;
  chapters: number;
}

export default function CourseCard({
  title,
  grade,
  chapters,
}: CourseCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">
          <BookOpen className="text-blue-600" size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="text-slate-500">
            {grade}
          </p>
        </div>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <span className="text-slate-500">
          عدد الفصول
        </span>

        <span className="font-bold text-blue-600">
          {chapters}
        </span>

      </div>

    </div>
  );
}