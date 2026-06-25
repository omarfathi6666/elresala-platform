"use client";

import { useState } from "react";

interface ExamInitialData {
  title: string;
  duration: number;
  totalMarks: number;
}

interface ExamFormProps {
  lectureId: string;
  examId?: string;
  initialData?: ExamInitialData;
  onSuccess?: () => void;
}

export default function ExamForm({
  lectureId,
  examId,
  initialData,
  onSuccess,
}: ExamFormProps) {
  const [title, setTitle] = useState(
    initialData?.title || ""
  );
  const [duration, setDuration] = useState(
    initialData?.duration || 40
  );
  const [totalMarks, setTotalMarks] = useState(
    initialData?.totalMarks || 100
  );
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(
      examId
        ? `/api/admin/exams/${examId}`
        : "/api/admin/exams",
      {
        method: examId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          duration,
          totalMarks,
          lectureId,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      setLoading(false);
      return;
    }

    setTitle("");
    setDuration(40);
    setTotalMarks(100);
    setLoading(false);
    onSuccess?.();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl bg-white p-8 shadow-sm"
    >

      <h2 className="mb-8 text-3xl font-black">
        {examId ? "تعديل الامتحان" : "إنشاء امتحان"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          className="rounded-2xl border p-4"
          placeholder="اسم الامتحان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="rounded-2xl border p-4"
          placeholder="مدة الامتحان بالدقائق"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <input
          type="number"
          className="rounded-2xl border p-4"
          placeholder="الدرجة الكلية"
          value={totalMarks}
          onChange={(e) => setTotalMarks(Number(e.target.value))}
        />

      </div>

      <button
        disabled={loading}
        className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white"
      >
        {loading ? "جاري الحفظ..." : "حفظ الامتحان"}
      </button>

    </form>
  );
}