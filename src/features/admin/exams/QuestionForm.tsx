export default function QuestionForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-black mb-8">
        إنشاء الامتحان
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <button className="rounded-2xl border-2 border-blue-600 p-8 text-xl font-bold hover:bg-blue-50">
          ✍️ إنشاء يدوي
        </button>

        <button className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-xl font-bold hover:bg-slate-50">
          📄 استيراد PDF
        </button>

      </div>

      <p className="mt-6 text-sm text-slate-500">
        سيتم ربط استيراد PDF عند الانتهاء من الـ Backend.
      </p>

    </div>
  );
}