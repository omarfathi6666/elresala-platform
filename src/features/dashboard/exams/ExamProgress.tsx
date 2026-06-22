interface ExamProgressProps {
  current: number;
  total: number;
}

export default function ExamProgress({
  current,
  total,
}: ExamProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex justify-between">
        <span className="font-semibold">
          السؤال {current}
        </span>

        <span className="text-slate-500">
          من {total}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}