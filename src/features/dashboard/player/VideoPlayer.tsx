export default function VideoPlayer() {
  return (
    <div className="flex aspect-video items-center justify-center rounded-3xl bg-slate-900">
      <div className="text-center text-white">
        <div className="mb-4 text-6xl">🎥</div>

        <h2 className="text-2xl font-bold">
          مشغل الفيديو
        </h2>

        <p className="mt-2 text-slate-300">
          سيتم عرض الفيديو هنا بعد ربط المنصة بقاعدة البيانات.
        </p>
      </div>
    </div>
  );
}