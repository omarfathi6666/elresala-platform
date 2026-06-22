export default function VideoNavigation() {
  return (
    <div className="flex justify-between">
      <button className="rounded-2xl border px-6 py-3">
        ← المحاضرة السابقة
      </button>

      <button className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white">
        المحاضرة التالية →
      </button>
    </div>
  );
}