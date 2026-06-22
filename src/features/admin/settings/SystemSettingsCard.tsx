export default function SystemSettingsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        إعدادات النظام
      </h2>

      <div className="space-y-5">

        <select className="w-full rounded-2xl border p-4">

          <option>جهاز واحد لكل طالب</option>

          <option>جهازان</option>

        </select>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white font-bold">
          حفظ
        </button>

      </div>

    </div>
  );
}