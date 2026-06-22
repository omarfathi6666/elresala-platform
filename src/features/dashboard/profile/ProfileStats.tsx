export default function ProfileStats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-4xl font-black text-blue-600">
          27
        </h2>

        <p className="mt-2">
          محاضرة مكتملة
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-4xl font-black text-green-600">
          12
        </h2>

        <p className="mt-2">
          امتحان
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <h2 className="text-4xl font-black text-orange-500">
          92%
        </h2>

        <p className="mt-2">
          متوسط النتائج
        </p>
      </div>

    </div>
  );
}