interface StudentExamsCardProps {
  exams: Array<{
    title: string;
    scoreLabel: string;
  }>;
}

export default function StudentExamsCard({
  exams,
}: StudentExamsCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">
        نتائج الامتحانات
      </h2>
      <div className="space-y-3">
        {exams.map((exam) => (
          <div key={exam.title} className="rounded-xl border p-4 flex justify-between">
            <span>{exam.title}</span>
            <span className="font-bold text-green-600">{exam.scoreLabel}</span>
          </div>
        ))}

        {exams.length === 0 ? (
          <p className="text-slate-500">لا توجد بيانات بعد.</p>
        ) : null}
      </div>
    </div>
  );
}