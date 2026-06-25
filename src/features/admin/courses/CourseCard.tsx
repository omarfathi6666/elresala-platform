"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Pencil, Trash2 } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description?: string | null;
  chapters: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CourseCard({
  id,
  title,
  description,
  chapters,
  onEdit,
  onDelete,
}: CourseCardProps) {
  const router = useRouter();

  return (
    <div
      className="block rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg"
      onClick={() => router.push(`/admin/courses/${id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-blue-100 p-4">
          <BookOpen
            className="text-blue-600"
            size={28}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="text-slate-500">
            {description || "لا يوجد وصف"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-slate-500">
          عدد الفصول
        </span>

        <div className="flex items-center gap-3">
          <span className="font-bold text-blue-600">
            {chapters}
          </span>

          {onEdit && (
            <button
              className="rounded-xl border p-3"
              onClick={(event) => {
                event.stopPropagation();
                onEdit();
              }}
            >
              <Pencil size={18} />
            </button>
          )}

          {onDelete && (
            <button
              className="rounded-xl border border-red-300 text-red-600 p-3"
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}