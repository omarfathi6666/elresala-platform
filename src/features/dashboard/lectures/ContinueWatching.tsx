export default function ContinueWatching() {
  return (
    <div className="rounded-3xl bg-blue-600 p-6 text-white">
      <p className="text-blue-100">
        آخر مشاهدة
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        الدعامة
      </h3>

      <p className="mt-2">
        توقفت عند الدقيقة 18:20
      </p>

      <button className="mt-5 rounded-2xl bg-white px-5 py-3 font-bold text-blue-700">
        أكمل المشاهدة
      </button>
    </div>
  );
}