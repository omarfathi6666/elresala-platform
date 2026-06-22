export default function ExamSidebar() {
  const questions = Array.from(
    { length: 25 },
    (_, i) => i + 1
  );

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-xl font-bold">
        الأسئلة
      </h3>

      <div className="grid grid-cols-5 gap-3">
        {questions.map((question) => (
          <button
            key={question}
            className={`h-12 rounded-xl font-bold transition ${
              question === 1
                ? "bg-blue-600 text-white"
                : "border hover:bg-slate-100"
            }`}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue-600" />
          السؤال الحالي
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-green-500" />
          تمت الإجابة
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border" />
          لم تتم الإجابة
        </div>
      </div>
    </div>
  );
}