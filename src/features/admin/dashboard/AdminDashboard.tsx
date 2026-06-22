export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-black">
        أهلاً مستر عمر 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-5xl font-black text-blue-600">
            0
          </h2>

          <p className="mt-2">
            الطلاب
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-5xl font-black text-green-600">
            0
          </h2>

          <p className="mt-2">
            الكورسات
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-5xl font-black text-orange-500">
            0
          </h2>

          <p className="mt-2">
            الامتحانات
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-5xl font-black text-red-500">
            0
          </h2>

          <p className="mt-2">
            الأكواد
          </p>
        </div>

      </div>

    </div>
  );
}