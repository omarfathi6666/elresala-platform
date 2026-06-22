export default function LectureForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <h2 className="mb-8 text-3xl font-black">
        إضافة محاضرة
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-bold">
            المادة
          </label>

          <select className="w-full rounded-2xl border p-4">
            <option>الأحياء</option>
            <option>العلوم المتكاملة</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            الفصل
          </label>

          <select className="w-full rounded-2xl border p-4">
            <option>الدعامة والحركة</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-bold">
            اسم المحاضرة
          </label>

          <input
            className="w-full rounded-2xl border p-4"
            placeholder="مثال: الدعامة في النبات"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            ترتيب المحاضرة
          </label>

          <input
            type="number"
            className="w-full rounded-2xl border p-4"
            defaultValue={1}
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            رفع الفيديو
          </label>

          <input
            type="file"
            accept="video/*"
            className="w-full rounded-2xl border p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            PDF (اختياري)
          </label>

          <input
            type="file"
            accept=".pdf"
            className="w-full rounded-2xl border p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            الامتحان (اختياري)
          </label>

          <select className="w-full rounded-2xl border p-4">
            <option>بدون امتحان</option>
          </select>
        </div>

      </div>

      <button className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white">
        حفظ المحاضرة
      </button>

    </div>
  );
}