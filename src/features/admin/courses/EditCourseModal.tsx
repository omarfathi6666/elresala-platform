"use client";

import CourseForm from "./CourseForm";

interface EditCourseModalProps {
  course: {
    id: string;
    title: string;
    description?: string | null;
    order: number;
  };
  onSuccess: () => void;
  onClose: () => void;
}

export default function EditCourseModal({
  course,
  onSuccess,
  onClose,
}: EditCourseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            تعديل المادة
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <CourseForm
          courseId={course.id}
          initialData={{
            title: course.title,
            description: course.description,
            order: course.order,
          }}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
