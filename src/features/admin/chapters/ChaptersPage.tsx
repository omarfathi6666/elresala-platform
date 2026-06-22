"use client";

import { useEffect, useState } from "react";

import ChapterCard from "./ChapterCard";
import AddChapterModal from "./AddChapterModal";

interface Chapter {
  id: string;
  title: string;
  course: {
    title: string;
  };
  lectures: unknown[];
}

export default function ChaptersPage() {

  const [chapters, setChapters] =
    useState<Chapter[]>([]);

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
            title={chapter.title}
            course={chapter.course.title}
            lectures={chapter.lectures.length}
          />
        ))}

      </div>

    </div>
  );
}