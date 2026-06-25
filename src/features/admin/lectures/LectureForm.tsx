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

interface LectureInitialData {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  pdfUrl?: string | null;
  duration?: number | null;
  order: number;
  chapterId: string;
  courseId: string;
}

interface LectureFormProps {
  onSuccess?: () => void;
  lectureId?: string;
  initialData?: LectureInitialData;
}

export default function LectureForm({
  onSuccess,
  lectureId,
  initialData,
}: LectureFormProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [courseId, setCourseId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [order, setOrder] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/courses")
      .then((response) => response.json())
      .then((result) => setCourses(result.data ?? []));

    fetch("/api/admin/chapters")
      .then((response) => response.json())
      .then((result) => setChapters(result.data ?? []));
  }, []);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setTitle(initialData.title);
    setDescription(initialData.description || "");
    setVideoUrl(initialData.videoUrl || "");
    setPdfUrl(initialData.pdfUrl || "");
    setDuration(initialData.duration || 0);
    setOrder(initialData.order);
    setCourseId(initialData.courseId);
    setChapterId(initialData.chapterId);
  }, [initialData]);

  const availableChapters = useMemo(
    () =>
      chapters.filter(
        (chapter) => chapter.courseId === courseId
      ),
    [chapters, courseId]
  );

  useEffect(() => {
    if (
      chapterId &&
      !availableChapters.find(
        (chapter) => chapter.id === chapterId
      )
    ) {
      setChapterId("");
    }
  }, [availableChapters, chapterId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(
      lectureId
        ? `/api/admin/lectures/${lectureId}`
        : "/api/admin/lectures",
      {
        method: lectureId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          pdfUrl,
          duration,
          order,
          chapterId,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      setLoading(false);
      return;
    }

    if (!lectureId) {
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setPdfUrl("");
      setDuration(0);
      setOrder(1);
      setChapterId("");
    }

    setLoading(false);
    onSuccess?.();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-black">
        {lectureId ? "تعديل محاضرة" : "إضافة محاضرة"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-bold">
            المادة
          </label>

          <select
            className="w-full rounded-2xl border p-4"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
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
            الفصل
          </label>

          <select
            className="w-full rounded-2xl border p-4"
            value={chapterId}
            onChange={(e) => setChapterId(e.target.value)}
          >
            <option value="">اختر الفصل</option>
            {availableChapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-bold">
            اسم المحاضرة
          </label>

          <input
            className="w-full rounded-2xl border p-4"
            placeholder="مثال: الدعامة في النبات"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            ترتيب المحاضرة
          </label>

          <input
            type="number"
            className="w-full rounded-2xl border p-4"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            رابط الفيديو
          </label>

          <input
            className="w-full rounded-2xl border p-4"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            رابط PDF (اختياري)
          </label>

          <input
            className="w-full rounded-2xl border p-4"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            المدة (بالدقائق)
          </label>

          <input
            type="number"
            className="w-full rounded-2xl border p-4"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-bold">
            الوصف
          </label>

          <textarea
            className="w-full rounded-2xl border p-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white"
      >
        {loading
          ? "جاري الحفظ..."
          : lectureId
            ? "تعديل المحاضرة"
            : "حفظ المحاضرة"}
      </button>
    </form>
  );
}
