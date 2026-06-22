export default function ExamActions() {
  return (
    <div className="flex flex-wrap gap-4">

      <button className="rounded-2xl border px-6 py-3">
        السؤال السابق
      </button>

      <button className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white">
        حفظ والانتقال
      </button>

      <button className="rounded-2xl bg-red-600 px-6 py-3 font-bold text-white">
        إنهاء الامتحان
      </button>

    </div>
  );
}