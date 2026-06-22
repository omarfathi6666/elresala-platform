"use client";

import { useState } from "react";
import ChapterForm from "./ChapterForm";

export default function AddChapterModal({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white"
      >
        + إضافة فصل
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                إضافة فصل
              </h2>

              <button
                onClick={() => setOpen(false)}
              >
                ✕
              </button>

            </div>

            <ChapterForm
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