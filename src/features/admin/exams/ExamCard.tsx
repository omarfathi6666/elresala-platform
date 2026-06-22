import Link from "next/link";
import { FileQuestion, Pencil, Trash2 } from "lucide-react";

interface ExamCardProps {
  id: string;
  title: string;
  questions: number;
  duration: number;
}

export default function ExamCard({
  id,
  title,
  questions,
  duration,
}: ExamCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <FileQuestion
          size={40}
          className="text-blue-600"
        />

        <div>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="text-slate-500">
            {questions} سؤال • {duration} دقيقة
          </p>

        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <Link
          href={`/admin/exams/${id}`}
          className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-bold text-white"
        >
          إدارة
        </Link>

        <button className="rounded-xl border p-3">
          <Pencil size={18} />
        </button>

        <button className="rounded-xl border border-red-300 p-3 text-red-600">
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}