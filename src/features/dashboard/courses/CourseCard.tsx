import Link from "next/link";
import { BookOpen, Clock, PlayCircle } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  lessons: number;
  progress: number;
}

export default function CourseCard({
  title,
  description,
  lessons,
  progress,
}: CourseCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-40 bg-gradient-to-r from-blue-700 to-sky-500" />

      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-slate-500">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between text-slate-500">
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>{lessons} محاضرة</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{progress}%</span>
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Link
          href="/dashboard/chapters"
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          <PlayCircle size={20} />
          دخول الكورس
        </Link>
      </div>
    </div>
  );
}