"use client";

import { useEffect, useState } from "react";
import LectureCard from "@/features/admin/lectures/LectureCard";
import EditLectureModal from "@/features/admin/lectures/EditLectureModal";

interface Lecture {
  id: string;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  duration: number | null;
  order: number;
  chapterId: string;
  pdfUrl: string | null;
  exams: unknown[];
}

interface ChapterDetails {
  id: string;
  title: string;
  course: {
    id: string;
    title: string;
  };
  lectures: Lecture[];
}

interface ChapterDetailsPageProps {
  chapterId: string;
}

export default function ChapterDetailsPage({
  chapterId,
}: ChapterDetailsPageProps) {
  const [chapter, setChapter] = useState<ChapterDetails | null>(null);
  const [editingLecture, setEditingLecture] =
    useState<Lecture | null>(null);

  async function loadChapter() {
    fetch(`/api/admin/chapters/${chapterId}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setChapter(result.data);
        }
      });
  }

  useEffect(() => {
    loadChapter();
  }, [chapterId]);

  async function deleteLecture(lectureId: string) {
    if (!confirm("هل أنت متأكد من حذف المحاضرة؟")) {
      return;
    }

    const response = await fetch(
      `/api/admin/lectures/${lectureId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    await loadChapter();
  }

  if (!chapter) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">
          {chapter.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {chapter.course.title}
        </p>
      </div>

      <div className="grid gap-6">
        {chapter.lectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            id={lecture.id}
            title={lecture.title}
            duration={`${lecture.duration || 0} دقيقة`}
            hasPdf={Boolean(lecture.pdfUrl)}
            hasExam={lecture.exams.length > 0}
            onEdit={() => setEditingLecture(lecture)}
            onDelete={() => deleteLecture(lecture.id)}
          />
        ))}
      </div>

      {editingLecture && (
        <EditLectureModal
          lecture={{
            ...editingLecture,
            courseId: chapter.course.id,
          }}
          onClose={() => setEditingLecture(null)}
          onSuccess={async () => {
            setEditingLecture(null);
            await loadChapter();
          }}
        />
      )}
    </div>
  );
}
