"use client";

import { useEffect, useMemo, useState } from "react";

interface Course {
  id: string;
  title: string;
}

interface Chapter {
  id: string;
  title: string;
  courseId: string;
}

interface Lecture {
  id: string;
  title: string;
  chapterId: string;
  chapter: {
    courseId: string;
  };
}

interface CreateCodesFormProps {
  onSuccess: () => Promise<void> | void;
}

export default function CreateCodesForm({
  onSuccess,
}: CreateCodesFormProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);

  const [courseId, setCourseId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [lectureId, setLectureId] = useState("");
  const [quantity, setQuantity] = useState(50);
  const [maxDevices, setMaxDevices] = useState(1);
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/courses")
      .then((response) => response.json())
      .then((result) =>
        setCourses(result.data ?? [])
      );

    fetch("/api/admin/chapters")
      .then((response) => response.json())
      .then((result) =>
        setChapters(result.data ?? [])
      );

    fetch("/api/admin/lectures")
      .then((response) => response.json())
      .then((result) =>
        setLectures(result.data ?? [])
      );
  }, []);

  const filteredChapters = useMemo(
    () =>
      chapters.filter(
        (chapter) => chapter.courseId === courseId
      ),
    [chapters, courseId]
  );

  const filteredLectures = useMemo(
    () =>
      lectures.filter((lecture) => {
        if (chapterId) {
          return lecture.chapterId === chapterId;
        }

        if (courseId) {
          return (
            lecture.chapter.courseId === courseId
          );
        }

        return false;
      }),
    [lectures, chapterId, courseId]
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!courseId) {
      alert("اختر المادة");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/admin/codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId,
        chapterId: chapterId || undefined,
        lectureId: lectureId || undefined,
        quantity,
        maxDevices,
        expiresAt: expiresAt || undefined,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      setLoading(false);
      return;
    }

    await onSuccess();
    setLoading(false);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-black">
        إنشاء أكواد جديدة
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-bold">
            المادة
          </label>

          <select
            className="w-full rounded-2xl border p-4"
            value={courseId}
            onChange={(e) => {
              setCourseId(e.target.value);
              setChapterId("");
              setLectureId("");
            }}
          >
            <option value="">اختر المادة</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            الفصل (اختياري)
          </label>

          <select
            className="w-full rounded-2xl border p-4"
            value={chapterId}
            onChange={(e) => {
              setChapterId(e.target.value);
              setLectureId("");
            }}
          >
            <option value="">كل الفصول</option>
            {filteredChapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            المحاضرة (اختياري)
          </label>

          <select
            className="w-full rounded-2xl border p-4"
            value={lectureId}
            onChange={(e) => setLectureId(e.target.value)}
          >
            <option value="">كل المحاضرات</option>
            {filteredLectures.map((lecture) => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            عدد الأكواد
          </label>

          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="w-full rounded-2xl border p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            عدد الأجهزة
          </label>

          <select
            className="w-full rounded-2xl border p-4"
            value={maxDevices}
            onChange={(e) =>
              setMaxDevices(Number(e.target.value))
            }
          >
            <option value={1}>جهاز واحد</option>
            <option value={2}>جهازان</option>
            <option value={3}>3 أجهزة</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            تاريخ الانتهاء (اختياري)
          </label>

          <input
            type="date"
            value={expiresAt}
            onChange={(e) =>
              setExpiresAt(e.target.value)
            }
            className="w-full rounded-2xl border p-4"
          />
        </div>

      </div>

      <button
        disabled={loading}
        className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white"
      >
        {loading ? "جاري الإنشاء..." : "إنشاء الأكواد"}
      </button>
    </form>
  );
}