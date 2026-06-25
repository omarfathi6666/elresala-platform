"use client";

import { useEffect, useState } from "react";

import ChapterCard from "./ChapterCard";
import AddChapterModal from "./AddChapterModal";
import EditChapterModal from "./EditChapterModal";

interface Chapter {
  id: string;
  courseId: string;
  title: string;
  order: number;
  course: {
    title: string;
  };
  lectures: unknown[];
}

export default function ChaptersPage() {

  const [chapters, setChapters] =
    useState<Chapter[]>([]);
  const [editingChapter, setEditingChapter] =
    useState<Chapter | null>(null);

  async function load() {
    const res = await fetch(
      "/api/admin/chapters"
    );

    const result = await res.json();

    setChapters(result.data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteChapter(chapterId: string) {
    if (!confirm("هل أنت متأكد من حذف الفصل؟")) {
      return;
    }

    const res = await fetch(
      `/api/admin/chapters/${chapterId}`,
      {
        method: "DELETE",
      }
    );

    const result = await res.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    await load();
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-black">
          الفصول
        </h1>

        <AddChapterModal
          onSuccess={load}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            id={chapter.id}
            title={chapter.title}
            course={chapter.course.title}
            lectures={chapter.lectures.length}
            onEdit={() => setEditingChapter(chapter)}
            onDelete={() => deleteChapter(chapter.id)}
          />
        ))}

      </div>

      {editingChapter && (
        <EditChapterModal
          chapter={editingChapter}
          onClose={() => setEditingChapter(null)}
          onSuccess={async () => {
            setEditingChapter(null);
            await load();
          }}
        />
      )}

    </div>
  );
}