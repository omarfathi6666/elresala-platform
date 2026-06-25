"use client";

import ChapterForm from "./ChapterForm";

interface EditChapterModalProps {
  chapter: {
    id: string;
    title: string;
    order: number;
    courseId: string;
  };
  onSuccess: () => void;
  onClose: () => void;
}

export default function EditChapterModal({
  chapter,
  onSuccess,
  onClose,
}: EditChapterModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            تعديل الفصل
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <ChapterForm
          chapterId={chapter.id}
          initialData={{
            title: chapter.title,
            order: chapter.order,
            courseId: chapter.courseId,
          }}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
