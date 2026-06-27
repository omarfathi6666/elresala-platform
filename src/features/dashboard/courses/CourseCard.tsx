"use client";

import Link from "next/link";
import {
  BookOpen,
  Clock,
  PlayCircle,
  Lock,
  CheckCircle2,
  Play,
} from "lucide-react";
import ActivateCodeButton from "@/features/dashboard/home/ActivateCodeButton";

interface CourseCardProps {
  id: string;
  title: string;
  description: string | null;
  isLocked: boolean;
  chaptersCount: number;
  lecturesCount: number;
  completedLecturesCount: number;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  firstLectureId: string | null;
  lastWatchedLecture: {
    id: string;
    title: string;
  } | null;
}

export default function CourseCard({
  id,
  title,
  description,
  isLocked,
  chaptersCount,
  lecturesCount,
  completedLecturesCount,
  progress,
  status,
  firstLectureId,
  lastWatchedLecture,
}: CourseCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "not-started":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
            لم تبدأ بعد
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700">
            <Play size={14} />
            قيد الدراسة
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-700">
            <CheckCircle2 size={14} />
            مكتمل
          </span>
        );
    }
  };

  const getPrimaryActionButton = () => {
    if (isLocked) {
      return (
        <ActivateCodeButton
          label="تفعيل الكود"
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-slate-600 py-3 font-bold text-white transition hover:bg-slate-700 w-full"
        />
      );
    }

    if (status === "not-started" && firstLectureId) {
      return (
        <Link
          href={`/dashboard/player/${firstLectureId}`}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 w-full"
        >
          <PlayCircle size={20} />
          ابدأ التعلم
        </Link>
      );
    }

    if (status === "in-progress" && lastWatchedLecture) {
      return (
        <Link
          href={`/dashboard/player/${lastWatchedLecture.id}`}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 w-full"
        >
          <PlayCircle size={20} />
          متابعة الدرس
        </Link>
      );
    }

    if (status === "completed") {
      return (
        <Link
          href={`/dashboard/chapters`}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 w-full"
        >
          <BookOpen size={20} />
          مراجعة الكورس
        </Link>
      );
    }

    return null;
  };

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        isLocked ? "opacity-75" : ""
      }`}
    >
      {/* Course Header Background */}
      <div className="relative h-40 bg-gradient-to-r from-blue-700 to-sky-500">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {getStatusBadge()}
        </div>

        {/* Lock Icon for Locked Courses */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <Lock size={48} className="text-white" />
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="mt-3 leading-7 text-slate-500 line-clamp-2">
            {description}
          </p>
        )}

        {/* Course Stats */}
        <div className="mt-6 space-y-3">
          {/* Chapters and Lectures */}
          <div className="flex items-center justify-between text-slate-600 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>{chaptersCount} فصل</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{lecturesCount} محاضرة</span>
            </div>
          </div>

          {/* Progress Display */}
          {lecturesCount > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700 font-medium">
                  التقدم: {progress}%
                </span>
                <span className="text-slate-500">
                  {completedLecturesCount} من {lecturesCount} مكتملة
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    backgroundColor:
                      progress === 100
                        ? "#10b981"
                        : progress > 0
                          ? "#3b82f6"
                          : "#e2e8f0",
                  }}
                />
              </div>
            </div>
          )}

          {/* Last Watched Lecture */}
          {status === "in-progress" && lastWatchedLecture && (
            <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-3">
              <PlayCircle size={16} className="mt-1 text-blue-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-blue-600">آخر درس</p>
                <p className="text-sm text-blue-900 truncate">
                  {lastWatchedLecture.title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        {getPrimaryActionButton()}
      </div>
    </div>
  );
}