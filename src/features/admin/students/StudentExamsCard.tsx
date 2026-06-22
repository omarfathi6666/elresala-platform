export default function StudentExamsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-2xl font-bold">
        نتائج الامتحانات
      </h2>

      <div className="space-y-3">

        <div className="rounded-xl border p-4 flex justify-between">

          <span>
            امتحان الدعامة
          </span>

          <span className="font-bold text-green-600">
            22 / 25
          </span>

        </div>

      </div>

    </div>
  );
}