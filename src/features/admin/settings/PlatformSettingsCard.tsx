export default function PlatformSettingsCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        بيانات المنصة
      </h2>

      <div className="space-y-5">

        <input
          className="w-full rounded-2xl border p-4"
          defaultValue="منصة الرسالة"
        />

        <input
          className="w-full rounded-2xl border p-4"
          defaultValue="https://elresala.edu.eg"
        />

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white font-bold">
          حفظ
        </button>

      </div>

    </div>
  );
}