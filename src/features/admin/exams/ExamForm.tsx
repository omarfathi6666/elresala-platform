"use client";

import { useState } from "react";

interface ExamInitialData {
  title: string;
  duration: number;
  totalMarks: number;
  availabilityMode:
    | "IMMEDIATELY"
    | "AFTER_LECTURE_COMPLETION"
    | "SPECIFIC_DATE"
    | "HIDDEN";
  availableFrom?: string | null;
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
  const [availabilityMode, setAvailabilityMode] = useState<
    "IMMEDIATELY" |
    "AFTER_LECTURE_COMPLETION" |
    "SPECIFIC_DATE" |
    "HIDDEN"
  >(initialData?.availabilityMode || "IMMEDIATELY");
  const [availableFrom, setAvailableFrom] = useState(
    initialData?.availableFrom
      ? new Date(initialData.availableFrom)
          .toISOString()
          .slice(0, 16)
      : ""
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
          availabilityMode,
          availableFrom:
            availabilityMode === "SPECIFIC_DATE"
              ? (availableFrom
                  ? new Date(availableFrom).toISOString()
                  : null)
              : null,
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
    setAvailabilityMode("IMMEDIATELY");
    setAvailableFrom("");
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

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-black">Availability</h3>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="availabilityMode"
            value="IMMEDIATELY"
            checked={availabilityMode === "IMMEDIATELY"}
            onChange={() => setAvailabilityMode("IMMEDIATELY")}
          />
          <span>Immediately</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="availabilityMode"
            value="AFTER_LECTURE_COMPLETION"
            checked={availabilityMode === "AFTER_LECTURE_COMPLETION"}
            onChange={() =>
              setAvailabilityMode(
                "AFTER_LECTURE_COMPLETION"
              )
            }
          />
          <span>After completing the lecture</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="availabilityMode"
            value="SPECIFIC_DATE"
            checked={availabilityMode === "SPECIFIC_DATE"}
            onChange={() => setAvailabilityMode("SPECIFIC_DATE")}
          />
          <span>Specific date & time</span>
        </label>

        {availabilityMode === "SPECIFIC_DATE" ? (
          <input
            type="datetime-local"
            className="w-full rounded-2xl border p-4 md:w-auto"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            required
          />
        ) : null}

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="availabilityMode"
            value="HIDDEN"
            checked={availabilityMode === "HIDDEN"}
            onChange={() => setAvailabilityMode("HIDDEN")}
          />
          <span>Hidden</span>
        </label>
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