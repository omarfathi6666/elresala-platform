"use client";

import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
}

interface Props {
  onSuccess?: () => void;
}

export default function ChapterForm({ onSuccess }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);

  useEffect(() => {
    fetch("/api/admin/courses")
      .then((r) => r.json())
      .then((r) => setCourses(r.data ?? []));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/chapters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        order,
        courseId,
      }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    setTitle("");
    setOrder(1);
    setCourseId("");

    onSuccess?.();
  }

  return (
    <form onSubmit={submit} className="space-y-4">

      <select
        className="w-full rounded-lg border p-3"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      >
        <option value="">
          اختر المادة
        </option>

        {courses.map((course) => (
          <option
            key={course.id}
            value={course.id}
          >
            {course.title}
          </option>
        ))}
      </select>

      <input
        className="w-full rounded-lg border p-3"
        placeholder="اسم الفصل"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value))}
      />

      <button
        className="w-full rounded-lg bg-blue-600 py-3 text-white"
      >
        حفظ الفصل
      </button>

    </form>
  );
}