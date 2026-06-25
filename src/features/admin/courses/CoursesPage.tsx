"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";

interface Course {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  chapters: unknown[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] =
    useState<Course | null>(null);

  async function loadCourses() {
    try {
      const response = await fetch("/api/admin/courses");
      const result = await response.json();

      if (result.success) {
        setCourses(result.data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  async function deleteCourse(courseId: string) {
    if (!confirm("هل أنت متأكد من حذف المادة؟")) {
      return;
    }

    const response = await fetch(
      `/api/admin/courses/${courseId}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    await loadCourses();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black">
          المواد
        </h1>

        <AddCourseModal
          onSuccess={loadCourses}
        />
      </div>

      {loading ? (
        <div>جاري التحميل...</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              chapters={course.chapters.length}
              onEdit={() => setEditingCourse(course)}
              onDelete={() => deleteCourse(course.id)}
            />
          ))}
        </div>
      )}

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSuccess={async () => {
            setEditingCourse(null);
            await loadCourses();
          }}
        />
      )}
    </div>
  );
}