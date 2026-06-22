import Link from "next/link";
import { Clock3, FileQuestion, Trophy } from "lucide-react";

interface ExamCardProps {
  id: string;
  title: string;
  questions: number;
  duration: number;
  degree: number;
}

export default function ExamCard({
  id,
  title,
  questions,
  duration,
  degree,
}: ExamCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <div className="mt-6 space-y-3 text-slate-600">
        <div className="flex items-center gap-3">
          <FileQuestion size={20} />
          {questions} سؤال
        </div>

        <div className="flex items-center gap-3">
          <Clock3 size={20} />
          {duration} دقيقة
        </div>

        <div className="flex items-center gap-3">
          <Trophy size={20} />
          {degree} درجة
        </div>
      </div>

      <Link
        href={`/dashboard/exams/${id}`}
        className="mt-8 flex justify-center rounded-2xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
      >
        بدء الامتحان
      </Link>
    </div>
  );
}