import Link from "next/link";
import {
  PlayCircle,
  FileText,
  FileQuestion,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

interface LectureCardProps {
  id: string;
  title: string;
  duration: string;
  hasPdf: boolean;
  hasExam: boolean;
}

export default function LectureCard({
  id,
  title,
  duration,
  hasPdf,
  hasExam,
}: LectureCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-center gap-4">

        <PlayCircle
          className="text-blue-600"
          size={42}
        />

        <div>
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <p className="text-slate-500">
            {duration}
          </p>
        </div>

      </div>

      <div className="mt-6 flex gap-3">

        {hasPdf && (
          <span className="rounded-xl bg-red-50 px-4 py-2 text-red-600 flex items-center gap-2">
            <FileText size={18} />
            PDF
          </span>
        )}

        {hasExam && (
          <span className="rounded-xl bg-green-50 px-4 py-2 text-green-600 flex items-center gap-2">
            <FileQuestion size={18} />
            امتحان
          </span>
        )}

      </div>

      <div className="mt-8 flex gap-3">

        <Link
          href={`/admin/lectures/${id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-white font-bold"
        >
          <Eye size={18} />
          إدارة
        </Link>

        <button className="rounded-xl border p-3">
          <Pencil size={18} />
        </button>

        <button className="rounded-xl border border-red-300 text-red-600 p-3">
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}