"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  FileQuestion,
  Eye,
  EyeOff,
} from "lucide-react";

import ExamCard from "@/features/admin/exams/ExamCard";
import LectureStatusCard from "./LectureStatusCard";
import LectureActionCard from "./LectureActionCard";

interface Exam {
  id: string;
  title: string;
  duration: number;
  questions: unknown[];
}

interface LectureDetails {
  id: string;
  title: string;
  videoUrl: string | null;
  pdfUrl: string | null;
  isPublished: boolean;
  chapter: {
    title: string;
    course: {
      title: string;
    };
  };
  exams: Exam[];
}

interface LectureDetailsPageProps {
  lectureId: string;
}

export default function LectureDetailsPage({
  lectureId,
}: LectureDetailsPageProps) {
  const router = useRouter();
  const [lecture, setLecture] =
    useState<LectureDetails | null>(null);

  useEffect(() => {
    fetch(`/api/admin/lectures/${lectureId}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setLecture(result.data);
        }
      });
  }, [lectureId]);

  if (!lecture) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black">
          {lecture.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {lecture.chapter.course.title} • {lecture.chapter.title}
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <LectureStatusCard
          title="الفيديو"
          value={lecture.videoUrl || "غير موجود"}
          color={lecture.videoUrl ? "text-green-600" : "text-red-500"}
        />

        <LectureStatusCard
          title="PDF"
          value={lecture.pdfUrl || "غير موجود"}
          color={lecture.pdfUrl ? "text-green-600" : "text-red-500"}
        />

        <LectureStatusCard
          title="الامتحان"
          value={lecture.exams.length > 0 ? "مضاف" : "غير مضاف"}
          color={lecture.exams.length > 0 ? "text-blue-600" : "text-red-500"}
        />

        <LectureStatusCard
          title="الحالة"
          value={lecture.isPublished ? "منشورة" : "مخفية"}
          color={lecture.isPublished ? "text-green-600" : "text-red-500"}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <LectureActionCard
          icon={<Upload size={34} />}
          title="رفع أو استبدال الفيديو"
          description="رفع فيديو المحاضرة"
        />

        <LectureActionCard
          icon={<FileText size={34} />}
          title="رفع PDF"
          description="إضافة مذكرة المحاضرة"
        />

        <LectureActionCard
          icon={<FileQuestion size={34} />}
          title="إدارة الامتحان"
          description="إضافة أو تعديل الامتحان"
          onClick={() => router.push(`/admin/exams/${lecture.id}`)}
        />

        <LectureActionCard
          icon={<Eye size={34} />}
          title="معاينة المحاضرة"
          description="فتح صفحة الطالب"
        />

        <LectureActionCard
          icon={<EyeOff size={34} />}
          title="إخفاء المحاضرة"
          description="عدم ظهورها للطلاب"
        />

      </div>

      <div className="grid gap-6">
        {lecture.exams.map((exam) => (
          <ExamCard
            key={exam.id}
            id={exam.id}
            title={exam.title}
            questions={exam.questions.length}
            duration={exam.duration}
          />
        ))}
      </div>

    </div>
  );
}