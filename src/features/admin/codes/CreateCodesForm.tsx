export default function CreateCodesForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-black">
        إنشاء أكواد جديدة
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-bold">
            المادة
          </label>

          <select className="w-full rounded-2xl border p-4">
            <option>الأحياء</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            الفصل (اختياري)
          </label>

          <select className="w-full rounded-2xl border p-4">
            <option>كل الفصول</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            المحاضرة (اختياري)
          </label>

          <select className="w-full rounded-2xl border p-4">
            <option>كل المحاضرات</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            عدد الأكواد
          </label>

          <input
            type="number"
            defaultValue={50}
            className="w-full rounded-2xl border p-4"
          />
        </div>

        <div>
          <label className="mb-2 block font-bold">
            عدد الأجهزة
          </label>

          <select className="w-full rounded-2xl border p-4">
            <option>جهاز واحد</option>
            <option>جهازان</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-bold">
            تاريخ الانتهاء (اختياري)
          </label>

          <input
            type="date"
            className="w-full rounded-2xl border p-4"
          />
        </div>

      </div>

      <button className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white">
        إنشاء الأكواد
      </button>
    </div>
  );
}