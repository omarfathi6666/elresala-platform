"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FolderOpen, Pencil, Trash2 } from "lucide-react";

interface ChapterCardProps {
  id: string;
  title: string;
  course: string;
  lectures: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ChapterCard({
  id,
  title,
  course,
  lectures,
  onEdit,
  onDelete,
}: ChapterCardProps) {
  const router = useRouter();

  return (
    <div
      className="block rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg"
      onClick={() => router.push(`/admin/chapters/${id}`)}
    >

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

        <div className="flex items-center gap-3">
          <span className="font-bold text-blue-600">
            {lectures}
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