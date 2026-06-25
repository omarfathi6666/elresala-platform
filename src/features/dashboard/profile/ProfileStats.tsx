interface ProfileStatsProps {
  watchedLectures: number;
  examsCount: number;
  averageResult: number;
}

export default function ProfileStats({
  watchedLectures,
  examsCount,
  averageResult,
}: ProfileStatsProps) {
  const safeAverageResult = Math.max(
    0,
    Math.min(100, averageResult)
  );

  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-4xl font-black text-blue-600">
          {watchedLectures}
        </h2>

        <p className="mt-2">
          محاضرة مكتملة
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-4xl font-black text-green-600">
          {examsCount}
        </h2>

        <p className="mt-2">
          امتحان
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-4xl font-black text-orange-500">
          {safeAverageResult}%
        </h2>

        <p className="mt-2">
          متوسط النتائج
        </p>
      </div>

    </div>
  );
}