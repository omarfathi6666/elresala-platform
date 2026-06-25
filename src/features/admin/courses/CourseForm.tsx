"use client";

import { useEffect, useState } from "react";

interface CourseInitialData {
  title: string;
  description?: string | null;
  order: number;
}

interface CourseFormProps {
  onSuccess?: () => void;
  courseId?: string;
  initialData?: CourseInitialData;
}

export default function CourseForm({
  onSuccess,
  courseId,
  initialData,
}: CourseFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setTitle(initialData.title);
    setDescription(initialData.description || "");
    setOrder(initialData.order);
  }, [initialData]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        courseId
          ? `/api/admin/courses/${courseId}`
          : "/api/admin/courses",
        {
          method: courseId ? "PUT" : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            order,
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setTitle("");
      setDescription("");
      setOrder(1);

      onSuccess?.();
    } catch {
      alert("حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        className="w-full rounded-lg border p-3"
        placeholder="اسم المادة"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="w-full rounded-lg border p-3"
        placeholder="الوصف"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <input
        className="w-full rounded-lg border p-3"
        type="number"
        placeholder="الترتيب"
        value={order}
        onChange={(e) =>
          setOrder(Number(e.target.value))
        }
      />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white"
      >
        {loading
          ? "جاري الحفظ..."
          : courseId
            ? "تعديل المادة"
            : "حفظ المادة"}
      </button>
    </form>
  );
}