export default function VideoProgress() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-3 flex justify-between">
        <span className="font-semibold">
          التقدم
        </span>

        <span className="text-blue-600 font-bold">
          18:20 / 42:10
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-[43%] rounded-full bg-blue-600" />
      </div>
    </div>
  );
}