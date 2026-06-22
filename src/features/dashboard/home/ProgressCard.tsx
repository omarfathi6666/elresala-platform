export default function ProgressCard() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">
          تقدمك
        </h3>

        <span className="font-bold text-blue-600">
          68%
        </span>
      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-[68%] rounded-full bg-blue-600" />
      </div>

      <p className="mt-4 text-slate-500">
        أنت على الطريق الصحيح، استمر.
      </p>
    </div>
  );
}