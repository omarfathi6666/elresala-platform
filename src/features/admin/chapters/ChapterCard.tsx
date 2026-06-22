import { FolderOpen } from "lucide-react";

interface ChapterCardProps {
  title: string;
  course: string;
  lectures: number;
}

export default function ChapterCard({
  title,
  course,
  lectures,
}: ChapterCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-indigo-100 p-4">
          <FolderOpen
            className="text-indigo-600"
            size={28}
          />
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="text-slate-500">
            {course}
          </p>

        </div>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <span className="text-slate-500">
          عدد المحاضرات
        </span>

        <span className="font-bold text-blue-600">
          {lectures}
        </span>

      </div>

    </div>
  );
}