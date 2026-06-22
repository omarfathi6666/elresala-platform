"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import AddCourseModal from "./AddCourseModal";

interface Course {
  id: string;
  title: string;
  description?: string;
  order: number;
  chapters: unknown[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

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
              title={course.title}
              grade="الثانوية العامة"
              chapters={course.chapters.length}
            />
          ))}
        </div>
      )}

    </div>
  );
}