export default function ContinueCard() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <p className="text-sm text-slate-500">
        آخر محاضرة
      </p>

      <h3 className="mt-2 text-2xl font-bold text-slate-900">
        الوراثة الجزيئية
      </h3>

      <p className="mt-3 text-slate-500">
        توقفت عند الدقيقة 18 من 42 دقيقة.
      </p>

      <button className="mt-6 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
        أكمل المشاهدة
      </button>
    </div>
  );
}