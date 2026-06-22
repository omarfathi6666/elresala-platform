import Link from "next/link";
import {
  BookOpen,
  FileQuestion,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

interface ChapterCardProps {
  id: string;
  title: string;
  lectures: number;
  exams: number;
  progress: number;
}

export default function ChapterCard({
  id,
  title,
  lectures,
  exams,
  progress,
}: ChapterCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-slate-600">
          <BookOpen size={20} />
          <span>{lectures} محاضرة</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FileQuestion size={20} />
          <span>{exams} امتحان</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <TrendingUp size={20} />
          <span>{progress}% مكتمل</span>
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Link
        href={`/dashboard/chapters/${id}`}
        className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
      >
        دخول الفصل

        <ArrowLeft size={18} />
      </Link>
    </div>
  );
}