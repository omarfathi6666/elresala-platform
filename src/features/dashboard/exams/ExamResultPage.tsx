import Link from "next/link";
import ResultStatCard from "./ResultStatCard";

export default function ExamResultPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-10 text-center text-white">

        <h1 className="text-5xl font-extrabold">
          🎉 أحسنت
        </h1>

        <p className="mt-4 text-2xl">
          درجتك
        </p>

        <h2 className="mt-4 text-7xl font-black">
          22 / 25
        </h2>

        <p className="mt-5 text-xl">
          بنسبة نجاح 88%
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-4">

        <ResultStatCard
          title="الإجابات الصحيحة"
          value="22"
          color="text-green-600"
        />

        <ResultStatCard
          title="الإجابات الخاطئة"
          value="3"
          color="text-red-600"
        />

        <ResultStatCard
          title="الوقت"
          value="31 د"
          color="text-blue-600"
        />

        <ResultStatCard
          title="التقدير"
          value="ممتاز"
          color="text-yellow-500"
        />

      </div>

      <div className="flex gap-4">

        <Link
          href="/dashboard/exams/exam-1/review"
          className="flex-1 rounded-2xl bg-blue-600 py-4 text-center font-bold text-white"
        >
          مراجعة الإجابات
        </Link>

        <Link
          href="/dashboard/exams"
          className="flex-1 rounded-2xl border py-4 text-center font-bold"
        >
          العودة للامتحانات
        </Link>

      </div>

    </div>
  );
}