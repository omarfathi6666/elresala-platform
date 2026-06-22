export default function ExamForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="mb-8 text-3xl font-black">
        إنشاء امتحان
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          className="rounded-2xl border p-4"
          placeholder="اسم الامتحان"
        />

        <input
          type="number"
          className="rounded-2xl border p-4"
          placeholder="مدة الامتحان بالدقائق"
        />

      </div>

      <button className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white">
        حفظ الامتحان
      </button>

    </div>
  );
}