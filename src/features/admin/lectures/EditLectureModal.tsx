"use client";

import LectureForm from "./LectureForm";

interface EditLectureModalProps {
  lecture: {
    id: string;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
    pdfUrl?: string | null;
    duration?: number | null;
    order: number;
    chapterId: string;
    courseId: string;
  };
  onSuccess: () => void;
  onClose: () => void;
}

export default function EditLectureModal({
  lecture,
  onSuccess,
  onClose,
}: EditLectureModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            تعديل المحاضرة
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <LectureForm
          lectureId={lecture.id}
          initialData={{
            title: lecture.title,
            description: lecture.description,
            videoUrl: lecture.videoUrl,
            pdfUrl: lecture.pdfUrl,
            duration: lecture.duration,
            order: lecture.order,
            chapterId: lecture.chapterId,
            courseId: lecture.courseId,
          }}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
