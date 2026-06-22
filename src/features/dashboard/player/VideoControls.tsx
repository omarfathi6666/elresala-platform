export default function VideoControls() {
  return (
    <div className="flex flex-wrap items-center justify-between rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <button className="rounded-xl border px-5 py-2 hover:bg-slate-100">
          ⏮ السابق
        </button>

        <button className="rounded-xl bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700">
          ▶ تشغيل
        </button>

        <button className="rounded-xl border px-5 py-2 hover:bg-slate-100">
          ⏭ التالي
        </button>
      </div>

      <div className="flex gap-3">
        <select className="rounded-xl border px-3 py-2">
          <option>1x</option>
          <option>1.25x</option>
          <option>1.5x</option>
          <option>2x</option>
        </select>

        <button className="rounded-xl border px-4 py-2">
          ⛶
        </button>
      </div>
    </div>
  );
}
