"use client";

import { useState } from "react";
import CourseForm from "./CourseForm";

interface AddCourseModalProps {
  onSuccess: () => void;
}

export default function AddCourseModal({
  onSuccess,
}: AddCourseModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
      >
        + إضافة مادة
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                إضافة مادة جديدة
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <CourseForm
              onSuccess={() => {
                setOpen(false);
                onSuccess();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}